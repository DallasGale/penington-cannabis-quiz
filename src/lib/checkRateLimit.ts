export interface RateLimit {
  calls: number;
  resetTime: number;
}
export const checkRateLimit = (maxCallsPerHour: number): boolean => {
  const now = Date.now();
  const rateLimitKey = "locationCheckRateLimit";
  const stored = localStorage.getItem(rateLimitKey);
  let rateLimit: RateLimit;

  if (stored) {
    rateLimit = JSON.parse(stored);

    // Reset rate limit if the hour has passed
    if (now > rateLimit.resetTime) {
      rateLimit = {
        calls: 0,
        resetTime: now + 3600000, // 1 hour from now
      };
    }
  } else {
    rateLimit = {
      calls: 0,
      resetTime: now + 3600000,
    };
  }

  // Check if rate limit exceeded
  if (rateLimit.calls >= maxCallsPerHour) {
    const minutesUntilReset = Math.ceil((rateLimit.resetTime - now) / 60000);
    throw new Error(
      `Rate limit exceeded. Please try again in ${minutesUntilReset} minutes.`,
    );
  }

  // Increment call count and save
  rateLimit.calls++;
  localStorage.setItem(rateLimitKey, JSON.stringify(rateLimit));
  return true;
};
