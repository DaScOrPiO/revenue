/* eslint-disable no-unused-vars */
import React from "react";
import linkInBio from "../../assets/link-in-bio.svg";
import booking from "../../assets/bookings.svg";
import mediaKit from "../../assets/media-kit.svg";
import store from "../../assets/store.svg";
import { motion } from "framer-motion";

export default function PopupNav2() {
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

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.8 }}
      className="popup-nav-2 w-1/4 fixed left-1/2 translate-x-1/4 top-24 px-4 py-4 rounded-xl"
    >
      {navData2.map((item, index) => (
        <li
          key={index}
          className="link-container flex items-center px-2 mt-2 cursor-pointer"
        >
          <img src={item.image} alt="image" className="link-image rounded-xl" />
          <span className="ml-2 py-2">
            <h5 className="font-bold">{item.text}</h5>
            <p>{item.message}</p>
          </span>
        </li>
      ))}
    </motion.div>
  );
}
