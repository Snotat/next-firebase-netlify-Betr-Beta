import CookieConsent from "react-cookie-consent";
import Cookies from "js-cookie";
import logger from "@/logger";

const CookieBanner = () => {
  const handleAccept = () => {
    Cookies.set("Cookies", "accepted", { expires: 365 });
    logger.info("cookies accepted");
  };
  return (
    <CookieConsent
      onAccept={handleAccept}
      location="bottom"
      buttonText="Accept"
      cookieName="Cookies"
    >
      This Website uses cookies to enhance user experience
    </CookieConsent>
  );
};

export default CookieBanner;
