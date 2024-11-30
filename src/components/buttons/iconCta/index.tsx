import btnStyles from "../styles.module.scss";
import styles from "./styles.module.scss";
import type { ButtonTypes } from "../types";

const IconCta = ({
  label,
  link,
  onClick,
  isLink = false,
  type,
  icon,
}: ButtonTypes) => {
  if (isLink) {
    return (
      <a
        download
        href={link}
        className={`btn ${btnStyles.btnLabel} ${styles.btnLabel} ${styles.btnIcon}`}
      >
        <span className={styles.icon}>
          <img src={icon} />
        </span>
        <span>{label}</span>
      </a>
    );
  }
  return (
    <button
      type={type || "button"}
      onClick={onClick}
      className={`${btnStyles.btnLabel} ${btnStyles.btn} ${styles.btnLabel} ${styles.btnIcon}`}
    >
      <span className={styles.icon}>
        <img src={icon} />
      </span>
      <span>{label}</span>
    </button>
  );
};

export default IconCta;
