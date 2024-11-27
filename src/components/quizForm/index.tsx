import { useEffect, useRef, useState } from "react";
import {
  hasAttemptedQuiz,
  recordAttempt,
  QUIZ_ID,
  clearAttempts,
} from "../../lib/quizAttempts";
import { generateSharingUrl } from "../../lib/generateSharingUrl";
import {
  saveQuizResult,
  type QuizTypes,
  type ResultsType,
} from "../../lib/firebase/utils";
import styles from "./styles.module.scss";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../lib/firebase/config";
import Progress from "./progress";
import QuestionAnswer from "./questionAnswer";

// Data
import { quizData } from "../../data/quiz";
import PrimaryCta from "../buttons/primaryCta";
import Header from "./header";
import { motion, AnimatePresence } from "motion/react";

type PostCodeInputType = string | number | readonly string[] | undefined;

const QuizForm = () => {
  // ----------------------------------------------------------------
  // Question/Answers Flow
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleExitComplete = () => {
    setCurrentQuestion(currentQuestion + 1);
    setIsTransitioning(false);
  };
  const handleNextQuestion = (id: number) => {
    setIsTransitioning(true);
  };

  // ----------------------------------------------------------------
  // PostCode Form
  const [postCodeValues, setPostCodeValues] = useState(["", "", "", ""]);
  // Create refs for each input
  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  const handlePostCodeChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = event.target.value;

    // Only allow numbers
    if (!/^\d*$/.test(value)) return;

    // Update the values array
    const newValues = [...postCodeValues];
    newValues[index] = value;
    setPostCodeValues(newValues);

    // If a digit is entered, move to next field
    if (value.length === 1 && index < 3) {
      if (inputRefs[index + 1].current) {
        inputRefs[index + 1].current?.focus();
      }
    }
  };

  const handleKeyDown = (index: number, event: React.KeyboardEvent) => {
    // Handle backspace
    if (
      event.key === "Backspace" &&
      postCodeValues[index] === "" &&
      index > 0
    ) {
      if (inputRefs[index - 1].current) {
        inputRefs[index - 1].current?.focus();
      }
    }

    // Handle left arrow
    if (event.key === "ArrowLeft" && index > 0) {
      if (inputRefs[index - 1].current) {
        inputRefs[index - 1].current?.focus();
      }
    }

    // Handle right arrow
    if (event.key === "ArrowRight" && index < 3) {
      if (inputRefs[index + 1].current) {
        inputRefs[index + 1].current?.focus();
      }
    }
  };

  const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault();
    const pastedData = event.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 4);

    const newValues = [...postCodeValues];
    [...pastedData].forEach((char, index) => {
      if (index < 4) newValues[index] = char;
    });

    setPostCodeValues(newValues);

    // Focus the next empty field or the last field if all are filled
    const nextEmptyIndex = newValues.findIndex((val) => val === "");
    const focusIndex = nextEmptyIndex === -1 ? 3 : nextEmptyIndex;
    inputRefs[focusIndex].current?.focus();
  };

  // ----------------------------------------------------------------
  // Check for previous attempt on mount

  const [isLoading, setIsLoading] = useState(true);
  const [quizAttempted, setQuizAttempted] = useState(false);
  const [previousResults, setPreviousResults] = useState<any>(null);
  const [statusMessage, setStatusMessage] = useState("");

  const [peningtonResult, setPeningtonResult] = useState<number>(0);
  const [keyExpertsResult, setKeyExpertsResult] = useState<number>(0);
  const [otherVictoriansResult, setOtherVictoriansResult] = useState<number>(0);

  useEffect(() => {
    const checkPreviousAttempt = () => {
      console.log("checking");
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
      r1: 25,
      r2: 50,
      r3: 75,
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
      attempted ? "Quiz has been attempted" : "Quiz has not been attempted",
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
        postCode: postCodeValues.join(""),
        createdAt: serverTimestamp(), // Use serverTimestamp() from firebase/firestore
        results: {
          r1: peningtonResult,
          r2: keyExpertsResult,
          r3: otherVictoriansResult,
        } satisfies ResultsType,
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

  // if (isLoading) {
  //   return "Checking...";
  // }

  return (
    <div className={styles.container}>
      <Progress steps={quizData.length} currentStep={currentQuestion} />
      <Header />

      {/* Questions */}
      {currentQuestion === quizData.length ? (
        <>
          <h1 className="display2">Enter your postcode to get your results</h1>
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.postCodeWrapper}>
              {postCodeValues.map((value, index) => (
                <div className={styles.postCodeInputWrapper}>
                  <input
                    key={index}
                    ref={inputRefs[index]}
                    type="text"
                    inputMode="numeric"
                    value={value}
                    min={1}
                    max={1}
                    onChange={(e) => handlePostCodeChange(index, e)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={handlePaste}
                  />
                </div>
              ))}
            </div>
            <div className={styles.fieldGroup}>
              <label htmlFor="penington">Penington Result</label>
              <input
                required
                id="penington"
                value={peningtonResult}
                onChange={(e) => setPeningtonResult(parseInt(e.target.value))}
              />
            </div>
            <div className={styles.fieldGroup}>
              <label htmlFor="keyExperts">Key Experts Result</label>
              <input
                required
                id="keyExperts"
                value={keyExpertsResult}
                onChange={(e) => setKeyExpertsResult(parseInt(e.target.value))}
              />
            </div>
            <div className={styles.fieldGroup}>
              <label htmlFor="otherVictorians">Other Victorians Result</label>
              <input
                required
                id="otherVictorians"
                value={otherVictoriansResult}
                onChange={(e) =>
                  setOtherVictoriansResult(parseInt(e.target.value))
                }
              />
            </div>

            {postCodeValues.join("").length === 4 && (
              <PrimaryCta type="submit" label="Get my results" />
            )}
          </form>
        </>
      ) : (
        <div id="questions">
          <AnimatePresence mode="wait" onExitComplete={handleExitComplete}>
            {!isTransitioning && (
              <motion.div
                key={currentQuestion}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <QuestionAnswer
                  {...quizData[currentQuestion - 1]}
                  handleAnswerClick={(id, answer) => console.log(id, answer)}
                  setNextQuestion={handleNextQuestion}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default QuizForm;
