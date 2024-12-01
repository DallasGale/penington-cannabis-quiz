import { Modal } from "react-responsive-modal";
import styles from "./styles.module.scss";
import { useEffect, useState } from "react";
import CookieModal from "./cookie";
import { useAgeVerification } from "../../hooks/useAgeVerification";
import SecondaryCta from "../buttons/secondaryCta";

const AgeModal = () => {
  const { isVerified, setVerified } = useAgeVerification();
  const [open, setOpen] = useState(false);
  const [cookieOpen, setCookieOpen] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      if (!isVerified) {
        const params = new URLSearchParams(window.location.search);
        if (params.get("restricted") === "true" || !isVerified) {
          setOpen(true);
        }
      } else {
        setOpen(false);
      }
    }, 2250);
    // ), 2000);
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

  const handleCookieAccept = (e: string) => {
    localStorage.setItem("cookieAccepted", e);
    setCookieOpen(false);
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
            <SecondaryCta label="Yes" onClick={handleYes} />
            <SecondaryCta label="No" onClick={handleRedirect} />
          </div>
        </div>
      </Modal>

      <CookieModal
        open={cookieOpen && localStorage.getItem("cookieAccepted") !== "true"}
        onClose={() => setCookieOpen(false)}
        handleCtaClick={(e) => handleCookieAccept(e)}
      />
    </>
  );
};

export default AgeModal;
