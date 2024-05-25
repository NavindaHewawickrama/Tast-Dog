"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import { useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import { MdKeyboardArrowUp } from "react-icons/md";
import { MdArrowDropUp } from "react-icons/md";
import { IoIosNotifications } from "react-icons/io";
import { MdLogout } from "react-icons/md";

const DropDownList = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState<string>("");
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [cardDetails, setCardDetails] = useState<any[]>([]);
  const [imageUrl, setImageUrl] = useState<string | null>("");

  useEffect(() => {
    const userName = localStorage.getItem("userName");
    setName(userName || ""); 
    getUserInfor();
  });

  const handleLogout = () => {
    localStorage.removeItem("cartItems"); // Remove cartItems from localStorage
    localStorage.removeItem("savedCardDetails");
    localStorage.removeItem("buyProductPlaceOrder");
    setCartItems([]);
    setCardDetails([]); // Clear cartItems state
  };
  
  const getUserInfor = async () => {
    const emails = localStorage.getItem("userEmail");
    const pkey = localStorage.getItem("pwReg");
    try{
      const response = await fetch("https://tasty-dog.onrender.com/api/v1/customers/login",{
        method:"POST",
        headers: {
          "Content-Type":"application/json",
        },
        body: JSON.stringify({
          emailOrPhoneNumber: emails,
          password: pkey,
        }),
      });
      const data = await response.json();
      if(!response.ok){
       // console.log(data);
       window.alert("Some kind of problem occured. Please try again.");
       console.log(data);
      }else{
        setImageUrl(data.customer.profilePhoto);
      }
    }catch(error){
      console.error(error);
    }
  };

  return (
    <>
      <section className="relative">
        <div className="flex justify-between items-center lg:w-[210px] md:w-[200px] h-[60px] rounded-lg bg-lighterGreen px-[10px] py-[8px]">
          <Link href="/home/settings" className="flex items-center gap-4">
            <Image
              src={imageUrl || ""}
              alt="profil_pic"
              width={43}
              height={43}
              className="rounded-full h-auto transition-transform duration-300 ease-in-out transform hover:scale-[1.2]"
            />
            <h3 className="text-[14px] font-medium capitalize text-detail">
              {name}
            </h3>
          </Link>

          {!isOpen ? (
            <RiArrowDropDownLine
              className="w-[50px] h-[50px] text-inputText cursor-pointer transition-transform duration-300 ease-in-out transform hover:scale-[1.2]"
              onClick={() => setIsOpen(true)}
            />
          ) : (
            <MdArrowDropUp
              className="w-[50px] h-[50px] text-inputText cursor-pointer transition-transform duration-300 ease-in-out transform hover:scale-[1.2]"
              onClick={() => setIsOpen(false)}
            />
          )}
        </div>

        {isOpen && (
          <div className="absolute top-[60px] z-50  w-full h-[80px] bg-white shadow-xl rounded-xl flex flex-col justify-center items-center">
            <Link
              href="/home/notifications"
              className="flex items-center gap-2cursor-pointer"
            >
              <IoIosNotifications className="w-[24px] h-[24px]" />
              <h3 className="text-[15px] text-detail font-medium capitalize">
                notification manager
              </h3>
            </Link>
            <Link href="/" className="flex items-center gap-2 mt-5 text-red">
              <MdLogout className="w-[24px] h-[24px] text-red-600" />
              <h3 className="text-[15px] text-red-600 font-medium capitalize"  onClick={handleLogout}>
                Log out
              </h3>
            </Link>
          </div>
        )}
      </section>
    </>
  );
};

export default DropDownList;
