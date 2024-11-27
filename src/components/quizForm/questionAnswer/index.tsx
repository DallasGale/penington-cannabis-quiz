import { useState } from "react";
import PrimaryCta from "../../buttons/primaryCta";
import styles from "./styles.module.scss";

interface QuestionAnswerProps {
  question: string;
  answer: string;
  id: number;
  handleAnswerClick: (id: number, value: string) => void;
  setNextQuestion: (id: number) => void;
}

const QuestionAnswer = ({
  question,
  answer,
  handleAnswerClick,
  id,
  setNextQuestion,
}: QuestionAnswerProps) => {
  const [questionAnswered, setQuestionAnswered] = useState(false);

  const handleClick = (id: number, answer: "yes" | "no") => {
    setQuestionAnswered(true);
    () => handleAnswerClick(id, answer);
  };

  const handleNextQuestion = (id: number, value: string) => {
    setQuestionAnswered(false);
    setNextQuestion(id + 1);
  };
  return (
    <div className="question">
      <div
        className={`${questionAnswered ? styles.answered : styles.unAnswered}`}
      >
        <h2 className="display2">{question}</h2>
      </div>

      {questionAnswered ? (
        <>
          <h3
            className="display3"
            dangerouslySetInnerHTML={{ __html: answer }}
          />
          <div className={styles.buttonGroup}>
            <PrimaryCta
              onClick={() => handleNextQuestion(id, "next")}
              label="Next"
            />
          </div>
        </>
      ) : (
        <div className={styles.buttonGroup}>
          <PrimaryCta onClick={() => handleClick(id, "yes")} label="Yes" />
          <PrimaryCta onClick={() => handleClick(id, "no")} label="No" />
        </div>
      )}
    </div>
  );
};
export default QuestionAnswer;
