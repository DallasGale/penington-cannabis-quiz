import styles from "./styles.module.scss";
import { motion } from "motion/react";
interface CirclesProps {
  result: number;
}
const Circles = ({ result }: CirclesProps) => {
  const leftCircleVariants = {
    hidden: { x: "50%" },
    initial: { x: "50%" },
    visible: {
      x: `${result / 2}%`,
      transition: {
        type: "spring",
        bounce: 0.5,
        duration: 3,
        ease: [0, 0.71, 0.2, 1.01],
      },
    },
  };

  const rightCircleVariants = {
    hidden: { x: "-50%" },
    initial: { x: "-50%" },
    visible: {
      x: `-${result / 2}%`,
      transition: {
        type: "spring",
        bounce: 0.5,
        duration: 3,
        ease: [0, 0.71, 0.2, 1.01],
      },
    },
  };
  return (
    <div className={styles.container}>
      <motion.div
        variants={leftCircleVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className={styles.circle}
      />
      <motion.div
        variants={rightCircleVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className={styles.circle}
      />
    </div>
  );
};
export default Circles;
