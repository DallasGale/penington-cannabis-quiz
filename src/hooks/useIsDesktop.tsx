import { useEffect, useState } from "react";

export const useIsDesktop = () => {
  const [isDesktop, setIsDesktop] = useState(false);
  // Check if device is mobile on mount and window resize
  useEffect(() => {
    const checkDesktop = () => {
      // console.log("checking");
      setIsDesktop(window.innerWidth > 1200);
    };

    // Initial check
    checkDesktop();

    // Add resize listener
    window.addEventListener("resize", checkDesktop);

    // Cleanup
    return () => window.removeEventListener("resize", checkDesktop);
  }, []);

  return isDesktop;
};
