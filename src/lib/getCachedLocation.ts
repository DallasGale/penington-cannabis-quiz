export interface LocationCache {
  timestamp: number;
  isAllowed: boolean;
}

export const getCachedLocation = (
  cacheDuration: number,
): LocationCache | null => {
  const localStorage = window.localStorage;
  const stored = localStorage.getItem("locationCheckCache");
  if (!stored) return null;

  const cache: LocationCache = JSON.parse(stored);
  const now = Date.now();
  const cacheAge = (now - cache.timestamp) / 1000; // in minutes

  // Return null if cache has expired
  console.log({ cacheAge, cacheDuration });
  if (cacheAge > cacheDuration) {
    localStorage.removeItem("locationCheckCache");
    return null;
  }

  return cache;
};
