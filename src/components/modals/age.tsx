import { Modal } from "react-responsive-modal";
import styles from "./styles.module.scss";
import ModalCta from "../buttons/modalCta";
import { useEffect, useState } from "react";
import CookieModal from "./cookie";
import { useAgeVerification } from "../../hooks/useAgeVerification";

const AgeModal = () => {
  const { isVerified, setVerified } = useAgeVerification();
  const [open, setOpen] = useState(false);
  const [cookieOpen, setCookieOpen] = useState(false);

  useEffect(() => {
    // Check URL for restricted parameter
    const params = new URLSearchParams(window.location.search);
    if (params.get("restricted") === "true" && !isVerified) {
      setOpen(true);
    } else if (!isVerified) {
      setOpen(true);
    }
  }, [isVerified]);

  const handleRedirect = () => {
    setOpen(false);
    window.location.href = "https://www.penington.org.au/";
  };

  // if yes is clicked, save to local storage
  const handleYes = () => {
    setVerified();
    setOpen(false);

    // Remove restricted parameter from URL
    const url = new URL(window.location.href);
    url.searchParams.delete("restricted");
    window.history.replaceState({}, "", url);

    setTimeout(() => {
      const cookieAccepted = localStorage.getItem("cookieAccepted") === "true";
      if (!cookieAccepted) {
        setCookieOpen(true);
      }
    }, 800);
  };

  const handleCookieAccept = () => {
    localStorage.setItem("cookieAccepted", "true");
    setCookieOpen(false);
    window.dispatchEvent(
      new CustomEvent("cookieAccepted", { detail: { status: true } }),
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
        open={cookieOpen && localStorage.getItem("cookieAccepted") !== "true"}
        onClose={() => setCookieOpen(false)}
        handleCtaClick={handleCookieAccept}
      />
    </>
  );
};

export default AgeModal;
