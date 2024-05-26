"use client";

import React from "react";
import { motion } from "framer-motion";
import dropIn from "@/utils/motion";
import { FaRegCircleDot } from "react-icons/fa6";
import { CiEdit } from "react-icons/ci";
import { IoMdAdd } from "react-icons/io";
import { useState } from "react";
import AddNewAddress from "./AddNewAddress";
import EditAddress from "./EditAddress";

interface ModalProps {
  open: boolean;
  onClose: () => void; // Add the onClose function prop
}

const ChangeAddress: React.FC<ModalProps> = ({ open, onClose }) => {
  const [newAddress, setNewAddress] = useState(false);
  const [editAddress, setEditAddress] = useState(false);
  

  const handleClick = () => {
    setNewAddress(true);
  };

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
          className="w-[564px] h-[500px] bg-white shadow-xl py-[20px] rounded-xl "
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div className="w-[452px] mx-auto">
            <div className="flex flex-row justify-between">
              <h4 className="text-[15px] capitalize">My delivery address</h4>
              <p
                className="text-[15px] cursor-pointer transition-transform duration-300 ease-in-out transform hover:scale-[1.3] hover:text-red-600"
                onClick={onClose}
              >
                X
              </p>
            </div>
            <div className="w-full flex flex-col gap-5 mt-10">
              <div className="flex justify-between items-center px-[20px] py-[20px] shadow-xl ">
                <div className="flex gap-4 items-center">
                  <FaRegCircleDot className="text-[16px] text-buttonGreen" />
                  <div className="flex flex-col gap-1 justify-center">
                    <h3 className="text-[12px] text-details font-medium capitalize">
                      No 222/1, Somewhere street, Melbourn
                    </h3>
                    <div className="flex gap-1 items-center">
                      <p className="text-[10px] text-inputText">John Doe</p>
                      <p className="text-[10px] text-inputText">
                        +94 222 222 222
                      </p>
                    </div>
                  </div>
                </div>
                <div onClick={() => setEditAddress(true)}>
                  <CiEdit className="w-[22px] h-[22px] text-inputText cursor-pointer" />
                </div>
              </div>
            </div>
            <button
              onClick={handleClick}
              className="px-[20px] py-[10px] border-2 border-button2 text-button2 flex items-center gap-4 mt-5 rounded-md transition-transform duration-300 ease-in-out transform hover:scale-95"
            >
              <IoMdAdd className="text-[20px] text-button2" />
              <h3 className="text-[14px] text-button2 capitalize">
                Add New Address
              </h3>
            </button>
          </div>
        </motion.div>
      </div>
      <AddNewAddress open={newAddress} onClose={() => setNewAddress(false)} />
      <EditAddress open={editAddress} onClose={() => setEditAddress(false)} />
    </>
  );
};

export default ChangeAddress;
