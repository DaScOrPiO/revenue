/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { IoIosNotificationsOutline } from "react-icons/io";
import { BiMessageAltDetail } from "react-icons/bi";
import { RxHamburgerMenu } from "react-icons/rx";
import { MdOutlineAnalytics } from "react-icons/md";
import { AiOutlineAppstoreAdd, AiOutlineHome } from "react-icons/ai";
import { BsPeople } from "react-icons/bs";
import { MdOutlinePayments } from "react-icons/md";
import mainStackLogo from "../../assets/mainstack-logo.svg";

export default function Navigation() {
  const [activeNav, setActiveNav] = useState(null);
  const location = useLocation();

  const navData = [
    {
      icon: <AiOutlineHome size="20px" />,
      text: "Home",
      route: "/home",
    },
    {
      icon: <MdOutlineAnalytics size="20px" />,
      text: "Analytics",
      route: "/analytic",
    },
    {
      icon: <MdOutlinePayments size="20px" />,
      text: "Revenue",
      route: "/",
    },
    {
      icon: <BsPeople size="20px" />,
      text: "Crm",
      route: "/crm",
    },
    {
      icon: <AiOutlineAppstoreAdd size="20px" />,
      text: "Apps",
      route: "/apps",
    },
  ];

  const handleNavClick = (item) => {
    setActiveNav(item);
  };

  // initially set active nav on page load
  useEffect(() => {
    const routeIndex = navData.findIndex(
      (item) => item.route === location.pathname
    );
    if (routeIndex !== -1) {
      setActiveNav(routeIndex);
    }
  }, [location.pathname]);

  return (
    <nav className="nav-container w-full py-2 px-5">
      <div className="nav-content mx-auto py-4 rounded-3xl flex justify-between">
        <div>
          <img src={mainStackLogo} alt="logo" />
        </div>

        <div className="nav-buttons flex justify-evenly w-1/2">
          {navData.map((item, index) => (
            <span
              key={index}
              className={`mx-3 px-2 flex items-center ${
                index === activeNav ? "active-nav" : ""
              }`}
              onClick={() => handleNavClick(index)}
            >
              <span className="mr-1">{item.icon}</span>
              <Link to={item.route}>{item.text}</Link>
            </span>
          ))}
        </div>

        <div className="nav-icons flex justify-between w-1/5">
          <div>
            <IoIosNotificationsOutline size="25px" />
          </div>

          <div>
            <BiMessageAltDetail size="25px" />
          </div>

          <div className="switch flex justify-between items-center rounded-3xl bg-gray-300 w-1/4">
            <div className="circle-shape mr-2 w-2/4 text-center rounded-full bg-black text-white">
              OJ
            </div>

            <div className="hamburger-container w-2/4">
              <RxHamburgerMenu />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
