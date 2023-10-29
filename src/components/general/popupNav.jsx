/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import {
  AiOutlineSetting,
  AiOutlineGift,
  AiOutlineAppstoreAdd,
  AiOutlineBug,
} from "react-icons/ai";
import { MdOutlineReceiptLong, MdOutlineSwitchAccount } from "react-icons/md";
import { GoSignOut } from "react-icons/go";

export default function PopupNav({userDetails, setUserDetails, initials}) {
  
  const popupNavData = [
    {
      icon: <AiOutlineSetting size="20px" />,
      text: "Purchase History",
    },
    {
      icon: <MdOutlineReceiptLong size="20px" />,
      text: "Purchase History",
    },
    {
      icon: <AiOutlineGift size="20px" />,
      text: "Refer and Earn",
    },
    {
      icon: <AiOutlineAppstoreAdd size="20px" />,
      text: "Integration",
    },
    {
      icon: <AiOutlineBug size="20px" />,
      text: "Report Bug",
    },
    {
      icon: <MdOutlineSwitchAccount size="20px" />,
      text: "Switch Account",
    },
    {
      icon: <GoSignOut size="20px" />,
      text: "Sign Out",
    },
  ];

  return (
    <div className="popup-nav rounded-xl px-4 py-4 fixed right-5 top-24 lg:w-1/4">
      <div className="user-details flex items-center">
        <div className="user-initials rounded-full mr-2 px-1 bg-black text-white">
          {initials}
        </div>
        <div>
          <h6 className="font-bold">
            {userDetails?.first_name} {userDetails?.last_name}
          </h6>
          <p>{userDetails?.email}</p>
        </div>
      </div>
      <div className="popup-nav-links mt-2">
        {popupNavData.map((item, index) => (
          <div className="flex items-center mt-8" key={index}>
            <span className="mr-1">{item.icon}</span>
            <span>{item.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
