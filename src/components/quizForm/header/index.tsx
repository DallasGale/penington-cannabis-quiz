import Logo from "../../../assets/identity/logo-white.svg";
import styles from "./styles.module.scss";

interface HeaderProps {
  currentQuestion: number;
  handleGoBack: () => void;
}
const Header = ({ currentQuestion, handleGoBack }: HeaderProps) => {
  return (
    <header className={styles.container}>
      <a href="/" className={styles.logo}>
        <img className={styles.logo} src={Logo.src} alt="Penington Institute" />
      </a>
      {currentQuestion > 1 && (
        <button className={styles.backButton} onClick={handleGoBack}>
          Back
        </button>
      )}
    </header>
  );
};

export default Header;
