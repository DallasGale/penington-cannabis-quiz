import styles from "./styles.module.scss";
import Logo from "../../../assets/identity/logo-white.svg";

interface LoadingProps {
  resultsPage?: boolean;
}
const Loading = ({ resultsPage = true }: LoadingProps) => {
  return (
    <>
      <a href="/" className={styles.logo}>
        <img className={styles.logo} src={Logo.src} alt="Penington Institute" />
      </a>
      <div className={styles.textGroup}>
        <div className={styles.label}>
          <small>Loading</small>
          <div className={styles.loader} />
        </div>
        {resultsPage && (
          <p className={styles.paragraph}>
            Did you know that most Victorians think it’s time for safe cannabis
            regulation?
          </p>
        )}
      </div>
    </>
  );
};

export default Loading;
