export interface LocationCache {
  timestamp: number;
  isAllowed: boolean;
}

export const getCachedLocation = (
  cacheDuration: number,
): LocationCache | null => {
  const stored = localStorage.getItem("locationCheckCache");
  if (!stored) return null;

  const cache: LocationCache = JSON.parse(stored);
  const now = Date.now();
  const cacheAge = (now - cache.timestamp) / 60000; // in minutes

  // Return null if cache has expired
  if (cacheAge > cacheDuration) {
    localStorage.removeItem("locationCheckCache");
    return null;
  }

  return cache;
};
