"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { GiApothecary } from "react-icons/gi";
import { HiGiftTop } from "react-icons/hi2";
import PageTransition from "@/components/PageTransition";

interface Notification {
  _id: string;
  message: string;
  status: string;
  userId: string;
  userDeviceToken: string;
  time: string;
}

const Notifications: React.FC = () => {
  const [activeButton, setActiveButton] = useState<string>("all");
  const [notifications, setNotifications] = useState<Notification[]>([]);

  
  const fetchNotifications = async () => {
    const uId = localStorage.getItem("userId"); 
    // const uId = '6641acffb4bebad804c47b19';

    try {
      const response = await axios.get( 
          `https://tasty-dog.onrender.com/api/v1/notifications/userNoifications/${uId}`, 
          {
            headers: {
              'Content-Type': 'application/json',
            }  
          });
      setNotifications(response.data.notifications);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };


  useEffect(() => {
    const fetchNotifications = async () => { 
      const uId = localStorage.getItem("userId"); 
      // const uId = '6641acffb4bebad804c47b19';
 
      try {
        const response = await axios.get( 
            `https://tasty-dog.onrender.com/api/v1/notifications/userNoifications/${uId}`, 
            {
              headers: {
                'Content-Type': 'application/json',
              }  
            });
        setNotifications(response.data.notifications);
      } catch (error) { 
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
  }, []);

  const handleButtonClick = (buttonType: string) => {
    setActiveButton(buttonType);
  };

  const handleNotificationClick = async (notificationId: string) => {
    try {
      await axios.post(
        `https://tasty-dog.onrender.com/api/v1/notifications/customerNotifications/${notificationId}/status`,
        { status: "read" },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const fetchNotifications = async () => { 
        const uId = localStorage.getItem("userId"); 
        // const uId = '6641acffb4bebad804c47b19';
   
        try {
          const response = await axios.get( 
              `https://tasty-dog.onrender.com/api/v1/notifications/userNoifications/${uId}`, 
              {
                headers: {
                  'Content-Type': 'application/json',
                }  
              });
          setNotifications(response.data.notifications);
        } catch (error) {
          console.error("Error fetching notifications:", error);
        }
      };

      fetchNotifications(); 
      
    } catch (error) {
      console.error("Error updating notification status:", error);
    }
  };
  const filteredNotifications = notifications.filter((item) => {
    if (activeButton === "all") return true;
    if (activeButton === "read" && item.status === "read") return true;
    if (activeButton === "unread" && item.status === "unread") return true;
    return false;
  });

  return (
    <PageTransition>
      <section className="w-full px-[50px] py-[25px]">
        <h2 className="text-[24px] font-bold text-detail">notifications</h2>
        <div className="w-full flex mt-8 xl:gap-[100px] md:gap-[25px] lg:gap-[50px]">
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
              {filteredNotifications.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center gap-5 border border-gray-300 rounded-xl px-[50px] py-[25px]"
                  onClick={() => handleNotificationClick(item._id)}
                >
                  <GiApothecary className="text-[25px] text-button2" />
                  <div className="flex flex-col gap-2 justify-center">
                    <h3 className="text-[15px] text-detail font-semibold capitalize">
                      {item.message}
                    </h3>
                    <p className="text-[12px] text-inputText font-semibold">
                      {new Date(item.time).toLocaleString()}
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
                  <div className="bg-buttonGreen h-5 rounded-full w-[45%] flex justify-between px-[25px]">
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
              <div className="flex lg:flex-row md:flex-col justify-between mt-10">
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
  );
};

export default Notifications;
