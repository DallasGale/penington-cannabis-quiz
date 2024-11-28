import btnStyles from "../styles.module.scss";
import styles from "./styles.module.scss";
import type { ButtonTypes } from "../types";

const DonateCta = ({ isLink, link, label, onClick }: ButtonTypes) => {
  if (isLink) {
    return (
      <a
        href={link}
        className={`btn ${btnStyles.btnLabel} ${styles.btnLabel} ${styles.btnDonate} `}
      >
        {label}
      </a>
    );
  }
  return (
    <button
      onClick={onClick}
      className={`${btnStyles.btn} ${btnStyles.btnLabel} ${styles.btnLabel}  ${styles.btnDonate}`}
    >
      {label}
    </button>
  );
};

export default DonateCta;
