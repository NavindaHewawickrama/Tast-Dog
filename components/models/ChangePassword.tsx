import React, { useState } from "react";
import { useRouter } from "next/navigation";
import SuccessModel from "./SuccessModel";

interface ModalProps {
  open: boolean;
  onClose: () => void; // Add the onClose function prop
}

const ChangePassword: React.FC<ModalProps> = ({ open, onClose }) => {
  const router = useRouter();
  const [successModel, setSuccessModel] = useState(false);

  if (!open) return null;
  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div
          className="min-w-[400px] md:w-[500px] bg-white px-[45px] py-[25px] rounded-2xl"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div className="flex flex-row justify-between">
            <h4 className="text-[15px] font-bold capitalize">
              Change Password
            </h4>
            <p
              className="text-[15px] cursor-pointer transition-transform duration-300 ease-in-out transform hover:scale-[1.3] hover:text-red-600"
              onClick={() => window.location.reload()}
            >
              X
            </p>
          </div>

          <h4 className="text-[15px] font-medium capitalize mt-[50px] mb-5">
            Create a new password
          </h4>
          <div className="flex flex-col mb-4 ">
            <p className="text-[12px] text-inputText capitalize mb-2 ml-1">
              {" "}
              new password{" "}
            </p>
            <div className="w-full h-[48px] bg-inputBlue  rounded-lg border-2 border-inputBorder">
              <input
                type="password"
                className="w-full outline-none bg-transparent h-full font-normal text-[14px] text-inputText px-4"
              />
            </div>
          </div>
          <div className="flex flex-col mb-4 ">
            <p className="text-[12px] text-inputText capitalize mb-2 ml-1">
              confirm password
            </p>
            <div className="w-full h-[48px] bg-inputBlue  rounded-lg border-2 border-inputBorder">
              <input
                type="password"
                className="w-full outline-none bg-transparent h-full font-normal text-[14px] text-inputText px-4"
              />
            </div>
          </div>
          <button
            className="w-full h-[38px] bg-buttonGreen text-white rounded-lg mt-[70px] mb-5 transition-transform duration-300 ease-in-out transform hover:scale-95"
            onClick={() => setSuccessModel(true)}
          >
            Confirm
          </button>
        </div>
      </div>

      <SuccessModel open={successModel} />
    </>
  );
};

export default ChangePassword;
