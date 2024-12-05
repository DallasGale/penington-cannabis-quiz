import React, { useEffect } from "react";
import { Modal } from "react-responsive-modal";
import styles from "../styles.module.scss";

const LocationGuardModal = () => {
  return (
    <Modal
      open={true}
      onClose={() => {}}
      center
      closeOnEsc={false}
      closeOnOverlayClick={false}
    >
      <div className={styles.modalContent}>
        <h2 className="display3 color-primary">Sorry!</h2>
        <p className="body4 color-primary">
          This website is currently available to Australian residents only.
          <br />
          We apologise for the inconvenience.
        </p>
      </div>
    </Modal>
  );
};

export default LocationGuardModal;
