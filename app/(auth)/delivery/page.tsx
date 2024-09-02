"use client";

import Image from "next/image";
import React, { useCallback, useEffect,useState } from "react";
import { IoLocation } from "react-icons/io5";
import { useRouter } from "next/navigation";
import CustomAlert from '../../alerts/customalert';

const DeliveryDetails = () => {
  //#region 
  const router = useRouter();
  const [userName, setUserName] = useState<string | null>(null);
  const [pkey, setPkey] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [city, setCity] = useState<string | null>(null);
  const [stateProvince, setStateProvince] = useState<string | null>(null);
  const [landMark, setLandMark] = useState<string | null>(null);
  const [address1, setAddress1] = useState<string | null>(null);
  const [address2, setAddress2] = useState<string | null>(null);
  const [country, setCountry] = useState("Australia");
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
//#endregion

const handleShowAlert = () => {
  setShowAlert(true);
  setTimeout(() => setShowAlert(false), 3000); // Auto-close after 3 seconds
};

  const getUserID = useCallback (async () => {
    const emails = localStorage.getItem("userEmail");
    const pwkey = localStorage.getItem("pwReg");
    setPkey(pwkey);
    setEmail(emails);
    try{
      const response = await fetch("https://tasty-dog.onrender.com/api/v1/customers/login",{
        method:"POST",
        headers: {
          "Content-Type":"application/json",
        },
        body: JSON.stringify({
          emailOrPhoneNumber: emails,
          password: pwkey,
        }),
      });
      const data = await response.json();
      if(!response.ok){
       // console.log(data);
      //  window.alert("Some kind of problem occured. Please try again.");
       setAlertMessage("Some kind of problem occured. Please try again.");
        handleShowAlert();
       console.log(data);
      }else{
        console.log(data.customer._id);
        console.log(data.customer.fullName);
        setUserId(data.customer._id);
        // window.alert("Registered Successfully.");
        localStorage.setItem("userId",data.customer._id);
        localStorage.setItem("userName",data.customer.fullName);
      }
    }catch(error){
      console.error(error);
    }
    
  },[]);

  useEffect(() => {
    const userName = localStorage.getItem("userName");
    setUserName(userName);
    getUserID();
  }, [getUserID]);

  

  const handeClick = async () =>{
    setLoading(true);  // Start loading
    try{
      const response = await fetch(`https://tasty-dog.onrender.com/api/v1/addresses/addAddress`,{method:"POST",
        headers: {
          "Content-Type":"application/json",
        },
          body: JSON.stringify({
            landmark: landMark,
            state: stateProvince,
            city,
            streetAddress: address2,
            aptSuite: address1,
            mobileNumber: email,
            userName,
            userId,
            country,
          }),
        });
        if (!response.ok) {
          throw new Error('Registration failed');
          setLoading(false); // Stop loading
        }else{
          const data = response.json();
          console.log(data);
          localStorage.setItem("address1", address1 ?? "");
          localStorage.setItem("address2", address2 ?? "");
          localStorage.setItem("city", city ?? "");
          localStorage.setItem("stateProvince", stateProvince ?? "");
          localStorage.setItem("landMark", landMark ?? "");
          // window.alert("Address Added Successfully");
          setAlertMessage("Address Added Successfully");
        handleShowAlert();
          router.push(`/home`);
          setLoading(false); // Stop loading
        }
    }catch(error){
      // console.error("Error bn error",error);
      setLoading(false); // Stop loading
    }
  };

  const handleCountry = (value:any) =>{
    setCountry(value);
  }

  return (
    <div className="w-screen h-screen hidden md:flex flex-row overflow-hidden">
      <div className=" relative lg:w-[50%] md:w-[60%] flex flex-col items-center justify-center shadow-2xl shadow-black overflow-hidden">
        <Image src="/Logo.png" alt="logo" width={330} height={94} />
        <div className="w-[444px] flex flex-col items-center justify-center mt-[30px]">
          <h2 className="text-[28px] font-Lato font-bold leading-4  text-[#3C3939] capitalize">
            delivery details
          </h2>
          <CustomAlert 
              message={alertMessage}
              show={showAlert} 
              onClose={() => setShowAlert(false)} 
            />

          <div className="w-full h-[48px] flex flex-row mt-10 rounded-lg border-2 border-inputBorder">
            <div className="w-[8%] flex flex-col items-center justify-center">
              <p className="text-lightGray">
                <IoLocation className="w-[25px] h-[25px] " />
              </p>
            </div>

            <input
              type="search"
              placeholder="Search Your Location"
              onChange={(e)=>handleCountry(e.target.value)}
              className="w-[92%] outline-none bg-transparent h-full font-normal text-[14px] text-inputText px-4"
            />
          </div>

          <h2 className="text-[28px] font-Lato font-bold leading-4 mt-10 mb-2 bg-inputBlue  text-customGreen capitalize">
            delivery address
          </h2>

          <div className="w-full h-[48px] mt-5 rounded-lg border-2 bg-inputBlue border-inputBorder">
            <input
              type="text"
              placeholder="Apt Line Address"
              className="w-full outline-none bg-transparent h-full font-normal text-[14px] text-inputText px-4"
              onChange={(e) => setAddress1(e.target.value)}
            />
          </div>

          <div className="w-full h-[48px] flex items-center  mt-3 rounded-lg bg-inputBlue border-2 border-inputBorder">
            <input
              type="text"
              placeholder="Street Address"
              className="w-[90%] outline-none bg-transparent h-full font-normal text-[14px] text-inputText  px-4"
              onChange={(e) => setAddress2(e.target.value)}
            />
          </div>

          <div className="flex flex-row items-center gap-4 mt-3">
            <div className="w-[214px] h-[48px] flex items-center rounded-lg border-2 border-inputBorder">
              <input
                type="text"
                placeholder="City"
                className="w-full outline-none bg-transparent h-full font-normal text-[14px] text-inputText px-4"
                onChange={(e) => setCity(e.target.value)}
              />
            </div>

            <div className="w-[214px] h-[48px] flex items-center rounded-lg border-2 border-inputBorder">
              <input
                type="text"
                placeholder="State/province"
                className="w-full outline-none bg-transparent h-full font-normal text-[14px] text-inputText px-4"
                onChange={(e) => setStateProvince(e.target.value)}
              />
            </div>
          </div>


          <div className="w-full h-[48px] flex items-center  mt-3 rounded-lg border-2 bg-inputBlue border-inputBorder">
            <input
              type="text"
              placeholder="Land Mark"
              className="w-full outline-none bg-transparent h-full font-normal text-[14px] text-inputText px-4"
              onChange={(e) => setLandMark(e.target.value)}
            />
          </div>
          <button
            // onClick={() => router.push("/home")}
            onClick={()=>handeClick()}
            className="w-full h-[41px] bg-[#DE7230] mt-10 text-center rounded-lg text-slate-50 text-[18px] font-bold capitalize transition-transform duration-300 ease-in-out transform hover:scale-[0.97]"
          >
            confirm
          </button>
        </div>
        <p className="text-center text-[12px] mt-12 text-lightGray">
          Developed by FortXcore
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

export default DeliveryDetails;
