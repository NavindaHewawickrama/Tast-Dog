"use client";
import React from "react";
import MyCart from "@/constants/MyCart";
import Link from "next/link";
import { useEffect, useState } from "react";
import {useRouter} from 'next/navigation';

const CartTotal = () => {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const[userName,setUserName]=useState<string>("");
  const[userId,setUserId]=useState<string>("");

  const handleTotal=()=>{
    let total = 0;
    cartItems.forEach((item: any) => {
      total += item.price * item.quantity;
    });

    total = parseFloat(total.toFixed(2));
    setTotalPrice(total);
  }

  useEffect(() => {
    const userID = localStorage.getItem("userId") ?? "";
    const userNames = localStorage.getItem("userName") ?? "";
    const storedCartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
    setCartItems(storedCartItems);
    setUserName(userNames);
    setUserId(userID);
    handleTotal();
     console.log(storedCartItems);
  }, []);

  

  const handleClick=()=>{
    const cart = localStorage.getItem("cartItems");
    // try{
    //   //const response = await fetch("https://tasty-dog.onrender.com/api/v1/payments/placeOrder",{method:"POST",body:cart}); 
    // }
  };

  

  

  return (
    <div className="w-full px-[40px] py-[40px] flex flex-col shadow-xl rounded-lg">
      <div className="flex justify-between  items-center ">
        <h3 className="xl:text-[18px] md:text-[14px] text-inputText capitalize">
          item
        </h3>
        <div className="flex gap-[80px]">
          <h3 className="xl:text-[18px] md:text-[14px] text-inputText ">Qty</h3>
          <h3 className="xl:text-[18px] md:text-[14px] text-inputText capitalize">
            price
          </h3>
        </div>
      </div>
      <div className="flex flex-col xl:gap-2 md:gap-1 mt-10 ">
        {cartItems.map((item) => (
          <div className="flex justify-between items-center" key={item.id}>
            <h3 className="xl:text-[18px] md:text-[16px] capitalize font-medium">
              {item.itemName}
            </h3>
            <div className="flex gap-[80px]">
              <h3 className="xl:text-[18px] md:text-[16px] capitalize font-medium">
                {item.quantity}
              </h3>
              <h3 className="xl:text-[18px] md:text-[16px] capitalize font-medium">
                {item.price}
              </h3>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-between mt-10">
        <h3 className="text-[20px] capitalize text-button2">total:</h3>
        <h3 className="text-[20px] capitalize text-button2">${totalPrice}</h3>
      </div>
      <Link
        // onClick={() => handleClick()}
        href="/home/checkout"
        className="w-full flex justify-center items-center bg-buttonGreen text-white h-[45px] text-[20px] cursor-pointer capitalize mt-8 rounded-xl transition-transform duration-300 ease-in-out transform hover:scale-95"
      ><button onClick={()=>handleClick()}>place order</button>
      </Link>
    </div>
  );
};

export default CartTotal;
