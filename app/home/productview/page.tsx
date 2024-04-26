"use client";

import Image from "next/image";
import React, { useState } from "react";
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

  const [toggle, setToggle] = useState(false);

  return (
    <>
      <PageTransition>
        <div className="w-full px-[70px] py-[50px]">
          <div className="max-w-[1075px] flex flex-col">
            <div className="w-full h-full flex xl:gap-7 md:gap-4 ">
              <div className="xl:w-[50%] md:w-[60%] h-full ">
                <div className="max-w-[550px] h-[450px]">
                  <img
                    src="/prodcut.webp"
                    alt="product"
                    className="w-full h-full rounded-2xl"
                  />
                </div>
              </div>
              <div className=" xl:w-[50%] md:w-[40%] py-[25px]">
                <div className="xl:w-[337px] md:w-[250px] flex flex-col md:mx-auto">
                  <h2 className="xl:text-[30px] md:text-[22px] font-semibold capitalize mb-2">
                    Spicy Chicken Ramen
                  </h2>
                  <h2 className="xl:text-[30px] md:text-[25px] font-semibold text-primary capitalize mb-2">
                    $ 8.00
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
                      onClick={() =>
                        router.push("/home/productview/placeOrder")
                      }
                    >
                      buy now
                    </button>
                    <button
                      onClick={() => setToggle(true)}
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
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </div>
            <div className="w-[50%]">
              <div className="w-full flex flex-col items-center">
                <div className="w-[55px] h-[55px] rounded-full ">
                  <Image
                    src="/prodcut.webp"
                    alt="prouct"
                    width={55}
                    height={55}
                    className="rounded-full w-full h-full"
                  />
                </div>
                <h3 className="text-[18px] font-medium ">Domino’s Pizza</h3>
                <div className="flex items-center gap-2 mt-1">
                  <FaStar className="text-starColor text-[25px]" />
                  <FaStar className="text-starColor text-[25px]" />
                  <FaStar className="text-starColor text-[25px]" />
                  <FaStar className="text-starColor text-[25px]" />
                  <FaRegStar className="text-starColor text-[25px]" />
                </div>

                <div className="flex flex-col justify-center gap-1 mt-2">
                  <div className="flex items-center justify-center gap-5">
                    <p className="text-[13px] text-primary font-semibold">
                      5 Stars
                    </p>

                    <div className="xl:w-[241px] md:w-[150px]  h-[15px] bg-lightGreen rounded-full dark:bg-lightGreen mt-[10px]">
                      <div className="bg-buttonGreen h-[15px] rounded-full w-[85%]"></div>
                    </div>

                    <p className="text-[13px] text-inputText">(20)</p>
                  </div>
                  <div className="flex items-center justify-center gap-5">
                    <p className="text-[13px] text-primary font-semibold">
                      4 Stars
                    </p>

                    <div className="xl:w-[241px] md:w-[150px]  h-[15px] bg-lightGreen rounded-full dark:bg-lightGreen mt-[10px]">
                      <div className="bg-buttonGreen h-[15px] rounded-full w-[60%]"></div>
                    </div>

                    <p className="text-[13px] text-inputText">(6)</p>
                  </div>
                  <div className="flex items-center justify-center gap-5">
                    <p className="text-[13px] text-primary font-semibold">
                      3 Stars
                    </p>

                    <div className="xl:w-[241px] md:w-[150px]  h-[15px] bg-lightGreen rounded-full dark:bg-lightGreen mt-[10px]">
                      <div className="bg-buttonGreen h-[15px] rounded-full w-[35%]"></div>
                    </div>

                    <p className="text-[13px] text-inputText">(10)</p>
                  </div>
                  <div className="flex items-center justify-center gap-5">
                    <p className="text-[13px] text-primary font-semibold">
                      2 Stars
                    </p>

                    <div className="xl:w-[241px] md:w-[150px]  h-[15px] bg-lightGreen rounded-full dark:bg-lightGreen mt-[10px]">
                      <div className="bg-buttonGreen h-[15px] rounded-full w-[25%]"></div>
                    </div>

                    <p className="text-[13px] text-inputText">(1)</p>
                  </div>
                  <div className="flex items-center justify-center gap-5">
                    <p className="text-[13px] text-primary font-semibold">
                      1 Stars
                    </p>

                    <div className="xl:w-[241px] md:w-[150px]  h-[15px] bg-lightGreen rounded-full dark:bg-lightGreen mt-[10px]">
                      <div className="bg-buttonGreen h-[15px] rounded-full w-[10%]"></div>
                    </div>

                    <p className="text-[13px] text-inputText">(0)</p>
                  </div>
                </div>
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
                slidesPerView={4}
                navigation
              >
                {Reviews.map((item) => (
                  <SwiperSlide
                    key={item.id}
                    className="w-[230px] px-3 py-4 bg-lighterGreen rounded-lg"
                  >
                    <div className="flex  gap-5">
                      <div className="w-[30px] h-[30px] rounded-full">
                        <Image
                          src={item.image}
                          alt="reviewer profile pic"
                          width={30}
                          height={30}
                          className="w-full h-full rounded-full"
                        />
                      </div>
                      <div className="w-full">
                        <h2 className="text-[17px] font-semibold capitalize">
                          John Doe
                        </h2>
                        <p className="text-[11px] text-inputText mt-2 text-left">
                          {item.review}
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

            <div className="w-full h-full mx-auto mt-3 md:flex xl:hidden">
              <Swiper
                modules={[Navigation]}
                spaceBetween={20}
                slidesPerView={3}
                navigation
              >
                {Reviews.map((item) => (
                  <SwiperSlide
                    key={item.id}
                    className="w-[230px] px-3 py-4 bg-lighterGreen rounded-lg"
                  >
                    <div className="flex  gap-5">
                      <div className="w-[30px] h-[30px] rounded-full">
                        <Image
                          src={item.image}
                          alt="reviewer profile pic"
                          width={30}
                          height={30}
                          className="w-full h-full rounded-full"
                        />
                      </div>
                      <div className="w-full">
                        <h2 className="text-[17px] font-semibold capitalize">
                          John Doe
                        </h2>
                        <p className="text-[11px] text-inputText mt-2 text-justify">
                          {item.review}
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
