import styles from "./styles.module.scss";
import type { ButtonTypes } from "./types";

const SecondaryCta = ({ label, onClick, modifier }: ButtonTypes) => {
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
