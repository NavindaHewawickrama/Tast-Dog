"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { GoDotFill } from "react-icons/go";
import { FaPhoneAlt } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import FoodReview from "@/components/models/FoodReview";
import PageTransition from "@/components/PageTransition";

const MyOrders = () => {
  const [statusVal, setStatusVal] = useState("");
  const [reviewModal, setReviewModal] = useState(false);
  const [orderData, setOrderData] = useState<any[]>([]);
  const [name,setName] = useState(null);
  const [address, setAddress] = useState(null);
  const [time,setTime] = useState("");
  const [itemName,setItemName]= useState("");
  const [itemImage,setItemImage]= useState("");
  const [itemPrice, setItemPrice] = useState("");
  const[itemId, setItemId] = useState("");
  const [shopIdOrder, setShopIdOrder] = useState("");
  const [userId, setUserId] = useState<any | null>("");
  

  const handleReview = () => {
    console.log(itemId, itemName);
    setReviewModal(true);
    localStorage.setItem("itemId",itemId);
    localStorage.setItem("shopIdOrder", shopIdOrder);
    localStorage.setItem("reviewFoodItemName", itemName);
    localStorage.setItem("itemIdForReview",itemId);
    console.log(shopIdOrder);
  }

  useEffect(() => {
    const uId = localStorage.getItem("userId");
    setUserId(uId);
    //getting order data from API
    const fetchData = async () => {
      try {
        const response = await fetch(`https://tasty-dog.onrender.com/api/v1/orders/getOrdersOfUser/${uId}`);
        const data = await response.json();
        if(!response){
          console.log(response);
          window.alert("Error in loading data");
          setOrderData(data.reverse());
        }else{
          console.log(data);
          setOrderData(data.reverse());
        }
      } catch (error) {
        console.log(error); 
      }
    };

    fetchData();
    
  }, []);

  const handleOrder = (item: any) => {
    setStatusVal(item.status);
    setName(item.userName);
    setAddress(item.orderAddress);
    setItemImage(item.itemId.itemImages[0]);
  
    // Extract date and time from the datetime string
    const dateTime = new Date(item.createdAt);
    const date = dateTime.toLocaleDateString();
  
    // Set the extracted date and time
    setTime(date);
    setItemName(item.itemId.itemName);
    setItemPrice(item.price);
    setItemId(item.itemId._id);
    setShopIdOrder(item.shopId);
  }

  const handleCancel = async (id: any ) =>{
    const uId = localStorage.getItem("userId");
    try{
      const response = await fetch("https://tasty-dog.onrender.com//api/v1/orders/cancelOrder",{
        method:"POST",
        headers: {
          "Content-Type":"application/json",
        },
        body: JSON.stringify({
          orderId: id,
          userId: uId,
          userType: "owner",
        }),
      });
      const data = await response.json();
      if(!response.ok){
        window.alert("Error in cancelling order");
      }else{
        window.alert("Order cancelled successfully");
      }
    }catch(error){
      console.log(error);
    }
  }

 
  return (
    <>
      <PageTransition>
        <div className="w-full xl:px-[50px] md:px-[30px]  py-[30px] ">
          <h2 className="ml-[80px] text-[24px] font-bold capitalize">
            my orders
          </h2>
          <div className="w-full h-full flex flex-row xl:gap-[50px] md:gap-[25px] mt-10">
            <div className="w-[55%]  h-full flex flex-col rounded-xl  shadow-gray-300 shadow-xl overflow-hidden">
            {Array.isArray(orderData) && orderData.length === 0 ? (
              <div className="w-full flex justify-center items-center text-primary text-[20px] font-medium">
                No orders yet
              </div>
              ):(
                Array.isArray(orderData) && orderData.map((item, index) => (
                <div
                  key={index}
                  className="w-full px-5 py-4 flex flex-row shadow-inner shadow-gray-300 lg:gap-5 md:gap-2 items-center  cursor-pointer"
                  // onClick={() => setStatusVal(item.status)}
                  onClick={()=>handleOrder(item)}
                >
                  <div>
                    <h2 className="text-[16px] text-primary">ID #00500 </h2>
                    <Image
                      src={item.itemId.itemImages[0] || item.itemId.itemImages}
                      // src="/path/to/your/image.jpg"
                      alt={item.itemId.itemName}
                      width={123}
                      height={123}
                      className="rounded-xl mt-2"
                    />
                  </div>

                  <div className="flex flex-col justify-center">
                  <h2
                      className={`font-normal mb-1 ${
                        item.itemId.itemName.length > 16 ? 'text-[14px]' : 'xl:text-[24px] md:text-[18px]'
                      }`}
                    >
                      {item.itemId.itemName} 
                    </h2>
                    <p className="text-[16px] text-green-700 font-semibold">
                      Total: <span> ${item.price}</span>
                    </p>
                    <p className="text-[16px] font-semibold text-inputText">
                     x{item.quantity}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 ml-10 mr-0">
                    <GoDotFill
                      className={
                        item.status == "Processing"
                          ? "text-[15px] text-button2"
                          : "text-[15px] text-Green2"
                      }
                    />
                    <h2
                      className={
                        item.status == "Processing"
                          ? "xl:text-[15px] md:text-[12px] text-button2"
                          : "xl:text-[15px] md:text-[12px] text-Green2"
                      }
                    >
                      {item.status}
                    </h2>
                  </div>
                </div>
              ))
            )}
            </div>

            {!statusVal ? (
              <div className="w-[45%]  flex justify-center items-center  rounded-xl  shadow-gray-300 shadow-xl">
                <Image
                  src="/my_orders.png"
                  alt="logo"
                  width={228}
                  height={280}
                />
              </div>
            ) : statusVal === "Processing" ? (
              <div className="w-[45%] flex flex-col px-[30px] py-[25px] rounded-xl  shadow-gray-300 shadow-xl">
                <h3 className="text-[20px] text-inputText capitalize">
                  order id: <span className="text-primary"> #00500</span>{" "}
                </h3>
                <div className="flex items-center gap-5 mt-1">
                  <h3 className="text-[20px] text-inputText capitalize">
                    order status:
                  </h3>
                  <div className="flex ">
                    <GoDotFill className="text-[20px] text-button2" />
                    <p className="text-[15px] text-button2">processing</p>
                  </div>
                </div>
                <div className="xl:w-[380px] lg:w-[300px] md:w-[200px] h-full mx-auto mt-7">
                  <div className="w-full flex flex-col px-[15px] py-[15px] bg-lighterGreen gap-1 border-gray-200 border-2">
                    <p className="text-[12px] text-inputText capitalize">
                      Delivered & billed To
                    </p>
                    <h4 className="text-[16px] text-primary font-medium capitalize">
                      {name}
                    </h4>
                    <h4 className="text-[16px] text-detail font-medium capitalize">
                      +94 222 322 232
                    </h4>
                    <p className="text-[15px] text-inputText capitalize">
                      {address}
                    </p>
                    <p className="text-[11px] text-inputText capitalize">
                      {time}
                    </p>
                  </div>
                  <div className="w-full mt-10">
                    <p className="text-[12px] text-inputText">Items Qty</p>

                    <div className="w-full h-[210px] flex flex-col gap-5 rounded-xl shadow-xl px-[15px] py-[15px] mt-4 ">
                      <div className="flex items-center gap-4">
                        <Image
                          src={itemImage}
                          alt="product_image"
                          width={65}
                          height={65}
                          className="rounded-full"
                        />
                        <div className="flex flex-col">
                          <h4 className="text-primary text-[16px] font-bold capitalize">
                            {itemName}
                          </h4>
                          <p className="text-[13px] text-detail capitalize">
                          Total :${itemPrice}
                          </p>
                          <p className="text-[13px] text-inputText ">xl</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 mt-10">
                    <button className="w-full h-[38px] flex justify-center items-center gap-4 bg-buttonGreen rounded-lg text-white transition-transform duration-300 ease-in-out transform hover:scale-95">
                      <FaPhoneAlt className="text-[12px]" />
                      <p className="text-[12px] capitalize">Contact shop</p>
                    </button>
                    <button 
                    onClick={()=>handleCancel(itemId)}
                    className="w-full flex justify-center items-center h-[38px] bg-none border border-button2 rounded-lg text-[12px] text-button2 capitalize transition-transform duration-300 ease-in-out transform hover:scale-95">
                      cancel order
                    </button>
                  </div>
                </div>
              </div>
            ) :statusVal === "Completed" ? (
              <div className="w-[45%] flex flex-col rounded-xl px-[30px] py-[25px] shadow-gray-300 shadow-xl">
                <h3 className="text-[20px] text-inputText capitalize">
                  order id: <span className="text-primary"> #00500</span>{" "}
                </h3>
                <div className="flex items-center gap-5 mt-1">
                  <h3 className="text-[20px] text-inputText capitalize">
                    order status:
                  </h3>
                  <div className="flex ">
                    <GoDotFill className="text-[20px] text-buttonGreen" />
                    <p className="text-[15px] text-buttonGreen">Completed</p>
                  </div>
                </div>
                <div className="xl:w-[380px] lg:w-[300px] md:w-[200px] h-full mx-auto mt-10">
                  <div className="w-full flex flex-col px-[15px] py-[15px] bg-lighterGreen gap-1  border-gray-200 border-2">
                    <p className="text-[12px] text-inputText capitalize">
                      Delivered & billed To
                    </p>
                    <h4 className="text-[16px] text-primary font-medium capitalize">
                    {name}
                    </h4>
                    <h4 className="text-[16px] text-detail font-medium capitalize">
                      +94 222 322 232
                    </h4>
                    <p className="text-[15px] text-inputText capitalize">
                      {address}
                    </p>
                    <p className="text-[11px] text-inputText capitalize">
                    {time}
                    </p>
                  </div>
                  <div className="w-full mt-10">
                    <p className="text-[12px] text-inputText">Items Qty</p>
                    <div className="w-full h-full bg-inputBlue shadow-xl rounded-xl px-[20px] py-[20px] flex flex-col gap-4 mt-5">
                      <div className="flex items-center bg-white gap-4 px-[10px] py-[10px] rounded-xl ">
                        <Image
                          src={itemImage}
                          alt="product_image"
                          width={65}
                          height={65}
                          className="rounded-full"
                        />
                        <div className="flex flex-col">
                          <h4 className="text-primary text-[16px] font-bold capitalize">
                          {itemName}
                          </h4>
                          <p className="text-[13px] text-detail capitalize">
                          Total :${itemPrice}
                          </p>
                          <p className="text-[13px] text-inputText ">xl</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-[75px] w-full flex flex-col gap-3">
                    <button
                      // onClick={() => setReviewModal(true)}
                      onClick={()=>handleReview()}
                      className="w-full h-[40px] bg-button2 flex justify-center items-center gap-5 text-white rounded-lg transition-transform duration-300 ease-in-out transform hover:scale-95"
                    >
                      <FaStar className="text-[15px] " />
                      <p className="text-[13px] capitalize">Write A Review</p>
                    </button>
                    <button className="w-full h-[40px] bg-buttonGreen flex justify-center items-center gap-5 text-white rounded-lg transition-transform duration-300 ease-in-out transform hover:scale-95">
                      <FaPhoneAlt className="text-[15px] " />
                      <p className="text-[13px] capitalize">contact shop</p>
                    </button>
                  </div>
                </div>
              </div>
            ):statusVal === "Cancelled" ?(
              <div className="w-[45%] flex flex-col rounded-xl px-[30px] py-[25px] shadow-gray-300 shadow-xl">
                <h3 className="text-[20px] text-inputText capitalize">
                  order id: <span className="text-primary"> #00500</span>{" "}
                </h3>
                <div className="flex items-center gap-5 mt-1">
                  <h3 className="text-[20px] text-inputText capitalize">
                    order status:
                  </h3>
                  <div className="flex ">
                    <GoDotFill className="text-[20px] text-buttonGreen" />
                    <p className="text-[15px] text-buttonGreen">Cancelled</p>
                  </div>
                </div>
                <div className="xl:w-[380px] lg:w-[300px] md:w-[200px] h-full mx-auto mt-10">
                  <div className="w-full flex flex-col px-[15px] py-[15px] bg-lighterGreen gap-1  border-gray-200 border-2">
                    <p className="text-[12px] text-inputText capitalize">
                      Delivered & billed To
                    </p>
                    <h4 className="text-[16px] text-primary font-medium capitalize">
                    {name}
                    </h4>
                    <h4 className="text-[16px] text-detail font-medium capitalize">
                      +94 222 322 232
                    </h4>
                    <p className="text-[15px] text-inputText capitalize">
                    {address}
                    </p>
                    <p className="text-[11px] text-inputText capitalize">
                    {time}
                    </p>
                  </div>
                  <div className="w-full mt-10">
                    <p className="text-[12px] text-inputText">Items Qty</p>
                    <div className="w-full h-full bg-inputBlue shadow-xl rounded-xl px-[20px] py-[20px] flex flex-col gap-4 mt-5">
                      <div className="flex items-center bg-white gap-4 px-[10px] py-[10px] rounded-xl ">
                        <Image
                          src={itemImage}
                          alt="product_image"
                          width={65}
                          height={65}
                          className="rounded-full"
                        />
                        <div className="flex flex-col">
                          <h4 className="text-primary text-[16px] font-bold capitalize">
                            {itemName}
                          </h4>
                          <p className="text-[13px] text-detail capitalize">
                          Total :${itemPrice}
                          </p>
                          <p className="text-[13px] text-inputText ">xl</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-[75px] w-full flex flex-col gap-3">
                    <button
                      // onClick={() => setReviewModal(true)}
                      onClick={()=>handleReview()}
                      className="w-full h-[40px] bg-button2 flex justify-center items-center gap-5 text-white rounded-lg transition-transform duration-300 ease-in-out transform hover:scale-95"
                    >
                      <FaStar className="text-[15px] " />
                      <p className="text-[13px] capitalize">Write A Review</p>
                    </button>
                    <button className="w-full h-[40px] bg-buttonGreen flex justify-center items-center gap-5 text-white rounded-lg transition-transform duration-300 ease-in-out transform hover:scale-95">
                      <FaPhoneAlt className="text-[15px] " />
                      <p className="text-[13px] capitalize">contact shop</p>
                    </button>
                  </div>
                </div>
              </div>
            
            ):(
              <div className="w-[45%] flex flex-col rounded-xl px-[30px] py-[25px] shadow-gray-300 shadow-xl">
                <h3 className="text-[20px] text-inputText capitalize">
                  order id: <span className="text-primary"> #00500</span>{" "}
                </h3>
                <div className="flex items-center gap-5 mt-1">
                  <h3 className="text-[20px] text-inputText capitalize">
                    order status:
                  </h3>
                  <div className="flex ">
                    <GoDotFill className="text-[20px] text-buttonGreen" />
                    <p className="text-[15px] text-buttonGreen">New Order</p>
                  </div>
                </div>
                <div className="xl:w-[380px] lg:w-[300px] md:w-[200px] h-full mx-auto mt-10">
                  <div className="w-full flex flex-col px-[15px] py-[15px] bg-lighterGreen gap-1  border-gray-200 border-2">
                    <p className="text-[12px] text-inputText capitalize">
                      Delivered & billed To
                    </p>
                    <h4 className="text-[16px] text-primary font-medium capitalize">
                    {name}
                    </h4>
                    <h4 className="text-[16px] text-detail font-medium capitalize">
                      +94 222 322 232
                    </h4>
                    <p className="text-[15px] text-inputText capitalize">
                    {address}
                    </p>
                    <p className="text-[11px] text-inputText capitalize">
                    {time}
                    </p>
                  </div>
                  <div className="w-full mt-10">
                    <p className="text-[12px] text-inputText">Items Qty</p>
                    <div className="w-full h-full bg-white shadow-inner rounded-xl px-[20px] py-[20px] flex flex-col gap-4 mt-5 overflow-y-auto">
                    <div className="flex items-center bg-white gap-4 px-[10px] py-[10px] rounded-xl">
                      <Image
                        src={itemImage}
                        alt="product_image"
                        width={65}
                        height={65}
                        className="rounded-full"
                      />
                      <div className="flex flex-col">
                        <h4 className="text-primary text-[16px] font-bold capitalize">
                          {itemName}
                        </h4>
                        <p className="text-[13px] text-detail capitalize">
                          Total: ${itemPrice}
                        </p>
                        <p className="text-[13px] text-inputText">xl</p>
                      </div>
                    </div>
                  </div>
                  </div>
                  <div className="mt-[75px] w-full flex flex-col gap-3">
                    <button
                      // onClick={() => setReviewModal(true)}
                      onClick={()=>handleReview()}
                      className="w-full h-[40px] bg-button2 flex justify-center items-center gap-5 text-white rounded-lg transition-transform duration-300 ease-in-out transform hover:scale-95"
                    >
                      <FaStar className="text-[15px] " />
                      <p className="text-[13px] capitalize">Write A Review</p>
                    </button>
                    <button className="w-full h-[40px] bg-buttonGreen flex justify-center items-center gap-5 text-white rounded-lg transition-transform duration-300 ease-in-out transform hover:scale-95">
                      <FaPhoneAlt className="text-[15px] " />
                      <p className="text-[13px] capitalize">contact shop</p>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </PageTransition>
      <FoodReview open={reviewModal} onClose={() => setReviewModal(false)}/>
    </>
  );
};

export default MyOrders;
