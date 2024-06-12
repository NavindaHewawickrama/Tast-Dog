"use client";
import FavoriteFoods from "@/components/FavoriteFoods";
import NearbyShops from "@/components/NearbyShops";
import PageTransition from "@/components/PageTransition";
import Slider from "@/components/Slider";
import { useRouter } from "next/navigation";
import React, { use } from "react";
import { useEffect,useState } from "react";

const Home = () => {
  const [userNames, setUserName] = useState<string | null>(null);
  const [salutation, setSalutation] = useState<string | null>(null);
  useEffect(() => {
    const userID = localStorage.getItem("userId");
    const userName = localStorage.getItem("userName");
    setUserName(userName);

    if (new Date().getHours() < 12) {
      setSalutation("Good morning");
    } else if (new Date().getHours() < 18) {
      setSalutation("Good afternoon");
    } else {
      setSalutation("Good evening");
    }

  },[]);
  

  

  return (
    <>
      <PageTransition>
        <div className="px-[50px] py-[30px]">
          <h2 className="capitalize text-[24px] font-bold">
            {salutation} {userNames}
          </h2>
          <div className="mt-7 xl:px-[70px] md:px-[35px] w-full h-[390px]">
            <Slider />
          </div>

          <NearbyShops />
        </div>
      </PageTransition>
      <div>
        <div className="px-[50px] py-[30px]">
          <FavoriteFoods />
        </div>
      </div>
    </>
  );
};

export default Home;
