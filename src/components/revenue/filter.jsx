/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";
import { motion, AnimatePresence } from "framer-motion";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export default function Filter({ setRender, render }) {
  const [renderInputContainer, setRenderInputContainer] = useState(false);
  const [renderInputContainer2, setRenderInputContainer2] = useState(false);
  const [renderCalendar1, setRendarCalendar1] = useState(false);
  const [renderCalendar2, setRendarCalendar2] = useState(false);
  const [date, setDate] = useState(new Date());

  const closeMe = () => {
    setRender(false);
  };

  const handleRenderContainer = () => {
    setRenderInputContainer(!renderInputContainer);

    if (renderCalendar1) {
      setRendarCalendar1(false);
    }

    if (renderInputContainer2) {
      setRenderInputContainer2(false);
    }

    if (renderCalendar2) {
      setRendarCalendar2(false);
    }
  };

  const handleRenderContainer2 = () => {
    setRenderInputContainer2(!renderInputContainer2);

    if (renderCalendar1) {
      setRendarCalendar1(false);
    }

    if (renderInputContainer) {
      setRenderInputContainer(false);
    }

    if (renderCalendar2) {
      setRendarCalendar2(false);
    }
  };

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  const displayCalendar1 = () => {
    setRendarCalendar1(!renderCalendar1);

    if (renderCalendar2) {
      setRendarCalendar2(false);
    }

    if (renderInputContainer) {
      setRenderInputContainer(false);
    }

    if (renderInputContainer2) {
      setRenderInputContainer(false);
    }
  };

  const displayCalendar2 = () => {
    setRendarCalendar2(!renderCalendar2);

    if (renderCalendar1) {
      setRendarCalendar1(false);
    }

    if (renderInputContainer) {
      setRenderInputContainer(false);
    }

    if (renderInputContainer2) {
      setRenderInputContainer2(false);
    }
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

          <div className="date mt-5 relative">
            <small className="font-bold mt-5">Date Range</small>

            <div className="flex mt-2">
              <button
                className={`calendar-from w-2/4 py-2 px-3 rounded-xl flex 
              justify-between items-center mr-2  ${
                renderCalendar1 ? "bg-white" : "gray-button"
              }`}
                onClick={displayCalendar1}
              >
                <h1>17 Jul, 2023</h1>
                <span>
                  {!renderCalendar1 ? (
                    <RiArrowDropDownLine size="25px" />
                  ) : (
                    <RiArrowDropUpLine size="25px" />
                  )}
                </span>
              </button>

              <button
                className={`render-calendar-to w-2/4 py-2 px-3 rounded-xl 
              flex justify-between items-center mr-2  ${
                renderCalendar2 ? "bg-white" : "gray-button "
              }`}
                onClick={displayCalendar2}
              >
                <h1>17 Jul, 2023</h1>
                <span>
                  {!renderCalendar2 ? (
                    <RiArrowDropDownLine size="25px" />
                  ) : (
                    <RiArrowDropUpLine size="25px" />
                  )}
                </span>
              </button>
            </div>

            <>
              <AnimatePresence>
                {renderCalendar1 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="initial-date-calendar w-full absolute rounded-xl z-10"
                  >
                    <Calendar
                      onChange={handleDateChange}
                      className="calendar-component border-none rounded-xl w-full bg-white"
                      value={date}
                      tileClassName="selected-date rounded-full"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </>

            <AnimatePresence>
              {renderCalendar2 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="initial-date-calendar w-full absolute rounded-xl z-10"
                >
                  <Calendar
                    onChange={handleDateChange}
                    className="calendar-component border-none rounded-xl w-full bg-white"
                    value={date}
                    tileClassName="selected-date rounded-full"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="mt-5 relative w-full">
            <small className="font-bold mt-5">Transaction Type</small>

            <button
              className={`w-full mt-3 px-5 py-2 rounded-xl flex 
            justify-between items-center mr-2 ${
              renderInputContainer ? "bg-white" : "gray-button "
            }`}
              onClick={handleRenderContainer}
            >
              <h1 className="truncate">
                Store Transactions, Get Tipped, Withdrawals, chargebacks
              </h1>
              <span>
                {!renderInputContainer ? (
                  <RiArrowDropDownLine size="25px" />
                ) : (
                  <RiArrowDropUpLine size="25px" />
                )}
              </span>
            </button>

            <AnimatePresence>
              {renderInputContainer && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="checkbox-container px-5 py-3 w-full absolute rounded-xl bg-white"
                >
                  <div className="input-container flex mt-2 mb-2">
                    <input
                      type="checkbox"
                      className="input mr-2"
                      id="store-transactions"
                    />
                    <label htmlFor="store-transactions" className="font-bold">
                      Store Transactions
                    </label>
                  </div>
                  <div className="input-container flex mb-2">
                    <input
                      type="checkbox"
                      className="input mr-2"
                      id="get-tipped"
                    />
                    <label htmlFor="get-tipped" className="font-bold">
                      Get Tipped
                    </label>
                  </div>
                  <div className="input-container flex mb-2">
                    <input
                      type="checkbox"
                      className="input mr-2"
                      id="withdrawal"
                    />
                    <label htmlFor="withdrawal" className="font-bold">
                      Withdrawal
                    </label>
                  </div>
                  <div className="input-container flex mb-2">
                    <input
                      type="checkbox"
                      className="input mr-2"
                      id="charge-backs"
                    />
                    <label htmlFor="charge-backs" className="font-bold">
                      Chargebacks
                    </label>
                  </div>
                  <div className="input-container flex mb-2">
                    <input
                      type="checkbox"
                      className="input mr-2"
                      id="cash-backs"
                    />
                    <label htmlFor="cash-backs" className="font-bold">
                      Cashbacks
                    </label>
                  </div>
                  <div className="input-container flex mb-2">
                    <input type="checkbox" className="input mr-2" id="refer" />
                    <label htmlFor="refer" className="font-bold">
                      Refer & Earn
                    </label>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="mt-5">
            <small className="font-bold mt-5">Transaction Status</small>

            <button
              className={`w-full mt-3 px-5 py-2 rounded-xl flex 
            justify-between items-center mr-2 ${
              renderInputContainer2 ? "bg-white" : "gray-button "
            }`}
              onClick={handleRenderContainer2}
            >
              <h1 className="truncate">Successful, Pending, Failed</h1>
              <span>
                {!renderInputContainer2 ? (
                  <RiArrowDropDownLine size="25px" />
                ) : (
                  <RiArrowDropUpLine size="25px" />
                )}
              </span>
            </button>

            <AnimatePresence>
              {renderInputContainer2 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="checkbox-container2 px-5 py-3 w-full absolute rounded-xl bg-white"
                >
                  <div className="input-container flex mt-2 mb-2">
                    <input
                      type="checkbox"
                      className="input mr-2"
                      id="successful"
                    />
                    <label htmlFor="successful" className="font-bold">
                      Successful
                    </label>
                  </div>
                  <div className="input-container flex mb-2">
                    <input
                      type="checkbox"
                      className="input mr-2"
                      id="pending"
                    />
                    <label htmlFor="Pending" className="font-bold">
                      Pending
                    </label>
                  </div>
                  <div className="input-container flex mb-2">
                    <input type="checkbox" className="input mr-2" id="failed" />
                    <label htmlFor="failed" className="font-bold">
                      Failed
                    </label>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
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
