import { useEffect } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  const navType = useNavigationType();

  useEffect(() => {
    // This resets the window scroll to the top
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant", // Use "smooth" if you prefer an animated scroll
    });
  }, [pathname, navType]); // Runs on path change OR any navigation action

  return null;
};

export default ScrollToTop;