import Logo from "../../assets/identity/logo-black.svg";
import styles from "./styles.module.scss";
import AboutModal from "../modals/about";
import { useState } from "react";
import DonateCta from "../buttons/donateCta";
import SmallCta from "../buttons/smallCta";
import { useIsTablet } from "@/hooks/useIsTablet";

const ApproachHeader = () => {
  const [toggleAbout, setToggleAbout] = useState(false);
  const handleAboutClick = () => {
    setToggleAbout(true);
  };

  return (
    <header className={styles.container}>
      <a href="/" className={styles.logo}>
        <img className={styles.logo} src={Logo.src} alt="Penington Institute" />
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
  );
};

export default ApproachHeader;
