"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import dropIn from "@/utils/motion";
import { FaStar } from "react-icons/fa";
import ReviewSuccsess from "./ReviewSuccsess";

interface ModalProps {
  open: boolean;
  onClose: () => void; // Add the onClose function prop
}

const ShopReview: React.FC<ModalProps> = ({ open, onClose }) => {
  const [successModel, setSuccessModel] = useState(false);
  const [rating, setRating] = useState<number | null>(null);
  const [rateColor, setRateColor] = useState<string | null>(null);

  if (!open) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
        onClick={onClose}
      >
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
              Feedback For (shop name)
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
                        onClick={() => setRating(currentRate)}
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
                  name="reviewText"
                  id="review"
                  className="w-full h-full bg-inputBlue border border-gray-200 rounded-lg text-[11px] text-inputText px-[12px] py-[12px]"
                  placeholder="What you think about our cooking"
                ></textarea>
              </div>
            </div>
            <button
              onClick={() => setSuccessModel(true)}
              className="w-full h-[32px] bg-buttonGreen flex justify-center items-center text-white text-[12px] rounded-md capitalize transition-transform duration-300 ease-in-out transform hover:scale-95"
            >
              submit
            </button>
          </div>
        </motion.div>
      </div>
      <ReviewSuccsess open={successModel} />
    </>
  );
};

export default ShopReview;
