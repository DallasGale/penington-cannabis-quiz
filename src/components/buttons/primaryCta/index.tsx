import btnStyles from "../styles.module.scss";
import styles from "./styles.module.scss";
import type { ButtonTypes } from "../types";

const PrimaryCta = ({
  label,
  link,
  onClick,
  isLink = false,
  type,
}: ButtonTypes) => {
  if (isLink) {
    return (
      <a
        href={link}
        className={`btn ${btnStyles.btnLabel} ${styles.btnLabel} ${styles.btnPrimary}`}
      >
        <span>{label}</span>
      </a>
    );
  }
  return (
    <button
      type={type || "button"}
      onClick={onClick}
      className={`${btnStyles.btnLabel} ${btnStyles.btn} ${styles.btnLabel} ${styles.btnPrimary}`}
    >
      <span>{label}</span>
    </button>
  );
};

export default PrimaryCta;
