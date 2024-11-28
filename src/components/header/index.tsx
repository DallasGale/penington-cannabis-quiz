import SmallCta from "../buttons/smallCta";
import Logo from "../../assets/identity/logo-white.svg";
import styles from "./styles.module.scss";
import AboutModal from "../modals/about";
import { useState } from "react";

const Header = () => {
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
          <SmallCta label="About us" onClick={handleAboutClick} />
        </div>
      </header>
      <AboutModal
        open={toggleAbout}
        handleOnClick={() => setToggleAbout(!toggleAbout)}
      />
    </>
  );
};

export default Header;
