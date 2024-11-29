import { Modal } from "react-responsive-modal";
import styles from "./styles.module.scss";
import { useRef, useState } from "react";

interface ShareModalProps {
  url: string;
  open: boolean;
  onClose: (open: boolean) => void;
}
const ShareModal = ({ url, open, onClose }: ShareModalProps) => {
  const myRef = useRef(null);
  return (
    <>
      <div className="share-modal-container" ref={myRef} />
      <Modal
        open={open}
        onClose={() => onClose(false)}
        closeOnEsc={true}
        closeOnOverlayClick={true}
        container={myRef.current}
      >
        <div className={styles.modalContent}>
          <p className="body color-primary">Your results URL link copied.</p>
        </div>
      </Modal>
    </>
  );
};

export default ShareModal;
