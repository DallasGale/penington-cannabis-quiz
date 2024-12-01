import Logo from "../../assets/identity/logo-white.svg";
import styles from "./styles.module.scss";
import AboutModal from "../modals/about";
import { useState } from "react";
import DonateCta from "../buttons/donateCta";
import { useIsDesktop } from "../../hooks/useIsDesktop";
import SmallCta from "../buttons/smallCta";
import { useIsTablet } from "@/hooks/useIsTablet";

const ResultsHeader = () => {
  const [toggleAbout, setToggleAbout] = useState(false);
  const handleAboutClick = () => {
    setToggleAbout(true);
  };

  const isTablet = useIsTablet();
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
          <DonateCta
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
