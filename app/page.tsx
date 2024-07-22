"use client";
import Login from "@/app/(auth)/login/page";
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
