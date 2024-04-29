"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { FaStar } from "react-icons/fa6";
import { FaCartShopping } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import Noodles from "@/constants/Noodles";
import AddToCart from "@/components/models/AddToCart";

const SearchResults = () => {
  const router = useRouter();
  const [toggle, setToggle] = useState(false);
  const [results, setResults] = useState<string | null>(null);
  const [query, setQuery] = useState<string | null>(null);

  useEffect(() => { 
    setResults(localStorage.getItem("searchResults")); 
    console.log(results) ;
  }, []);

  

  const handleToggle = () => {
    setToggle(true);
  };

  const handleShopViewClick = () => {
    router.push("/home/shopview");
  };

  return (
    <div className="w-full px-[70px] py-[30px]">
      <p className="text-[14px] text-detail font-medium">
        16 results found for
        <span className="text-button2 ml-2">&quot;{query}&quot;</span>
      </p>
      <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 mt-[50px] gap-10">
        {Noodles.map((item) => (
          <div
            key={item.id}
            className="w-full h-[310px] rounded-xl mb-7 shadow-lg z-0 cursor-pointer "
            onClick={() => router.push("/home/productview")}
          >
            <div className="relative w-full h-[189px] rounded-t-xl z-0">
              <Image
                src={item.image}
                alt={item.Name}
                width={252}
                height={189}
                className="w-full h-full rounded-t-xl z-0"
              />
              <div
                className="absolute bottom-[-20px] right-[20px] w-[40px] h-[40px] z-10 transition-transform duration-300 ease-in-out transform hover:scale-[1.2]"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent event bubbling to parent div
                  handleShopViewClick();
                }}
              >
                <Image
                  src={item.logo || ""}
                  alt={item.Name}
                  fill
                  className="rounded-full"
                />
              </div>
            </div>
            <div className="py-3 px-3">
              <h3 className="text-[15px] text-detail capitalize font-medium">
                {item.Name}
              </h3>
              <h3 className="text-[20px] font-bold text-black ">
                {item.price}
              </h3>
              <div className="w-full flex flex-row justify-between items-center mt-2">
                <div className="flex items-center ">
                  <FaStar className="w-[12px] h-[12px] text-ratings" />
                  <p className="text-[13px] text-detail font-medium ml-1">
                    {item.rating}
                  </p>
                  <p className="text-[13px] text-detail"> {item.rates}</p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent event bubbling to parent div
                    handleToggle();
                  }}
                  className="w-[86px] h-[27px] flex justify-center items-center bg-button2 rounded-xl text-[10px] text-white gap-2 transition-transform duration-300 ease-in-out transform hover:scale-[1.1]"
                >
                  <FaCartShopping />
                  <p className="capitalize">add to cart</p>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <AddToCart open={toggle} onClose={() => setToggle(false)} />
    </div>
  );
};

export default SearchResults;
