import React from "react";
import { HiGiftTop } from "react-icons/hi2";
import { AiOutlinePercentage } from "react-icons/ai";
import Image from "next/image";
import PageTransition from "@/components/PageTransition";

const page = () => {
  return (
    <>
      <PageTransition>
        <div className=" max-w-[1300px]  px-[50px] py-[50px] flex gap-4">
          <div className="w-[50%] flex-1 ">
            <div className="w-full flex flex-col py-[50px] px-[30px] shadow-xl">
              <div className="flex flex-row items-center gap-10">
                <HiGiftTop className="w-[50px] h-[50px] text-buttonGreen" />
                <h2 className="font-semibold text-[32px] capitalize">
                  Loyalty rewards
                </h2>
              </div>
              <div className="w-full mt-[50px] ">
                <p className="text-16px text-inputText capitalize ">
                  You Are 3 Meals Away From our 10$ Discount
                </p>
                <div className="w-full bg-lightGreen rounded-full h-5 dark:bg-lightGreen mt-[10px]">
                  <div className="bg-buttonGreen h-5 rounded-full w-[45%]"></div>
                </div>
              </div>
              <div className="w-full mt-[50px] flex flex-col gap-4">
                <div className="flex w-full px-[30px] py-[30px] bg-lighterGreen shadow-lg">
                  <div className="w-[90%]">
                    <h3 className="text-[16px] text-semibold capitalize mb-1">
                      milestone 1
                    </h3>
                    <p className="text-[13px] text-inputText">
                      {" "}
                      Order 5 meals to earn a 10$ discount on your next purchase
                    </p>
                  </div>
                  <div className="w-[10%] flex items-center justify-center">
                    <p className="text-[14px] font-medium">3/5</p>
                  </div>
                </div>
                <div className="flex w-full px-[30px] py-[30px] bg-lighterGreen shadow-lg">
                  <div className="w-[90%]">
                    <h3 className="text-[16px] text-semibold capitalize mb-1">
                      milestone 2
                    </h3>
                    <p className="text-[13px] text-inputText">
                      {" "}
                      Order 10 meals to earn a 20$ discount on your next
                      purchase
                    </p>
                  </div>
                  <div className="w-[10%] flex items-center justify-center">
                    <p className="text-[14px] font-medium">3/10</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-row py-[50px] px-[30px] shadow-xl mt-5 justify-around items-center bg-lighterGreen gap-4 rounded-md">
              <AiOutlinePercentage className="text-[36px] text-primary" />
              <input
                type="text"
                placeholder="promo code"
                className="w-[356px] h-[48px] border-inputText rounded-xl px-3"
              />
              <button className="w-[100px] h-[48px] bg-buttonGreen text-center text-white text-[15px] capitalize rounded-md transition-transform duration-300 ease-in-out transform hover:scale-95">
                Redeem
              </button>
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

export default page;
