/* eslint-disable no-unused-vars */
import React from "react";
import Button from "./button/button";
import SubComponent1 from "./revenue/subComponent1";

export default function RevenueComponent() {
  return (
    <section className="revenue w-full md:px-24 py-6">
      <section className="available-balance flex flex-col">
        <small className="mb-2">Available Balance</small>
        <div className="flex">
          <h1 className="font-bold lg:text-3xl sm:text-2xl">USD 120,500.00</h1>
          <span className="ml-12">
            <Button bgColor="black" textColor="white">
              Withdraw
            </Button>
          </span>
        </div>
        <SubComponent1 />
      </section>
    </section>
  );
}
