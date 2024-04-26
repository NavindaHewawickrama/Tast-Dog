import React from "react";
import { motion } from "framer-motion";
import { dropDown } from "@/utils/motion";
import { IoCloseCircleOutline } from "react-icons/io5";

interface ModalProps {
  open: boolean;
  onClose: () => void; // Add the onClose function prop
}

const DropModal: React.FC<ModalProps> = ({ open, onClose }) => {
  if (!open) return null;

  return (
    <motion.div
      variants={dropDown}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="absolute inset-0 z-50 top-[120px] left-[1180px] bg-white shadow-xl w-[210px] h-[80px] rounded-xl "
      onClick={onClose}
    >
      <p
        className="text-[15px] cursor-pointer transition-transform duration-300 ease-in-out transform hover:scale-[1.3] hover:text-red-600"
        onClick={onClose}
      >
        X
      </p>
    </motion.div>
  );
};

export default DropModal;
