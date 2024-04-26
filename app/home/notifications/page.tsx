"use client";
import React, { useState } from "react";
import NotificationsDetails from "@/constants/NotificationsDetails";
import { GiApothecary } from "react-icons/gi";
import { HiGiftTop } from "react-icons/hi2";
import PageTransition from "@/components/PageTransition";

const Notifications = () => {
  const [activeButton, setActiveButton] = useState("all");

  const handleButtonClick = (buttonType: string) => {
    setActiveButton(buttonType);
  };

  return (
    <>
      <PageTransition>
        <section className="w-full px-[50px] py-[25px]">
          <h2 className="text-[24px] font-bold text-detail ">notifications</h2>
          <div className="w-full flex mt-8 xl:gap-[100px] md:gap-[25px] lg:gap-[50px] ">
            <div className="w-[65%] h-full">
              <div className="w-full h-[150px] flex justify-center items-center border border-gray-300 rounded-[20px]">
                <button
                  className={`w-[75px] h-[28px] border border-gray-300 rounded-tl-xl rounded-bl-xl cursor-pointer ${
                    activeButton === "all" ? "bg-button2 text-white" : ""
                  } text-detail text-[13px] font-medium`}
                  onClick={() => handleButtonClick("all")}
                >
                  All
                </button>
                <button
                  className={`w-[75px] h-[28px] border border-gray-300 ${
                    activeButton === "read" ? "bg-button2 text-white" : ""
                  } text-[13px] text-detail font-medium`}
                  onClick={() => handleButtonClick("read")}
                >
                  Read
                </button>
                <button
                  className={`w-[75px] h-[28px] border border-gray-300 rounded-tr-xl rounded-br-xl cursor-pointer ${
                    activeButton === "unread" ? "bg-button2 text-white" : ""
                  } text-[13px] text-detail font-medium`}
                  onClick={() => handleButtonClick("unread")}
                >
                  Unread
                </button>
              </div>
              <div className="w-full flex flex-col rounded-xl">
                {NotificationsDetails.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-5 border border-gray-300 rounded-xl px-[50px] py-[25px]"
                  >
                    <GiApothecary className="text-[25px] text-button2" />
                    <div className="flex flex-col gap-2 justify-center">
                      <h3 className="text-[15px] text-detail font-semibold capitalize">
                        {item.msg}
                      </h3>
                      <p className="text-[12px] text-inputText font-semibold">
                        {item.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="w-[35%] h-full">
              <div className="w-full flex flex-col justify-center px-[30px] py-[50px] shadow-xl rounded-xl">
                <div className="flex flex-row items-center gap-2">
                  <HiGiftTop className="w-[25px] h-[25px] text-primary" />
                  <h2 className="font-semibold text-[18px] capitalize">
                    Loyalty rewards
                  </h2>
                </div>
                <div className="w-full mt-2 ">
                  <p className="text-[12px] text-inputText capitalize ">
                    You Are 3 Meals Away From our 10$ Discount
                  </p>
                  <div className="w-full bg-lightGreen rounded-full h-5 dark:bg-lightGreen mt-[10px] flex justify-between">
                    <div className="bg-buttonGreen h-5 rounded-full w-[45%] flex justify-between   px-[25px]">
                      <p className="text-[12px] text-white">0</p>
                    </div>
                    <p className="text-[12px] mr-[25px]">5</p>
                  </div>
                </div>
              </div>
              <div className="w-full px-[25px] py-[25px] rounded-xl shadow-xl">
                <h3 className="text-[16px] font-semibold text-detail capitalize">
                  Notification Settings
                </h3>
                <div className=" flex lg:flex-row md:flex-col justify-between mt-10">
                  <h3 className="text-[20px] font-medium text-black capitalize">
                    notifications
                  </h3>
                  <label className="inline-flex items-center me-5 cursor-pointer">
                    <input type="checkbox" value="" className="sr-only peer" />
                    <div className="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </section>
      </PageTransition>
    </>
  );
};

export default Notifications;
