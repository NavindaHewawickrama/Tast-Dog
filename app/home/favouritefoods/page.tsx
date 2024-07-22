"use client";
import React, { useState,useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaStar } from "react-icons/fa6";
import { FaCartShopping } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import AddToCart from "@/components/models/AddToCart";
import PageTransition from "@/components/PageTransition";

const FavouriteFoods = () => {
    const router = useRouter();
    const [toggle, setToggle] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [shopName, setShopName] = useState<any| null>(null);
    const [shopImage, setShopImage] = useState<any | null>(null);
    const [shopId, setShopId] = useState<any | null>(null);
    const [visibleItems, setVisibleItems] = useState<any[]>([]);
    const[userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    handleFavouriteFoods();
  }, [visibleItems]);


  const handleFavouriteFoods = async()=>{
    const userId = localStorage.getItem("userId");
    setUserId(userId);
    try{
      const response = await fetch(`https://tasty-dog.onrender.com/api/v1/favoriteItems/favorite/${userId}`);
      const data = await response.json();
      if(!response.ok){
        console.log(data.message || "An error occurred.");
      }else{
        setVisibleItems(data);
      }
    }catch(error){
      console.log("An error occurred. Please try again later." , error);
    }
  }

  const handleToggle = (id: any) => {
    console.log(id);
    const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
    const existingItemIndex = cartItems.findIndex((item: any) => item._id === id.itemId);
    if(existingItemIndex === -1){
      cartItems.push({ ...id,
        _id:id.itemId,
        itemImages: id.itemImages[0],
        quantity: 1,
        });
    }else{
      cartItems[existingItemIndex].quantity += 1;
    }
    console.log(cartItems);
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

  const removeFavouriteItem = async(id:any)=>{
    try{
      const response = await fetch(`https://tasty-dog.onrender.com/api/v1/favoriteItems/favorite`,{
        method:"DELETE",
        headers:{
            "Content-Type":"application/json"
            },
        body:JSON.stringify({
            userId:userId,
            itemId:id,
        })
        });
      const data = await response.json();
      if(!response.ok){
        console.log(data.message || "An error occurred.");
      }else{
        window.location.reload;
        window.alert("Item Removed"); 
      }
    }catch(error){
      console.log("An error occurred. Please try again later." , error);
    }
  }
  
  return (
    <>
      <PageTransition>
        <div className="w-full my-[50px] px-[50px] overflow-hidden">
          <h1 className="capitalize text-[32px] font-bold">favorites</h1>

          {visibleItems.length === 0 ? (
            <div className="flex justify-center items-center h-[550px]">
              <p className="text-[32px] text-[#C9C9C9]">Nothing to show here</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-10 lg:gap-5 md:gap-5 mt-[50px]">
              {visibleItems.map((item) => (
                <div
                  key={item.id}
                  className="lg:w-full md:w-full xl:w-[95%] h-[320px] rounded-xl mb-5 shadow-lg z-0 cursor-pointer"
                  onClick={() => handleProductViewClick(item.itemId)}
                >
                  <div className="relative w-full h-[189px] rounded-t-xl z-0">
                    <Image
                      src={item.itemImages[0]}
                      alt={item.itemName}
                      width={252}
                      height={189}
                      className="w-full h-full rounded-t-xl z-0"
                    />
                    <div
                      className="absolute bottom-[-20px] right-[20px] w-[40px] h-[40px] z-10 transition-transform duration-300 ease-in-out transform hover:scale-[1.2]"
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent event bubbling to parent div
                        handleShopViewClick(item.itemId);
                      }}
                    >
                      <Image
                        src={item.shopImage}
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
                        {item.rating.toFixed(2)}
                        </p>
                        <p className="text-[13px] text-detail"> ({item.ratingCount})</p>
                      </div>
                      <button
                      onClick={(e)=>{
                        e.stopPropagation();
                        removeFavouriteItem(item.itemId);
                    }}
                        className="w-[60px] h-[25px] flex justify-center items-center bg-red-600 rounded-xl text-[10px] text-white gap-2 transition-transform duration-300 ease-in-out transform hover:scale-[1.1]"
                      >
                        Remove 
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent event bubbling to parent div
                          handleToggle(item);
                        }}
                        className="w-[86px] h-[25px] flex justify-center items-center bg-button2 rounded-xl text-[10px] text-white gap-2 transition-transform duration-300 ease-in-out transform hover:scale-[1.1]"
                      >
                        <FaCartShopping />
                        <p className="capitalize">add to cart</p>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </PageTransition>
      <AddToCart open={toggle} onClose={() => setToggle(false)} /> 
    </>
  );
};

export default FavouriteFoods;