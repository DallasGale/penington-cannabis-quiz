import styles from "./styles.module.scss";
interface CirclesProps {
  result: number;
}
const Circles = ({ result }: CirclesProps) => {
  return (
    <div className={styles.container}>
      <div
        className={styles.circle}
        style={{ transform: `translateX(${result / 2}%)` }}
      ></div>
      <div
        className={styles.circle}
        style={{ transform: `translateX(-${result / 2}%)` }}
      />
    </div>
  );
};
export default Circles;
