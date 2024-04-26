import React from "react";
import { motion } from "framer-motion";
import dropIn from "@/utils/motion";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface ModalProps {
  open: boolean;
  onClose: () => void; // Add the onClose function prop
}

const DeleteAccount: React.FC<ModalProps> = ({ open, onClose }) => {
  const router = useRouter();

  if (!open) return null;
  return (
    <div
      className="fixed top-0 left-0 z-50 w-full h-full flex  items-center justify-center bg-black  bg-opacity-50"
      onClick={onClose}
    >
      <motion.div
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="bg-white w-[540px] py-[25px] px-[48px] flex flex-col justify-center items-center rounded-xl "
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <Image
          src="/deleteAcc.svg"
          alt="Delete-account"
          width={170}
          height={220}
        />

        <h2 className="text-[32px] capitalize text-center">
          Are You Sure You Want To Deactivate Your Account
        </h2>
        <div className="w-full flex items-center gap-5 mt-10">
          <button
            className="w-[214px] h-[38px] text-center bg-Red text-[14px] text-white rounded-md transition-transform duration-300 ease-in-out transform hover:scale-95"
            onClick={() => router.push("/")}
          >
            Deactivate
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

export default DeleteAccount;
