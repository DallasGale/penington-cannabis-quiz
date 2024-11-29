import { Modal } from "react-responsive-modal";
import styles from "./styles.module.scss";
import ModalCta from "../buttons/modalCta";
import { useRef, useState } from "react";
import SecondaryCta from "../buttons/secondaryCta";

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
        <div className={styles.modalContent}>
          <h2 className="display3 color-primary">Cookie Settings</h2>
          <p className="small-print color-primary">
            We use cookies to improve your experience on our site with
            personalised content.
          </p>
          <div className={styles.ctaGroup}>
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
