import { readFileSync } from 'node:fs';

const baseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const publishableKey = process.env.SUPABASE_PUBLISHABLE_KEY || process.env.VITE_SUPABASE_PUBLISHABLE_KEY;
const paymentImage = process.env.SUPABASE_LOAD_TEST_PAYMENT_IMAGE_FILE
  ? readFileSync(process.env.SUPABASE_LOAD_TEST_PAYMENT_IMAGE_FILE)
  : null;
const originalImageBytes = paymentImage?.byteLength ?? 0;
const optimizedImageBytes = originalImageBytes;
const allowWrites = process.env.SUPABASE_LOAD_TEST_ALLOW_WRITES === '1';
const writeMode = process.argv.includes('--write');

if (!baseUrl || !publishableKey) {
  console.error('Set SUPABASE_URL and SUPABASE_PUBLISHABLE_KEY before running the load test.');
  process.exit(1);
}

if (writeMode && !allowWrites) {
  console.error('Write mode is disabled. Set SUPABASE_LOAD_TEST_ALLOW_WRITES=1 explicitly for a disposable test database.');
  process.exit(1);
}

if (writeMode && !paymentImage) {
  console.error('Set SUPABASE_LOAD_TEST_PAYMENT_IMAGE_FILE to a WebP fixture for write mode.');
  process.exit(1);
}

const orderEndpoint = `${baseUrl}/rest/v1/rpc/place_food_order`;
const readEndpoint = `${baseUrl}/rest/v1/food_orders?select=order_id&limit=1`;
const headers = {
  apikey: publishableKey,
  Authorization: `Bearer ${publishableKey}`,
  'Content-Type': 'application/json'
};

const percentile = (values, value) => {
  if (values.length === 0) return 0;
  const index = Math.min(values.length - 1, Math.ceil(value * values.length) - 1);
  return values[index];
};

const isTransientUploadStatus = status => status === 0 || status === 408 || status === 429 || status >= 500;

async function request(index) {
  const started = performance.now();
  const requestHeaders = { ...headers };
  let uploadMs = 0;
  let orderMs = 0;
  let uploadRetries = 0;

  try {
    if (writeMode) {
      const orderId = crypto.randomUUID();
      const paymentPath = `payments/${crypto.randomUUID()}.webp`;
      const uploadStarted = performance.now();
      let uploadStatus = 0;
      for (let attempt = 0; attempt < 3; attempt += 1) {
        try {
          const uploadResponse = await fetch(`${baseUrl}/storage/v1/object/payment-screenshots/${paymentPath}`, {
            method: 'POST',
            headers: { ...requestHeaders, 'Content-Type': 'image/webp', 'x-upsert': 'false' },
            body: paymentImage
          });
          uploadStatus = uploadResponse.status;
          await uploadResponse.arrayBuffer();
          if (uploadResponse.ok || !isTransientUploadStatus(uploadStatus)) break;
        } catch {
          uploadStatus = 0;
        }
        uploadRetries += 1;
        await new Promise(resolve => setTimeout(resolve, 250 * 2 ** attempt));
      }
      uploadMs = performance.now() - uploadStarted;
      if (uploadStatus < 200 || uploadStatus >= 300) {
        return { status: uploadStatus, uploadStatus, rpcStatus: null, connectionFailure: uploadStatus === 0, latency: performance.now() - started, uploadMs, orderMs, uploadRetries };
      }

      const orderStarted = performance.now();
      let response;
      try {
        response = await fetch(orderEndpoint, {
          method: 'POST',
          headers: requestHeaders,
          body: JSON.stringify({
            p_order_id: orderId,
            p_team_name: 'Load Test Team',
            p_team_leader_name: 'Load Test User',
            p_team_leader_phone: '9876543210',
            p_room_no: 'Load Test Room',
            p_items: [{ id: 101, quantity: 1 }],
            p_payment_screenshot_path: paymentPath
          })
        });
      } catch {
        return { status: 0, uploadStatus, rpcStatus: 0, connectionFailure: true, latency: performance.now() - started, uploadMs, orderMs, uploadRetries };
      }
      await response.arrayBuffer();
      orderMs = performance.now() - orderStarted;
      return { status: response.status, uploadStatus, rpcStatus: response.status, connectionFailure: false, latency: performance.now() - started, uploadMs, orderMs, uploadRetries };
    }

    const response = await fetch(readEndpoint, { method: 'GET', headers: requestHeaders });
    await response.arrayBuffer();
    return { status: response.status, uploadStatus: null, rpcStatus: response.status, connectionFailure: false, latency: performance.now() - started, uploadMs, orderMs, uploadRetries };
  } catch {
    return { status: 0, uploadStatus: null, rpcStatus: 0, connectionFailure: true, latency: performance.now() - started, uploadMs, orderMs, uploadRetries };
  }
}

