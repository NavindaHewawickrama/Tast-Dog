"use client";
import Login from "@/app/(auth)/login/page";
import Message from "@/components/Message";
import { messaging } from "@/firebaseConfig";
import { onMessage } from "firebase/messaging";
import Image from "next/image";
import { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";

export default function Home() {

  return (
    <>
      <Login />
    </>
  );
}
