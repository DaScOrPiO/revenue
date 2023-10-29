/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { baseUrl, get_wallet } from "../general/endpoint url/file";
import axios from "axios";
import info from "../../assets/info.svg";

export default function SubComponent1() {
  const [balanceDetails, setBalanceDetails] = useState([]);

  const getWalletDetails = async () => {
    try {
      const req = await axios.get(baseUrl + get_wallet);
      console.log(req);
      if (req.status === 200) {
        setBalanceDetails(req.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getWalletDetails();
  }, []);

  return (
    <section className="balance-details w-full flex mt-4">
      <section className="graph-section md:w-3/4 mr-5">display graph</section>
      <section className="details-section md:w-1/4">
        <div className="py-2 px-2 mb-2">
          <small className="mb-2 flex justify-between">
            Ledger Balance
            <span>
              <img src={info} alt="info" />
            </span>
          </small>
          <h1 className="font-bold md:text-2xl">{balanceDetails?.balance}</h1>
        </div>
        <div className="py-2 px-2 mb-2">
          <small className="mb-2 flex justify-between">
            Total Payout
            <span>
              <img src={info} alt="info" />
            </span>
          </small>
          <h1 className="font-bold md:text-2xl">{balanceDetails?.total_payout}</h1>
        </div>
        <div className="py-2 px-2 mb-2">
          <small className="mb-2 flex justify-between">
            Total Revenue
            <span>
              <img src={info} alt="info" />
            </span>
          </small>
          <h1 className="font-bold md:text-2xl">
            {balanceDetails?.total_revenue}
          </h1>
        </div>
        <div className="py-2 px-2 mb-2">
          <small className="mb-2 flex justify-between">
            Pending Payout
            <span>
              <img src={info} alt="info" />
            </span>
          </small>
          <h1 className="font-bold md:text-2xl">
            {balanceDetails?.pending_payout}
          </h1>
        </div>
      </section>
    </section>
  );
}
