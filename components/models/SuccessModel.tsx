import Image from "next/image";
import React from "react";

interface ModalProps {
  open: boolean; // Add the onClose function prop
}

const SuccessModel: React.FC<ModalProps> = ({ open }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className=" bg-white w-[317px]  flex flex-col justify-center items-center px-[30px] py-[25px] shadow-2xl rounded-xl">
        <Image
          src="/passwordSuc.webp"
          alt="succsess_logo"
          width={225}
          height={200}
        />
        <h2 className="text-[16px] capitalize font-semibold">
          Password Resetted Successfully{" "}
        </h2>
        <button
          className="w-full h-[38px] bg-buttonGreen text-white rounded-lg mt-7 transition-transform duration-300 ease-in-out transform hover:scale-95"
          onClick={() => window.location.reload()}
        >
          Log In
        </button>
      </div>
    </div>
  );
};

export default SuccessModel;
