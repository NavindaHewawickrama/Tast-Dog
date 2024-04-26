import React from "react";
import { motion } from "framer-motion";
import dropIn from "@/utils/motion";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface ModalProps {
  open: boolean;
  onClose: () => void; // Add the onClose function prop
}

const OrderSuccsess: React.FC<ModalProps> = ({ open, onClose }) => {
  const router = useRouter();
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      <motion.div
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="w-[540px] bg-white flex flex-col items-center justify-center py-[25px] px-[48px] rounded-xl shadow-xl"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <Image
          src="/succsess.webp"
          alt="order_success"
          width={250}
          height={250}
        />
        <h1 className="text-[32px] mt-4 caption-bottom font-medium">
          Order Placed Successfully
        </h1>
        <p className="text-[15px] text-inputText mt-1">
          You Can See Your Order Details In My Orders Page
        </p>
        <div className="w-full flex items-center gap-5 mt-10">
          <button
            className="w-[214px] h-[38px] text-center bg-buttonGreen text-[14px] text-white rounded-md capitalize transition-transform duration-300 ease-in-out transform hover:scale-95"
            onClick={() => router.push("/home/orders")}
          >
            order details
          </button>
          <button
            className="w-[214px] h-[38px] text-center bg-none text-[14px] text-button2 rounded-md border border-button2 transition-transform duration-300 ease-in-out transform hover:scale-95"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default OrderSuccsess;
