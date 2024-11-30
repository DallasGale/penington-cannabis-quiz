import { useState } from "react";
import PrimaryCta from "../../buttons/primaryCta";
import styles from "./styles.module.scss";
import { AnimatePresence, motion } from "motion/react";
import type { Comparison } from "../../../data/quiz";
import { useIsSmallMobile } from "@/hooks/useIsSmallMobile";
import { useIsDesktop } from "@/hooks/useIsDesktop";
import { useIsTablet } from "@/hooks/useIsTablet";
interface QuestionAnswerProps {
  question: string;
  answer: string;
  ifYes: Comparison;
  ifNo: Comparison;
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
  ifYes,
  ifNo,
}: QuestionAnswerProps) => {
  const isDesktop = useIsDesktop();
  const isSmallMobile = useIsSmallMobile();
  const scale = isDesktop ? 0.8 : isSmallMobile ? 0.7 : 0.85;

  console.log({ isDesktop, scale });
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
      y: "0%",
      scale: 1,
      opacity: 0,
      transformOrigin: isDesktop ? "bottom" : isSmallMobile ? "top" : "bottom",
      transition: { type: "spring", bounce: 0.25, duration: 0.8 },
    },
    unanswered: {
      y: "0%",
      scale: 1,
      opacity: 1,
      transformOrigin: isDesktop ? "bottom" : isSmallMobile ? "top" : "bottom",
      transition: {
        type: "spring",
        bounce: 0.25,
        duration: 0.8,
      },
    },
    answered: {
      top: 150,
      y: "0%", // Define the animation as a sequence
      scale: [1, scale],
      opacity: [1, 0.5],
      transformOrigin: isDesktop ? "bottom" : isSmallMobile ? "top" : "bottom",
      transition: {
        duration: 0.8,
        times: [0, 1], // Corresponding times for each keyframe
        ease: "easeInOut",
      },
    },
    exit: {
      top: 150,
      scale,
      y: "0%",
      opacity: 0.5,
      transformOrigin: "bottom",
      transition: {
        type: "spring",
        bounce: 0.25,
        duration: 0.8,
      },
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

  const wordVariants = {
    hidden: { opacity: 0, x: -5 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        bounce: 0.25,
        delay: i * 0.15,
        duration: 2.0,
        ease: [0, 0.71, 0.2, 1.01],
      },
    }),
  };
  const words = question.split(" ");

  return (
    <>
      <div className={styles.questions}>
        <AnimatePresence mode="wait">
          <motion.div
            key={id} // Add key to ensure proper animation
            variants={questionVariants}
            animate={questionAnswered ? "answered" : "unanswered"}
            initial="hidden"
            exit="exit"
            className={styles.question}
          >
            <h2 className={styles.questionFont}>
              {words.map((word, i) => (
                <motion.span
                  key={i}
                  custom={i}
                  variants={wordVariants}
                  initial="hidden"
                  animate="visible"
                  style={{ display: "inline-block", marginRight: "0.25em" }}
                >
                  {word}
                </motion.span>
              ))}
            </h2>
            {!questionAnswered && (
              <div
                className={`${styles.buttonGroup} ${styles.buttonGroupYesNo}`}
              >
                <PrimaryCta
                  onClick={() => handleClick(id, "yes")}
                  label="Yes"
                />
                <PrimaryCta onClick={() => handleClick(id, "no")} label="No" />
              </div>
            )}
          </motion.div>
        </AnimatePresence>
        <AnimatePresence mode="wait">
          {questionAnswered && (
            <motion.div
              variants={answerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className={styles.answer}
            >
              <h3 className={styles.answerFont}>
                {selectedAnswer === "yes" ? ifYes.answer : ifNo.answer}
              </h3>
              <h3
                className={styles.answerFont}
                dangerouslySetInnerHTML={{ __html: answer }}
              />
            </motion.div>
          )}
        </AnimatePresence>
        {
          questionAnswered && !isExiting ? (
            <div className={`${styles.buttonGroup} ${styles.buttonGroupNext}`}>
              <PrimaryCta
                onClick={() => handleNextQuestion(id, "next")}
                label="Next"
              />
            </div>
          ) : null
          // <div className={`${styles.buttonGroup} ${styles.buttonGroupYesNo}`}>
          //   <PrimaryCta onClick={() => handleClick(id, "yes")} label="Yes" />
          //   <PrimaryCta onClick={() => handleClick(id, "no")} label="No" />
          // </div>
        }
      </div>
    </>
  );
};
export default QuestionAnswer;
