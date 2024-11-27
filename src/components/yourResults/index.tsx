import { useEffect, useState } from "react";
import { generateSharingUrl } from "../../lib/generateSharingUrl";
import {
  getAttempts,
  QUIZ_ID,
  type QuizAttemptProps,
} from "../../lib/quizAttempts";
import type { ResultsType } from "../../lib/firebase/utils";
import { generateSharingImage } from "../../lib/generateSharingImage";
import Result from "./result";
import styles from "./styles.module.scss";
import PrimaryCta from "../buttons/primaryCta";
import SecondaryCta from "../buttons/secondaryCta";
interface SharedResultsProps {
  score: string;
  description: string;
}

// Temp.
const peningtonExplaination = "Penington Explaination";
// const peningtonResult = 30;
const keyExpertsExplaination = "Key Experts Explaination";
// const keyExpertResult = 30;
const otherVictoriansExplaination = "Other Victorians Explaination";
// const otherVictorians = 30;

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
  const [sharingImage, setSharingImage] = useState<string>("");
  const handleGenerateSharingUrl = (results: ResultsType) => {
    const fmtResults = [
      { score: `${results.r1}%`, description: peningtonExplaination },
      { score: `${results.r2}%`, description: keyExpertsExplaination },
      {
        score: `${results.r3}%`,
        description: otherVictoriansExplaination,
      },
    ];

    console.log({ fmtResults });
    setSharingUrl(generateSharingUrl(fmtResults));
    setSharingImage(generateSharingImage(fmtResults));
  };

  console.log({ sharingImage });

  return (
    <div className={styles.container}>
      {results && (
        <>
          {/* 1. Results */}
          <h1 className="display2">Your Results</h1>
          <div className={styles.resultGroup}>
            <Result
              result={results.r1}
              dataSource="Penington"
              explaination={peningtonExplaination}
            />
            <Result
              result={results.r2}
              dataSource="key experts"
              explaination={keyExpertsExplaination}
            />
            <Result
              result={results.r3}
              dataSource="other Victorians"
              explaination={otherVictoriansExplaination}
            />
          </div>

          {/* Here are your results:
          <ul>
            <li>Question 1: {results.q1}%</li>
            <li>Question 2: {results.q2}%</li>
            <li>Question 3: {results.q3}%</li>
            <li>Question 4: {results.q4}%</li>
          </ul> */}
          {/* <h2>Here is your shareable results image</h2>
          {sharingImage && (
            <img
              width={300}
              src={`http://localhost:4321/api/og${sharingImage}`}
              alt="Your results"
            />
          )}
          <div>
            <button onClick={() => handleGenerateSharingUrl(results)}>
              Generate Share Url
            </button>
          </div>
          <h2>Here is your social share url</h2>
          {sharingUrl && (
            <code>
              <pre>{sharingUrl}</pre>
            </code>
          )} */}
        </>
      )}

      <div
        style={{
          gap: 10,
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          position: "absolute",
          bottom: 40,
          left: 0,
          right: 0,
          width: "100%",
          padding: "0 20px",
          boxSizing: "border-box",
        }}
      >
        <PrimaryCta modifier={styles.resultsCta} label="Share your results" />
        <SecondaryCta
          modifier={styles.resultsCta}
          onClick={() => null}
          label="Learn more about our approach"
        />
      </div>
    </div>
  );
};

export default YourResults;
