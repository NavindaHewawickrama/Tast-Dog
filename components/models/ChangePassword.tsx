import React, { useState } from "react";
import { useRouter } from "next/navigation";
import SuccessModel from "./SuccessModel";
import { IoEye,IoEyeOff } from "react-icons/io5";
import CustomAlert from "../../app/alerts/customalert";

interface ModalProps {
  open: boolean;
  onClose: () => void; // Add the onClose function prop
}

const ChangePassword: React.FC<ModalProps> = ({ open, onClose }) => {
  const router = useRouter();
  const [successModel, setSuccessModel] = useState(false);
  const [newPassword,setNewPassword]= useState("");
  const [confirmPassword,setConfirmPassword]= useState("");
  const [showPassword, setShowPassword] = useState(false); 
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); 
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const handleShowAlert = () => {
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000); // Auto-close after 3 seconds
  };

  const checkpwd =()=>{
    if(newPassword === confirmPassword){
      return true;
    }else{
      return false;
    }
  }

  const handlePasswordChange = async()=>{
    if(checkpwd()){
            const emailOrPhone = localStorage.getItem("forgotPasswordEmailorPhoneNumber");
          try{
            const response = await fetch("https://tasty-dog.onrender.com/api/v1/customers/updatePassword",{method:"POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              emailOrPhoneNumber:emailOrPhone,
              newPassword:newPassword,
            })});
            const data = response.json;
            if(!response){
              // window.alert("Something went wrong"); 
              setAlertMessage("Something went wrong");
        handleShowAlert();
              
              // console.log(data);
            }else{
              // window.alert("Password Changed !!! ");
              setAlertMessage("Password Changed !!! ");
        handleShowAlert();
            }
          }catch(e){
            console.log(e);
          }
          setSuccessModel(true);
    }else{
      // window.alert("Passwords not matching");
      setAlertMessage("Passwords not matching");
        handleShowAlert();
    }
    
  }

  if (!open) return null;
  return (
    <>
    <CustomAlert 
              message={alertMessage}
              show={showAlert} 
              onClose={() => setShowAlert(false)} 
            />
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
            <div className="w-full h-[48px] flex items-center bg-inputBlue mt-5 rounded-lg border-2 border-inputBorder">
              <input
                type={showPassword ? "text" : "password"}
                onChange={(e)=>setNewPassword(e.target.value)}
                className="w-full outline-none bg-transparent h-full font-normal text-[14px] text-inputText px-4"
              />
              < div className="w-[10%]">
               {
                  showPassword ? <IoEye className="text-gray-400 text-xl" onClick={e=> setShowPassword(false)} /> : <IoEyeOff className="text-gray-400 text-xl" onClick={e=> setShowPassword(true)} />
                }
              </div>
            </div>
          </div>
          <div className="flex flex-col mb-4 ">
            <p className="text-[12px] text-inputText capitalize mb-2 ml-1">
              confirm password
            </p>
            <div className="w-full h-[48px] flex items-center bg-inputBlue mt-5 rounded-lg border-2 border-inputBorder">
              <input
                type={showConfirmPassword ? "text" : "password"}
                onChange={(e)=>setConfirmPassword(e.target.value)}
                className="w-full outline-none bg-transparent h-full font-normal text-[14px] text-inputText px-4"
              />
              <div className="w-[10%]">
               {
                  showConfirmPassword ? <IoEye className="text-gray-400 text-xl" onClick={e=> setShowConfirmPassword(false)} /> : <IoEyeOff className="text-gray-400 text-xl" onClick={e=> setShowConfirmPassword(true)} />
                }
              </div>
            </div>
          </div>
          <button
            className="w-full h-[38px] bg-buttonGreen text-white rounded-lg mt-[70px] mb-5 transition-transform duration-300 ease-in-out transform hover:scale-95"
            // onClick={() => setSuccessModel(true)}
            onClick={()=>handlePasswordChange()}
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
