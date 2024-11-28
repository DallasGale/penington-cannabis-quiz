import Logo from "../../../assets/identity/logo-white.svg";
import styles from "./styles.module.scss";

const Header = () => {
  return (
    <header className={styles.container}>
      <img className={styles.logo} src={Logo.src} alt="Penington Institute" />
    </header>
  );
};

export default Header;
