/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import Button from "./button/button";
import SubComponent1 from "./revenue/subComponent1";
import SubComponent2 from "./revenue/subComponent2";
import FilterData from "./revenue/filterContext";
import SkeletonLoad from "./general/skeletonLoad";

export default function RevenueComponent() {
  const { balanceDetails, loadStatus1, loadStatus2 } = useContext(FilterData);
  const [availableBalance, setAvailableBalance] = useState(null);

  const calculateBalance = () => {
    const value = balanceDetails?.balance + balanceDetails?.total_revenue;
    setAvailableBalance(value);
  };

  useEffect(() => {
    calculateBalance();
  }, [balanceDetails]);

  return loadStatus1 || loadStatus2 ? (
    <div className="loading-container">
      <SkeletonLoad />
    </div>
  ) : (
    <section className="revenue w-full md:px-24 py-6">
      <section className="available-balance flex flex-col">
        <small className="mb-2">Available Balance</small>
        <div className="flex">
          <h1 className="font-bold lg:text-3xl sm:text-2xl">
            USD {loadStatus1 || loadStatus2 ? "___" : availableBalance}
          </h1>
          <span className="ml-12">
            <Button bgColor="black" textColor="white">
              Withdraw
            </Button>
          </span>
        </div>
        <SubComponent1 />
      </section>
      <section>
        <SubComponent2 />
      </section>
    </section>
  );
}
