"use client";

import React, { useState, useEffect } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { CiEdit } from "react-icons/ci";
import { HiGiftTop } from "react-icons/hi2";
import Image from "next/image";
import Link from "next/link";
import ChangeAddress from "@/components/models/AccountModels/ChangeAddress";
import PageTransition from "@/components/PageTransition";

const PlaceOrder = () => {
  const [toggle, setToggle] = useState(false);
  const [address1, setAddress1] = useState<string | null>("Road none");
  const [address2, setAddress2] = useState<string | null>("Road 2 nnoe");
  const [city, setCity] = useState<string | null>("");
  const [stateProvince, setStateProvince] = useState<string | null>("");
  const [landMark, setLandMark] = useState<string | null>("");
  const [userName, setUserName] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);

  const getUserAddress = async () => {
    const id = localStorage.getItem("userId");
    console.log(id);
    setUserId(id);
    try{
      const response2 = await fetch(`https://tasty-dog.onrender.com/api/v1/addresses/${id}`);
      const data = await response2.json();
      if(!response2.ok){
        window.alert("Some kind of problem occured. Please try again.");
        console.log(data);
      }else{
        console.log(data);
        setAddress1(data.aptSuite);
        setAddress2(data.streetAddress);
        setCity(data.city);
        setStateProvince(data.state);
        setLandMark(data.landmark);
      }
    }catch(error){
      console.error(error);
    }
  };

  useEffect(() => {
    getUserAddress();
  },[]);

  return (
    <>
      <PageTransition>
        <section className="w-full h-full px-[60px] xl:py-[100px] md:py-[50px] mx-auto">
          <div className="w-full h-full flex lg:flex-row md:flex-col gap-10 ">
            <div className="lg:w-[65%] mdw-full flex flex-col gap-6 ">
              <div className="w-full px-[50px] py-[25px] shadow-xl rounded-xl flex justify-between items-center">
                <div className="flex items-center gap-[60px]">
                  <FaLocationDot className="text-[25px] text-button2" />
                  <div className="flex flex-col justify-center gap-1">
                    <h3 className="text-[14px] fpnt-semibold">
                      {address1} , {address2}, {city}, {stateProvince}, {landMark},
                    </h3>
                    <p className="text-[12px] text-inputText">
                      {userName}: +94 222 222 222
                    </p>
                  </div>
                </div>
                <div className="flex justify-center items-center">
                  <CiEdit
                    className="text-[30px] cursor-pointer text-inputText"
                    onClick={() => setToggle(true)}
                  />
                </div>
              </div>
              <div className="w-full h-[350px] flex flex-col gap-5 px-[50px] py-[25px] rounded-[20px] shadow-xl">
                <div className="flex  gap-5">
                  <Image
                    src="/Dominos.webp"
                    alt="Brand_Logo"
                    width={60}
                    height={60}
                  />
                  <h3 className="text-[18px] text-inputText">Domino’s Pizza</h3>
                </div>
                <div className="w-full flex justify-between">
                  <div className="flex gap-5 items-center">
                    <Image
                      src="/soup.webp"
                      alt="food_image"
                      width={120}
                      height={120}
                      className="rounded-xl"
                    />
                    <h3 className="text-[20px] font-semibold capitalize">
                      Shrimp Soup
                    </h3>
                  </div>
                  <div className="flex justify-center items-center gap-[100px]">
                    <p className="text-[16px] font-semibold text-inputText">
                      *1
                    </p>
                    <p className="text-[16px] font-semibold text-primary">
                      $8.99
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="lg:w-[35%] md:w-[7
          0%] flex flex-col h-full justify-center items-center  shadow-xl rounded-xl px-[25px] py-[40px]"
            >
              <div className="flex items-center gap-2">
                <HiGiftTop className="text-[40px] text-buttonGreen" />
                <h3 className="text-[18px] font-semibold capitalize">
                  Loyalty Progress
                </h3>
              </div>
              <div className="w-full flex flex-col gap-1 mt-2">
                <p className="text-[14px] text-inputText capitalize">
                  You Are 3 Meals Away From our 10$ Discount
                </p>
                <div className="w-full bg-lightGreen rounded-full h-5 dark:bg-lightGreen mt-[10px] flex justify-between">
                  <div className="bg-buttonGreen h-5 rounded-full w-[45%] flex justify-between   px-[25px]">
                    <p className="text-[12px] text-white">0</p>
                  </div>
                  <p className="text-[12px] mr-[25px]">5</p>
                </div>
              </div>
              <div className="w-full h-full mx-auto mt-[70px]">
                <h3 className="text-[20px] font-semibold capitalize">
                  Order Summery
                </h3>
                <div className="flex flex-col justify-center gap-1 mt-4">
                  <div className="flex justify-between">
                    <p className="text-[15px] text-detail">Item’s Total</p>
                    <p className="text-[15px] text-detail">$8.99</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-[15px] text-detail">Delivery Fees</p>
                    <p className="text-[15px] text-detail">$1.99</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-[15px] text-detail">Total Payment</p>
                    <p className="text-[15px] text-detail">$10.00</p>
                  </div>
                </div>
              </div>
              <Link
                href={"/home/checkout"}
                className="w-full py-[10px] rounded-xl bg-buttonGreen text-[20px] text-white capitalize text-center mt-10 cursor-pointer transition-transform duration-300 ease-in-out transform hover:scale-95"
              >
                place order
              </Link>
            </div>
          </div>
        </section>
      </PageTransition>
      <ChangeAddress open={toggle} onClose={() => setToggle(false)} />
    </>
  );
};

export default PlaceOrder;
