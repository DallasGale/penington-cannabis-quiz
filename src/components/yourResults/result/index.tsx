import { useState } from "react";
import styles from "./styles.module.scss";
import Circles from "../circles";

interface ResultProps {
  result: number;
  dataSource: string;
  explaination: string;
}

const Result = ({ result, dataSource, explaination }: ResultProps) => {
  const [toggleExplanation, setToggleExplanation] = useState(false);
  return (
    <div className={styles.container}>
      <button
        onClick={() => setToggleExplanation(!toggleExplanation)}
        className={styles.button}
      >
        <Circles result={result} />
        <p className="body2">
          You're <span className="display3">{result}</span>
          <span className="display4">%</span> aligned
          <br /> with {dataSource}
        </p>
      </button>

      {toggleExplanation && (
        <div className={styles.explanation}>{explaination}</div>
      )}
    </div>
  );
};

export default Result;
