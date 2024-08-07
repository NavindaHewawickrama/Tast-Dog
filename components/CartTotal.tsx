"use client";
import React from "react";
import Link from "next/link";

interface CartTotalProps {
  cartItems: any[];
  totalPrice: number;
}

const CartTotal: React.FC<CartTotalProps> = ({ cartItems, totalPrice }) => {
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
                ${item.price}
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
        href="/home/checkout"
        className="w-full flex justify-center items-center bg-buttonGreen text-white h-[45px] text-[20px] cursor-pointer capitalize mt-8 rounded-xl transition-transform duration-300 ease-in-out transform hover:scale-95"
      >
        place order
      </Link>
    </div>
  );
};

export default CartTotal;
