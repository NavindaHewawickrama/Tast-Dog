import React from "react";
import { motion } from "framer-motion";
import dropIn from "@/utils/motion";
import Image from "next/image";

interface ModalProps {
  open: boolean;
  // Add the onClose function prop
}

const ReviewSuccsess: React.FC<ModalProps> = ({ open }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <motion.div
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="w-[540px] bg-white shadow-xl py-[25px] rounded-xl flex flex-col justify-center items-center"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="w-[420px] flex flex-col justify-center items-center">
          <Image
            src="/thank_you.webp"
            alt="review succses"
            width={250}
            height={250}
          />
          <h1 className="text-[32px] text-detail mt-1 capitalize text-center ">
            Thank You For shareing your experience with us
          </h1>
          <button
            onClick={() => window.location.reload()}
            className="w-full h-[32px] bg-buttonGreen flex justify-center items-center text-white text-[12px] rounded-md capitalize mt-10 transition-transform duration-300 ease-in-out transform hover:scale-95"
          >
            close
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default ReviewSuccsess;
