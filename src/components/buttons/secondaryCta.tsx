import styles from "./styles.module.scss";
import type { ButtonTypes } from "./types";

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
        className={`btn ${styles.btnLabel}  ${styles.btnSecondary} ${modifier ? modifier : ""}`}
      >
        {label}
      </a>
    );
  }
  return (
    <button
      onClick={onClick}
      className={`${styles.btnLabel} ${styles.btn} ${styles.btnSecondary} ${modifier ? modifier : ""}`}
    >
      {label}
    </button>
  );
};

export default SecondaryCta;
