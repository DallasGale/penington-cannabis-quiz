import { useEffect, useState } from "react";

export const useIsSmallMobile = () => {
  const [isSmallMobile, setIsSmallMobile] = useState(false);
  useEffect(() => {
    const checkDevice = () => {
      setIsSmallMobile(window.innerWidth < 400);
    };

    // Initial check
    checkDevice();

    // Add resize listener
    window.addEventListener("resize", checkDevice);

    // Cleanup
    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  return isSmallMobile;
};
