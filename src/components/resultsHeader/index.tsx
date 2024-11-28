import SecondaryCta from "../buttons/secondaryCta";
import Logo from "../../assets/identity/logo-white.svg";
import styles from "./styles.module.scss";
import AboutModal from "../modals/about";
import { useState } from "react";
import PrimaryCta from "../buttons/primaryCta";

const ResultsHeader = () => {
  const [toggleAbout, setToggleAbout] = useState(false);
  const handleAboutClick = () => {
    setToggleAbout(true);
  };
  return (
    <>
      <header className={styles.container}>
        <a href="/" className={styles.logo}>
          <img
            className={styles.logo}
            src={Logo.src}
            alt="Penington Institute"
          />
        </a>
        <div className={styles.ctaWrapper}>
          <SecondaryCta
            isLink
            link="/quiz"
            modifier={styles.quizCta}
            label="Take the quiz"
            onClick={handleAboutClick}
          />
          <PrimaryCta
            isLink
            link="/donate"
            modifier={styles.supportCta}
            label="Support our work"
            onClick={handleAboutClick}
          />
        </div>
      </header>
      <AboutModal
        open={toggleAbout}
        handleOnClick={() => setToggleAbout(!toggleAbout)}
      />
    </>
  );
};

export default ResultsHeader;
