"use client";
import React, { useEffect, useState } from "react";
//import Shops from "@/constants/Shops";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { IoStar } from "react-icons/io5";
import { IoMdStarOutline } from "react-icons/io";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";


const NearbyShops = () => {
  const router = useRouter();
  const [Shop, setShops] = useState<any[]>([]);
  const [swipersettings,setSwipersettings] = useState(0);
  useEffect(() => {
    handleNearbyhops();
  }, []);

  const handleNearbyhops = async () => {
    try{
      const response = await fetch("https://tasty-dog.onrender.com/api/v1/shops/shops/getTopRatedShops",{method:"POST"});
      const data = await response.json();
      console.log('shops are', data);
      if(!response.ok){
        console.log(data.message || "An error occurred.");
      }else{
        setShops(data);
        if(data.length < 6){
          setSwipersettings(5);
        }else{
          setSwipersettings(7);
        }
      }
    }catch(error){
      console.log("An error occurred. Please try again later." , error);
      
    }
  };

  

  const handlePush = (id: string, name: string, image: string) => {
    localStorage.setItem("shopId", id);
    localStorage.setItem("shopName",name)
    localStorage.setItem("shopImage",image)
    router.push("/home/shopview/");
  };

  return (
    <div className="mt-[50px] w-full overflow-hidden ">
      <h2 className="capitalize text-[24px] font-bold mb-[20px]">
        Shops Nearby
      </h2>
      <div className="md:hidden xl:flex">
        <Swiper
          modules={[Navigation]}
          spaceBetween={15}
          slidesPerView={swipersettings}
          navigation
        >
          {Shop &&
            Shop.map((item) => (
              <SwiperSlide
                key={item.shopId}
                onClick={() => handlePush(item.shopId, item.name, item.imageUrl)}
              >
                <div className="w-[150px] py-3 flex flex-col gap-2 items-center justify-center mx-auto bg-[#f5f5f5] rounded-xl  border-2 cursor-pointer ">
                  <div className="w-[95px] h-[95px]">
                    <Image
                      src={item.imageUrl}
                      alt={item.name}
                      width={95}
                      height={95}
                      className="w-full h-full rounded-full"
                    />
                  </div>
                  <h3 className="font-semibold text-[16.65px] text-primary">
                    {item.name.length > 10 ? `${item.name.slice(0, 12)}...` : item.name}
                  </h3>
                  <div className="flex flex-row items-center gap-0.5  ">
                    <IoStar className="w-[13px] h-[13px] text-ratings" />
                    <IoStar className="w-[13px] h-[13px] text-ratings" />
                    <IoStar className="w-[13px] h-[13px] text-ratings" />
                    <IoStar className="w-[13px] h-[13px] text-ratings" />
                    <IoMdStarOutline className="w-[13px] h-[13px] text-ratings" />
                  </div>
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>

      <div className="md:flex xl:hidden">
        <Swiper
          modules={[Navigation]}
          spaceBetween={25}
          slidesPerView={2}
          navigation
        >
          {Shop &&
            Shop.map((item) => (
              <SwiperSlide
                key={item.shopId}
                onClick={() => handlePush(item.shopId, item.name, item.imageUrl)}
              >
                <div className="w-full py-3 flex flex-col gap-2 items-center justify-center mx-auto bg-[#f5f5f5] rounded-xl shadow-xl border-[#f3f3f3] cursor-pointer ">
                  <div className="w-[85px] h-[85px] ">
                    <Image
                      src={item.imageUrl}
                      alt={item.name}
                      width={85}
                      height={85}
                      className="w-full h-full "
                    />
                  </div>
                  <h3 className="font-semibold text-[16.65px] text-primary">
                    {item.name.length > 10 ? `${item.name.slice(0, 10)}...` : item.name}
                  </h3>
                  <div className="flex flex-row items-center gap-0.5">
                    {[...Array(Math.floor(item.averageRating))].map((_, index) => (
                      <IoStar
                        key={index}
                        className="w-[13px] h-[13px] text-ratings"
                      />
                    ))}
                    {[...Array(5 - Math.floor(item.averageRating))].map((_, index) => (
                      <IoMdStarOutline
                        key={index}
                        className="w-[13px] h-[13px] text-ratings"
                      />
                    ))}
                  </div>
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </div>
  );
};

export default NearbyShops;
