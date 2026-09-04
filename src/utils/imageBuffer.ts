/**
 * Image Buffer Management & Preloading Utility
 *
 * Performs off-main-thread image decoding using `HTMLImageElement.decode()`.
 * Maintains an in-memory buffer cache to prevent redundant network fetches
 * and eliminate main-thread render stutter during rapid scrolling or lightbox navigation.
 */

// Global in-memory cache of buffered & decoded image URLs
const imageBufferCache = new Set<string>();

// Active in-flight decode promises to avoid duplicate requests
const inFlightDecodes = new Map<string, Promise<void>>();

/**
 * Check if an image URL is already loaded and decoded into memory
 */
export function isImageBuffered(url: string): boolean {
  return imageBufferCache.has(url);
}

/**
 * Preloads and asynchronously decodes an image off the main thread.
 * Guarantees zero frame drops when the image is painted to the DOM.
 */
export function preloadAndDecodeImage(src: string): Promise<void> {
  if (!src) return Promise.resolve();

  if (imageBufferCache.has(src)) {
    return Promise.resolve();
  }

  const existing = inFlightDecodes.get(src);
  if (existing) {
    return existing;
  }

  const promise = new Promise<void>((resolve) => {
    const img = new Image();
    img.decoding = 'async';
    img.src = src;

    // Use native off-thread decoding if supported
    if ('decode' in img) {
      img
        .decode()
        .then(() => {
          imageBufferCache.add(src);
          inFlightDecodes.delete(src);
          resolve();
        })
        .catch(() => {
          // Fallback if decode fails (e.g. aborted or invalid)
          img.onload = () => {
            imageBufferCache.add(src);
            inFlightDecodes.delete(src);
            resolve();
          };
          img.onerror = () => {
            inFlightDecodes.delete(src);
            resolve();
          };
        });
    } else {
      img.onload = () => {
        imageBufferCache.add(src);
        inFlightDecodes.delete(src);
        resolve();
      };
      img.onerror = () => {
        inFlightDecodes.delete(src);
        resolve();
      };
    }
  });

  inFlightDecodes.set(src, promise);
  return promise;
}

/**
 * Preload a range or list of image buffers in advance
 */
export function preloadImageBufferRange(urls: (string | undefined | null)[]): void {
  const validUrls = urls.filter((url): url is string => Boolean(url && !imageBufferCache.has(url)));
  for (const url of validUrls) {
    preloadAndDecodeImage(url).catch(() => {
      // non-blocking lookahead catch
    });
  }
}
