import Cookies from "js-cookie";
import type { ResultsType } from "./firebase/utils";

export const COOKIE_NAME = "quiz_attempts";
export const COOKIE_EXPIRY_DAYS = 90;
export const QUIZ_ID = "cannabis";

export interface QuizAttemptProps {
  quizId: string;
  results: ResultsType;
  timestamp: number;
}

// Cookie stuff
export function getAttempts(): QuizAttemptProps[] {
  try {
    const cookieData = Cookies.get(COOKIE_NAME);

    console.log({ cookieData });
    if (!cookieData) {
      return [];
    }

    const parsed = JSON.parse(cookieData);

    console.log({ parsed });
    if (!Array.isArray(parsed)) {
      console.error("Invalid cookie data format");
      Cookies.remove(COOKIE_NAME);
      return [];
    }

    return parsed.map((attempt) => ({
      ...attempt,
      timestamp: Number(attempt.timestamp),
    }));
  } catch (error) {
    console.error("Error parsing cookie data", error);
    Cookies.remove(COOKIE_NAME);
    return [];
  }
}

export function recordAttempt(quizId: string, results: ResultsType): void {
  try {
    let attempts = getAttempts();
    // Filter out previous attempts for this quiz
    attempts = attempts.filter((attempt) => attempt.quizId !== quizId);

    const newAttempt: QuizAttemptProps = {
      quizId,
      results,
      timestamp: Date.now(),
    };

    // Add new attempt
    attempts = [newAttempt, ...attempts];

    Cookies.set(COOKIE_NAME, JSON.stringify(attempts), {
      expires: COOKIE_EXPIRY_DAYS,
      sameSite: "strict",
    });
  } catch (error) {
    console.error("Error recording attempt", error);
    Cookies.remove(COOKIE_NAME);
  }
}

export function hasAttemptedQuiz(quizId: string): boolean {
  try {
    const attemps = getAttempts();
    console.log({ attemps });
    return attemps.some((attempt) => attempt.quizId === quizId);
  } catch (error) {
    console.error("Error checking for quiz attempts", error);
    return false;
  }
}

// Utility function to clear attempts (useful for testing)
export function clearAttempts(): void {
  Cookies.remove(COOKIE_NAME);
}
