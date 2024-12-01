import Logo from "../../assets/identity/logo-white.svg";
import styles from "./styles.module.scss";

import SmallCta from "../buttons/smallCta";

const DonateHeader = () => {
  return (
    <header className={styles.container}>
      <a href="/" className={styles.logo}>
        <img className={styles.logo} src={Logo.src} alt="Penington Institute" />
      </a>
      <div className={styles.ctaWrapper}>
        <SmallCta
          isLink
          link="/our-approach"
          modifier={styles.supportCta}
          label="Read about our approach"
        />
      </div>
    </header>
  );
};

export default DonateHeader;
