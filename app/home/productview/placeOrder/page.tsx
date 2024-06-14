"use client";
//#region imports

import React, { useState, useEffect } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { CiEdit } from "react-icons/ci";
import { HiGiftTop } from "react-icons/hi2";
import Image from "next/image";
import Link from "next/link";
import ChangeAddress from "@/components/models/AccountModels/ChangeAddress";
import PageTransition from "@/components/PageTransition";
import profilePic from "./../../../../public/Logo2.png";

//#endregion


const PlaceOrder = () => {
  //#region useStates
  const [toggle, setToggle] = useState(false);
  const [address1, setAddress1] = useState<any | null>([]);
  const [city, setCity] = useState<string | null>("");
  const [stateProvince, setStateProvince] = useState<string | null>("");
  const [landMark, setLandMark] = useState<string | null>("");
  const [userName, setUserName] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [product, setProduct] = useState<any[]>([]);
  const [shopName, setShopName] = useState<any| null>(null);
  const [shopImage, setShopImage] = useState<any | null>(null);
  const [total, setTotal] = useState<any | null>(null);
  const [cartItems, setCartItems] = useState<any[]|null>(null);
  //#endregion


  const getUserAddress = async () => {
    const id = localStorage.getItem("userId");
    const buyingProduct = localStorage.getItem("buyProductPlaceOrder");
    setShopName(localStorage.getItem("buyProductShopName"));
    setShopImage(localStorage.getItem("buyProductShopImage"));
    // Check if buyingProduct exists and is an array before setting
    if (buyingProduct && Array.isArray(JSON.parse(buyingProduct))) {
      setProduct(JSON.parse(buyingProduct));
    } else {
      setProduct([]); // Set to empty array if not an array or doesn't exist
    }
    setUserId(id);
    try{
      const response2 = await fetch(`https://tasty-dog.onrender.com/api/v1/addresses/${id}`);
      const data = await response2.json();
      if(!response2.ok){
        window.alert("Some kind of problem occured. Please try again.");
        console.log(data);
      }else{
        setAddress1(data);  
      }
    }catch(error){
      console.error(error);
    }
  };

const handlePrice = (price:any)=>{
  let priceItem = parseInt(price);
  priceItem = priceItem - 1.99;
  return priceItem;
}


//handling sending price to checkout
const handleCheckout=()=>{
  if(address1.length == 1){
    localStorage.setItem("buyerAddress", address1);
  }else{
    localStorage.setItem("buyerAddress", address1[0]);
  }


  
  let cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
  product.forEach((item) => {
    const existingProductIndex = cartItems.findIndex((cartItem: { _id: any; }) => cartItem._id === item._id);
    if (existingProductIndex > -1) {
      // If the product already exists, update its quantity
      cartItems[existingProductIndex].quantity += 1; 
    } else {
      // If the product does not exist, add it to the cart
      cartItems.push({ ...item, quantity: 1 }); 
    }
    localStorage.removeItem("buyProductPlaceOrder");
  });

}

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
                  {address1.length > 0 &&
                    address1.slice(0, 3).map((address: any) => (
                  <div className="flex flex-col justify-center gap-1" key={address1._id}>
                    <h3 className="text-[14px] fpnt-semibold">
                      {/* {address1} , {address2}, {city}, {stateProvince}, {landMark}, */}
                      {address.aptSuite}, {address.streetAddress}, {address.city}, {address.state}, {address.landmark}
                    </h3>
                    <p className="text-[12px] text-inputText">
                      {userName}: +94 222 222 222
                    </p>
                  </div>
                  ))}
                </div>
                <div className="flex justify-center items-center">
                  <CiEdit
                    className="text-[30px] cursor-pointer text-inputText"
                    onClick={() => setToggle(true)}
                  />
                </div>
              </div>
              {product.length > 0 && (product.map((item: any) => (
              <div className="w-full h-[350px] flex flex-col gap-5 px-[50px] py-[25px] rounded-[20px] shadow-xl" key={item._id}>
                <div className="flex  gap-5">
                  <Image
                    src={shopImage? shopImage : profilePic}
                    alt="Brand_Logo"
                    width={60}
                    height={60}
                  />
                  <h3 className="text-[18px] text-inputText">{shopName}</h3>
                </div>
                <div className="w-full flex justify-between">
                  <div className="flex gap-5 items-center">
                    <Image
                      src={item.itemImages? item.itemImages[0] : profilePic}
                      alt="food_image"
                      width={120}
                      height={120}
                      className="rounded-xl"
                    />
                    <h3 className="text-[20px] font-semibold capitalize">
                      {item.itemName}
                    </h3>
                  </div>
                  <div className="flex justify-center items-center gap-[100px]">
                    <p className="text-[16px] font-semibold text-inputText">
                      *1
                    </p>
                    <p className="text-[16px] font-semibold text-primary">
                      ${item.price}
                    </p>
                  </div>
                </div>
                
              </div>
                )     ))}
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
                {product.length > 0 && (product.map((item: any) => (
                <div className="flex flex-col justify-center gap-1 mt-4">
                  <div className="flex justify-between">
                    <p className="text-[15px] text-detail">Item’s Total</p>
                    <p className="text-[15px] text-detail">${item.price}</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-[15px] text-detail">Delivery Fees</p>
                    <p className="text-[15px] text-detail">$1.99</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-[15px] text-detail">Total Payment</p>
                    <p className="text-[15px] text-detail">${handlePrice(item.price)}</p>
                  </div>
                </div>
                )     ))}
              </div>
              <Link
                href={"/home/checkout"}
                onClick={handleCheckout}
                className="w-full py-[10px] rounded-xl bg-buttonGreen text-[20px] text-white capitalize text-center mt-10 cursor-pointer transition-transform duration-300 ease-in-out transform hover:scale-95"
              >
                place order
              </Link>
            </div>
          </div>
        </section>
      </PageTransition>
      <ChangeAddress open={toggle} onClose={() => setToggle(false)} addresses={[]} />
    </>
  );
};

export default PlaceOrder;
