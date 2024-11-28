import { useState, useEffect } from "react";

export const useAgeVerification = () => {
  // Initialize state with localStorage value
  const [isVerified, setIsVerified] = useState(() => {
    // Only run this on client side
    if (typeof window !== "undefined") {
      return localStorage.getItem("ageVerified") === "true";
    }
    return false;
  });

  const setVerified = () => {
    localStorage.setItem("ageVerified", "true");
    setIsVerified(true);
  };

  return {
    isVerified,
    setVerified,
  };
};
