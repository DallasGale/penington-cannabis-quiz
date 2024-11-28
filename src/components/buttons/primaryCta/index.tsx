import btnStyles from "../styles.module.scss";
import styles from "./styles.module.scss";
import type { ButtonTypes } from "../types";

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
      <a
        href={link}
        className={`btn ${btnStyles.btnLabel} ${styles.btnLabel} ${styles.btnPrimary} ${modifier ? modifier : ""}`}
      >
        {label}
      </a>
    );
  }
  return (
    <button
      type={type || "button"}
      onClick={onClick}
      className={`${btnStyles.btnLabel}${btnStyles.btn} ${styles.btnLabel}  ${styles.btnPrimary} ${modifier ? modifier : ""}`}
    >
      {label}
    </button>
  );
};

export default PrimaryCta;
