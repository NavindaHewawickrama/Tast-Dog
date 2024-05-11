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
  const [quantities, setQuantities] = useState<number[]>([]);

  useEffect(() => {
    const cartItemsData = JSON.parse(localStorage.getItem("cartItems") || "[]");
    setCartItems(cartItemsData);
  
    const shopNameData = localStorage.getItem("shopName") || "";
    setShopName(shopNameData);
  
    // Initialize quantities array with default quantities for each item
    const initialQuantities = cartItemsData.map((cartItem: any) => cartItem.quantity);
    setQuantities(initialQuantities);
  }, []);

  // Function to toggle the checked state of a checkbox
  const toggleChecked = (index: number) => {
    setCheckedIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const incrementQty = (index: any) => {
    setQuantities((prevQuantities) =>
      prevQuantities.map((qty, i) => (i === index ? qty + 1 : qty))
    );
    updateLocalStorage(index, quantities[index] + 1);
  };

  const decrementQty = (index: any) => {
    setQuantities((prevQuantities) =>
      prevQuantities.map((qty, i) => (i === index && qty > 0 ? qty - 1 : qty))
    );
    if (quantities[index] === 0) {
      removeItem(index);
    } else {
      updateLocalStorage(index, quantities[index] - 1);
    }
  };

  const updateLocalStorage = (index: number, quantity: number) => {
    const updatedCartItems = [...cartItems];
    updatedCartItems[index].quantity = quantity;
    setCartItems(updatedCartItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
  };

  const removeItem = (index: number) => {
    const updatedCartItems = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedCartItems);
    setQuantities(quantities.filter((_, i) => i !== index));
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
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
              <p className="text-[18px] text-inputText">{quantities[index]}</p>
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
