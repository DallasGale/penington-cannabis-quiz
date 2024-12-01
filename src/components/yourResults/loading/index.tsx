import styles from "./styles.module.scss";
import Logo from "../../../assets/identity/logo-white.svg";

const Loading = () => {
  return (
    <div className={styles.container}>
      <a href="/" className={styles.logo}>
        <img className={styles.logo} src={Logo.src} alt="Penington Institute" />
      </a>
      <div className={styles.textGroup}>
        <p className={styles.paragraph}>
          Did you know that most Victorians think it’s time for safe cannabis
          regulation?.
        </p>

        <small>Loading...</small>
      </div>
    </div>
  );
};

export default Loading;
