import styles from "./styles.module.scss";

interface Props {
  label: string;
  onClick: () => void;
  modifier?: string;
}
const SecondaryCta = ({ label, onClick, modifier }: Props) => {
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
