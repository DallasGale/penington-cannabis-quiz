import { useState } from "react";
import PrimaryCta from "../../buttons/primaryCta";
import styles from "./styles.module.scss";
import { AnimatePresence, motion } from "motion/react";
import type { Comparison } from "../../../data/quiz";
interface QuestionAnswerProps {
  question: string;
  answer: string;
  ifYes: Comparison;
  ifNo: Comparison;
  id: number;
  handleAnswerClick: (id: number, value: string) => void;
  setNextQuestion: (id: number) => void;
}

const scale = 0.8;
const QuestionAnswer = ({
  question,
  answer,
  handleAnswerClick,
  id,
  setNextQuestion,
  ifYes,
  ifNo,
}: QuestionAnswerProps) => {
  const [questionAnswered, setQuestionAnswered] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [isExiting, setIsExiting] = useState(false);

  const handleClick = (id: number, answer: "yes" | "no") => {
    setQuestionAnswered(true);
    setSelectedAnswer(answer);
    handleAnswerClick(id, answer);
  };

  const handleNextQuestion = (id: number, value: string) => {
    setNextQuestion(id);
  };
  const questionVariants = {
    hidden: {
      y: "50%",
      scale: 1,
      opacity: 0,
      transformOrigin: "top",
      transition: { type: "spring", bounce: 0.25, duration: 0.8 },
    },
    unanswered: {
      y: "50%",
      scale: 1,
      opacity: 1,
      transformOrigin: "top",
      transition: {
        type: "spring",
        bounce: 0.25,
        duration: 0.8,
      },
    },
    answered: {
      scale,
      y: "0%",
      opacity: 0.5,
      transformOrigin: "top",
      transition: { type: "spring", bounce: 0.25, duration: 0.8 },
    },
    exit: {
      scale,
      y: "0%",
      opacity: 0.5,
      transformOrigin: "top",
      transition: { type: "spring", bounce: 0.25, duration: 0.8 },
    },
  };
  const answerVariants = {
    hidden: {
      // scale,
      x: selectedAnswer === "yes" ? "-100%" : "100%",
      opacity: 0,
    },
    visible: {
      x: 0,
      // scale,
      opacity: 1,
      transition: {
        type: "spring",
        bounce: 0.25,
        duration: 0.8,
        delay: 0.5,
        ease: [0, 0.71, 0.2, 1.01],
      },
    },
    exit: {
      // scale,
      x: "-100%",
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
  };
  return (
    <>
      <div className={styles.question}>
        <AnimatePresence mode="wait">
          <motion.div
            key={id} // Add key to ensure proper animation
            variants={questionVariants}
            animate={questionAnswered ? "answered" : "unanswered"}
            initial="hidden"
            exit="exit"
            className={styles.question}
          >
            <h2 className="display2">{question}</h2>
          </motion.div>
        </AnimatePresence>
        <AnimatePresence mode="wait">
          {questionAnswered && (
            <motion.div
              variants={answerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <h3 className="display3">
                {selectedAnswer === "yes" ? ifYes.answer : ifNo.answer}
              </h3>
              <br />
              <h3
                className="display3"
                dangerouslySetInnerHTML={{ __html: answer }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {questionAnswered && !isExiting ? (
        <div className={`${styles.buttonGroup} ${styles.buttonGroupNext}`}>
          <PrimaryCta
            onClick={() => handleNextQuestion(id, "next")}
            label="Next"
          />
        </div>
      ) : (
        <div className={styles.buttonGroup}>
          <PrimaryCta onClick={() => handleClick(id, "yes")} label="Yes" />
          <PrimaryCta onClick={() => handleClick(id, "no")} label="No" />
        </div>
      )}
    </>
  );
};
export default QuestionAnswer;
