"use client";
import Message from "@/components/Message";
import Navbar from "@/components/Navbar";
import Notification from "@/components/Notification";
import Sidebar from "@/components/Sidebar";
import { messaging } from "@/firebaseConfig";
import { getToken, onMessage } from "firebase/messaging";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

export default function HomeLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {

  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState({
    message: "",
    link: "",
    linkText: "",
  });

  useEffect(() => {
    
    onMessage(messaging, (payload) => {
      // const { title, body, image } = payload.notification;
      // toast(<Message notification={{ title, body, image }} />);
    });

    const requestPermissionAndFetchToken = async () => {
      console.log('Requesting permission...');
      try {
        console.log('Permission:');
        const permission = await window.Notification.requestPermission();
        
        if (permission === 'granted') {
          console.log('Notification permission granted.');
          const token = await getToken(messaging, { vapidKey: 'BH_yRXi3vloIr9GxIWAE-3T5t6r1wXsCSr5wWKsLKqu_Gsevi_tb9kOic7jMTypeeV5i-NB7fwrplOu5eAiOX1E' });
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

    onMessage(messaging, (payload: any) => {
      console.log('Message received layout', payload);
      const { title, body, image } = payload.notification;
      setNotificationMessage({
        message: title,
        link: "/home/notifications",
        linkText: body,
      });
      setIsNotificationOpen(true);
    });

  }, []);

  return (
    <div className="w-full flex ">
      <ToastContainer/>
      <div className="w-[15%]">
        <Sidebar />
      </div>

      <div className="w-[85%] flex flex-col ">
        <Navbar />

        <main className="md:pl-[50px] lg:pl-0">{children}</main>
      </div>
      <Notification
        open={isNotificationOpen}
        onClose={() => setIsNotificationOpen(false)}
        message={notificationMessage.message}
        link={notificationMessage.link}
        linkText={notificationMessage.linkText} 
      />
    </div>
  );
}
