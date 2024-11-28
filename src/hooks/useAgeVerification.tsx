import { useState, useEffect } from "react";

export const useAgeVerification = () => {
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    const checkVerification = () => {
      const ageVerified = localStorage.getItem("ageVerified") === "true";
      setIsVerified(ageVerified);
    };

    // Initial check
    checkVerification();

    // Listen for changes
    window.addEventListener("storage", checkVerification);

    return () => {
      window.removeEventListener("storage", checkVerification);
    };
  }, []);

  const setVerified = () => {
    localStorage.setItem("ageVerified", "true");
    setIsVerified(true);
  };

  return {
    isVerified,
    setVerified,
  };
};
