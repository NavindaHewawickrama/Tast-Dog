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
