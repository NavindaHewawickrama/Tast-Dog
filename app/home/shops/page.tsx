"use client";
import { FaStar } from "react-icons/fa6";
import React, { useState,useEffect } from 'react';
import PageTransition from "@/components/PageTransition";
import Image from "next/image";
import { useRouter } from "next/navigation";
import CustomAlert from "../../alerts/customalert";

const Shop = () =>{
    const router = useRouter();
    const [shops,setShops] = useState<any[]>([]);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    const handleShowAlert = () => {
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000); // Auto-close after 3 seconds
    };

    useEffect(() => {
        handleShops();
    });

const handleShops = async()=>{
    try{
        const response = await fetch("https://tasty-dog.onrender.com/api/v1/shops/shops");
        
        if(!response.ok){
            // window.alert("Error loading shops page");
            setAlertMessage("Error loading shops page");
        handleShowAlert();
            console.log(response)
        }else{
            const data = await response.json();
            setShops(data);
        }
    }catch(error){
        console.log("An error occurred. Please try again later." , error);
    }
}

const handleShopViewClick = (id: string, name: string, image: string) => {
    localStorage.setItem("shopId", id);
    localStorage.setItem("shopName",name)
    localStorage.setItem("shopImage",image)
    router.push("/home/shopview/");
}


    return (
        <>
        <CustomAlert 
              message={alertMessage}
              show={showAlert} 
              onClose={() => setShowAlert(false)} 
            />
          <PageTransition>
            <div className="w-80% my-[50px] px-[50px] overflow-hidden">
              <h1 className="capitalize text-[32px] font-bold">Shops</h1>
    
              {shops.length === 0 ? (
                <div className="flex justify-center items-center h-[550px]">
                  <p className="text-[32px] text-[#C9C9C9]">Nothing to show here</p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-10 lg:gap-5 md:gap-5 mt-[50px]">
                  {shops.map((item) => (
                    <div
                      key={item.id}
                      className="lg:w-full md:w-full xl:w-[89%] h-[320px] rounded-xl mb-5 shadow-lg z-0 cursor-pointer hover:bg-green-200"
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent event bubbling to parent div
                        handleShopViewClick(item._id,item.name,item.profilePhoto);
                      }}
                    >
                      <div className="relative w-50% h-[189px] rounded-t-xl z-0">
                        <Image
                          src={item.profilePhoto}
                          alt={item.name}
                          width={200}
                          height={189}
                          className="w-full h-full rounded-t-xl z-0"
                        />
                      </div>
                      <div className="py-3 px-3">
                        <h3 className="text-[15px] text-detail capitalize font-medium">
                        {item.name}
                        </h3>
                        <p className="text-[15px] font-bold text-black ">
                          {item.address}
                        </p>
                        <div className="w-full flex flex-row justify-between items-center mt-2">
                          <div className="flex items-center ">
                            <FaStar className="w-[12px] h-[12px] text-ratings" />
                            <p className="text-[13px] text-detail font-medium ml-1">
                            {item.averageRating.toFixed(2)}
                            </p>
                            <p className="text-[13px] text-detail"> ({item.totalRatings})</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </PageTransition>
        </>
      );
}

export default Shop;