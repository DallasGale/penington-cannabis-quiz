import { useState } from "react";
import styles from "./styles.module.scss";
import Circles from "../circles";
import { useIsTablet } from "../../../hooks/useIsTablet";
import { Accordion, AccordionItem } from "@nextui-org/accordion";
import Chevron from "../../../assets/icons/chevron.svg";
import RevealResult from "./revealResult";

interface ResultProps {
  result: number;
  dataSource: string;
  explaination: string;
  showReveal?: boolean;
}

const Result = ({
  result,
  dataSource,
  explaination,
  showReveal,
}: ResultProps) => {
  const isTablet = useIsTablet();
  return (
    <div className={styles.container}>
      {isTablet && (
        <Accordion>
          <AccordionItem
            indicator={<img src={Chevron.src} className={styles.indicator} />}
            key="1"
            aria-label="Accordion 1"
            className={styles.mobileAccordion}
            startContent={
              <div className={styles.button}>
                <Circles result={result} />
                <p className={`body2 ${styles.body2}`}>
                  You're {showReveal ? <RevealResult result={result} /> : null}
                  <span className="display4">% </span> aligned
                  <br />{" "}
                  {dataSource === "Penington"
                    ? "with  Penington's approach"
                    : "to other Victorians"}
                </p>
              </div>
            }
          >
            <p className="body3">{explaination}</p>
          </AccordionItem>
        </Accordion>
      )}

      {!isTablet && (
        <>
          <div className={styles.button}>
            <Circles result={result} />
            <p className="body2">
              You're {showReveal ? <RevealResult result={result} /> : null}
              <span className="display4">% </span> aligned
              <br />{" "}
              {dataSource === "Penington"
                ? "with  Penington's approach"
                : "to other Victorians"}
            </p>
          </div>
          <Accordion style={{ position: "relative" }}>
            <AccordionItem
              key="1"
              indicator={<img src={Chevron.src} className={styles.indicator} />}
              aria-label="Learn more"
              title="Learn More"
              className={styles.desktopAccordion}
            >
              <p className="body3">{explaination}</p>
            </AccordionItem>
          </Accordion>
        </>
      )}
    </div>
  );
};

export default Result;
