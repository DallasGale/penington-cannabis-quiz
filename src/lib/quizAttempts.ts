import Cookies from "js-cookie";

export const COOKIE_NAME = "quiz_attempts";
export const COOKIE_EXPIRY_DAYS = 90;
export const QUIZ_ID = "cannabis";

interface QuizAttempt {
  quizId: string;
  timestamp: number;
}

// Cookie stuff
export function getAttempts(): QuizAttempt[] {
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

export function recordAttempt(quizId: string): void {
  try {
    let attempts = getAttempts();

    const newAttempt: QuizAttempt = {
      quizId,
      timestamp: Date.now(),
    };

    attempts = [...attempts, newAttempt];

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
