/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
import { React, createContext, useState } from "react";

const FilterData = createContext();

export function FilterContext({ children }) {
  const [count, setCount] = useState(null);
  const [transactionsData, setTransactionsData] = useState([]);
  const [filteredDateValues, setFilteredDateValues] = useState([]);

  const [filterTypes, setFilterTypes] = useState({
    dateRange: false,
    transactionTypes: false,
    transactionStatus: false,
  });

  const [Input, setInput] = useState({
    storeTransactions: false,
    digitalProducts: false,
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

  const filterTransactionsByDateAndType = () => {
    let data = [...transactionsData]; // Copy the original data

    if (filterTypes.dateRange && Input.dateFrom !== "" && Input.dateTo !== "") {
      // Filter by date range
      const filteredValue = transactionsData.filter((item) => {
        const transactionDate = new Date(item?.date);
        const dateFrom = new Date(Input?.dateFrom);
        const dateTo = new Date(Input?.dateTo);
        return transactionDate >= dateFrom && transactionDate <= dateTo;
      });

      data = filteredValue;
    }

    if (filterTypes.transactionTypes) {
      // Create an array to store the selected types
      const selectedTypes = [];

      if (Input.storeTransactions) selectedTypes.push("storeTransactions");
      if (Input.getTipped) selectedTypes.push("get_tipped");
      if (Input.withdrawal) selectedTypes.push("withdrawal");
      if (Input.cashback) selectedTypes.push("cash_backs");
      if (Input.chargebacks) selectedTypes.push("charge_backs");
      if (Input.refer) selectedTypes.push("referral");
      if (Input.digitalProducts) selectedTypes.push("digital_product");

      // Filter based on selected types
      if (selectedTypes.length > 0) {
        if (Input.withdrawal) {
          data = data.filter((item) =>
            selectedTypes.includes(item?.type)
          );
        } else {
          data = data.filter((item) =>
            selectedTypes.includes(item?.metadata?.type)
          );
        }
      }
    }

    if (filterTypes.transactionStatus) {
      // Create an array to store the selected statuses
      const selectedStatuses = [];

      if (Input.successful) selectedStatuses.push("successful");
      if (Input.pending) selectedStatuses.push("pending");
      if (Input.failed) selectedStatuses.push("failed");

      // Filter based on selected statuses
      if (selectedStatuses.length > 0) {
        data = data.filter((item) => selectedStatuses.includes(item?.status));
      }
    }

    setFilteredDateValues(data);
    console.log(data, "filtered data");
    console.log(filteredDateValues);
  };

  // const filterTransactionsByDate = () => {
  //   if (Input.dateFrom !== "" && Input.dateTo !== "") {
  //     const filtered = transactionsData?.filter((item) => {
  //       const transactionDate = new Date(item?.date);
  //       const dateFrom = new Date(Input?.dateFrom);
  //       const dateTo = new Date(Input?.dateTo);
  //       return transactionDate >= dateFrom && transactionDate <= dateTo;
  //     });
  //     console.log(filtered);
  //     setFilteredDateValues(filtered);
  //     transactionValues.push(filteredDateValues);
  //   }
  // };

  const filterTransactionsByType = () => {};

  const handleDateChange = (newDate) => {
    setInput((prev) => ({ ...prev, dateFrom: newDate.toLocaleString() }));
  };

  const handleDateChange2 = (newDate) => {
    setInput((prev) => ({ ...prev, dateTo: newDate.toLocaleString() }));
  };

  function formatDate(inputDate) {
    const options = { year: "numeric", month: "short", day: "2-digit" };
    return new Date(inputDate).toLocaleDateString(undefined, options);
  }

  const handleTodayButtonClick = () => {
    const dayRange = new Date();
    const value = formatDate(dayRange);
    setInput((prev) => ({
      ...prev,
      dateFrom: value,
      dateTo: value,
    }));
  };

  const handle7daysButtonClick = () => {
    const today = new Date();
    const sevenDays = new Date(today);
    const sevenDaysAgo = sevenDays.setDate(today.getDate() - 7);
    const value1 = formatDate(today);
    const value2 = formatDate(sevenDaysAgo);

    setInput((prev) => ({ ...prev, dateFrom: value2, dateTo: value1 }));
  };

  const handleThisMonthClick = () => {
    const today = new Date();
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const value1 = formatDate(today);
    const value2 = formatDate(firstDayOfMonth);

    setInput((prev) => ({ ...prev, dateFrom: value2, dateTo: value1 }));
  };

  const handleLast3MonthsClick = () => {
    const today = new Date();
    const firstDayOfCurrentMonth = new Date(
      today.getFullYear(),
      today.getMonth(),
      1
    );
    const threeMonthsAgo = new Date(firstDayOfCurrentMonth);
    threeMonthsAgo.setMonth(firstDayOfCurrentMonth.getMonth() - 3);
    const value1 = formatDate(threeMonthsAgo);
    const value2 = formatDate(today);

    setInput((prev) => ({ ...prev, dateFrom: value1, dateTo: value2 }));
  };

  const handleFilterTypes = () => {
    let filterNumber = 0;

    if (
      Input.storeTransactions ||
      Input.getTipped ||
      Input.withdrawal ||
      Input.chargebacks ||
      Input.cashback ||
      Input.refer ||
      Input.digitalProducts
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
        formatDate,
        handleTodayButtonClick,
        handle7daysButtonClick,
        handleThisMonthClick,
        handleLast3MonthsClick,
        transactionsData,
        setTransactionsData,
        // filterTransactionsByDate,
        filterTransactionsByType,
        filterTransactionsByDateAndType,
      }}
    >
      {children}
    </FilterData.Provider>
  );
}

export default FilterData;
