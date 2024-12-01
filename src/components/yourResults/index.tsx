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
import { explanationData } from "../../data/quiz.ts";
import ShareModal from "../modals/share.tsx";

console.log({ explanationData });
const YourResults = () => {
  // results
  // i need to read the results from the cookie
  const [results, setResults] = useState<ResultsType | null>(null);
  // shareable url
  const [sharingUrl, setSharingUrl] = useState<string>("");
  const [sharingImage, setSharingImage] = useState<string>("");
  const [toggleShareModal, setToggleShareModal] = useState(false);

  useEffect(() => {
    const checkForAttempts = () => {
      try {
        const cookieAttempts: QuizAttemptProps[] = getAttempts();

        if (cookieAttempts && cookieAttempts.length > 0) {
          setResults(cookieAttempts[0].results);
          return cookieAttempts.some((attempt) => attempt.quizId === QUIZ_ID);
        }
        // If no cookie data, check localStorage
        const localStorageResults = localStorage.getItem("results");
        if (localStorageResults) {
          const parsedResults = JSON.parse(localStorageResults);
          setResults(parsedResults);
          return true;
        }

        // No data found in either location
        setResults(null);
      } catch (error) {
        console.error("Error checking cookie", error);
        setResults(null);
        return false;
      }
    };

    checkForAttempts();
  }, []);

  const generateAndSetSharingUrl = (results: ResultsType) => {
    const fmtResults = [
      {
        score: `${results.r1}%`,
        description: explanationData.penington.description,
      },
      {
        score: `${results.r2}%`,
        description: explanationData.victorians.description,
      },
    ];
    const url = generateSharingUrl(fmtResults);
    const image = generateSharingImage(fmtResults);

    setSharingUrl(generateSharingUrl(fmtResults));
    setSharingImage(generateSharingImage(fmtResults));
    setSharingUrl(url);
    setSharingImage(image);
    return url;
  };

  const handleShareLink = async () => {
    if (results) {
      const url = generateAndSetSharingUrl(results);
      try {
        await navigator.clipboard.writeText(url);
        setToggleShareModal(true);
        setTimeout(() => {
          console.log("Closing modal");
          setToggleShareModal(false);
        }, 2000);
      } catch (err) {
        console.error("Failed to copy to clipboard:", err);
        // Still show the modal even if clipboard copy fails
        setToggleShareModal(true);
      }
    }
  };

  return (
    <div className={styles.container}>
      {results && (
        <>
          {/* 1. Results */}
          <h1 className="display5">Your Results</h1>
          <div className={styles.resultGroup}>
            <Result
              result={results.r1}
              dataSource="Penington"
              explaination={explanationData.penington.description}
            />
            <Result
              result={results.r2}
              dataSource="other Victorians"
              explaination={explanationData.victorians.description}
            />
          </div>
        </>
      )}

      <div className={styles.ctaGroup}>
        <PrimaryCta
          onClick={handleShareLink}
          modifier={styles.resultsCta}
          label="Share your results"
        />
        <SecondaryCta
          isLink
          link="/our-approach"
          modifier={styles.resultsCta}
          label="Learn more about our approach"
        />
      </div>

      <ShareModal
        open={toggleShareModal}
        url={sharingUrl}
        shareImage={sharingImage}
        onClose={() => setToggleShareModal(false)}
      />
    </div>
  );
};

export default YourResults;
