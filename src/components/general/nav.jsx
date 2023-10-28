/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Navigation from "./navigation";
import MobileNavigation from "./mobileNavigation";

export default function Nav() {
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 767);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 767);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <div>{isMobileView ? <MobileNavigation /> : <Navigation />}</div>;
}
