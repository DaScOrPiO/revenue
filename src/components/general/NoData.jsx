/* eslint-disable no-unused-vars */
import React, { useContext } from "react";
import { MdOutlineReceiptLong } from "react-icons/md";
import FilterData from "../revenue/filterContext";

export default function NoData() {
  const { setShowValues, uncheckInputs } = useContext(FilterData);

  const handleButtonClick = () => {
    setShowValues(false);
    uncheckInputs();
  };

  return (
    <div className="h-full flex justify-center items-start py-5">
      <div className="message-container mt-12 mb-24">
        <div className="icon-container gray-button rounded-xl flex justify-center px-2 w-1/5 py-3">
          <MdOutlineReceiptLong size="30px" />
        </div>

        <div className="message-text flex flex-col mt-3">
          <h1 className="font-bold text-2xl">No Matching Transactions Found</h1>
          <small className="mb-3">
            Change your filter to see more results or add a new product.
          </small>

          <button
            onClick={handleButtonClick}
            className="gray-button px-3 rounded-full flex justify-center w-2/5 py-3 mt-5"
          >
            Clear Filter
          </button>
        </div>
      </div>
    </div>
  );
}
