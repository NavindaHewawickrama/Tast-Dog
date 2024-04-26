import React from "react";
import { motion } from "framer-motion";
import dropIn from "@/utils/motion";
import { CgCheckO } from "react-icons/cg";
import Link from "next/link";

interface ModalProps {
  open: boolean;
  onClose: () => void; // Add the onClose function prop
}

const AddToCart: React.FC<ModalProps> = ({ open, onClose }) => {
  if (!open) return null;

  return (
    <motion.div
      variants={dropIn}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="fixed inset-0 flex justify-end z-50 m-1"
      onClick={onClose}
    >
      <div className="w-[540px] h-[75px] flex items-center px-[20px] bg-white shadow-xl gap-10">
        <div className="flex items-center gap-2">
          <CgCheckO className="text-buttonGreen w-[25px] h-[25px]" />
          <p className="text-[15px] text-buttonGreen capitalize">
            1 new item(s) have been added to your cart
          </p>
        </div>
        <Link
          href="/home/cart"
          className="text-[15px] text-button2 capitalize underline"
        >
          view cart
        </Link>
      </div>
    </motion.div>
  );
};

export default AddToCart;
