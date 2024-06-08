"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";
import Reviews from "@/constants/Reviews";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { useRouter } from "next/navigation";

import "swiper/css";
import "swiper/css/navigation";
import PageTransition from "@/components/PageTransition";
import AddToCart from "@/components/models/AddToCart";

const ProductView = () => {
  const router = useRouter();
  const [favouriteFoodId ,setFavouriteFoodId] = useState<string | null>(null);
  const [foodData, setFoodData] = useState<any>(null);
  const [toggle, setToggle] = useState(false);
  const[userName, setUserName] = useState<string | null>(null);
  const [shopName, setShopName] = useState<string | null>(null);
  const [shopId, setShopId] = useState<string | null>(null);
  const [ShopRating, setShopRatings] = useState<any[]>([]);
  const[itemComments,setItemComments] = useState<any[]>([]);

  useEffect(() => {
    const foodId = localStorage.getItem("productIDFavouriteFoods");
    const userName = setUserName(localStorage.getItem("userName"));
    const name = localStorage.getItem("shopName");
    const image = localStorage.getItem("shopImage");
    if(foodId){
      setFavouriteFoodId(foodId);
      fetchApiCalls(foodId);
      setShopName(name);
      // handleReview(foodId);
      handleShopId(foodId);
      handleFoodComments(foodId);
    } 
  }, []);


  //food reviews
  const handleFoodComments = async (foodId: any) => {
    try {
      // const response = await fetch(`https://tasty-dog.onrender.com/api/v1/shop-comments/shop-comments/${foodId}`);
      const response = await fetch(`https://tasty-dog.onrender.com/api/v1/shop-item-reviews/shop-item-reviews/${foodId}`);
  
      if (!response.ok) {
        const errorData = await response.json();
        console.log(errorData.message || "An error occurred.");
      } else {
        const dataComments = await response.json();
        setItemComments(dataComments);
      }
    } catch (error) {
      console.log("An error occurred. Please try again later.", error);
    }
  };

  //get shop id 
const handleShopId = async (id:any) =>{
  try{
    const response = await fetch(`https://tasty-dog.onrender.com/api/v1/shops/item/${id}`);
    
    const data = await response.json();
    //console.log(dataReviews);
    if(!response.ok){
      console.log(data.message || "An error occurred.");
    }else{
      console.log(data);
      setShopId(data.shopId);
      handleReview(data.shopId);
    }
  }catch(error){
    console.log("An error occurred. Please try again later." , error);
  }
}


  //ratings of the shop
  const handleReview = async(id:any)=>{
    // console.log(id);
    try{
      const response = await fetch(`https://tasty-dog.onrender.com/api/v1/shop-ratings/shop-ratings/${id}`);
      // const response = await fetch(`https://tasty-dog.onrender.com/api/v1/shop-ratings/shop-ratings/6614eae1637fe5068da340ba`);
      const dataReviews = await response.json();
      //console.log(dataReviews);
      if(!response.ok){
        console.log(dataReviews.message || "An error occurred.");
      }else{
        setShopRatings(dataReviews);
      }
    }catch(error){
      console.log("An error occurred. Please try again later." , error);
    }
  }

  const fetchApiCalls = async (foodId: any) => {
    try {
      const response = await fetch(`https://tasty-dog.onrender.com/api/v1/shops/item/${foodId}`);
      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }
      const data = await response.json();
      //console.log(data); // Check the data in the console
      setFoodData(data); // Update the state with the fetched data
    } catch (error) {
      console.error('Error fetching data:', error);
      setFoodData([]); // Update state with an empty array in case of an error
    }
  };

  const handleToggle =(id: string)=>{
    const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
    cartItems.push(id);
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    setToggle(true);
  };

  const handleBuyProduct = (item: any) =>{
    const productBuy = JSON.parse(localStorage.getItem("buyProductPlaceOrder") || "[]");
    productBuy.push(item);
    localStorage.setItem("buyProductPlaceOrder", productBuy);
    router.push("/home/productview/placeOrder");
  }


  return (
    <>
      <PageTransition>
        
        <div className="w-full px-[70px] py-[50px]">
          
          <div className="max-w-[1075px] flex flex-col">
           
            <div className="w-full h-full flex xl:gap-7 md:gap-4 ">
            
                  <div className="xl:w-[50%] md:w-[60%] h-full ">
                    <div className="max-w-[550px] h-[450px]">
                      <Image
                        src={Array.isArray(foodData?.itemImages) ? foodData?.itemImages[0] : foodData?.itemImages}
                        alt={foodData?.itemName || 'Product Name'}
                        width={45}
                        height={45}
                        className="w-full h-full rounded-2xl"
                      />
                    </div>
                  </div>
                  <div className="xl:w-[50%] md:w-[40%] py-[25px]">
                    <div className="xl:w-[337px] md:w-[250px] flex flex-col md:mx-auto">
                      <h2 className="xl:text-[30px] md:text-[22px] font-semibold capitalize mb-2">
                        {foodData?.itemName}
                      </h2>
                      <h2 className="xl:text-[30px] md:text-[25px] font-semibold text-primary capitalize mb-2">
                        ${foodData?.price}
                      </h2>
                      <div className="flex item-center gap-2">
                        <FaStar className="text-[30px] text-starColor" />
                        <FaStar className="text-[30px] text-starColor" />
                        <FaStar className="text-[30px] text-starColor" />
                        <FaStar className="text-[30px] text-starColor" />
                        <FaRegStar className="text-[30px] text-starColor" />
                      </div>
                      <div className="flex flex-col gap-2 mt-[75px]">
                        <button
                          className="w-full h-[45px] text-center text-white bg-buttonGreen text-20px capitalize rounded-xl transition-transform duration-300 ease-in-out transform hover:scale-95"
                          onClick={() => handleBuyProduct(foodData)}
                        >
                          buy now
                        </button>
                        <button
                          onClick={() => handleToggle(foodData?._id)}
                          className="w-full h-[45px] text-center text-button2 bg-none text-20px capitalize rounded-xl border-2 border-button2 transition-transform duration-300 ease-in-out transform hover:scale-95"
                        >
                          add to cart
                        </button>
                        <button className="w-full h-[45px] text-center text-buttonGreen bg-none text-20px capitalize rounded-xl border-2 border-buttonGreen transition-transform duration-300 ease-in-out transform hover:scale-95">
                          mark as favorite
                        </button>
                      </div>
                    </div>
                  </div>

              
            </div>
          </div>
          <div className="max-w-[1150px] flex  mt-[50px]">
            <div className="w-[50%]">
              <div className="w-full mb-5">
                <h3 className="text-[24px] text-primary capitalize font-semibold">
                  description
                </h3>
              </div>
              <p className="text-[16px] text-inputText">
                {foodData?.itemDesc}
              </p>
            </div>
            <div className="w-[50%]">
              <div className="w-full flex flex-col items-center">
                <div className="w-[55px] h-[55px] rounded-full ">
                  <Image
                    src={Array.isArray(foodData?.itemImages) ? foodData?.itemImages[0] : foodData?.itemImages}
                    alt="prouct"
                    width={55}
                    height={55}
                    className="rounded-full w-full h-full"
                  />
                </div>
                <h3 className="text-[18px] font-medium ">{shopName}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <FaStar className="text-starColor text-[25px]" />
                  <FaStar className="text-starColor text-[25px]" />
                  <FaStar className="text-starColor text-[25px]" />
                  <FaStar className="text-starColor text-[25px]" />
                  <FaRegStar className="text-starColor text-[25px]" />
                </div>
                {ShopRating.map((item)=>(
                <div key={item._id} className="flex flex-col justify-center gap-1 mt-2">
                  <div className="flex items-center justify-center gap-5">
                    <p className="text-[13px] text-primary font-semibold">
                      5 Stars
                    </p>

                    <div className="xl:w-[241px] md:w-[150px]  h-[15px] bg-lightGreen rounded-full dark:bg-lightGreen mt-[10px]">
                      <div className="bg-buttonGreen h-[15px] rounded-full w-[85%]"></div>
                    </div>

                    <p className="text-[13px] text-inputText">({item.fiveStarCount})</p>
                  </div>
                  <div className="flex items-center justify-center gap-5">
                    <p className="text-[13px] text-primary font-semibold">
                      4 Stars
                    </p>

                    <div className="xl:w-[241px] md:w-[150px]  h-[15px] bg-lightGreen rounded-full dark:bg-lightGreen mt-[10px]">
                      <div className="bg-buttonGreen h-[15px] rounded-full w-[60%]"></div>
                    </div>

                    <p className="text-[13px] text-inputText">({item.fourStarCount})</p>
                  </div>
                  <div className="flex items-center justify-center gap-5">
                    <p className="text-[13px] text-primary font-semibold">
                      3 Stars
                    </p>

                    <div className="xl:w-[241px] md:w-[150px]  h-[15px] bg-lightGreen rounded-full dark:bg-lightGreen mt-[10px]">
                      <div className="bg-buttonGreen h-[15px] rounded-full w-[35%]"></div>
                    </div>

                    <p className="text-[13px] text-inputText">({item.threeStarCount})</p>
                  </div>
                  <div className="flex items-center justify-center gap-5">
                    <p className="text-[13px] text-primary font-semibold">
                      2 Stars
                    </p>

                    <div className="xl:w-[241px] md:w-[150px]  h-[15px] bg-lightGreen rounded-full dark:bg-lightGreen mt-[10px]">
                      <div className="bg-buttonGreen h-[15px] rounded-full w-[25%]"></div>
                    </div>

                    <p className="text-[13px] text-inputText">({item.twoStarCount})</p>
                  </div>
                  <div className="flex items-center justify-center gap-5">
                    <p className="text-[13px] text-primary font-semibold">
                      1 Stars
                    </p>

                    <div className="xl:w-[241px] md:w-[150px]  h-[15px] bg-lightGreen rounded-full dark:bg-lightGreen mt-[10px]">
                      <div className="bg-buttonGreen h-[15px] rounded-full w-[10%]"></div>
                    </div>

                    <p className="text-[13px] text-inputText">({item.oneStarCount})</p>
                  </div>
                </div>
                ))}
              </div>
            </div>
          </div>

          <section className="w-full mt-[50px] mb-[50px]">
            <div>
              <h2 className="text-[24px] capitalize font-semibold">Reviews</h2>
            </div>
            <div className="w-full h-full mx-auto mt-3 md:hidden xl:flex">
              <Swiper
                modules={[Navigation]}
                spaceBetween={25}
                slidesPerView={1}
                navigation
              >
                {itemComments.map((item) => (
                  <SwiperSlide
                    key={item._id}
                    className="w-[230px] px-3 py-4 bg-lighterGreen rounded-lg"
                  >
                    <div className="flex  gap-5">
                      <div className="w-[30px] h-[30px] rounded-full">
                        <Image
                          src={item.userProfileImage}
                          alt="reviewer profile pic"
                          width={30}
                          height={30}
                          className="w-full h-full rounded-full"
                        />
                      </div>
                      <div className="w-full">
                        <h2 className="text-[17px] font-semibold capitalize">
                          {item.userName}
                        </h2>
                        <p className="text-[11px] text-inputText mt-2 text-left">
                          {item.comment}
                        </p>
                        <div className="flex flex-row items-center mt-3">
                          <FaStar className="text-starColor2 text-[15px]" />
                          <FaStar className="text-starColor2 text-[15px]" />
                          <FaStar className="text-starColor2 text-[15px]" />
                          <FaStar className="text-starColor2 text-[15px]" />
                          <FaRegStar className="text-starColor2 text-[15px]" />
                        </div>
                        Rating : {item.rating}
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            <div className="w-full h-full mx-auto mt-3 md:flex xl:hidden">
              <Swiper
                modules={[Navigation]}
                spaceBetween={20}
                slidesPerView={1}
                navigation
              >
                {itemComments.map((item) => (
                  <SwiperSlide
                    key={item._id}
                    className="w-[230px] px-3 py-4 bg-lighterGreen rounded-lg"
                  >
                    <div className="flex  gap-5">
                      <div className="w-[30px] h-[30px] rounded-full">
                        <Image
                          src={item.userProfileImage}
                          alt="reviewer profile pic"
                          width={30}
                          height={30}
                          className="w-full h-full rounded-full"
                        />
                      </div>
                      <div className="w-full">
                        <h2 className="text-[17px] font-semibold capitalize">
                          {/* {userName} */}
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
          </section>
        </div>
      </PageTransition>
      <AddToCart open={toggle} onClose={() => setToggle(false)} />
    </>
  );
};

export default ProductView;
