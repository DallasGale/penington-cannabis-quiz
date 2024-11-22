import { useState } from "react";
import {
  hasAttemptedQuiz,
  recordAttempt,
  QUIZ_ID,
  clearAttempts,
} from "../lib/quizAttempts";

const QuizForm = () => {
  const [message, setMessage] = useState("");

  const checkAttempt = () => {
    const attempted = hasAttemptedQuiz(QUIZ_ID);
    setMessage(
      attempted ? "Quiz has been attempted" : "Quiz has not been attempted"
    );
  };

  const makeAttempt = () => {
    try {
      recordAttempt(QUIZ_ID);
      setMessage("Quiz has been attempted");
    } catch (e) {
      setMessage("Error recording attempt");
    }
  };

  const reset = () => {
    try {
      clearAttempts();
      setMessage("Cookies cleared");
    } catch (e) {
      setMessage("Error clearing cookies");
    }
  };

  return (
    <div>
      <h1>Quiz</h1>

      <button onClick={checkAttempt}>Check Attempt</button>
      <button onClick={makeAttempt}>Record Attempt</button>
      <button onClick={reset}>Clear Attempts</button>
      {message}
    </div>
  );
};

export default QuizForm;
