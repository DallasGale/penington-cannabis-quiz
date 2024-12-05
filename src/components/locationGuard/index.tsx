// src/middleware/LocationGuard.tsx
import LocationGuardModal from "../modals/locationGuard";
import React, { useEffect, useState } from "react";

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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!isAllowed) {
    return <LocationGuardModal />;
  }

  return <>{children}</>;
};

export default LocationGuard;
