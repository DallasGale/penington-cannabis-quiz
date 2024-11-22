import { describe, it, expect, beforeEach, vi, type Mock } from "vitest";

// Mock the cookies
vi.mock("js-cookie", () => ({
  default: {
    get: vi.fn(),
    set: vi.fn(),
    remove: vi.fn(),
  },
}));

import Cookies from "js-cookie";
import { recordAttempt, hasAttemptedQuiz } from "../quizAttempts";

const COOKIE_NAME = "quiz_attempts";
const COOKIE_EXPIRY_DAYS = 90;
const QUIZ_ID = "cannabis";

describe("Quiz Attempt Tracking", () => {
  beforeEach(() => {
    // Clear all mocks
    vi.clearAllMocks();

    // Clear cookies
    vi.mocked(Cookies.remove).mockClear();
    vi.mocked(Cookies.get).mockClear();
    vi.mocked(Cookies.set).mockClear();
  });

  describe("hasAttemptedQuiz", () => {
    it("should return false if when no attempts exists", () => {
      vi.mocked(Cookies.get).mockReturnValue(undefined);

      const results = hasAttemptedQuiz(QUIZ_ID);
      expect(results).toBe(false);
      expect(Cookies.get).toHaveBeenCalledWith(COOKIE_NAME);
    });

    it("should return true if another attempt has been made", () => {
      const mockAttempts = [
        {
          quizId: QUIZ_ID,
          timestamp: Date.now(),
        },
      ];
      vi.mocked(Cookies.get).mockReturnValue(JSON.stringify(mockAttempts));

      const result = hasAttemptedQuiz(QUIZ_ID);

      expect(result).toBe(true);
      expect(Cookies.get).toHaveBeenCalledWith(COOKIE_NAME);
    });

    it("should return false for different quiz ID", () => {
      const mockAttempts = [{ quizId: "other-quiz", timestamp: Date.now() }];
      vi.mocked(Cookies.get).mockReturnValue(JSON.stringify(mockAttempts));

      const result = hasAttemptedQuiz(QUIZ_ID);

      expect(result).toBe(false);
      expect(Cookies.get).toHaveBeenCalledWith(COOKIE_NAME);
    });

    it("should handle invalid cookie data", () => {
      vi.mocked(Cookies.get).mockReturnValue({ "invalid-json": "" });

      const result = hasAttemptedQuiz(QUIZ_ID);

      expect(result).toBe(false);
      expect(Cookies.get).toHaveBeenCalledWith(COOKIE_NAME);
      // Should attempt to remove corrupted cookie
      expect(Cookies.remove).toHaveBeenCalledWith(COOKIE_NAME);
    });
  });

  describe("recordAttempt", () => {
    it("should record first attempt correctly", () => {
      vi.mocked(Cookies.get).mockReturnValue(undefined);
      const now = Date.now();
      vi.setSystemTime(now);

      recordAttempt(QUIZ_ID);

      expect(Cookies.set).toHaveBeenCalledWith(
        COOKIE_NAME,
        JSON.stringify([{ quizId: QUIZ_ID, timestamp: now }]),
        {
          expires: 90,
          sameSite: "strict",
        }
      );
    });

    it("should append to existing attempts", () => {
      const existingTimestamp = 1732242224773;
      const existingAttempt = {
        quizId: "other-quiz",
        timestamp: existingTimestamp,
      };
      vi.mocked(Cookies.get).mockReturnValue(JSON.stringify([existingAttempt]));

      const newTimestamp = 1732242224774;
      vi.setSystemTime(newTimestamp);

      recordAttempt(QUIZ_ID);

      expect(Cookies.set).toHaveBeenCalledWith(
        COOKIE_NAME,
        JSON.stringify([
          existingAttempt,
          { quizId: QUIZ_ID, timestamp: newTimestamp },
        ]),
        {
          expires: COOKIE_EXPIRY_DAYS,
          sameSite: "strict",
        }
      );
    });
  });
  describe("edge cases", () => {
    it("should handle string timestamps", () => {
      const timestamp = 1732242224773;
      const mockAttempts = [
        { quizId: QUIZ_ID, timestamp: timestamp.toString() },
      ];
      vi.mocked(Cookies.get).mockReturnValue(JSON.stringify(mockAttempts));

      const result = hasAttemptedQuiz(QUIZ_ID);

      expect(result).toBe(true);
    });

    it("should handle invalid JSON", () => {
      vi.mocked(Cookies.get).mockReturnValue("invalid json");

      const result = hasAttemptedQuiz(QUIZ_ID);

      expect(result).toBe(false);
      expect(Cookies.remove).toHaveBeenCalledWith(COOKIE_NAME);
    });
  });
});
