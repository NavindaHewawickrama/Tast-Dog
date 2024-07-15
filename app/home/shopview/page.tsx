"use client";

import React, { useState, useEffect } from "react";
import TopFoods from "@/constants/TopFoods";
import { FaStar } from "react-icons/fa6";
import { FaCartShopping } from "react-icons/fa6";
import { FaRegStar } from "react-icons/fa";
import { MdCall } from "react-icons/md";
import Reviews from "@/constants/Reviews";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { useRouter } from "next/navigation";
import AddToCart from "@/components/models/AddToCart";
import profilePic from "./../../../public/Logo2.png";

import "swiper/css";
import "swiper/css/navigation";
import PageTransition from "@/components/PageTransition";

const ShopView = () => {
  const router = useRouter();
  const [shopId, setShopId] = useState<any | null>(null);
  const [toggle, setToggle] = useState(false);
  const [shopName, setShopName] = useState<any | null>(null);
  const [shopImage, setShopImage] = useState<any | null>(null);
  const [shopData, setShopData] = useState<any[]>([]);
  const [userName, setUserName] = useState<string | null>(null);
  const [ShopRating, setShopRatings] = useState<any[]>([]);
  const [ShopComments, setShopComments] = useState<any[]>([]);
  const [swipersettings,setSwipersettings] = useState(0);

  useEffect(() => {
    const id = localStorage.getItem("shopId");
    const name = localStorage.getItem("shopName");
    const userName = setUserName(localStorage.getItem("userName"));
    const image = localStorage.getItem("shopImage");
    if (id && name) {
      setShopId(id);
      setShopName(name);
      fetchApiCall(id);
      handleShopReviews(id)
      handleShopComments(id);
      setShopImage(image)
    }
  }, []);

  //handling shop data
  const fetchApiCall = async (id: any) => {
    setShopId(localStorage.getItem("shopId"));
    try {
      const response = await fetch(`https://tasty-dog.onrender.com/api/v1/shops/shop-items-shop/${id}`);
      const data = await response.json();
      if (!response.ok) {
        console.log(data.message || "An error occurred.");
      } else {
        setShopData(data);
      }
    } catch (error) {
      console.log("An error occurred. Please try again later.", error);
    }
  }

  const handleShopComments = async (id: string) => {
    try {
      const response = await fetch(`https://tasty-dog.onrender.com/api/v1/shop-reviews/shop-reviews/${id}`);
      const dataComments = await response.json();
      if (!response.ok) {
        console.log(dataComments.message || "An error occurred.");
      } else {
        setShopComments(dataComments);
        console.log(dataComments);
        if(dataComments.length < 2){
          setSwipersettings(1);
        }else{
          setSwipersettings(2);
        }
      }
    } catch (error) {
      console.log("An error occurred. Please try again later.", error);
    }
  }


  const handleShopReviews = async (id: string) => {
    try {
      const response = await fetch(`https://tasty-dog.onrender.com/api/v1/shop-ratings/shop-ratings/${id}`);
      const dataReviews = await response.json();
      if (!response.ok) {
        console.log(dataReviews.message || "An error occurred.");
      } else {
        setShopRatings(dataReviews);
      }
    } catch (error) {
      console.log("An error occurred. Please try again later.", error);
    }
  };


  const handleToggle = (id: any) => {
    console.log(id);
    const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
    const existingItemIndex = cartItems.findIndex((item: any) => item._id === id._id);
    if (existingItemIndex === -1) {
      cartItems.push({ ...id, itemImages: id.itemImages[0] });
    } else {
      cartItems[existingItemIndex].quantity += 1;
    }
    console.log(cartItems);
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    setToggle(true);
  };

  //going to product page
  const handleProduct = (id: any) => {
    localStorage.setItem("shopName", shopName);
    localStorage.setItem("shopImage", shopImage);
    localStorage.setItem("productIDFavouriteFoods", id);
    router.push("/home/productview");
  }

  return (
    <>
      <PageTransition>
        <div className="w-full xl:px-[75px] md:px-[25px] lg:px-[50px] py-[30px]">
          <h2 className="text-[24px] text-detail font-bold">Menu</h2>
          <div className="mt-10 w-full flex xl:gap-[70px] md:gap-[30px]">
            <div className="x:w-[50%] md:w-[60%] h-full ">
              <div className="w-full grid grid-cols-2 xl:gap-6 md:gap-2">
                {shopData.map((item) => (
                  <div
                    key={item.id}
                    className="w-full h-full rounded-xl mb-10 shadow-lg z-0 cursor-pointer "
                    // onClick={() => router.push("/home/productview")}
                    onClick={() => handleProduct(item._id)}
                  >
                    <div className="relative w-full h-[189px] rounded-t-xl z-0">
                      <Image
                        src={item.itemImages[0]}
                        alt={item.itemName}
                        width={252}
                        height={189}
                        className="w-full h-full rounded-t-xl z-0 object-cover"
                      />
                    </div>
                    <div className="w-full mb-[-20px] py-3 px-3">
                      <h3 className="text-[15px] text-detail capitalize font-medium">
                        {item.itemName}
                      </h3>
                      <h3 className="text-[20px] font-bold text-black ">
                      $ {item.price}
                      </h3>
                      <div className="w-full h-full flex lg:flex-row md:flex-col lg:justify-between md:justify-center items-center mt-2">
                        <div className="flex items-center ">
                          <FaStar className="w-[12px] h-[12px] text-ratings" />
                          <p className="text-[13px] text-detail font-medium ml-1">
                            {item.averageRating.toFixed(1)}
                          </p>
                          <p className="text-[13px] text-detail">
                            {" "}
                            ({item.totalRatings})
                          </p>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation(); // Prevent event bubbling to parent div
                            handleToggle(item);
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
            </div>
            <div className="xl:w-[50%] md:w-[40%] h-full shadow-xl ">
              <div className="relative w-full h-[242px] bg-[url('/shopBackground.webp')] bg-cover rounded-t-xl flex items-center z-0">
                <div className="text-white flex gap-4 lg:px-[25px] md:px-[10px] z-10">
                  <div className="lg:w-[102px] lg:h-[102px] md:w-[50px] md:h-[50px] rounded-full bg-white flex justify-center items-center">
                    <Image
                      src={shopImage || "/dominos.png"}
                      alt="shopLogo"
                      width={500}
                      height={500}
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col gap-2 justify-center">
                    <h2 className="text-white text-[24px] capitalize">
                      {shopName}
                    </h2>
                    <div className="flex items-center gap-1">
                      <FaStar className="text-starColor text-[22px]" />
                      <FaStar className="text-starColor text-[22px]" />
                      <FaStar className="text-starColor text-[22px]" />
                      <FaStar className="text-starColor text-[22px]" />
                      <FaStar className="text-starColor text-[22px]" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full mt-10 px-3">
                <h3 className="text-[17px]  capitalize  font-semibold">
                  Reviews & Ratings
                </h3>
                <div className="w-full h-full mt-3 md:hidden xl:flex">
                  <Swiper
                    modules={[Navigation]}
                    spaceBetween={20}
                    slidesPerView={swipersettings}
                    navigation
                  >
                    {ShopComments.map((item) => (
                      <SwiperSlide
                        key={item._id}
                        className="w-[230px] px-3 py-4 bg-lighterGreen rounded-lg"
                      >
                        <div className="flex  gap-5">
                          <div className="w-[30px] h-[30px] rounded-full">
                            <Image
                              src={item.userId ? item.userId.profilePhoto : profilePic}
                              alt="reviewer profile pic"
                              width={30}
                              height={30}
                              className="w-full h-full rounded-full object-cover"
                            />
                          </div>
                          <div className="w-full">
                            <h2 className="text-[17px] font-semibold capitalize">
                              {item.userId ? item.userId.fullName : "Customer"}
                            </h2>
                            <p className="text-[11px] text-inputText mt-2 text-justify">
                              {item.comment}
                            </p>
                            <div className="flex flex-row items-center mt-3">
                              <FaStar className="text-starColor2 text-[15px]" />
                              <FaStar className="text-starColor2 text-[15px]" />
                              <FaStar className="text-starColor2 text-[15px]" />
                              <FaStar className="text-starColor2 text-[15px]" />
                              <FaRegStar className="text-starColor2 text-[15px]" />

                            </div>
                          </div>
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
                <div className="w-full h-full mt-3 md:flex xl:hidden">
                  <Swiper
                    modules={[Navigation]}
                    spaceBetween={20}
                    slidesPerView={swipersettings}
                    navigation
                  >
                    {ShopComments.map((item) => (
                      <SwiperSlide
                        key={item._id}
                        className="w-full px-3 py-4 bg-lighterGreen rounded-lg"
                      >
                        <div className="flex  gap-5">
                          <div className="w-[30px] h-[30px] rounded-full">
                            <Image
                              src={item.userId ? item.userId.profilePhoto : profilePic}
                              alt="reviewer profile pic"
                              width={30}
                              height={30}
                              className="w-full h-full rounded-full object-cover"
                            />
                          </div>
                          <div className="w-full">
                            <h2 className="text-[17px] font-semibold capitalize">
                              {item.userId ? item.userId.fullName : "Cutomer Name"}
                            </h2>
                            <p className="text-[11px] text-inputText mt-2 text-justify">
                              {item.comment}
                            </p>
                            <div className="flex flex-row items-center mt-3">
                              <FaStar className="text-starColor2 text-[15px]" />
                              <FaStar className="text-starColor2 text-[15px]" />
                              <FaStar className="text-starColor2 text-[15px]" />
                              <FaStar className="text-starColor2 text-[15px]" />
                              <FaRegStar className="text-starColor2 text-[15px]" />
                            </div>
                          </div>
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              </div>

              <div className="w-full flex flex-col items-center mt-[80px]">
                <div className="w-[75px] h-[75px] rounded-full bg-white flex justify-center items-center overflow-hidden">
                  <Image
                    src={shopImage || "/dominos.png"}
                    alt="dominos"
                    width={75}
                    height={75}
                    style={{
                      maskImage: "radial-gradient(circle, white 99%, transparent 100%)",
                      WebkitMaskImage: "radial-gradient(circle, white 99%, transparent 100%)",
                    }}
                  />
                </div>

                <h3 className="text-[18px] font-medium mt-2">{shopName}</h3>
                <div className="flex items-center gap-2 mt-5">
                  <FaStar className="text-starColor lg:text-[32px] md:text-[30px]" />
                  <FaStar className="text-starColor lg:text-[32px] md:text-[30px]" />
                  <FaStar className="text-starColor lg:text-[32px] md:text-[30px]" />
                  <FaStar className="text-starColor lg:text-[32px] md:text-[30px]" />
                  <FaRegStar className="text-starColor lg:text-[32px] md:text-[30px]" />
                </div>
                {ShopRating.map((item) => (
                  <div key={item._id} className="flex flex-col justify-center gap-3 mt-10">

                    <div className="flex items-center justify-center lg:gap-5 md:gap-2">
                      <p className="text-[14px] text-primary font-semibold">
                        5 Stars
                      </p>

                      <div className="xl:w-[320px] lg:w-[200px] md:w-[120px] xl:h-[25px] md:h-[18px] bg-lightGreen rounded-full dark:bg-lightGreen mt-[10px]">
                        <div className="bg-buttonGreen xl:h-[25px] md:h-[18px] rounded-full w-[85%]"></div>
                      </div>

                      <p className="text-[14px] text-inputText">({item.fiveStarCount})</p>
                    </div>

                    <div className="flex items-center lg:gap-5 md:gap-2">
                      <p className="text-[14px] text-primary font-semibold">
                        4 Stars
                      </p>

                      <div className="xl:w-[320px] lg:w-[200px] md:w-[120px] xl:h-[25px] md:h-[18px] bg-lightGreen rounded-full dark:bg-lightGreen mt-[10px]">
                        <div className="bg-buttonGreen xl:h-[25px] md:h-[18px] rounded-full w-[60%]"></div>
                      </div>

                      <p className="text-[14px] text-inputText">({item.fourStarCount})</p>
                    </div>
                    <div className="flex items-center lg:gap-5 md:gap-2">
                      <p className="text-[14px] text-primary font-semibold">
                        3 Stars
                      </p>

                      <div className="xl:w-[320px] lg:w-[200px] md:w-[120px] xl:h-[25px] md:h-[18px] bg-lightGreen rounded-full dark:bg-lightGreen mt-[10px]">
                        <div className="bg-buttonGreen xl:h-[25px] md:h-[18px] rounded-full w-[35%]"></div>
                      </div>

                      <p className="text-[14px] text-inputText">({item.threeStarCount})</p>
                    </div>
                    <div className="flex items-center lg:gap-5 md:gap-2">
                      <p className="text-[14px] text-primary font-semibold">
                        2 Stars
                      </p>

                      <div className="xl:w-[320px] lg:w-[200px] md:w-[120px] xl:h-[25px] md:h-[18px] bg-lightGreen rounded-full dark:bg-lightGreen mt-[10px]">
                        <div className="bg-buttonGreen xl:h-[25px] md:h-[18px] rounded-full w-[25%]"></div>
                      </div>

                      <p className="text-[14px] text-inputText">({item.twoStarCount})</p>
                    </div>
                    <div className="flex items-center lg:gap-5 md:gap-2">
                      <p className="text-[14px] text-primary font-semibold">
                        1 Stars
                      </p>

                      <div className="xl:w-[320px] lg:w-[200px] md:w-[120px] xl:h-[25px] md:h-[18px] bg-lightGreen rounded-full dark:bg-lightGreen mt-[10px]">
                        <div className="bg-buttonGreen xl:h-[25px] md:h-[18px] rounded-full w-[10%]"></div>
                      </div>

                      <p className="text-[14px] text-inputText">({item.oneStarCount})</p>
                    </div>
                  </div>
                ))}
              </div>

              <button className="md:w-[80%] h-[48px] mx-auto bg-none border border-lightGray rounded-lg lg:text-[20px] md:text-[16px] text-primary flex justify-center items-center lg:gap-5 md:gap-3 mt-[100px] mb-[25px] font-medium transition-transform duration-300 ease-in-out transform hover:scale-95">
                <MdCall className="text-primary" />
                Contact Shop
              </button>
            </div>
          </div>
        </div>
      </PageTransition>
      <AddToCart open={toggle} onClose={() => setToggle(false)} />
    </>
  );
};

export default ShopView;
