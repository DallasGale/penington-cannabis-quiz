import { useState } from "react";
import styles from "./styles.module.scss";
import Circles from "../circles";
import { useIsTablet } from "../../../hooks/useIsTablet";
import { Accordion, AccordionItem } from "@nextui-org/accordion";

interface ResultProps {
  result: number;
  dataSource: string;
  explaination: string;
}

const Result = ({ result, dataSource, explaination }: ResultProps) => {
  const [toggleExplanation, setToggleExplanation] = useState(false);
  const isTablet = useIsTablet();
  return (
    <div className={styles.container}>
      {isTablet && (
        <Accordion>
          <AccordionItem
            indicator={<div />}
            key="1"
            aria-label="Accordion 1"
            className={styles.mobileAccordion}
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

      {!isTablet && (
        <>
          <div className={styles.button}>
            <Circles result={result} />
            <p className="body2">
              You're <span className="display3">{result}</span>
              <span className="display4">%</span> aligned
              <br /> with {dataSource}
            </p>
          </div>
          <Accordion style={{ position: "relative" }}>
            <AccordionItem
              key="1"
              indicator={<div />}
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
