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

export default function SubComponent2() {
  const { count } = useContext(FilterData);
  const [transactionsData, setTransactionsData] = useState([]);
  const [renderFilter, setRenderFilter] = useState(false);

  const handleRenderFilter = () => {
    setRenderFilter(!renderFilter);
  };

  const getTransactions = async () => {
    try {
      const req = await axios.get(baseUrl + get_transactions);
      if (req.status === 200) {
        setTransactionsData(req.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getTransactions();
  }, []);

  // Filter transactions that are no more than 7 days old and format the date (based on oldest transaction)
  const filteredTransactions = transactionsData.filter((item) => {
    const transactionDate = new Date(item.date);
    const sevenDaysAgo = new Date(2022, 1, 28);
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    return transactionDate >= sevenDaysAgo;
  });

  const formatDate = (date) => {
    const options = { year: "numeric", month: "short", day: "2-digit" };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  console.log(count);

  return (
    <section className="filter-section w-full flex flex-col mt-12">
      <section className="hero-section w-full md:flex justify-between">
        <div className="message">
          <h1 className="md:text-3xl font-bold">
            {filteredTransactions?.length} Transactions
          </h1>
          <p>Your transactions for the last 7 days</p>
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
        {filteredTransactions?.map((item, index) => (
          <div className="flex justify-between mt-5" key={index}>
            <div className="flex px-2">
              <div className="mr-2">
                {item.type === "deposit" ? <DepositLogo /> : <WithdrawalLogo />}
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
        ))}
      </section>

      {renderFilter && (
        <Filter setRender={setRenderFilter} render={renderFilter} />
      )}
    </section>
  );
}
