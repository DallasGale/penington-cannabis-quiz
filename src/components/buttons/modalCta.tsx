import styles from "./styles.module.scss";
import type { ButtonTypes } from "./types";

const ModalCta = ({
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
      className={`${styles.btnLabel} ${styles.btn} ${styles.btnModal} ${modifier ? modifier : ""}`}
    >
      {label}
    </button>
  );
};

export default ModalCta;
