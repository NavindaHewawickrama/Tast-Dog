"use client";

import FavoriteFoods from "@/components/FavoriteFoods";
import NearbyShops from "@/components/NearbyShops";
import PageTransition from "@/components/PageTransition";
import Slider from "@/components/Slider";
import { useRouter } from "next/navigation";
// import { messaging, getToken, onMessage } from '../../firebaseConfig';
import { toast, ToastContainer } from "react-toastify";
import Message from "@/components/Message";
import AddToCart from "@/components/models/AddToCart";
import Notification from "@/components/Notification"; 

import React, { useEffect, useState } from "react";

const Home = () => {

  //#region states
  const [userNames, setUserName] = useState<string | null>(null);
  const [salutation, setSalutation] = useState<string | null>(null);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  
  
  useEffect(() => {
      const userID = localStorage.getItem("userId");
    const userName = localStorage.getItem("userName");
    setUserName(userName);

    // onMessage(messaging, (payload) => {
      
    // });
    

    if (new Date().getHours() < 12) {
      setSalutation("Good morning");
    } else if (new Date().getHours() < 18) {
      setSalutation("Good afternoon");
    } else {
      setSalutation("Good evening");
    }

    const requestPermissionAndFetchToken = async () => {
      console.log('Requesting permission...');
      try {
        console.log('Permission:');
        const permission = await window.Notification.requestPermission();
        
        if (permission === 'granted') {
          console.log('Notification permission granted.');
          // const token = await getToken(messaging, { vapidKey: 'BH_yRXi3vloIr9GxIWAE-3T5t6r1wXsCSr5wWKsLKqu_Gsevi_tb9kOic7jMTypeeV5i-NB7fwrplOu5eAiOX1E' });
          const token = '';
          console.log('Token:', token);
            if (token) {
              console.log('Device token:', token);
              localStorage.setItem('deviceToken', token);
          } else {
            console.log('No registration token available. Request permission to generate one.');
          }
        } else {
          console.log('Unable to get permission to notify.');
        }
      } catch (error) {
        console.error('An error occurred while retrieving token.', error);
      }
    };

    requestPermissionAndFetchToken();

    // onMessage(messaging, (payload) => {
    //   // console.log('Message received home ', payload); 
    //   // const { title, body } = payload.notification;
    //   // setNotificationMessage({
    //   //   message: title,
    //   //   link: "/home/notifications",
    //   //   linkText: body,
    //   // });
    //   // setIsNotificationOpen(true);
    // });

  }, []);

  //#endregion
  
  
  return (
    <>
      <PageTransition>
        <div className="px-[50px] py-[30px]">
          <h2 className="capitalize text-[24px] font-bold">
            {salutation} {userNames}
          </h2>
          <div className="mt-2 xl:px-[40px] md:px-[35px] w-full h-[390px]">
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
