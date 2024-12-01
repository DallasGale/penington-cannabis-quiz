import { Modal } from "react-responsive-modal";
import styles from "./styles.module.scss";
import SecondaryCta from "../buttons/secondaryCta";

interface AboutModalProps {
  open: boolean;
  handleOnClick: () => void;
}
const AboutModal = ({ open, handleOnClick }: AboutModalProps) => {
  return (
    <Modal
      classNames={{ modal: `${styles.modal} ${styles.aboutModal}` }}
      center
      open={open}
      onClose={handleOnClick}
      closeOnEsc={true}
      closeOnOverlayClick={true}
    >
      <div className={styles.modalContent}>
        <h2 className="display3 color-primary">About Us</h2>
        <div style={{ textAlign: "left" }}>
          <p className="body4 color-primary">
            Penington Institute is an independent drug policy non-profit. We are
            seeking engagement from the community about views on cannabis
            regulation as we develop a regulatory framework for safe adult-use
            cannabis access in Victoria.
          </p>
        </div>
        <div className={`${styles.ctaGroup} ${styles.aboutCtaGroup}`}>
          <SecondaryCta label="Got it" onClick={handleOnClick} />
        </div>
      </div>
    </Modal>
  );
};

export default AboutModal;
