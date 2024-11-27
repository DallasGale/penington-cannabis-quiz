import styles from "./styles.module.scss";

interface ProgressProps {
  currentStep: number;
  steps: number;
}

const Progress = ({ currentStep, steps }: ProgressProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.steps}>
        {Array.from({ length: steps }, (_, i) => (
          <div
            key={i}
            className={styles.step}
            style={{
              backgroundColor:
                i < currentStep ? "var(--primary10)" : "var(--primary80)",
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Progress;
