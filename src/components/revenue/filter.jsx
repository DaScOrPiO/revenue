/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { RiArrowDropDownLine } from "react-icons/ri";
import { motion, AnimatePresence } from "framer-motion";

export default function Filter({ setRender, render }) {
  const closeMe = () => {
    setRender(false);
  };

  return (
    <AnimatePresence>
      {render && (
        <motion.div
          initial={{ x: 500 }}
          animate={{ x: 0 }}
          exit={{ x: 500 }}
          transition={{ duration: 0.8 }}
          onExitComplete={closeMe}
          className="filter-container lg:w-1/3 lg:h-screen md:max-h-auto h-auto overflow-auto fixed rounded-xl 
    right-0 lg:top-0 md:top-40 top-0 py-5 px-3 bg-white"
        >
          <div className="flex justify-between">
            <div>
              <h1 className="font-bold text-2xl">Filter</h1>
            </div>

            <div className="cursor-pointer" onClick={closeMe}>
              <AiOutlineClose size="25px" />
            </div>
          </div>

          <div className="flex justify-evenly items-center mt-5">
            <div>
              <button className="white-button rounded-xl px-3 py-2 bg-white">
                Today
              </button>
            </div>
            <div>
              <button className="white-button rounded-xl px-3 py-2 bg-white">
                Last 7days
              </button>
            </div>
            <div>
              <button className="white-button rounded-xl px-3 py-2 bg-white">
                This month
              </button>
            </div>
            <div>
              <button className="white-button rounded-xl px-3 py-2 bg-white">
                Last 3months
              </button>
            </div>
          </div>

          <div className="mt-5">
            <small className="font-bold mt-5">Date Range</small>

            <div className="flex mt-2">
              <button className="calendar-from w-2/4 py-2 px-3 gray-button rounded-xl flex justify-between items-center mr-2">
                <h1>17 Jul, 2023</h1>
                <span>
                  <RiArrowDropDownLine size="25px" />
                </span>
              </button>

              <button className="render-calendar-to w-2/4 py-2 px-3 gray-button rounded-xl flex justify-between items-center mr-2">
                <h1>17 Jul, 2023</h1>
                <span>
                  <RiArrowDropDownLine size="25px" />
                </span>
              </button>
            </div>
          </div>

          <div className="mt-5">
            <small className="font-bold mt-5">Transaction Type</small>

            <button className="w-full mt-3 px-5 py-2 gray-button rounded-xl flex justify-between items-center mr-2">
              <h1 className="truncate">
                Store Transactions, Get Tipped, Withdrawals, chargebacks
              </h1>
              <span>
                <RiArrowDropDownLine size="25px" />
              </span>
            </button>
          </div>

          <div className="mt-5">
            <small className="font-bold mt-5">Transaction Status</small>

            <button className="w-full mt-3 px-5 py-2 gray-button rounded-xl flex justify-between items-center mr-2">
              <h1 className="truncate">Successful, Pending, Failed</h1>
              <span>
                <RiArrowDropDownLine size="25px" />
              </span>
            </button>
          </div>

          <div className="flex mt-56">
            <div className="mr-2 w-2/4">
              <button className="white-button bg-white w-full rounded-xl py-1">
                Clear
              </button>
            </div>

            <div className="ml-2 w-2/4">
              <button className="gray-button text-white w-full rounded-xl py-1">
                Apply
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
