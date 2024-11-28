import { useState } from "react";
import styles from "./styles.module.scss";
import Circles from "../circles";
import { useIsMobile } from "../../../hooks/useIsMobile";
import { Accordion, AccordionItem } from "@nextui-org/accordion";

interface ResultProps {
  result: number;
  dataSource: string;
  explaination: string;
}

const Result = ({ result, dataSource, explaination }: ResultProps) => {
  const [toggleExplanation, setToggleExplanation] = useState(false);
  const isMobile = useIsMobile();
  return (
    <div className={styles.container}>
      {isMobile && (
        <Accordion
          motionProps={{
            variants: {
              enter: {
                y: 0,
                opacity: 1,
                height: "auto",
                transition: {
                  height: {
                    type: "spring",
                    stiffness: 500,
                    damping: 30,
                    duration: 1,
                  },
                  opacity: {
                    easings: "ease",
                    duration: 1,
                  },
                },
              },
              exit: {
                y: -10,
                opacity: 0,
                height: 0,
                transition: {
                  height: {
                    easings: "ease",
                    duration: 0.25,
                  },
                  opacity: {
                    easings: "ease",
                    duration: 0.3,
                  },
                },
              },
            },
          }}
        >
          <AccordionItem
            indicator={<div />}
            key="1"
            aria-label="Accordion 1"
            className={styles.mobileAccordion}
            // title="Accordion 1"
            startContent={
              <div className={styles.button}>
                <Circles result={result} />
                <p className="body2">
                  You're <span className="display3">{result}</span>
                  <span className="display4">%</span> aligned
                  <br /> with {dataSource}
                </p>
              </div>
            }
          >
            {explaination}
          </AccordionItem>
        </Accordion>
      )}

      {!isMobile && (
        <>
          <div className={styles.button}>
            <Circles result={result} />
            <p className="body2">
              You're <span className="display3">{result}</span>
              <span className="display4">%</span> aligned
              <br /> with {dataSource}
            </p>
          </div>
          <Accordion
            motionProps={{
              variants: {
                enter: {
                  y: 0,
                  opacity: 1,
                  height: "auto",
                  transition: {
                    height: {
                      type: "spring",
                      stiffness: 500,
                      damping: 30,
                      duration: 1,
                    },
                    opacity: {
                      easings: "ease",
                      duration: 1,
                    },
                  },
                },
                exit: {
                  y: -10,
                  opacity: 0,
                  height: 0,
                  transition: {
                    height: {
                      easings: "ease",
                      duration: 0.25,
                    },
                    opacity: {
                      easings: "ease",
                      duration: 0.3,
                    },
                  },
                },
              },
            }}
          >
            <AccordionItem
              key="1"
              indicator={<div />}
              aria-label="Learn more"
              title="Learn More"
              className={styles.desktopAccordion}
            >
              {explaination}
            </AccordionItem>
          </Accordion>
        </>
      )}

      {/*     
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

        {isMobile && (
          <div
            className={`${styles.explanation} ${toggleExplanation ? styles.show : styles.hide}`}
          >
            {explaination}
          </div>
        )}

        {!isMobile && (
          <div
            onClick={() => setToggleExplanation(!toggleExplanation)}
            className={`${styles.desktopExplanation} ${toggleExplanation ? styles.toggled : ""}`}
          >
            <label>Learn More</label>

            <p
              className={`${styles.explanationText} ${toggleExplanation ? "show" : "hide"}`}
            >
              {explaination}
            </p>
          </div>
        )}
      </div> */}
    </div>
  );
};

export default Result;
