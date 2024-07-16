"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useRef } from "react";
import { useState } from "react";
import { IoEye,IoEyeOff } from "react-icons/io5";
import ForgotPassword from "@/components/models/ForgotPassword";
import { signInWithGoogle, signInWithFacebook, logInWithGoogle } from '../../auth';
import { useRouter } from "next/navigation";



const Login = () => {
  const router = useRouter();
  const [openModel, setOpenModel] = useState(false);
  const [password, setPassword] = useState("");
  const [emailOrPhoneNumber, setEmailOrPhoneNumber] = useState("");
  const [nextModel, setNextModel] = useState(true);
  const [error, setError] = useState("");
  const [otp, setOtp] = useState<any>(null);
  const [enteredCode, setEnteredCode] = useState("");
  const [showPassword, setShowPassword] = useState(false); 
  console.log(openModel);

  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);


  const handleLogin = async () => {
    try{
      const response = await fetch("https://tasty-dog.onrender.com/api/v1/customers/login",{
        method:"POST",
        headers: {
          "Content-Type":"application/json",
        },
        body: JSON.stringify({
          emailOrPhoneNumber,
          password,
        }),
      });
      const data = await response.json();
      console.log('response', data);
      localStorage.setItem("userEmail", emailOrPhoneNumber);
      localStorage.setItem("pwReg", password);
      if(!response.ok){
        setError(data.message || "An error occurred.");
        window.alert("Login UnSuccessful");
        console.log(data);
      }else{
        if(data.customer.isVerified === false){
          setNextModel(false);
          try {
            const response = await fetch(`https://tasty-dog.onrender.com/api/v1/customers/forgotPassword`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                emailOrPhoneNumber: emailOrPhoneNumber,
              }),
            });
            const data = await response.json();
            if (!response.ok) {
              throw new Error(data.message || "Failed to request password reset.");
            }
            // Handle success scenario, e.g., showing a message to the user
            console.log("Password reset request successful", data);
          } catch (error) {
            console.error("Failed to request password reset", error);
            setError("Failed to request password reset. Please try again later.");
          }
        }else{
          localStorage.setItem("token", data.token);
        // localStorage.setItem("userId", data.customer._id);
        // console.log(data.customer._id);
        window.alert("Login Successful");
       
        localStorage.setItem("userId", data.customer._id);
        localStorage.setItem("userName", data.customer.fullName);

        console.log(data.customer.fullName);
        router.push("/home"); 
        }
      }
    }catch(error){
      setError("An error occurred. Please try again later.");
    }
    
    };

    const focusNextInput = (index: number) => {
      if (inputRefs.current[index + 1]) {
        inputRefs.current[index + 1]?.focus();
      }
    };

    const handleGoogleLogIn = async () => {
      try {
        const success = await logInWithGoogle();
        console.log('User signed in with Google:', success);
        if (success) {
          router.push(`/home`);  
        }
      } catch (error) {
        setError('Google Sign-In failed');
      }
    };

    const handleClose = () => {
      setNextModel(true);
    };

    const handleVerifyOTP = async () => {
      try {
        const response = await fetch("https://tasty-dog.onrender.com/api/v1/customers/verifyOtp", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            emailOrPhoneNumber: emailOrPhoneNumber,
            otp: enteredCode,
          }),
        });
    
        if (!response.ok) {
          const errorData = await response.json();
          window.alert(errorData.message || "Invalid contact info");
          console.log("Error response:", errorData);
        } else {
          const data = await response.json();
          window.alert("OTP Correct");
          localStorage.setItem("forgotPasswordEmailorPhoneNumber", emailOrPhoneNumber);
          // router.push('/delivery');
          router.push('/home');
          
        }
      } catch (e) {
        console.log("An error occurred:", e);
        window.alert("An error occurred. Please try again later.");
      }
    };
  return (
    <>
      <div className="w-screen h-screen hidden lg:flex flex-row overflow-hidden">
        {nextModel ? (
          <>
          <div className=" relative w-[50%] flex flex-col items-center justify-center shadow-2xl shadow-black overflow-hidden">
          <Image src="/Logo.png" alt="logo" width={330} height={94} />
          <div className="w-[444px] flex flex-col items-center justify-center mt-[70px]">
            <h2 className="text-[32px] font-Lato font-bold leading-4 ">
              Log In
            </h2>
            <div className="flex flex-row justify-between items-center w-full mt-[50px]">
              <div className="w-[210px] h-[50px] flex justify-between items-center rounded-xl border-2 border-slate-300 cursor-pointer">
                <div className="w-[30%] h-[50px] flex flex-col items-center justify-center rounded-full">
                  <Image
                    src="/facebook.svg"
                    alt="Facebook logo"
                    width={25}
                    height={25}
                    className="rounded-full "
                  />
                </div>
                <div className="w-[70%] flex flex-col justify-center items-center">
                  <h4 className="text-[13px] font-normal text-customGreen">
                    Facebook
                  </h4>
                </div>
              </div>
              <div 
              className="w-[210px] h-[50px] flex justify-between items-center rounded-xl border-2 border-slate-300 cursor-pointer "
              onClick={handleGoogleLogIn}>
                <div className="w-[30%] h-[50px] flex flex-col items-center justify-center rounded-full">
                  <Image
                    src="/google.svg"
                    alt="Facebook logo"
                    width={25}
                    height={25}
                    className="rounded-full"
                  />
                </div>
                <div className="w-[70%] flex flex-col justify-center items-center">
                  <h4 className="text-[13px] font-normal text-customGreen">
                    Google
                  </h4>
                </div>
              </div>
            </div>

            <div className="w-full h-[48px] bg-inputBlue mt-5 rounded-lg border-2 border-inputBorder">
              <input
                type="text"
                placeholder="E-Mail/Username/Phone Number"
                className="w-full outline-none bg-transparent h-full font-normal text-[14px] text-inputText px-4"
                onChange={(e) => setEmailOrPhoneNumber(e.target.value)}
              />
            </div>

            <div className="w-full h-[48px] flex items-center bg-inputBlue mt-5 rounded-lg border-2 border-inputBorder">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-[90%] outline-none bg-transparent h-full font-normal text-[14px] text-inputText px-4"
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="w-[10%]">
                {/* <IoEye className="text-gray-400 text-xl" onClick={e=> showPassword? setShowPassword(false): setShowPassword(true)} /> */}
                {
                  showPassword ? <IoEye className="text-gray-400 text-xl" onClick={e=> setShowPassword(false)} /> : <IoEyeOff className="text-gray-400 text-xl" onClick={e=> setShowPassword(true)} />
                }
              </div>
            </div>
            <button
              className="w-full h-[41px] bg-[#DE7230] mt-10 text-center rounded-lg text-slate-50 text-[18px] font-bold transition-transform duration-300 ease-in-out transform hover:scale-[0.97]"
               onClick={() => handleLogin()}
            >
              LOG IN
            </button>
            <div className="w-full flex flex-row justify-between mt-2">
              <p className="text-link">
                <Link
                  href="#"
                  onClick={() => setOpenModel(true)}
                  className="text-[12px] font-normal"
                >
                  Forget Password?
                </Link>
              </p>
              <p className="text-[11px] ">
                Not Registered Yet ?
                <span className="text-link ml-2">
                  <Link href="/register" className="text-[12px] font-normal]">
                    REGISTER NOW
                  </Link>
                </span>
              </p>
            </div>
          </div>
          <p className="text-center text-[12px] mt-20 mb-[-50px] text-copyrightText">
            Developed by FoxtXcore
          </p>
        </div>
          </>
        ): (
          <div className="relative lg:w-[50%] md:w-[60%] flex flex-col items-center justify-center shadow-2xl shadow-black overflow-hidden">
            <Image src="/Logo.png" alt="logo" width={330} height={94} />
          <div
              className="min-w-[400px] md:w-[auto] bg-white px-[45px] py-[25px] rounded-2xl"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <div className="flex flex-row justify-between">
                <h4 className="text-[15px] font-bold capitalize">
                  Verify Email
                </h4>
                <p
                  className="text-[15px] cursor-pointer transition-transform duration-300 ease-in-out transform hover:scale-[1.3] hover:text-red-600"
                  onClick={handleClose}
                >
                  X
                </p>
              </div>
              <div className=" w-full flex flex-col mt-[50px]">
                <h4 className="text-[15px] font-medium text-[#000000] capitalize">
                  Enter the four digit code we sent you at
                </h4>
                <p className="text-[14px] text-primary underline">
                {emailOrPhoneNumber}
                </p>
                <p className="text-[12px] text-inputText mt-2 capitalize">
                  resend attempts:3
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
                          setEnteredCode((prev) => {
                            const newCode = prev.split("");
                            newCode[index] = value;
                            return newCode.join("");
                          });
                          if (
                            e.currentTarget.value.length >=
                            e.currentTarget.maxLength
                          ) {
                            focusNextInput(index);
                          }
                        }}
                      />
                    </div>
                  ))}
                </div>
                <p className="text-[12px] text-green-600 capitalize mt-2">
                  I didnt recived a call{" "}
                </p>
                <button
                  className="w-full h-[38px] bg-buttonGreen text-white rounded-lg mt-[70px] mb-5 transition-transform duration-300 ease-in-out transform hover:scale-95"
                  onClick={handleVerifyOTP}
                >
                  Confirm
                </button>
              </div>
            </div>
            </div>
            
          )}
        <div className="w-[50%] flex flex-col items-center justify-center bg-auth-pattern"></div>
      </div>

      <ForgotPassword open={openModel} onClose={() => setOpenModel(false)} />
    </>
  );
};

export default Login;
