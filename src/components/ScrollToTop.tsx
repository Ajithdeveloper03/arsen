import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // This resets the window scroll to the very top
    window.scrollTo(0, 0);
  }, [pathname]); // Runs every time the path changes

  return null;
};

export default ScrollToTop;