"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";
import Reviews from "@/constants/Reviews";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { useRouter } from "next/navigation";
import profilePic from "./../../../public/Logo2.png";
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
  const[userId, setUserId] = useState<string | null>(null);
  const [shopName, setShopName] = useState<any| null>(null);
  const [shopImage, setShopImage] = useState<any | null>(null);
  const [shopId, setShopId] = useState<string | null>(null);
  const [ShopRating, setShopRatings] = useState<any[]>([]);
  const[itemComments,setItemComments] = useState<any[]>([]);
  const [ratings, setRatings] = useState<any>(null);

  useEffect(() => {
    const foodId = localStorage.getItem("productIDFavouriteFoods");
    const userName = setUserName(localStorage.getItem("userName"));
    const userIdG = setUserId(localStorage.getItem("userId"));
    const name = localStorage.getItem("shopName");
    const image = localStorage.getItem("shopImage");

    const fetchRatings = async (foodId: any) => {
      try {
        const response = await fetch(`https://tasty-dog.onrender.com/api/v1/shop-item-ratings/shop-item-ratings/${foodId}`);
        if (!response.ok) {
          throw new Error('Network response was not ok.');
        }
        console.log('response.status', response.status);
        const data = await response.json();
        setRatings(data); 
      } catch (error) {
        console.error('Error fetching ratings:', error);
      }
    };

    if(foodId){
      setFavouriteFoodId(foodId);
      fetchApiCalls(foodId);
      setShopName(name);
      setShopImage(image);
      handleShopId(foodId);
      fetchRatings(foodId);
      handleFoodComments(foodId);
    } 
  }, []);


  //food reviews
  const handleFoodComments = async (foodId: any) => {
    try {
      const response = await fetch(`https://tasty-dog.onrender.com/api/v1/shop-item-reviews/shop-item-reviews/${foodId}`);
      console.log(response);
      if (!response.ok) {
        const errorData = await response.json();
        console.log(errorData.message || "An error occurred.");
      } else {
        const dataComments = await response.json();
        console.log(dataComments);
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
    try{
      const response = await fetch(`https://tasty-dog.onrender.com/api/v1/shop-ratings/shop-ratings/${id}`);
      const dataReviews = await response.json();
      if(!response.ok){
        console.log(dataReviews.message || "An error occurred.");
      }else{
        setShopRatings(dataReviews);
        console.log('dataReviews', dataReviews);
      }
    }catch(error){
      console.log("An error occurred. Please try again later." , error);
    }
  }

  //getting food item data
  const fetchApiCalls = async (foodId: any) => {
    try {
      const response = await fetch(`https://tasty-dog.onrender.com/api/v1/shops/item/${foodId}`);
      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }
      const data = await response.json();
      setFoodData(data); 
    } catch (error) {
      console.error('Error fetching data:', error);
      setFoodData([]); 
    }
  };

  //updating cart items in localstorage
  const handleToggle =(id: any)=>{
    console.log(id);
    const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
    const existingItemIndex = cartItems.findIndex((item: any) => item._id === id._id);
    if(existingItemIndex === -1){
      cartItems.push({ ...id, itemImages: id.itemImages[0] });
    }else{
      cartItems[existingItemIndex].quantity += 1;
    }
    console.log(cartItems);
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    setToggle(true);
  };

  const handleBuyProduct = (item: any) => {
    let productBuy;
    try {
      productBuy = JSON.parse(localStorage.getItem("buyProductPlaceOrder") || "[]");
      if (!Array.isArray(productBuy)) {
        productBuy = [];
      }
    } catch (error) {
      console.error("Error parsing buyProductPlaceOrder from localStorage", error);
      productBuy = [];
    }

    const itemExists = productBuy.some((product: any) => product._id === item._id);
    if (!itemExists) {
      productBuy.push(item);
    }
    
    localStorage.setItem("buyProductShopName",shopName);
    localStorage.setItem("buyProductShopImage",shopImage);
    localStorage.setItem("buyProductPlaceOrder", JSON.stringify(productBuy));
    router.push("/home/productview/placeOrder");
  };

//rating stars
  const renderStars = () => {
    console.log('ratings', ratings);
    if (!ratings) return null; 
    let averageRating;
    if (ratings && ratings.length > 0 && 'averageRating' in ratings[0]) {
      averageRating = ratings[0].averageRating;
    } else {
      averageRating = 0; 
    }
    console.log('averageRating', averageRating);
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < averageRating) {
        stars.push(<FaStar key={i} className="text-starColor" />);
      } else {
        stars.push(<FaRegStar key={i} className="text-starColor" />);
      }
    }
    return stars;
  };

  //adding favourite items
  const handleAddToFavourite=async(itemId:any)=>{
    try{
      const response = await fetch("https://tasty-dog.onrender.com/api/v1/favoriteItems/favorite",{
        method:"POST",
        headers:{
          "Content-Type":"application/json",
        },
        body:JSON.stringify({
          userId,
          itemId,
        }),
      });
      const data = await response.json();
      if(!response.ok){
        console.log(data.message || "An error occurred.");
      }else{
        console.log(data);
        window.alert("Item marked as favourite !!!");
      }
    }catch(e){
      console.log("An error occurred. Please try again later." , e);
    }
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
                        width={1000}
                        height={1000}
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
                       {renderStars()}
                      </div>
                      <div className="flex flex-col gap-2 mt-[75px]">
                        <button
                          className="w-full h-[45px] text-center text-white bg-buttonGreen text-20px capitalize rounded-xl transition-transform duration-300 ease-in-out transform hover:scale-95"
                          onClick={() => handleBuyProduct(foodData)}
                        >
                          buy now
                        </button>
                        <button
                          onClick={() => handleToggle(foodData)}
                          className="w-full h-[45px] text-center text-button2 bg-none text-20px capitalize rounded-xl border-2 border-button2 transition-transform duration-300 ease-in-out transform hover:scale-95"
                        >
                          add to cart
                        </button>
                        <button  
                        onClick={()=>handleAddToFavourite(foodData?._id)}
                        className="w-full h-[45px] text-center text-buttonGreen bg-none text-20px capitalize rounded-xl border-2 border-buttonGreen transition-transform duration-300 ease-in-out transform hover:scale-95">
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
                    src={shopImage? shopImage:profilePic}
                    alt="prouct"
                    width={55}
                    height={55}
                    className="rounded-full w-full h-full"
                  />
                </div>
                <h3 className="text-[18px] font-medium ">{shopName}</h3>
                <div className="flex items-center gap-2 mt-1">
                <div className="flex items-center gap-2 mt-1">
                {[...Array(5)].map((_, index) => (
                  <span key={index}>
                    {index < Math.floor(ShopRating[0]?.averageRating || 0) ? (
                      <FaStar className="text-starColor text-[25px]" />
                    ) : (
                      <FaRegStar className="text-starColor text-[25px]" />
                    )}
                  </span>
                ))}
              </div>
            </div>
                {ShopRating.map((item)=>(
                <div key={item._id} className="flex flex-col justify-center gap-1 mt-2">
                  <div className="flex items-center justify-center gap-5">
                    <p className="text-[13px] text-primary font-semibold">
                      5 Stars
                    </p>

                    <div className="xl:w-[241px] md:w-[150px]  h-[15px] bg-lightGreen rounded-full dark:bg-lightGreen mt-[10px]">
                      <div className="bg-buttonGreen h-[15px] rounded-full" style={{ width: `${(item.fiveStarCount / item.totalRatings) * 100}%` }}></div>
                    </div>

                    <p className="text-[13px] text-inputText">({item.fiveStarCount})</p>
                  </div>
                  <div className="flex items-center justify-center gap-5">
                    <p className="text-[13px] text-primary font-semibold">
                      4 Stars
                    </p>

                    <div className="xl:w-[241px] md:w-[150px]  h-[15px] bg-lightGreen rounded-full dark:bg-lightGreen mt-[10px]">
                      <div className="bg-buttonGreen h-[15px] rounded-full" style={{ width: `${(item.fourStarCount/ item.totalRatings) * 100}%` }}></div>
                    </div>

                    <p className="text-[13px] text-inputText">({item.fourStarCount})</p>
                  </div>
                  <div className="flex items-center justify-center gap-5">
                    <p className="text-[13px] text-primary font-semibold">
                      3 Stars
                    </p>

                    <div className="xl:w-[241px] md:w-[150px]  h-[15px] bg-lightGreen rounded-full dark:bg-lightGreen mt-[10px]">
                      <div className="bg-buttonGreen h-[15px] rounded-full" style={{ width: `${(item.threeStarCount / item.totalRatings) * 100}%` }}></div>
                    </div>

                    <p className="text-[13px] text-inputText">({item.threeStarCount})</p>
                  </div>
                  <div className="flex items-center justify-center gap-5">
                    <p className="text-[13px] text-primary font-semibold">
                      2 Stars
                    </p>

                    <div className="xl:w-[241px] md:w-[150px]  h-[15px] bg-lightGreen rounded-full dark:bg-lightGreen mt-[10px]">
                      <div className="bg-buttonGreen h-[15px] rounded-full" style={{ width: `${(item.twoStarCount / item.totalRatings) * 100}%` }}></div>
                    </div>

                    <p className="text-[13px] text-inputText">({item.twoStarCount})</p>
                  </div>
                  <div className="flex items-center justify-center gap-5">
                    <p className="text-[13px] text-primary font-semibold">
                      1 Stars
                    </p>

                    <div className="xl:w-[241px] md:w-[150px]  h-[15px] bg-lightGreen rounded-full dark:bg-lightGreen mt-[10px]">
                      <div className="bg-buttonGreen h-[15px] rounded-full" style={{ width: `${(item.oneStarCount / item.totalRatings) * 100}%` }}></div>
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
