/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
import { React, createContext, useState } from "react";

const FilterData = createContext();

export function FilterContext({ children }) {
  const [count, setCount] = useState(null);

  const [filterTypes, setFilterTypes] = useState({
    dateRange: false,
    transactionTypes: false,
    transactionStatus: false,
  });

  const [Input, setInput] = useState({
    storeTransactions: false,
    getTipped: false,
    withdrawal: false,
    chargebacks: false,
    cashback: false,
    refer: false,
    successful: false,
    pending: false,
    failed: false,
    dateFrom: "",
    dateTo: "",
  });

  // Calculate date range
  const calculateDateDifference = (dateFrom, dateTo) => {
    const fromDate = new Date(dateFrom);
    const toDate = new Date(dateTo);

    if (fromDate > toDate) {
      return {
        isValid: false,
        message:
          "Invalid date range. The start date should be earlier than the end date.",
      };
    }

    const timeDifference = Math.abs(toDate - fromDate);
    const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

    return {
      isValid: true,
      daysDifference,
    };
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    setInput((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleDateChange = (newDate) => {
    setInput((prev) => ({ ...prev, dateFrom: newDate.toLocaleString() }));
  };

  const handleDateChange2 = (newDate) => {
    setInput((prev) => ({ ...prev, dateTo: newDate.toLocaleString() }));
  };

  const handleFilterTypes = () => {
    let filterNumber = 0;

    if (
      Input.storeTransactions ||
      Input.getTipped ||
      Input.withdrawal ||
      Input.chargebacks ||
      Input.cashback ||
      Input.refer
    ) {
      filterNumber++;
    }

    if (Input.successful || Input.pending || Input.failed) {
      filterNumber++;
    }

    if (Input.dateFrom !== "" && Input.dateTo !== "") {
      filterNumber++;
    }

    // Update the filterTypes state once
    setFilterTypes((prev) => ({
      ...prev,
      transactionTypes: filterNumber > 0,
      transactionStatus: Input.successful || Input.pending || Input.failed,
      dateRange: Input.dateFrom !== "" && Input.dateTo !== "",
    }));

    // Set the count state with the final count
    setCount(filterNumber);
  };

  return (
    <FilterData.Provider
      value={{
        Input,
        setInput,
        filterTypes,
        setFilterTypes,
        handleInputChange,
        handleFilterTypes,
        count,
        handleDateChange,
        handleDateChange2,
        calculateDateDifference,
      }}
    >
      {children}
    </FilterData.Provider>
  );
}

export default FilterData;
