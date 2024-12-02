import React from "react";
import { motion } from "motion/react";
import styles from "./styles.module.scss";
interface RevealResultProps {
  result: number;
}
const RevealResult = ({ result }: RevealResultProps) => {
  return (
    <div className={styles.revealContainer}>
      <motion.div
        className={styles.number}
        initial={{ y: 0 }}
        animate={{ y: "-100%" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <span className="display3">00</span>
      </motion.div>
      <motion.div
        className={styles.number}
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <span className="display3"> {result}</span>
      </motion.div>
    </div>
  );
};

export default RevealResult;
