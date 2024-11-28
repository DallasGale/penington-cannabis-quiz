export const checkAgeVerification = () => {
  const isVerified = localStorage.getItem("ageVerified") === "true";
  if (!isVerified) {
    window.location.replace("/?restricted=true");
    return false;
  }
  return true;
};
