"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { IoEye } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Register = () => {
  const router = useRouter();
  const[fullName, setFullName] = useState("");
  const[email, setEmail] = useState("");
  const[password, setPassword] = useState("");
  const[confirmPassword, setConfirmPassword] = useState("");
  const[error, setError] = useState("");
  var userId = ("");

  const handleSubmit = async () => {
    if (checkPassword() && checkName() && checkEmail()) {
      try {
        const response = await fetch('https://tasty-dog.onrender.com/api/v1/customers/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            fullName,
            password,
            emailOrPhoneNumber: email,
          }),
        });
        const data = await response.json();
        if (!response.ok) {
          throw new Error('Registration failed');
        }else{
            // Registration successful
          // userId = data.customer._id;
          window.alert("Registration Successful");
          localStorage.setItem("userName", fullName);
          // localStorage.setItem("userIdReg", userId);
          localStorage.setItem("userEmail",email);
          localStorage.setItem("pwReg", password);
          router.push('/delivery');
        }
      } catch (error) {
        console.error(error);
        setError('Registration failed');
      }
    } else {
      setError('Validation error');
    }
  };

  const checkPassword = () => {
    if(password !== confirmPassword){
      setError("Password does not match");
      return false;
    }else{
      return true;
    }
  }

  const checkName = () => {
    if(fullName.length < 3){
      setError("Name should be atleast 3 characters");
      return false;
    }else{
      return true;
    }
  }

  const checkEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
            
      return false;
    }else{
      return true;
    }
  
  }

  return (
    <div className="w-screen h-screen hidden md:flex flex-row overflow-hidden">
      <div className=" relative lg:w-[50% md:w-[60%] flex flex-col items-center justify-center shadow-2xl shadow-black overflow-hidden">
        <Image src="/Logo.png" alt="logo" width={330} height={94} />
        <div className="w-[444px] flex flex-col items-center justify-center mt-[30px]">
          <h2 className="text-[32px] font-Lato font-bold leading-4  text-[#3C3939]">
            Sign Up
          </h2>
          <div className="flex flex-row justify-between items-center w-full mt-[50px]">
            <div className="w-[210px] h-[50px] flex justify-between items-center rounded-xl border-2 border-slate-300 cursor-pointer">
              <div className="w-[30%] h-[50px] flex flex-col items-center justify-center rounded-full">
                <Image
                  src="/facebook.svg"
                  alt="Facebook logo"
                  width={25}
                  height={25}
                  className="rounded-full"
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

          <div className="w-full h-[48px] mt-5 rounded-lg border-2 border-inputBorder">
            <input
              type="text"
              placeholder="Full Name"
              className="w-full outline-none bg-transparent h-full font-normal text-[14px] text-inputText px-4"
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>

          <div className="w-full h-[48px] flex items-center  mt-3 rounded-lg border-2 border-inputBorder">
            <input
              type="email"
              placeholder="E-maill"
              className="w-[90%] outline-none bg-transparent h-full font-normal text-[14px] text-inputText px-4"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="w-full h-[48px] flex items-center  mt-3 rounded-lg border-2 border-inputBorder">
            <input
              type="password"
              placeholder="password"
              className="w-[90%] outline-none bg-transparent h-full font-normal text-[14px] text-inputText px-4"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="w-full h-[48px] flex items-center  mt-3 rounded-lg border-2 border-inputBorder">
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-[90%] outline-none bg-transparent h-full font-normal text-[14px] text-inputText px-4"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <button
            onClick={() => handleSubmit()}
            className="w-full h-[41px] bg-[#DE7230] mt-10 text-center rounded-lg text-slate-50 text-[18px] font-bold capitalize transition-transform duration-300 ease-in-out transform hover:scale-[0.97]"
          >
            sign up
          </button>
          <div className="w-full flex flex-col items-center mt-4">
            <p className="text-[11px] capitalize">
              already a user ?
              <span className="text-link ml-2">
                <Link href="/login" className="text-[12px] font-normal]">
                  LOGIN NOW
                </Link>
              </span>
            </p>
          </div>
        </div>
        <p className="text-center text-[12px] mt-12 text-lightGray">
          Developed by Foxtxcore
        </p>

        <div className="absolute top-[-70px] left-[-215px] rotate-[-25deg] opacity-30">
          <Image
            src="/shapes.png"
            alt="shapes"
            width={300}
            height={300}
            className="opacity-[30px]"
          />
        </div>
        <div className="absolute top-[-150px] right-[-170px] rotate-[-60deg] opacity-30">
          <Image src="/shapes.png" alt="shapes" width={300} height={300} />
        </div>
        <div className="absolute bottom-[-250px] left-[-290px] opacity-30">
          <Image src="/shapes.png" alt="shapes" width={400} height={400} />
        </div>
        <div className="absolute bottom-[-250px] right-[-290px] opacity-30">
          <Image src="/shapes.png" alt="shapes" width={400} height={400} />
        </div>
      </div>
      <div className="lg:w-[50%] md:w-[40%] flex flex-col md:h-screen items-center justify-center bg-auth-pattern bg-cover bg-no-repeat bg-center"></div>
    </div>
  );
};

export default Register;
