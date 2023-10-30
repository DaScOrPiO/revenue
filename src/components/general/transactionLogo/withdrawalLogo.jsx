/* eslint-disable no-unused-vars */
import React from "react";
import withdraw from "../../../assets/call_made.svg";

export default function WithdrawalLogo() {
  return (
    <div
      className="w-full rounded-full px-4 py-4"
      style={{ backgroundColor: "#F9E3E0" }}
    >
      <img src={withdraw} alt="withdraw" />
    </div>
  );
}
