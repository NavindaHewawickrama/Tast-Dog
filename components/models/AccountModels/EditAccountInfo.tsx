import React,{useEffect, useState} from "react";
import { motion } from "framer-motion";
import dropIn from "@/utils/motion";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

interface ModalProps {
  open: boolean;
  onClose: () => void; // Add the onClose function prop
  userName: string | null;
  email: string | null;
  phoneNumber: string | null;
}

const EditAccountInfo: React.FC<ModalProps> = ({open, onClose, userName, email, phoneNumber }) => {
  const [name, setName] = useState<string | null>(userName);
  const [emailAddress, setEmailAddress] = useState<string | null>(email);
  // const [phone, setPhone] = useState<string | null>(phoneNumber);
  const [phone, setPhone] = useState<string>('');

 
  useEffect(() => {
    if (userName) setName(userName);
    if (email) setEmailAddress(email);
    if (phoneNumber) setPhone(phoneNumber);
  }, [userName, email, phoneNumber]);

  if (!open) return null;


  const handleEdit = async() =>{
    const id = localStorage.getItem("userId");
    try{
      const response = await fetch(`https://tasty-dog.onrender.com/api/v1/customers/updateUserDetails/${id}`,{method:"PUT"
      ,headers: {
        "Content-Type":"application/json",
      }, body:JSON.stringify({
        fullName: name,
        phoneNumber: phone,
      })
      });
      const data = await response.json();
      if(!response.ok){
        window.alert("Some kind of problem occured. Please try again.");
        console.log(data);
      }else{
        window.alert("User details updated successfully.");
      // Optionally, update the state of your application here instead of reloading
      window.location.reload();
      }
    }catch(e){
      console.log(e);
    }
  };
  
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
        <div className="w-[452px] mx-auto">
          <div className="flex justify-between">
            <h3 className="text-[15px] capitalize font-semibold">
              Edit account information
            </h3>
            <h3
              className="text-[15px] capitalize cursor-pointer transition-transform duration-300 ease-in-out transform hover:scale-[1.3] hover:text-red-600"
              onClick={onClose}
            >
              X
            </h3>
          </div>
          <div className="w-full flex flex-col justify-center mt-10 ">
            <div className="w-full mb-4 flex flex-col gap-2">
              <p className="text-[12px] text-inputText capitalize">full name</p>
              <div className="w-full h-[48px] bg-inputBlue  rounded-lg border-2 border-inputBorder">
                <input
                  type="text"
                  value={name || ""}
                  className="w-full outline-none bg-transparent h-full font-normal text-[14px] text-inputText px-4"
                  onChange={(e)=>setName(e.target.value)}
                />
              </div>
            </div>
            <div className="w-full mb-4 flex flex-col gap-2 ">
              <p className="text-[12px] text-inputText capitalize">
                e-mail address
              </p>
              <div className="w-full h-[48px] bg-inputBlue  rounded-lg border-2 border-inputBorder">
                <input
                  type="email"
                  value={emailAddress || ""}
                  readOnly
                  className="w-full outline-none bg-transparent h-full font-normal text-[14px] text-inputText px-4"
                />
              </div>
            </div>
            <div className="w-full mb-4 flex flex-col gap-2 ">
              <p className="text-[12px] text-inputText capitalize">
                phone number
              </p>
              <div className="w-full h-[48px] bg-inputBlue rounded-lg border-2 border-inputBorder">
      <PhoneInput
        country={'us'}
        value={phone}
        onChange={(phone: string) => setPhone(phone)}
        inputStyle={{
          width: '100%',
          height: '100%',
          backgroundColor: 'transparent',
          border: 'none',
          outline: 'none',
          fontSize: '14px',
          color: '#000', 
        }}
        buttonStyle={{
          backgroundColor: 'transparent',
          border: 'none',
          outline: 'none',
        }}
        containerStyle={{
          width: '100%',
          height: '100%',
        }}
      />
    </div>
            </div>
          </div>
          <div className="w-full flex items-center gap-5 mt-10">
            <button
              className="w-[214px] h-[38px] text-center bg-Green2 text-[14px] text-white rounded-md transition-transform duration-300 ease-in-out transform hover:scale-95"
              onClick={() => handleEdit()}
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
  );
};

export default EditAccountInfo;
