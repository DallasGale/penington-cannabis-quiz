import btnStyles from "../styles.module.scss";
import styles from "./styles.module.scss";
import type { ButtonTypes } from "../types";

const SmallCta = ({ isLink, link, label, onClick, modifier }: ButtonTypes) => {
  if (isLink) {
    return (
      <a
        href={link}
        className={`btn ${btnStyles.btnLabel} ${styles.btnLabel} ${styles.btnSmall} `}
      >
        {label}
      </a>
    );
  }
  return (
    <button
      onClick={onClick}
      className={`${btnStyles.btn} ${btnStyles.btnLabel} ${styles.btnLabel}  ${styles.btnSmall}`}
    >
      {label}
    </button>
  );
};

export default SmallCta;
