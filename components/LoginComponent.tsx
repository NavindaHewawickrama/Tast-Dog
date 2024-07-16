"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useState } from "react";
import { IoEye } from "react-icons/io5";
import ForgotPassword from "@/components/models/ForgotPassword";
import { useRouter } from "next/navigation";

const Login = () => {
  const router = useRouter();
  const [openModel, setOpenModel] = useState(false);
  const [password, setPassword] = useState("");
  const [emailOrPhoneNumber, setEmailOrPhoneNumber] = useState("");
  const [error, setError] = useState("");

  console.log(openModel);

  const handleLogin = async () => {
    // try{
    //   const response = await fetch("https://tasty-dog.onrender.com/api/v1/customers/login",{
    //     method:"POST",
    //     headers: {
    //       "Content-Type":"application/json",
    //     },
    //     body: JSON.stringify({
    //       emailOrPhoneNumber,
    //       password,
    //     }),
    //   });
    //   const data = await response.json();
    //   console.log(data);
      
    //   if(!response.ok){
    //     console.log(response);
    //     localStorage.setItem("token", data.token);
    //     window.alert("Login UnSuccessful");
    //   }else{
    //     console.log(response);
    //     const data = await response.json();
    //     setError(data.message || "An error occurred.");
    //     window.alert("Login Successful");
    //     router.push("/home");
    //   }
    // }catch(error){
    //   setError("An error occurred. Please try again later.");
    // }
      console.log("Login Successful");
      window.alert("Login Successful");
    };

  return (
    <>
      <div className="w-screen h-screen hidden md:flex flex-row overflow-hidden">
        <div className=" relative lg:w-[50%] md:w-[60%] flex flex-col items-center justify-center shadow-2xl shadow-black overflow-hidden">
          <Image src="/Logo.png" alt="logo" width={330} height={94} />
          <div className="w-[444px] flex flex-col items-center justify-center mt-[70px]">
            <h2 className="text-[32px] font-Lato font-bold leading-4 ">
              Log Ins
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
              <div className="w-[210px] h-[50px] flex justify-between items-center rounded-xl border-2 border-slate-300 cursor-pointer ">
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
                placeholder="E-Mail"
                className="w-full outline-none bg-transparent h-full font-normal text-[14px] text-inputText px-4"
              />
            </div>

            <div className="w-full h-[48px] flex items-center bg-inputBlue mt-5 rounded-lg border-2 border-inputBorder">
              <input
                type="Password"
                placeholder="Password"
                className="w-[90%] outline-none bg-transparent h-full font-normal text-[14px] text-inputText px-4"
              />
              <div className="w-[10%]">
                <IoEye className="text-gray-400 text-xl" />
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
            Developed by FortXcore
          </p>
        </div>
        <div className="lg:w-[50%] md:w-[40%] flex flex-col md:h-screen items-center justify-center bg-auth-pattern bg-cover bg-no-repeat bg-center"></div>
      </div>

      <ForgotPassword open={openModel} onClose={() => setOpenModel(false)} />
    </>
  );
};

export default Login;
