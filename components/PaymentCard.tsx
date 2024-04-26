"use client";

import React from "react";
import { useState } from "react";
import { BsCreditCard } from "react-icons/bs";
import { FaPaypal } from "react-icons/fa";
import OrderSuccsess from "./models/OrderSuccsess";

const PaymentCard = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <div className="max-w-[452px] flex flex-col mx-auto">
        <div className="w-full flex flex-col gap-3 ">
          <h2 className="text-[24px] font-semibold capitalize">
            Select Payment Method
          </h2>
          <div className="w-full flex items-center gap-2">
            <button className="w-[224px] h-[48px] flex text-center bg-primary text-white text-[12px] rounded-[4px] justify-center items-center gap-3">
              <BsCreditCard className=" text-[20px]  text-white" />
              Credit/Debit Card
            </button>
            <button className="w-[224px] h-[48px] flex text-center bg-none text-black border border-gray-400 justify-center items-center rounded-[4px] gap-3">
              <FaPaypal className="text-[20px] text-blue-900" />
              PayPal
            </button>
          </div>
        </div>
        <div className="w-full flex flex-col justify-center mt-10 ">
          <div className="w-full mb-4 flex flex-col gap-2">
            <p className="text-[12px] text-inputText capitalize">
              cardholder name
            </p>
            <div className="w-full h-[48px] bg-inputBlue  rounded-lg border-2 border-inputBorder">
              <input
                type="text"
                className="w-full outline-none bg-transparent h-full font-normal text-[14px] text-inputText px-4"
              />
            </div>
          </div>
          <div className="w-full mb-4 flex flex-col gap-2 ">
            <p className="text-[12px] text-inputText capitalize">card Number</p>
            <div className="w-full h-[48px] bg-inputBlue  rounded-lg border-2 border-inputBorder">
              <input
                type="text"
                className="w-full outline-none bg-transparent h-full font-normal text-[14px] text-inputText px-4"
              />
            </div>
          </div>
          <div className="w-full mb-4 flex flex-col gap-2 ">
            <div className="flex flex-row item-center gap-3 w-full h-full">
              <div className="w-[225px]">
                <p className="text-[12px] text-inputText capitalize mb-2">
                  Expiration Date
                </p>
                <div className="w-full h-[48px] bg-inputBlue  rounded-lg border-2 border-inputBorder">
                  <input
                    type="date"
                    placeholder="MM/YYYY"
                    className="w-full outline-none bg-transparent h-full font-normal text-[14px] text-inputText px-4"
                  />
                </div>
              </div>
              <div className="w-[225px]">
                <p className="text-[12px] text-inputText capitalize mb-2">
                  CVV
                </p>
                <div className="w-full h-[48px] bg-inputBlue  rounded-lg border-2 border-inputBorder">
                  <input
                    type="text"
                    placeholder="CVV"
                    className="w-full outline-none bg-transparent h-full font-normal text-[14px] text-inputText px-4"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center mt-4">
          <input
            id="default-checkbox"
            type="checkbox"
            value=""
            className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label
            htmlFor="save for future payments"
            className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Save This Card For Future Payments
          </label>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="w-full h-[45px] text-center bg-Green2 text-[20px] text-white rounded-[10px] capitalize mt-10"
        >
          pay now
        </button>
      </div>
    </>
  );
};

export default PaymentCard;
