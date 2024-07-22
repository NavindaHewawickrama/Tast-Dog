"use client";
//#region imports
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaStar } from "react-icons/fa6";
import { FaCartShopping } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import AddToCart from "./models/AddToCart";
import PageTransition from "./PageTransition";
import { GrFormNextLink } from "react-icons/gr";
import { LiaFileImportSolid } from "react-icons/lia";
//#endregion

const FavoriteFoods = () => {
  //#region states
  const router = useRouter();

  const [toggle, setToggle] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [shopName, setShopName] = useState<any | null>(null);
  const [shopImage, setShopImage] = useState<any | null>(null);
  const [shopId, setShopId] = useState<any | null>(null);
  const [visibleItems, setVisibleItems] = useState<any[]>([]);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    handleTopRatedFoods();
    setUserId(localStorage.getItem("userId"));
    
  }, []);
  //#endregion





//#region functions
  
  const handleTopRatedFoods = async () => {
    try{
      const response = await fetch("https://tasty-dog.onrender.com/api/v1/shops/shops/getTopRatedShopItems",{method:"POST"});
      const data = await response.json();
      if(!response.ok){
        console.log(data.message || "An error occurred.");
      }else{
        // console.log(data);
        setVisibleItems(data);
      }
    }catch(error){
      console.log("An error occurred. Please try again later." , error);
    }
  }

  const handleToggle = (id: any) => {
    console.log(id);
    const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
    const existingItemIndex = cartItems.findIndex((item: any) => item._id === id._id);
    if(existingItemIndex === -1){
      cartItems.push({ ...id,
        quantity: 1,
        });
    }else{
      cartItems[existingItemIndex].quantity += 1;
    }
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    setToggle(true);
  };

  const handleShopViewClick = async (id:any) => {
    try{
      const response = await fetch(`https://tasty-dog.onrender.com/api/v1/shops/item/${id}`);
      const data = await response.json();
      if(!response.ok){
        console.log(data.message || "An error occurred.");
      }else{
        localStorage.setItem("shopId",data.shopId);
        // console.log("Hi");
        // console.log(data.shopId);
        setShopId(data.shopId);
        handleShopData(data.shopId);
        // router.push("/home/shopview");
      }
    }catch(e){
      console.log(e);
    }
  };

  const handleShopData = async(id:any)=>{
    try{
      const response = await fetch(`https://tasty-dog.onrender.com/api/v1/shops/shops/${id}`);
      const data = await response.json();
      if(!response.ok){
        console.log(data.message || "An error occurred.");
      }else{
        localStorage.setItem("shopName",data.name);
        setShopName(data.name);
        localStorage.setItem("shopImage",data.profilePhoto);
        setShopImage(data.profilePhoto);
        router.push("/home/shopview");
      }
    }catch(e){
      console.log(e);
    }
  }

  const handleProductViewClick = async(id: string) => {
    //getting the shopname and Image
      const response = await fetch(`https://tasty-dog.onrender.com/api/v1/shops/item/${id}`);
      const data = await response.json();
      if(!response.ok){
        console.log(data.message || "An error occurred.");
      }else{
        setShopId(data.shopId);
        const response2 = await fetch(`https://tasty-dog.onrender.com/api/v1/shops/shops/${data.shopId}`);
        const data2 = await response2.json();
        if(!response2.ok){
          console.log(data2.message || "An error occurred.");
        }else{
          setShopName(data2.name);
          setShopImage(data2.profilePhoto);
          localStorage.setItem("shopName",data2.name);
          localStorage.setItem("shopImage",data2.profilePhoto);
        }
      }
    localStorage.setItem("productIDFavouriteFoods", id);
    router.push("/home/productview");
  };

 


  //#endregion

  return (
    <>
      <PageTransition>
        <div className="mt-[50px] w-full overflow-hidden">
          <div className="flex justify-between items-center">
            <h2 className="capitalize text-[24px] font-bold mb-[20px]">
              Top Rated Foods
            </h2>
            <Link
              href="/home/favorites"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="flex items-center gap-1 cursor-pointer mr-5"
            >
              <h4 className="text-[18px] text-inputText font-semibold capitalize">
                see all
              </h4>
              <GrFormNextLink
                size={30}
                className={`text-inputText ${
                  isHovered
                    ? "transition-transform transform ease-in-out translate-x-2"
                    : ""
                }`} // Conditionally apply ml-2 class when hovered
              />
            </Link>
          </div>

          <div className="grid  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  xl:gap-10 lg:gap-5 md:gap-5">
            {visibleItems.map((item) => (
              <div
                key={item._id}
                className="lg:w-full md:w-full xl:w-[95%] h-[320px] rounded-xl mb-5 shadow-lg z-0 cursor-pointer"
                onClick={() => handleProductViewClick(item._id)}
              >
                <div className="relative w-full h-[189px] rounded-t-xl z-0">
                  <Image
                    src={item.itemImages}
                    alt={item.itemName}
                    width={252}
                    height={189}
                    className="w-full h-full rounded-t-xl z-0"
                  />
                  <div
                    className="absolute bottom-[-20px] right-[20px] w-[40px] h-[40px] z-10 transition-transform duration-300 ease-in-out transform hover:scale-[1.2]"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent event bubbling to parent div
                      handleShopViewClick(item._id);
                    }}
                  >
                    <Image
                      src={item.shopProfilePhoto}
                      alt={item.itemName}
                      fill
                      className="rounded-full"
                    />
                  </div>
                </div>
                <div className="py-3 px-3">
                  <h3 className="text-[15px] text-detail capitalize font-medium">
                    {item.itemName}
                  </h3>
                  <h3 className="text-[20px] font-bold text-black ">
                    $ {item.price}
                  </h3>
                  <div className="w-full flex flex-row justify-between items-center mt-2">
                    <div className="flex items-center ">
                      <FaStar className="w-[12px] h-[12px] text-ratings" />
                      <p className="text-[13px] text-detail font-medium ml-1">
                      {item.averageRating.toFixed(1)}
                      </p>
                      <p className="text-[13px] text-detail">({item.totalRatings.toFixed(2)})</p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent event bubbling to parent div
                        handleToggle(item);
                      }}
                      className="w-[86px] h-[27px] flex justify-center items-center bg-button2 rounded-xl text-[10px] text-white gap-2 transition-transform duration-300 ease-in-out transform hover:scale-[1.1]"
                    >
                     <FaCartShopping className="w-[12px] h-[12px]" />
                      <p className="capitalize">add to cart</p>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </PageTransition>
      <AddToCart open={toggle} onClose={() => setToggle(false)} />
    </>
  );
};

export default FavoriteFoods;
