// src/middleware/LocationGuard.tsx
import LocationGuardModal from "../modals/locationGuard";
import React, { useEffect, useState } from "react";
import Loading from "../yourResults/loading";

interface LocationGuardProps {
  children: React.ReactNode;
}

const LocationGuard: React.FC<LocationGuardProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAllowed, setIsAllowed] = useState(false);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const checkLocation = async () => {
      try {
        // Using a free IP geolocation service - replace with your preferred provider
        const response = await fetch("https://ipapi.co/json/");
        const data = await response.json();

        const isAustralia = data.country_code === "AU";

        console.log({ data, isAustralia });

        // Additional check for timezone

        setIsAllowed(isAustralia);
        if (!isAustralia) {
          setError("This content is only available inAustralia");
        }
      } catch (err) {
        setError("Unable to verify your location. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    checkLocation();
  }, []);

  // function updateButtonVisibility() {
  //   const getStartedWrapper = document.getElementById("get-started");
  //   const ageVerified = localStorage.getItem("ageVerified");
  //   if (ageVerified === "true") {
  //     console.log("ageVerified", "remove invisible");
  //     getStartedWrapper?.classList.remove("invisible");
  //     getStartedWrapper?.classList.add("visible");
  //   } else {
  //     getStartedWrapper?.classList.remove("visible");
  //     getStartedWrapper?.classList.add("invisible");
  //   }
  // }

  // useEffect(() => {
  //   if (!isLoading) {
  //     updateButtonVisibility();
  //     window.addEventListener("cookieAccepted", updateButtonVisibility);
  //     window.addEventListener("storage", updateButtonVisibility);
  //   }
  // }, [isLoading]);

  if (isLoading) {
    return <Loading />;
  }

  if (!isAllowed) {
    return <LocationGuardModal />;
  }

  return <>{children}</>;
};

export default LocationGuard;
