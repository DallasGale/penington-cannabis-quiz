import btnStyles from "../styles.module.scss";
import styles from "./styles.module.scss";
import type { ButtonTypes } from "../types";

const SecondaryCta = ({
  isLink,
  link,
  label,
  onClick,
  modifier,
}: ButtonTypes) => {
  if (isLink) {
    return (
      <a
        href={link}
        className={`btn ${btnStyles.btnLabel} ${styles.btnLabel}  ${styles.btnSecondary} ${modifier ? modifier : ""}`}
      >
        {label}
      </a>
    );
  }
  return (
    <button
      onClick={onClick}
      className={` ${styles.btn} ${btnStyles.btnLabel} ${styles.btnLabel}  ${btnStyles.btnSecondary} ${modifier ? modifier : ""}`}
    >
      {label}
    </button>
  );
};

export default SecondaryCta;
