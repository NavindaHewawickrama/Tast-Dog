"use client";
import React, { useState, useEffect } from "react";
import { HiGiftTop } from "react-icons/hi2";
import { AiOutlinePercentage } from "react-icons/ai";
import Image from "next/image";
import axios from "axios";
import PageTransition from "@/components/PageTransition";

interface Milestone {
  milestoneId: string;
  name: string;
  description: string;
  remainingOrders: number;
  expectedTotalOrders: number;
}

const Page: React.FC = () => {
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [inputPromoCode,setInputPromoCode]=useState("");
  const [promoCodeData, setpromoCodeData] = useState<any[]>([]);
  const [discount, setDiscount]=useState<GLfloat | null>(null);
  useEffect(() => {
    const userIDSvd = localStorage.getItem("userId");
    setUserId(userIDSvd);
  },[]);

 
  // const userId = "66418bd7b4bebad804c47867";

  const fetchMilestones = async () => {
    try {
      const response = await axios.post<Milestone[]>(
        "https://tasty-dog.onrender.com/api/v1/milestones/checkAvailableMilstonesForUser",
        {
          userId,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setMilestones(response.data);
    } catch (error) {
      console.error("Error fetching milestones:", error);
    }
  };

  useEffect(() => {
    fetchMilestones();
  }, []);

  const leastRemainingOrders = milestones.reduce(
    (min, milestone) => (milestone.remainingOrders < min ? milestone.remainingOrders : min),
    Infinity
  );

  const handlePromoCode =async()=>{
    console.log("Redeem button clicked"); // Debugging line
    if (typeof window !== 'undefined') {
      const promoCodeShopID = sessionStorage.getItem("promoCodeShopId");
      try{
        const response = await fetch(`https://tasty-dog.onrender.com/api/v1/promocodes/promocodes/getPromoCodesByShopId/${promoCodeShopID}`);
        const data = await response.json();
        console.log('data', data);
        if(!response || data.length === 0){
          alert('Invalid promo or expired');
        }else{
          setpromoCodeData(data);
          validatePromoCode();
        }
      }catch(e){
        console.log(e);
      }
    }
  };


  const validatePromoCode = ()=>{
    const data = promoCodeData;
    data.forEach(element => {
      if(element.code === inputPromoCode){
        const date = Date();
        if(date < element.validTillDate){
          setDiscount(element.discountAmount);
        }
      }else{
        console.log("not found");
      }
    });
    
  }


  return (
    <>
      <PageTransition>
        <div className="max-w-[1300px] px-[50px] py-[50px] flex gap-4">
          <div className="w-[50%] flex-1 ">
            <div className="w-full flex flex-col py-[50px] px-[30px] shadow-xl">
              <div className="flex flex-row items-center gap-10">
                <HiGiftTop className="w-[50px] h-[50px] text-buttonGreen" />
                <h2 className="font-semibold text-[32px] capitalize">
                  Loyalty rewards
                </h2>
              </div>
              {milestones.length === 0 && (
              <p className="mt-5">No data available</p>
            )}
              {milestones.length !=0 && <>
                <div className="w-full mt-[50px]">
                <p className="text-16px text-inputText capitalize">
                  {`You Are ${leastRemainingOrders} Meals Away From our 10$ Discount`}
                </p>
                <div className="w-full bg-lightGreen rounded-full h-5 dark:bg-lightGreen mt-[10px]">
                  <div className="bg-buttonGreen h-5 rounded-full" style={{ width: `${(leastRemainingOrders / 5) * 100}%` }}></div>
                </div>
              </div>
              <div className="w-full mt-[50px] flex flex-col gap-4">
                {milestones.map((milestone) => (
                  <div key={milestone.milestoneId} className="flex w-full px-[30px] py-[30px] bg-lighterGreen shadow-lg">
                    <div className="w-[90%]">
                      <h3 className="text-[16px] font-semibold capitalize mb-1">
                        {milestone.name}
                      </h3>
                      <p className="text-[13px] text-inputText">
                        {milestone.description}
                      </p>
                    </div>
                    <div className="w-[10%] flex items-center justify-center">
                      <p className="text-[14px] font-medium">{`${milestone.remainingOrders}/${milestone.expectedTotalOrders}`}</p>
                    </div>
                  </div>
                ))}
              </div>
              </>}
            </div>
            <div className="flex flex-col items-center bg-green-50 mt-10 shadow-black border rounded-xl border-gray-300 p-5">
              <div className="flex flex-row w-full gap-5 items-center justify-center">
                <AiOutlinePercentage className="text-[36px] text-buttonGreen" />
                <div className="flex-grow  h-[45px] border bg-inputBlue rounded-xl border-inputBorder ">
                  <input
                    type="text"
                    placeholder="promo code"
                    onChange={(e) => setInputPromoCode(e.target.value)}
                    className="w-full h-[45px] rounded-xl bg-inputBlue border-none px-3 text-inputText2 text-left text-[18px] "
                  />
                </div>
                <button
                  onClick={handlePromoCode}
                  className="py-[10px] px-5 h-[45px] rounded-xl bg-buttonGreen text-[16px] text-white capitalize cursor-pointer transition-transform duration-300 ease-in-out transform hover:scale-95"
                >
                  Redeem
                </button>
              </div>
            </div>
          </div>

          <div className="w-[50%] lg:flex md:hidden flex-1 flex justify-center items-center">
            <Image
              src="/loyalty.webp"
              alt="loyalty_logo"
              width={525}
              height={525}
            />
          </div>
        </div>
      </PageTransition>
    </>
  );
};

export default Page;
