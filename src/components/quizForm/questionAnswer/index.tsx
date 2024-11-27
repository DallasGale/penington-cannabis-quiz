import { useState } from "react";
import PrimaryCta from "../../buttons/primaryCta";
import styles from "./styles.module.scss";
import { AnimatePresence, motion } from "motion/react";
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
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [isExiting, setIsExiting] = useState(false);

  const handleClick = (id: number, answer: "yes" | "no") => {
    setQuestionAnswered(true);
    setSelectedAnswer(answer);
    () => handleAnswerClick(id, answer);
  };

  const handleNextQuestion = (id: number, value: string) => {
    setNextQuestion(id);
  };
  const questionVariants = {
    hidden: {
      y: "50%",
      scale: 1,
      opacity: 0,
    },
    unanswered: {
      y: "50%",
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        bounce: 0.25,
        duration: 0.8,
      },
    },
    answered: {
      scale: 0.75,
      y: "0",
      opacity: 0.5,
      transition: { type: "spring", bounce: 0.25, duration: 0.8 },
    },
    exit: {
      scale: 0.75,
      y: "0",
      opacity: 0.5,
      transition: { duration: 0.5 },
    },
  };
  const answerVariants = {
    hidden: {
      scale: 0.75,
      x: selectedAnswer === "yes" ? "-100%" : "100%",
      opacity: 0,
    },
    visible: {
      x: 0,
      scale: 0.75,
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
      scale: 0.75,
      x: "-100%",
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
  };
  return (
    <>
      <div className="question">
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
              <h3
                className="display2"
                dangerouslySetInnerHTML={{ __html: answer }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {questionAnswered && !isExiting ? (
        <div className={styles.buttonGroup}>
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
