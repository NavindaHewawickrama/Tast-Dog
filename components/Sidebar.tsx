"use client";

import Image from "next/image";
import Link from "next/link";
import React ,{useState} from "react";
import { usePathname } from "next/navigation";
import { SiHomeassistantcommunitystore,SiHomeadvisor } from "react-icons/si";
import { IoFastFoodSharp , IoHeart} from "react-icons/io5";
import { FaCartShopping } from "react-icons/fa6";
import { FaGift } from "react-icons/fa";
import { IoIosSettings } from "react-icons/io";
import { IoLogOut } from "react-icons/io5";
import { auth } from '../firebaseConfig'


const Sidebar = () => {
  const pathname = usePathname();
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [cardDetails, setCardDetails] = useState<any[]>([]);
  const [productsBuying, setProductsBuying] = useState<any[]>([]);

  const handleLogout = () => {
    localStorage.removeItem("cartItems");
    sessionStorage.removeItem("cartItems"); // Remove cartItems from localStorage
    localStorage.removeItem("savedCardDetails");
    localStorage.removeItem("buyProductPlaceOrder");
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    localStorage.removeItem("addressId");
    setProductsBuying([]);
    setCartItems([]);
    setCardDetails([]); // Clear cartItems state
    auth.signOut()
    .then(() => {
        console.log("User signed out successfully");
    })
    .catch((error) => { 
        console.error("Error signing out:", error);
    });
  };

  return (
    <div className="fixed md:w-[180px] xl:w-[230px] h-screen bg-primary ">
      <div className="flex flex-col">
        <Image
          src="/Logo.webp"
          alt="logo"
          width={160}
          height={45}
          className="mt-[18px] xl:ml-[39px] md:ml-[10px]"
        />

        <div className="mt-10 w-full flex flex-col gap-2">
          <Link
            href="/home"
            className={
              pathname == "/home"
                ? "bg-gradient-to-r from-[#04AE5C] to-primary w-full h-[60px] flex flex-row px-[40px] items-center cursor-pointer gap-5 border-l-[12px] border-[#232b2b]"
                : "w-full h-[60px] flex flex-row px-[40px] items-center cursor-pointer gap-5"
            }
          >
            <SiHomeassistantcommunitystore className="text-white w-[24px] h-[24px]" />
            <h3 className="capitalize text-white font-semibold text-[15px] font-sans">
              home
            </h3>
          </Link>
          <Link
            href="/home/orders"
            className={
              pathname == "/home/orders"
                ? "bg-gradient-to-r from-[#04AE5C] to-primary w-full h-[60px] flex flex-row px-[40px] items-center cursor-pointer gap-5"
                : "w-full h-[60px] flex flex-row px-[40px] items-center cursor-pointer gap-5"
            }
          >
            <IoFastFoodSharp className="text-white w-[24px] h-[24px]" />
            <h3 className="capitalize text-white font-semibold text-[15px] font-sans">
              my orders
            </h3>
          </Link>
          <Link
            href="/home/cart"
            className={
              pathname == "/home/cart"
                ? "bg-gradient-to-r from-[#04AE5C] to-primary w-full h-[60px] flex flex-row px-[40px] items-center cursor-pointer gap-5"
                : "w-full h-[60px] flex flex-row px-[40px] items-center cursor-pointer gap-5"
            }
          >
            <FaCartShopping className="text-white w-[24px] h-[24px]" />
            <h3 className="capitalize text-white font-semibold text-[15px] font-sans">
              cart
            </h3>
          </Link>
          <Link
            href="/home/favouritefoods"
            className={
              pathname == "/home/favouritefoods"
                ? "bg-gradient-to-r from-[#04AE5C] to-primary w-full h-[60px] flex flex-row px-[40px] items-center cursor-pointer gap-5"
                : "w-full h-[60px] flex flex-row px-[40px] items-center cursor-pointer gap-5"
            }
          >
            <IoHeart className="text-white w-[24px] h-[24px]" />
            <h3 className="capitalize text-white font-semibold text-[15px] font-sans">
              favourites
            </h3>
          </Link>
          <Link
            href="/home/shops"
            className={
              pathname == "/home/shops"
                ? "bg-gradient-to-r from-[#04AE5C] to-primary w-full h-[60px] flex flex-row px-[40px] items-center cursor-pointer gap-5"
                : "w-full h-[60px] flex flex-row px-[40px] items-center cursor-pointer gap-5"
            }
          >
            <SiHomeadvisor className="text-white w-[24px] h-[24px]" />
            <h3 className="capitalize text-white font-semibold text-[15px] font-sans">
              shops
            </h3>
          </Link>
          <Link
            href="/home/rewards"
            className={
              pathname == "/home/rewards"
                ? "bg-gradient-to-r from-[#04AE5C] to-primary w-full h-[60px] flex flex-row px-[40px] items-center cursor-pointer gap-5"
                : "w-full h-[60px] flex flex-row px-[40px] items-center cursor-pointer gap-5"
            }
          >
            <FaGift className="text-white w-[24px] h-[24px]" />
            <h3 className="capitalize text-white font-semibold text-[15px] font-sans">
              loyalty rewards
            </h3>
          </Link>
          <Link
            href="/home/settings"
            className={
              pathname == "/home/settings"
                ? "bg-gradient-to-r from-[#04AE5C] to-primary w-full h-[60px] flex flex-row px-[40px] items-center cursor-pointer gap-5"
                : "w-full h-[60px] flex flex-row px-[40px] items-center cursor-pointer gap-5"
            }
          >
            <IoIosSettings className="text-white w-[24px] h-[24px]" />
            <h3 className="capitalize text-white font-semibold text-[15px] font-sans">
              settings
            </h3>
          </Link>
          <Link
            href="/"
            className="w-full h-[60px] flex flex-row px-[40px] items-center cursor-pointer gap-5"
            onClick={handleLogout}
          >
            <IoLogOut className="text-white w-[24px] h-[24px]" />
            <h3 className="capitalize text-white font-semibold text-[15px] font-sans">
              log out
            </h3>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
