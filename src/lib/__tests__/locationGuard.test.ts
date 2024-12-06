import { checkRateLimit } from "../checkRateLimit";
import { getCachedLocation } from "../getCachedLocation";
import { describe, it, expect, beforeEach, vi, type Mock } from "vitest";

// Mock window before other setup
const windowMock = {
  localStorage: {
    storage: new Map(),
    getItem: vi.fn((key) => windowMock.localStorage.storage.get(key) || null),
    setItem: vi.fn((key, value) =>
      windowMock.localStorage.storage.set(key, value),
    ),
    removeItem: vi.fn((key) => windowMock.localStorage.storage.delete(key)),
    clear: vi.fn(() => windowMock.localStorage.storage.clear()),
  },
};
vi.stubGlobal("window", windowMock);

const cacheDuration = 60;
const mockLocalStorage = windowMock.localStorage;

describe("Get Cached Location", () => {
  beforeEach(() => {
    mockLocalStorage.getItem.mockClear();
    mockLocalStorage.setItem.mockClear();
    mockLocalStorage.removeItem.mockClear();
    mockLocalStorage.storage.clear();
  });

  it("should return null if no cache exists", () => {
    const result = getCachedLocation(cacheDuration);
    expect(result).toBe(null);
  });

  it("should return null if cache is expired", () => {
    const now = Date.now();
    const cache = {
      timestamp: now - cacheDuration * 1000 - 1000,
      isAllowed: true,
    };
    mockLocalStorage.setItem("locationCheckCache", JSON.stringify(cache));

    console.log({
      now,
      cacheTimestamp: cache.timestamp,
      age: (now - cache.timestamp) / 1000,
      cacheDuration,
    });

    const result = getCachedLocation(cacheDuration);
    expect(result).toBe(null);
  });

  it("should return cached location if cache is valid", () => {
    // Set cache
    const cache = {
      timestamp: Date.now(),
      isAllowed: true,
    };
    mockLocalStorage.setItem("locationCheckCache", JSON.stringify(cache));

    console.log(mockLocalStorage.getItem("locationCheckCache"));

    const result = getCachedLocation(cacheDuration);
    console.log({ result, cache });
    expect(result).toEqual(cache);
  });
});