async function run(concurrency) {
  const started = performance.now();
  const results = await Promise.all(Array.from({ length: concurrency }, (_, index) => request(index)));
  const elapsed = performance.now() - started;
  const latencies = results.map(result => result.latency).sort((a, b) => a - b);
  const uploadLatencies = results.map(result => result.uploadMs).filter(Boolean).sort((a, b) => a - b);
  const orderLatencies = results.map(result => result.orderMs).filter(Boolean).sort((a, b) => a - b);
  const successful = results.filter(result => result.status >= 200 && result.status < 300).length;
  const uploadFailures = results.filter(result => result.uploadStatus !== null && (result.uploadStatus < 200 || result.uploadStatus >= 300)).length;
  const rpcFailures = results.filter(result => result.rpcStatus !== null && result.rpcStatus !== 0 && (result.rpcStatus < 200 || result.rpcStatus >= 300)).length;
  const connectionFailures = results.filter(result => result.connectionFailure).length;
  const counts = Object.entries(Object.groupBy(results, result => result.status))
    .map(([status, entries]) => `${status}:${entries.length}`)
    .join(',');

  return {
    concurrency,
    requests: results.length,
    successful,
    failed: results.length - successful,
    uploadFailures,
    rpcFailures,
    connectionFailures,
    uploadRetries: results.reduce((sum, result) => sum + result.uploadRetries, 0),
    avgMs: (latencies.reduce((sum, latency) => sum + latency, 0) / latencies.length).toFixed(2),
    p50Ms: percentile(latencies, 0.5).toFixed(2),
    p95Ms: percentile(latencies, 0.95).toFixed(2),
    p99Ms: percentile(latencies, 0.99).toFixed(2),
    maxMs: latencies.at(-1).toFixed(2),
    uploadAvgMs: uploadLatencies.length ? (uploadLatencies.reduce((sum, latency) => sum + latency, 0) / uploadLatencies.length).toFixed(2) : '-',
    orderAvgMs: orderLatencies.length ? (orderLatencies.reduce((sum, latency) => sum + latency, 0) / orderLatencies.length).toFixed(2) : '-',
    rps: (results.length / (elapsed / 1000)).toFixed(2),
    statuses: counts
  };
}

const runSustained = async (orders, durationMs = 60000) => {
  const started = performance.now();
  const results = [];
  let next = 0;
  const workers = Array.from({ length: Math.min(10, orders) }, async () => {
    while (next < orders) {
      const index = next++;
      const targetStart = (index / orders) * durationMs;
      const waitMs = targetStart - (performance.now() - started);
      if (waitMs > 0) await new Promise(resolve => setTimeout(resolve, waitMs));
      results.push(await request(index));
    }
  });
  await Promise.all(workers);
  const elapsed = performance.now() - started;
  return { workload: `${orders} orders`, elapsedMs: elapsed.toFixed(2), ...await summarize(results, elapsed) };
};

async function summarize(results, elapsed) {
  const latencies = results.map(result => result.latency).sort((a, b) => a - b);
  const successful = results.filter(result => result.status >= 200 && result.status < 300).length;
  return {
    requests: results.length,
    successful,
    failed: results.length - successful,
    uploadFailures: results.filter(result => result.uploadStatus !== null && (result.uploadStatus < 200 || result.uploadStatus >= 300)).length,
    rpcFailures: results.filter(result => result.rpcStatus !== null && result.rpcStatus !== 0 && (result.rpcStatus < 200 || result.rpcStatus >= 300)).length,
    connectionFailures: results.filter(result => result.connectionFailure).length,
    avgMs: (latencies.reduce((sum, latency) => sum + latency, 0) / latencies.length).toFixed(2),
    p95Ms: percentile(latencies, 0.95).toFixed(2),
    p99Ms: percentile(latencies, 0.99).toFixed(2),
    rps: (results.length / (elapsed / 1000)).toFixed(2)
  };
}

console.log(`Mode: ${writeMode ? 'write (explicitly enabled)' : 'read-only'}`);
if (writeMode) console.log(`Image bytes: original=${originalImageBytes}, optimized=${optimizedImageBytes}, reduction=${originalImageBytes ? ((1 - optimizedImageBytes / originalImageBytes) * 100).toFixed(1) : '0.0'}%`);
console.table(await Promise.all([10, 25, 50, 75, 100].map(run)));
if (writeMode && process.argv.includes('--sustained')) console.table(await Promise.all([50, 100, 200].map(orders => runSustained(orders))));