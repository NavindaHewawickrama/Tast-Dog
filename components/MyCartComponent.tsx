"use client";
import React from "react";
import Image from "next/image";

interface MyCartComponentProps {
  cartItems: any[];
  incrementQty: (index: number) => void;
  decrementQty: (index: number) => void;
  removeItem: (index: number) => void;
}

const MyCartComponent: React.FC<MyCartComponentProps> = ({
  cartItems,
  incrementQty,
  decrementQty,
  removeItem,
}) => {
  return (
    <div className="w-full flex flex-col">
      {cartItems.map((item, index) => (
        <div className="flex justify-between items-center py-[25px] px-[10px] shadow-xl" key={index}>
          <div className="flex items-center" style={{ width: '30%' }}>
            <Image
              src={item.itemImages ? item.itemImages : item.itemPhoto}
              alt="order_image"
              width={125}
              height={125}
              className="w-full h-full rounded-xl"
            />
          </div>
          <div className="gap-7" style={{ width: '65%' }}>
            <div>
              <h3  className="text-[24px] capitalize font-medium">
                {item.itemName}
              </h3>
            </div>
            <div  className="flex flex-col justify-center">
              <h3 className="text-[28px] text-primary font-medium mt-4">
                $ {item.price}
              </h3>
            </div>
            <div  className="flex items-left justify-left gap-7 pt-[20px]">
              <p className="text-[18px] text-inputText">Qty</p>
              <div className="flex items-center gap-4">
                <button
                  className="text-[20px] text-inputText cursor-pointer"
                  onClick={() => decrementQty(index)}
                >
                  -
                </button>
                <p className="text-[18px] text-inputText">{item.quantity}</p>
                <button
                  className="text-[20px] text-inputText cursor-pointer"
                  onClick={() => incrementQty(index)}
                >
                  +
                </button>
                <button
                  className="text-[20px] text-red-500 cursor-pointer"
                  onClick={() => removeItem(index)}
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyCartComponent;
