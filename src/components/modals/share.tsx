import { Modal } from "react-responsive-modal";
import styles from "./styles.module.scss";
import { useRef, useState } from "react";
import Placeholder from "../../assets/images/shareImagePlaceholder.png";

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
        <div className={`${styles.modalContent} ${styles.shareModalContent}`}>
          <div
            className={styles.shareImage}
            style={{ background: `url(${Placeholder.src})` }}
          />
          <p className={`color-primary ${styles.body}`}>
            Your results link copied!
          </p>
        </div>
      </Modal>
    </>
  );
};

export default ShareModal;
