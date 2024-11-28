import { Modal } from "react-responsive-modal";
import styles from "./styles.module.scss";
import { useState } from "react";

interface ShareModalProps {
  url: string;
  open: boolean;
  onClose: (open: boolean) => void;
}
const ShareModal = ({ url, open, onClose }: ShareModalProps) => {
  return (
    <>
      <Modal
        open={open}
        onClose={() => onClose(false)}
        center
        closeOnEsc={false}
        closeOnOverlayClick={false}
      >
        <div className={styles.modalContent}>
          <h2 className="display3 color-primary">
            Your results URL link copied.
          </h2>
          <p className="color-primary">{url}</p>
        </div>
      </Modal>
    </>
  );
};

export default ShareModal;
