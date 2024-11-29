import btnStyles from "../styles.module.scss";
import styles from "./styles.module.scss";
import type { ButtonTypes } from "../types";

const SecondaryCta = ({ type, isLink, link, label, onClick }: ButtonTypes) => {
  if (isLink) {
    return (
      <a
        href={link}
        className={`btn ${btnStyles.btnLabel} ${styles.btnLabel}  ${styles.btnSecondary}`}
      >
        <span>{label}</span>
      </a>
    );
  }
  return (
    <button
      type={type || "button"}
      onClick={onClick}
      className={`${btnStyles.btnLabel} ${btnStyles.btn} ${styles.btnLabel} ${styles.btnSecondary}`}
    >
      <span>{label}</span>
    </button>
  );
};

export default SecondaryCta;
