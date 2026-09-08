import { chromium } from 'playwright';

const baseUrl = process.env.FOOD_TEST_URL || 'http://127.0.0.1:4173/food';
const users = Number(process.env.FOOD_TEST_USERS || 1);
const rampSeconds = Number(process.env.FOOD_TEST_RAMP_SECONDS || 0);
const output = process.env.FOOD_TEST_OUTPUT || 'json';

const percentile = (values, p) => {
  const sorted = values.slice().sort((a, b) => a - b);
  return sorted.length ? sorted[Math.min(sorted.length - 1, Math.floor((sorted.length - 1) * p))] : null;
};

async function runUser(browser, delayMs) {
  if (delayMs) await new Promise((resolve) => setTimeout(resolve, delayMs));

  const context = await browser.newContext();
  const page = await context.newPage();
  const started = Date.now();
  const result = {
    pageLoaded: false,
    menuLoaded: false,
    usable: false,
    pageFailure: false,
    assetFailures: 0,
    supabaseErrors: 0,
    connectionFailures: 0,
    javascriptErrors: 0,
    httpErrors: 0,
    requests: 0,
    menuLatencyMs: null,
    loadTimeMs: null,
    failures: [],
  };

  page.on('request', () => { result.requests += 1; });
  page.on('response', (response) => {
    if (response.status() < 400) return;
    result.httpErrors += 1;
    const url = response.url();
    result.failures.push({ category: /supabase/.test(url) ? 'supabase' : 'asset', status: response.status(), url });
  });
  page.on('requestfailed', (request) => {
    result.connectionFailures += 1;
    const url = request.url();
    if (/supabase/.test(url)) result.supabaseErrors += 1;
    if (['script', 'stylesheet', 'image', 'font'].includes(request.resourceType())) result.assetFailures += 1;
    result.failures.push({ category: /supabase/.test(url) ? 'supabase' : 'connection', url, error: request.failure()?.errorText });
  });
  page.on('pageerror', (error) => {
    result.javascriptErrors += 1;
    result.failures.push({ category: 'javascript', error: error.message });
  });

  try {
    await page.clock.install({ time: new Date('2026-09-08T23:30:00+05:30'), shouldAdvanceTime: true });
    await page.goto(baseUrl, { waitUntil: 'domcontentloaded', timeout: 30000 });
    result.pageLoaded = true;
    await page.locator('main h3').nth(9).waitFor({ state: 'visible', timeout: 30000 });
    result.menuLoaded = true;
    result.menuLatencyMs = Date.now() - started;

    await page.getByRole('button', { name: /Add/ }).first().click();
    await page.getByRole('button', { name: 'Checkout' }).click();
    await page.getByText('Order Summary').waitFor({ state: 'visible', timeout: 5000 });
    result.loadTimeMs = Date.now() - started;
    result.usable = result.javascriptErrors === 0;
  } catch (error) {
    result.pageFailure = true;
    result.failures.push({ category: result.pageLoaded ? 'menu' : 'page', error: String(error) });
  } finally {
    await context.close();
  }

  return result;
}

const browser = await chromium.launch({
  headless: true,
  executablePath: process.env.PLAYWRIGHT_EXECUTABLE_PATH,
});
const started = Date.now();
const results = await Promise.all(Array.from({ length: users }, (_, index) => {
  const delayMs = rampSeconds ? (index * rampSeconds * 1000) / users : 0;
  return runUser(browser, delayMs);
}));
await browser.close();

const menuLatencies = results.filter((result) => result.menuLatencyMs !== null).map((result) => result.menuLatencyMs);
const durationMs = Date.now() - started;
const summary = {
  url: baseUrl,
  users,
  rampSeconds,
  successfulPageLoads: results.filter((result) => result.pageLoaded).length,
  failedPageLoads: results.filter((result) => !result.pageLoaded).length,
  menuLoadFailures: results.filter((result) => !result.menuLoaded).length,
  usablePages: results.filter((result) => result.usable).length,
  httpErrors: results.reduce((sum, result) => sum + result.httpErrors, 0),
  supabaseErrors: results.reduce((sum, result) => sum + result.supabaseErrors, 0),
  connectionFailures: results.reduce((sum, result) => sum + result.connectionFailures, 0),
  javascriptErrors: results.reduce((sum, result) => sum + result.javascriptErrors, 0),
  assetFailures: results.reduce((sum, result) => sum + result.assetFailures, 0),
  averageLoadMs: menuLatencies.length ? Math.round(menuLatencies.reduce((sum, value) => sum + value, 0) / menuLatencies.length) : null,
  p50Ms: percentile(menuLatencies, 0.5),
  p95Ms: percentile(menuLatencies, 0.95),
  p99Ms: percentile(menuLatencies, 0.99),
  maxLoadMs: menuLatencies.length ? Math.max(...menuLatencies) : null,
  averageMenuLatencyMs: menuLatencies.length ? Math.round(menuLatencies.reduce((sum, value) => sum + value, 0) / menuLatencies.length) : null,
  totalRequests: results.reduce((sum, result) => sum + result.requests, 0),
  requestsPerSecond: Math.round(results.reduce((sum, result) => sum + result.requests, 0) / (durationMs / 1000)),
  durationMs,
  failureSamples: results.flatMap((result) => result.failures).slice(0, 20),
};

console.log(output === 'json' ? JSON.stringify({ summary, results }) : JSON.stringify(summary, null, 2));