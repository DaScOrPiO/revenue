/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";

export default function Button({ children, bgColor, click, textColor }) {
  return (
    <button
      className={`px-3 py-2 rounded-3xl bg-${bgColor} text-${textColor}`}
      onClick={click}
    >
      {children}
    </button>
  );
}
