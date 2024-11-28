import { Modal } from "react-responsive-modal";
import styles from "./styles.module.scss";
import ModalCta from "../buttons/modalCta";
import { useEffect, useState } from "react";
import CookieModal from "./cookie";

const localStorage = window.localStorage;
const AgeModal = () => {
  function ageVerified() {
    const ageVerified = localStorage.getItem("ageVerified") === "true";
    if (ageVerified) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }

  useEffect(() => {
    ageVerified();
  }, []);

  const [open, setOpen] = useState(false);
  const handleRedirect = () => {
    setOpen(false);
    window.location.href = "https://www.penington.org.au/";
  };

  // if yes is clicked, save to local storage
  const handleYes = () => {
    setOpen(false);
    localStorage.setItem("ageVerified", "true");
    setTimeout(() => {
      setCookieOpen(true);
    }, 800);

    // not sure if we should be disabling the modal once the user clicks yes.
  };

  const [cookieOpen, setCookieOpen] = useState(false);
  const handleCookieAccept = () => {
    setCookieOpen(false);
    localStorage.setItem("cookieAccepted", "true");
    const event = new CustomEvent("cookieAccepted", {
      detail: { status: true },
    });
    window.dispatchEvent(event);
  };

  return (
    <>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        center
        closeOnEsc={false}
        closeOnOverlayClick={false}
      >
        <div className={styles.modalContent}>
          <h2 className="display3 color-primary">Are you over 18?</h2>
          <div className={styles.ctaGroup}>
            <ModalCta label="Yes" onClick={handleYes} />
            <ModalCta label="No" onClick={handleRedirect} />
          </div>
        </div>
      </Modal>

      {localStorage.getItem("cookieAccepted") !== "true" && (
        <CookieModal
          open={cookieOpen}
          onClose={() => setCookieOpen(false)}
          handleCtaClick={handleCookieAccept}
        />
      )}
    </>
  );
};

export default AgeModal;
