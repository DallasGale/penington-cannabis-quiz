import styles from "./styles.module.scss";
import Logo from "../../../assets/identity/logo-white.svg";
import LoadAnimation from "../../loadAnimation";

const Loading = () => {
  return (
    <div className={styles.container}>
      <a href="/" className={styles.logo}>
        <img className={styles.logo} src={Logo.src} alt="Penington Institute" />
      </a>
      <div className={styles.textGroup}>
        <div className={styles.label}>
          <small>Loading</small>
          <LoadAnimation />
        </div>
        <p className={styles.paragraph}>
          Did you know that most Victorians think it’s time for safe cannabis
          regulation?
        </p>
      </div>
    </div>
  );
};

export default Loading;
