/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import { AiOutlineDownload } from "react-icons/ai";
import DepositLogo from "../general/transactionLogo/depositLogo";
import WithdrawalLogo from "../general/transactionLogo/withdrawalLogo";
import { baseUrl, get_transactions } from "../general/endpoint url/file";
import axios from "axios";
import Filter from "./filter";
import FilterData from "./filterContext";
import NoData from "../general/NoData";
import { toast } from "react-toastify";

export default function SubComponent2() {
  const {
    count,
    transactionsData,
    setTransactionsData,
    filteredDateValues,
    daysDiff,
    Input,
    showValues,
  } = useContext(FilterData);
  const [renderFilter, setRenderFilter] = useState(false);
  const customId = "custom-id-yes1";

  const handleRenderFilter = () => {
    setRenderFilter(!renderFilter);
  };

  const notify = (message) => {
    toast.error(message, {
      toastId: customId,
    });
  };

  const getTransactions = async () => {
    try {
      const req = await axios.get(baseUrl + get_transactions);
      if (req.status === 200) {
        setTransactionsData(req.data);
      }
    } catch (err) {
      if (!err.response) {
        notify("Network problem can't fetch transactions history 😥");
      } else {
        notify("Something went wrong while fetching transactions history ☹");
      }
      console.log(err);
    }
  };

  useEffect(() => {
    getTransactions();
  }, []);

  // Filter transactions that are no more than 7 days old and format the date (based on oldest transaction)
  const filteredTransactions = transactionsData.filter((item) => {
    const transactionDate = new Date(item.date);
    const allTime = new Date(2022, 1, 1);
    allTime.setDate(allTime.getDate() - 7);
    return transactionDate >= allTime;
  });

  const formatDate = (date) => {
    const options = { year: "numeric", month: "short", day: "2-digit" };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  return (
    <section className="filter-section w-full flex flex-col mt-12">
      <section className="hero-section w-full md:flex justify-between">
        <div className="message">
          <h1 className="md:text-3xl font-bold">
            {showValues
              ? filteredDateValues.length
              : filteredTransactions?.length}{" "}
            Transactions
          </h1>
          <p>
            {showValues && Input.dateFrom !== "" && Input.dateTo !== ""
              ? `Your transactions ${
                  daysDiff > 0 ? `for the last ${daysDiff} days` : `Today`
                }`
              : "Your all time transactions"}
          </p>
        </div>

        <div className="button-container flex px-4">
          <div className="mr-2">
            <button
              className="flex items-center justify-between px-4 py-2 rounded-3xl"
              style={{ backgroundColor: "#EFF1F6", color: "#131316" }}
              onClick={handleRenderFilter}
            >
              Filter{" "}
              {count > 0 && (
                <span className="rounded-full bg-black text-white ml-2 px-2">
                  {count}
                </span>
              )}
              <span className="ml-2">
                <RiArrowDropDownLine size="25px" />
              </span>
            </button>
          </div>

          <div>
            <button
              className="flex items-center justify-between px-4 py-2 rounded-3xl"
              style={{ backgroundColor: "#EFF1F6", color: "#131316" }}
            >
              Export list
              <span className="ml-2">
                <AiOutlineDownload size="15px" />
              </span>
            </button>
          </div>
        </div>
      </section>

      <section className="transaction-history w-full mt-12">
        {showValues && filteredDateValues <= 0 ? (
          <NoData />
        ) : !showValues ? (
          filteredTransactions?.map((item, index) => (
            <div className="flex justify-between mt-5" key={index}>
              <div className="flex px-2">
                <div className="mr-2">
                  {item.type === "deposit" ? (
                    <DepositLogo />
                  ) : (
                    <WithdrawalLogo />
                  )}
                </div>

                {item.type === "withdrawal" ? (
                  <div>
                    <h1>Cash withdrawal</h1>
                    <p
                      className={`${
                        item.status === "successful"
                          ? "green-text"
                          : item.status === "pending"
                          ? "yellow-text"
                          : "bg-red-700"
                      }`}
                    >
                      {item.status}
                    </p>
                  </div>
                ) : (
                  <div>
                    <h1>{item.metadata.name}</h1>
                    <p>
                      {item.metadata.product_name
                        ? item.metadata.product_name
                        : item.metadata.type}
                    </p>
                  </div>
                )}
              </div>
              <div>
                <h1 className="font-bold">USD {item.amount}</h1>
                <p>{formatDate(item.date)}</p>
              </div>
            </div>
          ))
        ) : (
          filteredDateValues?.map((item, index) => (
            <div className="flex justify-between mt-5" key={index}>
              <div className="flex px-2">
                <div className="mr-2">
                  {item.type === "deposit" ? (
                    <DepositLogo />
                  ) : (
                    <WithdrawalLogo />
                  )}
                </div>

                {item.type === "withdrawal" ? (
                  <div>
                    <h1>Cash withdrawal</h1>
                    <p
                      className={`${
                        item.status === "successful"
                          ? "green-text"
                          : item.status === "pending"
                          ? "yellow-text"
                          : "bg-red-700"
                      }`}
                    >
                      {item.status}
                    </p>
                  </div>
                ) : (
                  <div>
                    <h1>{item.metadata.name}</h1>
                    <p>
                      {item.metadata.product_name
                        ? item.metadata.product_name
                        : item.metadata.type}
                    </p>
                  </div>
                )}
              </div>
              <div>
                <h1 className="font-bold">USD {item.amount}</h1>
                <p>{formatDate(item.date)}</p>
              </div>
            </div>
          ))
        )}
      </section>

      {renderFilter && (
        <Filter setRender={setRenderFilter} render={renderFilter} />
      )}
    </section>
  );
}
