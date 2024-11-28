import { useEffect, useState } from "react";
import { checkAgeVerification } from "../../utils/verification";

export const ProtectedContent: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    const verified = checkAgeVerification();
    setIsVerified(verified);

    // Also listen for storage changes
    const handleStorageChange = () => {
      const verified = checkAgeVerification();
      setIsVerified(verified);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  if (!isVerified) {
    return null;
  }

  return <>{children}</>;
};
