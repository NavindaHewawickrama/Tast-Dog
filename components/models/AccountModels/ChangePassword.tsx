import React,{useState}from "react";
import { motion } from "framer-motion";
import dropIn from "@/utils/motion";
import { useRouter } from "next/navigation";

interface ModalProps {
  open: boolean;
  onClose: () => void; // Add the onClose function prop
}

const ChangePassword: React.FC<ModalProps> = ({ open, onClose }) => {
  const router = useRouter();
  const [newpwd, setNewpwd] = useState("");
  const [confirmNewpwd, setConfirmNewpwd] = useState("");

  if (!open) return null;

  const handleChangePassword= async ()=>{
    const uId = localStorage.getItem("userId");
    const pwd = localStorage.getItem("pwReg");
    console.log(uId);console.log(pwd);
    if(checkpwd()){
      try{
        const response = await fetch("https://tasty-dog.onrender.com/api/v1/customers/changePassword",{
          method:"POST",
          headers: {
            "Content-Type":"application/json",
          },
          body: JSON.stringify({
            userId: uId,
            oldPassword: pwd,
            newPassword: newpwd,
          }),
        });
        const data = await response.json();
      if(!response.ok){
       // console.log(data);
       window.alert("Some kind of problem occured. Please try again.");
       console.log(data);
      }else{
        window.alert("Password changed successfully.");
        console.log(data);
        window.location.reload();
      }
      }catch(error){
        console.log(error);
      }
    }
  }

  const checkpwd =()=>{
    if(newpwd === confirmNewpwd){
      return true;
    }else{
      return false;
    }
  }


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
        className="w-[564px] bg-white shadow-xl py-[20px] rounded-xl"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="w-[452px] mx-auto ">
          <div className="flex justify-between">
            <h3 className="text-[15px] capitalize font-semibold">
              change password
            </h3>
            <h3
              onClick={onClose}
              className="text-[15px] capitalize cursor-pointer transition-transform duration-300 ease-in-out transform hover:scale-[1.3] hover:text-red-600"
            >
              X
            </h3>
          </div>
          <div className="w-full px-3 flex flex-col justify-center mt-7 ">
            <div className="w-full mb-3 flex flex-col gap-2">
              <p className="text-[12px] text-inputText capitalize">
                New Password
              </p>
              <div className="w-full h-[48px] bg-inputBlue  rounded-lg border-2 border-inputBorder">
                <input
                  type="password"
                  onChange={(e)=>setNewpwd(e.target.value)}
                  className="w-full outline-none bg-transparent h-full font-normal text-[14px] text-inputText px-4"
                />
              </div>
            </div>
            <div className="w-full mb-3 flex flex-col gap-2 mt-3">
              <p className="text-[12px] text-inputText capitalize">
                Confirm Password
              </p>
              <div className="w-full h-[48px] bg-inputBlue  rounded-lg border-2 border-inputBorder">
                <input
                  type="password"
                  onChange={(e)=>setConfirmNewpwd(e.target.value)}
                  className="w-full outline-none bg-transparent h-full font-normal text-[14px] text-inputText px-4"
                />
              </div>
            </div>
          </div>
          <div className="w-full flex items-center gap-5 mt-10">
            <button
              className="w-[214px] h-[38px] text-center bg-Green2 text-[14px] text-white rounded-lg transition-transform duration-300 ease-in-out transform hover:scale-95"
              // onClick={() => window.location.reload()}
              onClick={()=>handleChangePassword()}
            >
              Save
            </button>
            <button
              className="w-[214px] h-[38px] text-center bg-none text-[14px] text-button2 rounded-lg border border-button2 transition-transform duration-300 ease-in-out transform hover:scale-95"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ChangePassword;
