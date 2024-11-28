import styles from "./styles.module.scss";
import type { ButtonTypes } from "./types";

const PrimaryCta = ({
  label,
  link,
  onClick,
  isLink = false,
  type,
  modifier,
}: ButtonTypes) => {
  if (isLink) {
    return (
      <a href={link} className={`btn ${styles.btnLabel}  ${styles.btnPrimary}`}>
        {label}
      </a>
    );
  }
  return (
    <button
      type={type || "button"}
      onClick={onClick}
      className={`${styles.btnLabel} ${styles.btn} ${styles.btnPrimary} ${modifier ? modifier : ""}`}
    >
      {label}
    </button>
  );
};

export default PrimaryCta;
