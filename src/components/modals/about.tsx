import { Modal } from "react-responsive-modal";
import styles from "./styles.module.scss";
import ModalCta from "../buttons/modalCta";
import { useRef, useState } from "react";
import { useIsMobile } from "../../hooks/useIsMobile";

interface AboutModalProps {
  open: boolean;
  handleOnClick: () => void;
}
const AboutModal = ({ open, handleOnClick }: AboutModalProps) => {
  const myRef = useRef(null);

  const isMobile = useIsMobile();

  return (
    <>
      {isMobile && <div className="about-modal-container" ref={myRef} />}

      <Modal
        classNames={{ modal: styles.modal }}
        center={!isMobile}
        open={open}
        onClose={handleOnClick}
        closeOnEsc={true}
        closeOnOverlayClick={true}
        container={myRef.current}
      >
        <div className={styles.modalContent}>
          <h2 className="display3 color-primary">About Us</h2>
          <div style={{ textAlign: "left" }}>
            <p className="body color-primary">
              Penington Institute is an independent drug policy non-profit. We
              are seeking engagement from the community about views on cannabis
              regulation as we develop a regulatory framework for safe adult-use
              cannabis access in Victoria.
            </p>
          </div>
          <div className={styles.ctaGroup}>
            <ModalCta label="Got it" onClick={handleOnClick} />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default AboutModal;
