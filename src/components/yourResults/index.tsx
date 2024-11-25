import { useEffect, useState } from "react";
import { generateSharingUrl } from "../../lib/generateSharingUrl";
import {
  getAttempts,
  QUIZ_ID,
  type QuizAttemptProps,
} from "../../lib/quizAttempts";
import type { ResultsType } from "../../lib/firebase/utils";

interface SharedResultsProps {
  score: string;
  description: string;
}

const YourResults = () => {
  // results
  // i need to read the results from the cookie
  const [results, setResults] = useState<ResultsType | null>(null);
  useEffect(() => {
    const checkCookie = () => {
      try {
        const data: QuizAttemptProps[] = getAttempts();
        console.log({ data });
        setResults(data[0].results);

        return data.some((attempt) => attempt.quizId === QUIZ_ID);
      } catch (error) {
        console.error("Error checking cookie", error);
        return false;
      }
    };

    checkCookie();
  }, []);

  // shareable url
  const [sharingUrl, setSharingUrl] = useState<string>("");
  const handleGenerateSharingUrl = (results: ResultsType) => {
    const fmtResults = [
      { score: `${results.q1}%`, description: "Question 1" },
      { score: `${results.q2}%`, description: "Question 2" },
      { score: `${results.q3}%`, description: "Question 3" },
      { score: `${results.q4}%`, description: "Question 4" },
    ];

    console.log({ fmtResults });
    setSharingUrl(generateSharingUrl(fmtResults));
  };
  return (
    <div>
      {results && (
        <div>
          {/* 1. Results */}
          <h1>Results</h1>
          Here are your results:
          <ul>
            <li>Question 1: {results.q1}%</li>
            <li>Question 2: {results.q2}%</li>
            <li>Question 3: {results.q3}%</li>
            <li>Question 4: {results.q4}%</li>
          </ul>
          {/* 2. Shareable url */}
          <h2>Here is your shareable results image</h2>
          <div>
            <button onClick={() => handleGenerateSharingUrl(results)}>
              Generate Share Url
            </button>
          </div>
          <img src="https://via.placeholder.com/150" alt="Your results" />
          <h2>Here is your social share url</h2>
          {sharingUrl && (
            <code>
              <pre>{sharingUrl}</pre>
            </code>
          )}
        </div>
      )}
    </div>
  );
};

export default YourResults;
