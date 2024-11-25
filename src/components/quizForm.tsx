import { useEffect, useState } from "react";
import {
  hasAttemptedQuiz,
  recordAttempt,
  QUIZ_ID,
  clearAttempts,
} from "../lib/quizAttempts";
import { generateSharingUrl } from "../lib/generateSharingUrl";
import { saveQuizResult, type QuizTypes } from "../lib/firebase/utils";
import styles from "./styles.module.scss";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../lib/firebase/config";

const QuizForm = () => {
  // Check for previous attempt on mount

  const [isLoading, setIsLoading] = useState(true);
  const [quizAttempted, setQuizAttempted] = useState(false);
  const [previousResults, setPreviousResults] = useState<any>(null);
  const [statusMessage, setStatusMessage] = useState("");

  const [q1Result, setQ1Result] = useState<number>(0);
  const [q2Result, setQ2Result] = useState<number>(0);
  const [q3Result, setQ3Result] = useState<number>(0);
  const [q4Result, setQ4Result] = useState<number>(0);
  const [postCode, setPostCode] = useState<string>("");

  useEffect(() => {
    const checkPreviousAttempt = () => {
      try {
        const attempted = hasAttemptedQuiz(QUIZ_ID);
        if (attempted) {
          // Assuming hasAttemptedQuiz returns the stored results if they exist
          const storedResults = attempted;
          setQuizAttempted(true);
          setPreviousResults(storedResults);
          setStatusMessage("You have already completed this quiz");
        }
      } catch (error) {
        console.error("Error checking previous attempt:", error);
        setStatusMessage("Error checking quiz status");
      } finally {
        setIsLoading(false);
      }
    };

    checkPreviousAttempt();
  }, []);

  const [formData, setFormData] = useState<QuizTypes>({
    createdAt: serverTimestamp(), // Use serverTimestamp() from firebase/firestore
    postCode: "",
    results: {
      q1: 25,
      q2: 50,
      q3: 75,
      q4: 100,
    },
  });

  const [cookieMessage, setCookieMessage] = useState("");

  const makeAttempt = () => {
    try {
      recordAttempt(QUIZ_ID, formData.results);
      setCookieMessage("Quiz has been attempted");
    } catch (e) {
      setCookieMessage("Error recording attempt");
    }
  };

  const checkAttempt = () => {
    const attempted = hasAttemptedQuiz(QUIZ_ID);
    setQuizAttempted(attempted);
    setCookieMessage(
      attempted ? "Quiz has been attempted" : "Quiz has not been attempted"
    );
  };

  const reset = () => {
    try {
      clearAttempts();
      setCookieMessage("Cookies cleared");
    } catch (e) {
      setCookieMessage("Error clearing cookies");
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
    console.log({ results });
    setSharingUrl(generateSharingUrl(results));
  };

  // ----------------------------------------------------------------
  // Form Submission
  // ----------------------------------------------------------------

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Clear any existing errors before validation
    setErrors({});

    // if (!validateForm()) {
    //   return;
    // }

    setIsSubmitting(true);
    setSubmitStatus("submitting");

    try {
      const submissionData = {
        // ...formData,
        postCode: postCode,
        createdAt: serverTimestamp(), // Use serverTimestamp() from firebase/firestore
        results: {
          q1: q1Result,
          q2: q2Result,
          q3: q3Result,
          q4: q4Result,
        },
      };

      // Add to queue collection
      // await addDoc(collection(db, "submissions"), submissionData);
      await saveQuizResult(submissionData);

      // Record attempt in cookie
      await recordAttempt(QUIZ_ID, submissionData.results);

      setQuizAttempted(true);
      setPreviousResults(submissionData.results);
      setStatusMessage("Quiz submitted successfully!");
      setSubmitStatus("success");
      window.location.href = "/results";
    } catch (error) {
      console.error("Error submitting quiz:", error);
      setStatusMessage("Error submitting quiz");
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return "Checking...";
  }
  return (
    <div className={styles.container}>
      <h1>Quiz</h1>
      <div className={styles.fieldGroup}>
        <button onClick={checkAttempt}>Check Attempt</button>
        <button onClick={makeAttempt}>Record Attempt</button>
        <button onClick={reset}>Clear Attempts</button>
      </div>
      <br />
      <div>
        {cookieMessage}
        <button onClick={() => handleGenerateSharingUrl(results)}>
          Generate Share Url
        </button>
      </div>
      Use this URL: {sharingUrl}
      {quizAttempted ? (
        <>
          <h2>Sorry, you have already attempted the quiz</h2>
          {/* <h3>Your results were:</h3>
          <ul>
            <li>Q1: {formData.results.q1}</li>
            <li>Q2: {formData.results.q2}</li>
            <li>Q3: {formData.results.q3}</li>
            <li>Q4: {formData.results.q4}</li>
          </ul> */}
        </>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className={styles.fieldGroup}>
            <label htmlFor="q1">Q1 Result</label>
            <input
              id="q1"
              value={q1Result}
              onChange={(e) => setQ1Result(parseInt(e.target.value))}
            />
          </div>
          <div className={styles.fieldGroup}>
            <label htmlFor="q2">Q2 Result</label>
            <input
              id="q2"
              value={q2Result}
              onChange={(e) => setQ2Result(parseInt(e.target.value))}
            />
          </div>
          <div className={styles.fieldGroup}>
            <label htmlFor="q3">Q3 Result</label>
            <input
              id="q3"
              value={q3Result}
              onChange={(e) => setQ3Result(parseInt(e.target.value))}
            />
          </div>
          <div className={styles.fieldGroup}>
            <label htmlFor="q4">Q4 Result</label>
            <input
              id="q4"
              value={q4Result}
              onChange={(e) => setQ4Result(parseInt(e.target.value))}
            />
          </div>
          <br />
          <input
            placeholder="Post Code"
            type="text"
            value={postCode}
            onChange={(e) => setPostCode(e.target.value)}
          />
          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
};

export default QuizForm;
