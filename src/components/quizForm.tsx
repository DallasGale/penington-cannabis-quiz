import { useState } from "react";
import {
  hasAttemptedQuiz,
  recordAttempt,
  QUIZ_ID,
  clearAttempts,
} from "../lib/quizAttempts";
import { generateSharingUrl } from "../lib/generateSharingUrl";

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

  const results = [
    { score: "85%", description: "Great job!" },
    { score: "65%", description: "Good effort" },
    { score: "55%", description: "Keep practicing" },
    { score: "35%", description: "Needs work" },
    { score: "25%", description: "Study more" },
  ];

  const [sharingUrl, setSharingUrl] = useState("");
  const handleGenerateSharingUrl = (results: any[]) => {
    setSharingUrl(generateSharingUrl(results));
  };

  return (
    <div>
      <h1>Quiz</h1>
      <button onClick={checkAttempt}>Check Attempt</button>
      <button onClick={makeAttempt}>Record Attempt</button>
      <button onClick={reset}>Clear Attempts</button>
      {message}
      <button onClick={() => handleGenerateSharingUrl(results)}>
        Generate Share Url
      </button>
      Use this URL: {sharingUrl}
    </div>
  );
};

export default QuizForm;
