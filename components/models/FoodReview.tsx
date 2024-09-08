"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import dropIn from "@/utils/motion";
import { FaStar } from "react-icons/fa";
import ShopReview from "./ShopReview";
import CustomAlert from "../../app/alerts/customalert";


interface ModalProps {
  open: boolean;
  onClose: () => void; // Add the onClose function prop
}

const FoodReview: React.FC<ModalProps> = ({ open, onClose }) => {
  const [nextModel, setNextModel] = useState(false);
  const [rating, setRating] = useState<number | null>(null);
  const [rateColor, setRateColor] = useState<string | null>(null);
  const [comment, setComment] = useState("");
  const [itemName,setItemName] = useState<string | null>("");
  const[id,setId] = useState<string | null>("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const handleShowAlert = () => {
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000); // Auto-close after 3 seconds
  };

  useEffect (()=>{
    setItemName(localStorage.getItem("reviewFoodItemName"));
    setId(localStorage.getItem("itemIdForReview"));
  })

  const handleRating = async(rating:any)=>{
    setRating(rating);
    try{
      const response = await fetch("https://tasty-dog.onrender.com/api/v1/shop-item-ratings/shop-item-ratings",{
        method:"POST",
        headers: {
          "Content-Type":"application/json",
        },
        body: JSON.stringify({
          itemId:id,
          rating,
        }),
      });

      const data = await response.json();
        if(!response.ok){
          console.log(data.message || "An error occurred.");
        }else{
          // window.alert("Item Rating inserted");
          setAlertMessage("Item Rating inserted");
        handleShowAlert();
          console.log(data);
        }
    }catch(e){
      console.log(e);
    }
  }

  const handleNext= async ()=>{
    
    if(rating && comment){
      try{
        var itemId = id;
        var userId = localStorage.getItem("userId");
        console.log(comment,itemId,userId,rating);
        const response = await fetch("https://tasty-dog.onrender.com/api/v1/shop-item-reviews/shop-item-reviews",{
          method:"POST",
          headers: {
            "Content-Type":"application/json",
          },
          body: JSON.stringify({
            itemId,
            userId,
            rating,
            comment,
          }),
        });
        const data = await response.json();
        if(!response.ok){
          console.log(data.message || "An error occurred.");
        }else{
          // window.alert("Item Review inserted");
          setAlertMessage("Item Review inserted");
        handleShowAlert();
          console.log(data);
          setNextModel(true);
        }
        }catch(error){
          console.log("An error occurred. Please try again later." , error);
        }
      }
      
    }
  

  if (!open) return null;

  if (nextModel)
    return <ShopReview open={nextModel} onClose={() => setNextModel(false)} />;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
    >
       <CustomAlert 
              message={alertMessage}
              show={showAlert} 
              onClose={() => setShowAlert(false)} 
            />
      <motion.div
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="w-[540px] bg-white shadow-xl py-[25px] rounded-xl"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="w-full px-[45px] flex justify-between">
          <h3 className="text-[15px] capitalize font-semibold ">
            Feedback For {itemName}
          </h3>
          <h3
            className="text-[15px] capitalize cursor-pointer transition-transform duration-300 ease-in-out transform hover:scale-[1.3] hover:text-red-600"
            onClick={onClose}
          >
            X
          </h3>
        </div>
        <div className="w-[412px] mx-auto mt-10 flex flex-col gap-7">
          <div className="w-full flex flex-col gap-4">
            <h2 className="text-[16px] text-Green2 font-bold capitalize">
              ratings
            </h2>
            <div className="flex item-center justify-center gap-5">
              {[...Array(5)].map((star, index) => {
                const currentRate = index + 1;
                return (
                  <>
                    <div
                      key={index}
                      onClick={() => handleRating(currentRate)}
                      className="cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="rate"
                        value={currentRate}
                        className="hidden"
                      />
                      <FaStar
                        size={40}
                        color={
                          currentRate <=
                          (rateColor ? Number(rateColor) : rating || 0)
                            ? "yellow"
                            : "gray"
                        }
                      />
                    </div>
                  </>
                );
              })}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="text-[16px] text-Green2 font-bold capitalize">
              feedback
            </h2>
            <div className="w-full h-[116px] bg-inputBlue border border-inputText rounded-lg ">
              <textarea
              onChange={(e)=>setComment(e.target.value)}
                name="reviewText"
                id="review"
                className="w-full h-full bg-inputBlue border border-gray-200 rounded-lg text-[11px] text-inputText px-[12px] py-[12px]"
                placeholder="What you think about our cooking"
              ></textarea>
            </div>
          </div>
          <button
            // onClick={() => setNextModel(true)}
            onClick={()=>handleNext()}
            className="w-full h-[32px] bg-buttonGreen flex justify-center items-center text-white text-[12px] rounded-md capitalize transition-transform duration-300 ease-in-out transform hover:scale-95"
          >
            next
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default FoodReview;
