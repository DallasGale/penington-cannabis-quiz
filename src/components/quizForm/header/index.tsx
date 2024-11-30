import Logo from "../../../assets/identity/logo-white.svg";
import styles from "./styles.module.scss";

const Header = () => {
  return (
    <header className={styles.container}>
      <a href="/" className={styles.logo}>
        <img className={styles.logo} src={Logo.src} alt="Penington Institute" />
      </a>
    </header>
  );
};

export default Header;
