import React from "react";
import { motion } from "framer-motion";
import dropIn from "@/utils/motion";

interface ModalProps {
  open: boolean;
  onClose: () => void; // Add the onClose function prop
}

const AddNewAddress: React.FC<ModalProps> = ({ open, onClose }) => {
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
          className="w-[564px] bg-white shadow-xl py-[20px] rounded-xl"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div className="w-[452px] mx-auto">
            <div className="flex flex-row justify-between">
              <h4 className="text-[15px] capitalize">add new address</h4>
              <p
                className="text-[15px] cursor-pointer transition-transform duration-300 ease-in-out transform hover:scale-[1.3] hover:text-red-600"
                onClick={onClose}
              >
                X
              </p>
            </div>

            <div className="w-full flex flex-col justify-center mt-10 ">
              <div className="w-full mb-4 flex flex-col gap-2">
                <p className="text-[12px] text-inputText capitalize">
                  street address
                </p>
                <div className="w-full h-[48px] bg-inputBlue  rounded-lg border-2 border-inputBorder">
                  <input
                    type="text"
                    className="w-full outline-none bg-transparent h-full font-normal text-[14px] text-inputText px-4"
                  />
                </div>
              </div>
              <div className="w-full mb-4 flex flex-col gap-2 ">
                <p className="text-[12px] text-inputText capitalize">
                  apt/suit no.
                </p>
                <div className="w-full h-[48px] bg-inputBlue  rounded-lg border-2 border-inputBorder">
                  <input
                    type="text"
                    className="w-full outline-none bg-transparent h-full font-normal text-[14px] text-inputText px-4"
                  />
                </div>
              </div>
              <div className="w-full mb-4 flex flex-col gap-2 ">
                <div className="flex flex-row item-center gap-3 w-full h-full">
                  <div className="w-[225px]">
                    <p className="text-[12px] text-inputText capitalize mb-2">
                      city
                    </p>
                    <div className="w-full h-[48px] bg-inputBlue  rounded-lg border-2 border-inputBorder">
                      <input
                        type="text"
                        className="w-full outline-none bg-transparent h-full font-normal text-[14px] text-inputText px-4"
                      />
                    </div>
                  </div>
                  <div className="w-[225px]">
                    <p className="text-[12px] text-inputText capitalize mb-2">
                      state/province
                    </p>
                    <div className="w-full h-[48px] bg-inputBlue  rounded-lg border-2 border-inputBorder">
                      <input
                        type="text"
                        className="w-full outline-none bg-transparent h-full font-normal text-[14px] text-inputText px-4"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full mb-4 flex flex-col gap-2 ">
                <p className="text-[12px] text-inputText capitalize">
                  Landmark
                </p>
                <div className="w-full h-[48px] bg-inputBlue  rounded-lg border-2 border-inputBorder">
                  <input
                    type="text"
                    className="w-full outline-none bg-transparent h-full font-normal text-[14px] text-inputText px-4"
                  />
                </div>
              </div>
            </div>
            <div className="w-full flex items-center gap-5 mt-10">
              <button
                className="w-[214px] h-[38px] text-center bg-Green2 text-[14px] text-white rounded-md transition-transform duration-300 ease-in-out transform hover:scale-95"
                onClick={() => window.location.reload()}
              >
                Save
              </button>
              <button
                className="w-[214px] h-[38px] text-center bg-none text-[14px] text-button2 rounded-md border border-button2 transition-transform duration-300 ease-in-out transform hover:scale-95"
                onClick={onClose}
              >
                Cancel
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default AddNewAddress;
