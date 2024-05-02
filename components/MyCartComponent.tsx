"use client";
import React, { useState,useEffect } from "react";
import MyCart from "@/constants/MyCart";
import { FaRegStopCircle } from "react-icons/fa";
import Image from "next/image";

const MyCartComponent = () => {
  const [checkedIndex, setCheckedIndex] = useState<number | null>(null);
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [shopName, setShopName] = useState<string>("");
  const [qty, setQty] = useState<number>(1);

  useEffect(()=>{
    const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
    setCartItems(cartItems);

    const shopName = localStorage.getItem("shopName") || "";
    setShopName(shopName);
  },[]);

  // Function to toggle the checked state of a checkbox

  const toggleChecked = (index: number) => {
    if (index === checkedIndex) {
      // If the clicked checkbox is already checked, uncheck it
      setCheckedIndex(null);
    } else {
      setCheckedIndex(index);
    }
    
  };

  const incrementQty = (index: number) => {
    var qtyp  = qty + 1;
    setQty(qtyp);
  };

  const decrementQty = (index: number) => {
    var qtyp  = qty - 1;
    setQty(qtyp);
  };

  return (
    <div className="w-full flex flex-col">
      {cartItems.map((item, index) => (
        <div
          className="flex justify-between items-center py-[25px] px-[10px] shadow-xl"
          key={index}
        >
          <div className="flex gap-7 items-center">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 flex justify-center items-center border-2 border-green-500 cursor-pointer rounded-full px-0.5">
                <input
                  type="checkbox"
                  id={`roundedCheckbox${index}`}
                  className="appearance-none rounded-full w-4 h-4 checked:bg-green-500 checked:border-transparent cursor-pointer"
                  checked={checkedIndex === index}
                  onChange={() => toggleChecked(index)}
                />
              </div>

              <Image
                src={item.itemImages}
                alt="order_image"
                width={125}
                height={125}
                className=" w-full h-full rounded-xl"
              />
            </div>
            <div className="flex flex-col justify-center">
              <h3 className="text-[24px] capitalize font-medium">
                {item.itemName}
              </h3>
              <p className="text-[15px] text-inputText">{shopName}</p>
              <h3 className="text-[28px] text-primary font-medium mt-4">
                ${item.price}
              </h3>
            </div>
          </div>
          <div className="flex items-center justify-center gap-7 px-[40px]">
            <p className="text-[18px] text-inputText">qty</p>
            <div className="flex items-center gap-4">
              <button
                className="text-[20px] text-inputText cursor-pointer"
                onClick={() => decrementQty(index)}
              >
                -
              </button>
              <p className="text-[18px] text-inputText">{qty}</p>
              <button
                className="text-[20px] text-inputText cursor-pointer"
                onClick={() => incrementQty(index)}
              >
                +
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyCartComponent;
