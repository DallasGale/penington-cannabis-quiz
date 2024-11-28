import { Modal } from "react-responsive-modal";
import styles from "./styles.module.scss";
import ModalCta from "../buttons/modalCta";
import { useEffect, useState } from "react";
import CookieModal from "./cookie";

const localStorage = window.localStorage;
const AgeModal = () => {
  const [open, setOpen] = useState(false);
  const [cookieOpen, setCookieOpen] = useState(false);

  useEffect(() => {
    const ageVerified = localStorage.getItem("ageVerified") === "true";
    setOpen(!ageVerified);
    // ageVerified();
  }, []);

  // function ageVerified() {
  //   if (ageVerified) {
  //   } else {
  //     setOpen(true);
  //   }
  // }

  const handleRedirect = () => {
    setOpen(false);
    window.location.href = "https://www.penington.org.au/";
  };

  // if yes is clicked, save to local storage
  const handleYes = () => {
    localStorage.setItem("ageVerified", "true");
    setOpen(false);

    setTimeout(() => {
      const cookieAccepted = localStorage.getItem("cookieAccepted") === "true";
      if (!cookieAccepted) {
        setCookieOpen(true);
      }
    }, 800);

    // not sure if we should be disabling the modal once the user clicks yes.
  };

  const handleCookieAccept = (e: string) => {
    localStorage.setItem("cookieAccepted", e);
    setCookieOpen(false);
    // Dispatch custom event
    window.dispatchEvent(
      new CustomEvent("cookieAccepted", {
        detail: { status: e === "true" ? true : false },
      }),
    );
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

      <CookieModal
        open={cookieOpen}
        onClose={() => setCookieOpen(false)}
        handleCtaClick={(e) => handleCookieAccept(e)}
      />
    </>
  );
};

export default AgeModal;
