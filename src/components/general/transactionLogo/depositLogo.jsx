/* eslint-disable no-unused-vars */
import React from "react";
import deposit from "../../../assets/call_received.svg";

export default function DepositLogo() {
  return (
    <div
      className="w-full rounded-full px-4 py-4"
      style={{ backgroundColor: "#E3FCF2" }}
    >
      <img src={deposit} alt="deposit" />
    </div>
  );
}
