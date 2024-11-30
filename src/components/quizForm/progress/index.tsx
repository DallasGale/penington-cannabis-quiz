import styles from "./styles.module.scss";

interface ProgressProps {
  currentStep: number;
  steps: number;
  completedQuestions: number[];
  hasAnswered: boolean;
}

const Progress = ({
  currentStep,
  steps,
  completedQuestions,
  hasAnswered,
}: ProgressProps) => {
  const getStepClass = (index: number) => {
    // Add 1 to index since steps are 1-based in your quiz
    const stepNumber = index + 1;

    if (completedQuestions.includes(stepNumber)) {
      return styles.completedStep; // Fully filled
    } else if (stepNumber === currentStep && hasAnswered) {
      return styles.halfStep; // Half filled for current step
    }
    return ""; // Empty for future steps
  };
  return (
    <div className={styles.container}>
      <div className={styles.steps}>
        {Array.from({ length: steps }, (_, i) => (
          <div key={i} className={`${styles.step} ${getStepClass(i)}`} />
        ))}
      </div>
    </div>
  );
};

export default Progress;
