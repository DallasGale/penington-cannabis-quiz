import Clock from "../../../assets/icons/clock.svg";
import { AnimatePresence, delay, motion } from "motion/react";

const title = "Take the cannabis test.";
const para =
  "In 2 minutes you’ll find out how your views on cannabis regulation compare.";

const Titles = () => {
  const titleWords = title.split(" ");
  const paraWords = para.split(" ");
  const titleTotalDuration = (titleWords.length - 1) * 0.15 + 0.45;
  const wordVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        bounce: 0.25,
        delay: i * 0.15,
        duration: 2.0,
        ease: [0, 0.71, 0.2, 1.01],
      },
    }),
  };

  const paraWordVariants = {
    hidden: { opacity: 0, x: -5 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        bounce: 0.25,
        delay: titleTotalDuration + i * 0.08,
        duration: 1.0,
        ease: [0, 0.71, 0.2, 1.01],
      },
    }),
  };

  return (
    <>
      <AnimatePresence mode="wait">
        <h1 className="display1">
          {titleWords.map((word, i) => (
            <motion.span
              key={`${i}${word}`}
              custom={i}
              variants={wordVariants}
              initial="hidden"
              animate="visible"
              style={{ display: "inline-block", marginRight: "0.25em" }}
            >
              {word}
            </motion.span>
          ))}
        </h1>
        <div>
          <img
            src={Clock.src}
            width="24"
            height="24"
            style={{ marginBottom: "12px" }}
          />
          <p className="body">
            {paraWords.map((word, i) => (
              <motion.span
                key={`${i}${word}`}
                custom={i}
                variants={paraWordVariants}
                initial="hidden"
                animate="visible"
                style={{ display: "inline-block", marginRight: "0.25em" }}
              >
                {word}
              </motion.span>
            ))}
          </p>
        </div>
      </AnimatePresence>
    </>
  );
};
export default Titles;
