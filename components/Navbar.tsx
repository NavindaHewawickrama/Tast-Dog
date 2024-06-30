import React, { useEffect, useState } from "react";
import { FaCartShopping } from "react-icons/fa6";
import { IoIosNotifications } from "react-icons/io";

import Link from "next/link";
import DropDownList from "./DropDownList";
import SearchBar from "./SearchBar";

const Navbar = () => {

  const [notificationCount, setNotificationCount] = useState<number>(0);

  useEffect(() => {
    const storedCount = localStorage.getItem("notificationCount");
    if (storedCount) {
      setNotificationCount(parseInt(storedCount));
    }

    const handleStorageChange = () => {
      const updatedCount = localStorage.getItem("notificationCount");
      if (updatedCount) {
        setNotificationCount(parseInt(updatedCount));
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <div className=" lg:px-[50px] md:px-[25px] py-[20px] md:ml-[45px]  lg:ml-0 shadow-xl">
      <div className="w-full flex flex-row items-center justify-between">
        <SearchBar />
        <div className="flex items-center xl:gap-6 md:gap-2 lg:gap-4">
          <Link
            href="/home/cart"
            className="cursor-pointer transition-transform duration-300 ease-in-out transform hover:scale-[1.4]"
          >
            <FaCartShopping className="text-inputText w-[27px] h-[27px]" />
          </Link>
          <Link
            href="/home/notifications"
            className="relative cursor-pointer transition-transform duration-300 ease-in-out transform hover:scale-[1.4]"
          >
            <IoIosNotifications className="text-inputText w-[27px] h-[27px]" />
            <div className="absolute top-0 right-0 w-[15px] h--[15px] rounded-full bg-button2 cursor-pointer flex justify-center items-center">
              <p className="text-[10px] text-white ">{notificationCount}</p>
            </div>
          </Link>
          <DropDownList />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
