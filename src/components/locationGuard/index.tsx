// src/middleware/LocationGuard.tsx
import LocationGuardModal from "../modals/locationGuard";
import React, { useEffect, useState } from "react";
import Loading from "../yourResults/loading";
import LoadAnimation from "../loadAnimation";
import { getCachedLocation, type LocationCache } from "@/lib/getCachedLocation";
import { checkRateLimit } from "@/lib/checkRateLimit";

interface LocationGuardProps {
  children: React.ReactNode;
}

const api_key = import.meta.env.NEXT_PUBLIC_IP_WHOIS_API;

const cachDuration = 60;
const maxCallsPerHour = 10;
const LocationGuard: React.FC<LocationGuardProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAllowed, setIsAllowed] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // const setCachedLocation = (isAllowed: boolean) => {
  //   const cache: LocationCache = {
  //     timestamp: Date.now(),
  //     isAllowed,
  //   };
  //   localStorage.setItem("locationCheckCache", JSON.stringify(cache));
  // };

  console.log({ isAllowed });

  useEffect(() => {
    const checkLocation = async () => {
      console.log("Checking location");
      try {
        const cached = getCachedLocation(cachDuration);
        if (cached) {
          console.log("Using cached location");
          setIsAllowed(cached.isAllowed);
          setIsLoading(false);
          return;
        }

        checkRateLimit(maxCallsPerHour);

        // Using a free IP geolocation service - replace with your preferred provider
        const response = await fetch(
          `https://ipwhois.pro/?key=${api_key}&rate=1`,
        );
        // console.log({ response });
        const data = await response.json();
        // console.log({ data });

        if (data.success === false) {
          throw new Error(data.message || "Location check failed");
        }

        const isAustralianUser = data.country_code === "AU";

        console.log({ data, isAustralia: isAustralianUser });

        setCachedLocation(isAustralianUser);
        setIsAllowed(isAustralianUser);

        if (!isAustralianUser) {
          console.log({ data, isAustralia: isAustralianUser });
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

  function updateButtonVisibility() {
    const getStartedWrapper = document.getElementById("get-started");
    const ageVerified = localStorage.getItem("ageVerified");
    if (ageVerified === "true") {
      console.log("ageVerified", "remove invisible");
      getStartedWrapper?.classList.remove("invisible");
      getStartedWrapper?.classList.add("visible");
    } else {
      getStartedWrapper?.classList.remove("visible");
      getStartedWrapper?.classList.add("invisible");
    }
  }

  useEffect(() => {
    if (!isLoading) {
      updateButtonVisibility();
      window.addEventListener("cookieAccepted", updateButtonVisibility);
      window.addEventListener("storage", updateButtonVisibility);
    }
  }, [isLoading]);

  if (isLoading) {
    return <LoadAnimation />;
  }

  if (!isAllowed) {
    return <LocationGuardModal />;
  }

  return <>{children}</>;
};

export default LocationGuard;
