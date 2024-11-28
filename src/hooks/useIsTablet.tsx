import { useEffect, useState } from "react";

export const useIsTablet = () => {
  const [isTablet, setIsTablet] = useState(false);
  // Check if device is tablet on mount and window resize
  useEffect(() => {
    const checkTablet = () => {
      // console.log("checking");
      setIsTablet(window.innerWidth < 768);
    };

    // Initial check
    checkTablet();

    // Add resize listener
    window.addEventListener("resize", checkTablet);

    // Cleanup
    return () => window.removeEventListener("resize", checkTablet);
  }, []);

  return isTablet;
};
