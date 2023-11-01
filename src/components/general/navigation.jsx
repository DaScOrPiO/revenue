/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { IoIosNotificationsOutline } from "react-icons/io";
import { BiMessageAltDetail } from "react-icons/bi";
import { RxHamburgerMenu } from "react-icons/rx";
import { AiOutlineAppstoreAdd, AiOutlineHome } from "react-icons/ai";
import { BsPeople } from "react-icons/bs";
import { MdOutlinePayments, MdOutlineAnalytics } from "react-icons/md";
import mainStackLogo from "../../assets/mainstack-logo.svg";
import PopupNav from "./popupNav";
import PopupNav2 from "./popupNav2";
import { baseUrl, get_user } from "./endpoint url/file";
import axios from "axios";
import linkInBio from "../../assets/link-in-bio.svg";
import booking from "../../assets/bookings.svg";
import mediaKit from "../../assets/media-kit.svg";
import store from "../../assets/store.svg";

export default function Navigation() {
  const [activeNav, setActiveNav] = useState(null);
  const [navPopup, setNavPopup] = useState(false);
  const [navPopup2, setNavPopup2] = useState(false);
  const [userDetails, setUserDetails] = useState([]);
  const [valueFromPop2, setValueFromPop2] = useState(null);

  // user initials
  const firstName = userDetails?.first_name;
  const lastName = userDetails?.last_name;
  const initials = firstName && lastName ? `${firstName[0]}${lastName[0]}` : "";

  const location = useLocation();

  const navData = [
    {
      icon: <AiOutlineHome size="20px" />,
      text: "Home",
      route: "/home",
      text2: null,
    },
    {
      icon: <MdOutlineAnalytics size="20px" />,
      text: "Analytics",
      route: "/analytic",
      text2: null,
    },
    {
      icon: <MdOutlinePayments size="20px" />,
      text: "Revenue",
      route: "/",
      text2: null,
    },
    {
      icon: <BsPeople size="20px" />,
      text: "Crm",
      route: "/crm",
      text2: null,
    },
    {
      icon: <AiOutlineAppstoreAdd size="20px" />,
      text: "Apps",
      route: "",
      text2: valueFromPop2,
    },
  ];

  const navData2 = [
    {
      image: linkInBio,
      text: "Link in Bio",
      message: "Manage your Link in Bio",
    },
    {
      image: store,
      text: "Store",
      message: "Manage your Store activities",
    },
    {
      image: mediaKit,
      text: "Media Kit",
      message: "Manage your Media Kit",
    },
    {
      image: store,
      text: "Invoicing",
      message: "Manage your Invoices",
    },
    {
      image: booking,
      text: "Bookings",
      message: "Manage your Bookings",
    },
  ];

  const handleNavClick = (item) => {
    renderPopupNav2();
    setActiveNav(item);
  };

  const renderPopupNav = () => {
    setNavPopup(!navPopup);
  };

  const renderPopupNav2 = () => {
    if (activeNav === 4) {
      setNavPopup2(!navPopup2);
    } else {
      setNavPopup2(false);
    }
  };

  const popup2Click = (item) => {
    console.log(item.text);

    if (!navPopup2) {
      setValueFromPop2(null);
    } else {
      setValueFromPop2(item.text);
    }
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

  const getUserData = async () => {
    try {
      const req = await axios.get(baseUrl + get_user);
      if (req.status === 200) {
        setUserDetails(req.data);
      }
    } catch (err) {
      ("");
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

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
              className={`nav-item mx-3 px-2 flex items-center rounded-xl cursor-pointer ${
                index === activeNav ? "active-nav" : ""
              }`}
              onClick={() => handleNavClick(index)}
            >
              <span className="mr-1">{item.icon}</span>
              <Link to={item.route}>
                {item.text}{" "}
                {index === 4 && navPopup2 ? (
                  <span className="px-2">
                    {item.text2 !== null ? item.text2 : null}
                  </span>
                ) : null}
              </Link>
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

          <div
            className="switch flex cursor-pointer justify-between items-center rounded-3xl gray-button w-1/4"
            onClick={renderPopupNav}
          >
            <div className="circle-shape mr-2 w-2/4 text-center rounded-full bg-black text-white">
              {initials}
            </div>

            <div className="hamburger-container w-2/4">
              <RxHamburgerMenu />
            </div>
          </div>
        </div>
        {navPopup && (
          <PopupNav
            userDetails={userDetails}
            setUserDetails={setUserDetails}
            initials={initials}
          />
        )}
        {navPopup2 && (
          <div className="popup-nav-2 w-1/4 fixed left-1/2 translate-x-1/4 top-24 px-4 py-4 rounded-xl">
            {navData2.map((item, index) => (
              <li
                key={index}
                className="link-container flex items-center px-2 mt-2 cursor-pointer"
                onClick={() => popup2Click(item)}
              >
                <img
                  src={item.image}
                  alt="image"
                  className="link-image rounded-xl"
                />
                <span className="ml-2 py-2">
                  <h5 className="font-bold">{item.text}</h5>
                  <p>{item.message}</p>
                </span>
              </li>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
