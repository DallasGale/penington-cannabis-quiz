import { Modal } from "react-responsive-modal";
import modalStyles from "../styles.module.scss";
import { useRef } from "react";
import SecondaryCta from "../../buttons/secondaryCta";
import styles from "./styles.module.scss";

interface CookieModalProps {
  open: boolean;
  onClose: () => void;
  handleCtaClick: (action: string) => void;
}
const CookieModal = ({ open, onClose, handleCtaClick }: CookieModalProps) => {
  const myRef = useRef(null);

  return (
    <>
      <div className="cookies-modal-container" ref={myRef} />

      <Modal
        open={open}
        onClose={onClose}
        closeOnEsc={false}
        closeOnOverlayClick={false}
        container={myRef.current}
      >
        <div
          className={`${modalStyles.modalContent} ${styles.cookiesModalContent}`}
        >
          <div className={styles.message}>
            <h2 className={`display3 color-primary ${styles.display3}`}>
              Cookie Settings
            </h2>
            <p className={`smallPrint color-primary ${styles.smallPrint}`}>
              We use cookies to improve your experience on our site with
              personalised content.
            </p>
          </div>
          <div className={`${modalStyles.ctaGroup} ${styles.ctaGroup}`}>
            <SecondaryCta
              label="I'm OK with that"
              onClick={() => handleCtaClick("true")}
            />
            <SecondaryCta
              label="No thanks"
              onClick={() => handleCtaClick("false")}
            />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default CookieModal;
