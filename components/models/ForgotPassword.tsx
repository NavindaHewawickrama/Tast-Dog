"use client";

import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import ChangePassword from "./ChangePassword";
import CustomAlert from "../../app/alerts/customalert";


interface ModalProps {
  open: boolean;
  onClose: () => void; // Add the onClose function prop
}

const ForgotPassword: React.FC<ModalProps> = ({ open, onClose }) => {
  const router = useRouter();
  const [nextModel, setNextModel] = useState(true);
  const [changeModel, setChangeModel] = useState(false);
  const [contactInfo, setContactInfo] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [enteredCode, setEnteredCode] = useState("");
  const [resendAttempts, setResendAttempts] = useState(3); // Initialize resend attempts

  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  const handleSendCode = async () => {
    try {
      const response = await fetch("https://tasty-dog.onrender.com/api/v1/customers/forgotPassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          emailOrPhoneNumber: contactInfo,
        }),
      });

      if (response.status === 404) {
        window.alert("User not found. Please check your email address");
      } else if (!response.ok) {
        window.alert("Invalid contact info");
        console.log(await response.json());
      } else {
        window.alert("Processing...");
        setNextModel(false);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const focusNextInput = (index: number) => {
    if (inputRefs.current[index + 1]) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleOTPInput = (value: string, index: number) => {
    const updatedCode = enteredCode.split("");
    updatedCode[index] = value; // Update the specific index with the new value
    const newEnteredCode = updatedCode.join("");
    setEnteredCode(newEnteredCode);

    if (value && index < inputRefs.current.length - 1) {
      focusNextInput(index);
    }
  };

  const handleVerifyOTP = async () => {
    console.log(enteredCode);
    try {
      const response = await fetch("https://tasty-dog.onrender.com/api/v1/customers/verifyOtp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          emailOrPhoneNumber: contactInfo,
          otp: enteredCode,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        window.alert("Invalid OTP");
        console.log(response);
      } else {
        // window.alert("OTP Correct");
        setAlertMessage("OTP Correct");
        handleShowAlert();
        localStorage.setItem("forgotPasswordEmailorPhoneNumber", contactInfo);
        setChangeModel(true);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleResendOTP = () => {
    if (resendAttempts > 0) {
      handleSendCode(); // Resend the OTP
      setResendAttempts(resendAttempts - 1); // Reduce the resend attempts by 1
    }
  };

  if (!open) return null;
  if (changeModel)
    return (
      <ChangePassword
        open={changeModel}
        onClose={() => setChangeModel(false)}
      />
    );

  return (
    <>
     <CustomAlert 
              message={alertMessage}
              show={showAlert} 
              onClose={() => setShowAlert(false)} 
            />
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
        onClick={onClose}
      >
        {nextModel ? (
          <div
            className="min-w-[400px] md:w-[500px] bg-white px-[45px] py-[25px] rounded-2xl"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <div className="flex flex-row justify-between">
              <h4 className="text-[20px] capitalize">forget password</h4>
              <p
                className="text-[20px] cursor-pointer transition-transform duration-300 ease-in-out transform hover:scale-[1.3] hover:text-red-600"
                onClick={onClose}
              >
                X
              </p>
            </div>
            <div className="mt-[70px] flex flex-col">
              <h4 className="text-[15px] font-medium text-[#000000]">
                Enter Your Email To get a verification code to
                reset your password
              </h4>
              <p className="text-[12px] text-inputText mt-4">
                Email Address
              </p>
              <div className="w-full h-[48px] bg-inputBlue mt-1 rounded-lg border-2 border-inputBorder">
                <input
                  type="text"
                  className="w-full outline-none bg-transparent h-full font-normal text-[14px] text-inputText px-4"
                  value={contactInfo}
                  onChange={(e) => setContactInfo(e.target.value)}
                />
              </div>
              <button
                className="w-full h-[38px] bg-buttonGreen text-white rounded-lg mt-[70px] mb-5 transition-transform duration-300 ease-in-out transform hover:scale-95"
                onClick={handleSendCode}
              >
                Confirm
              </button>
            </div>
          </div>
        ) : (
          <div
            className="min-w-[400px] md:w-[500px] bg-white px-[45px] py-[25px] rounded-2xl"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <div className="flex flex-row justify-between">
              <h4 className="text-[15px] font-bold capitalize">
                forget password
              </h4>
              <p
                className="text-[20px] cursor-pointer transition-transform duration-300 ease-in-out transform hover:scale-[1.3] hover:text-red-600"
                onClick={onClose}
              >
                X
              </p>
            </div>
            <div className=" w-full flex flex-col mt-[50px]">
              <h4 className="text-[15px] font-medium text-[#000000] capitalize">
                Enter the four digit code we sent you at
              </h4>
              <p className="text-[14px] text-primary underline">
                {contactInfo}
              </p>
              <p className="text-[12px] text-inputText mt-2 capitalize">
                resend attempts: {resendAttempts}
              </p>
              <div className="flex flex-row gap-4">
                {[...Array(6)].map((_, index) => (
                  <div
                    key={index}
                    className="w-[81px] h-[81px] bg-inputBlue mt-5 rounded-lg border-2 border-inputBorder"
                  >
                    <input
                      type="text"
                      maxLength={1}
                      ref={(el) => (inputRefs.current[index] = el)}
                      className="w-full outline-none bg-transparent h-full font-normal text-[25px] text-center text-inputText px-4"
                      onInput={(e) => {
                        const value = e.currentTarget.value.slice(-1);
                        handleOTPInput(value, index); 
                      }}
                    />
                  </div>
                ))}
              </div>
              <button
                className="text-[12px] text-green-600 capitalize mt-2 text-left"
                disabled={resendAttempts <= 0}
                onClick={handleResendOTP}
              >
                I didn't receive a email
              </button>
              <button
                className="w-full h-[38px] bg-buttonGreen text-white rounded-lg mt-[70px] mb-5 transition-transform duration-300 ease-in-out transform hover:scale-95"
                onClick={handleVerifyOTP}
              >
                Confirm
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ForgotPassword;
