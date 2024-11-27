import styles from "./styles.module.scss";

interface Props {
  label: string;
  onClick?: () => void;
  isLink?: boolean;
  link?: string;
  type?: "button" | "submit" | "reset";
  modifier?: string;
}
const PrimaryCta = ({
  label,
  link,
  onClick,
  isLink = false,
  type,
  modifier,
}: Props) => {
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
