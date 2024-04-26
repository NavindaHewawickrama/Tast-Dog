import Image from "next/image";
import React from "react";

const NotFound = () => {
  return (
    <main className="w-screen h-screen flex flex-col justify-center items-center">
      <Image src="/error404.webp" alt="error404" width={552} height={552} />
      <div className="flex flex-col gap-2 justify-center items-center mt-7">
        <h1 className="text-[32px] font-medium caption-top">Page Not Found</h1>
        <p className="text-[20px] text-inputText">
          The resources requested couldn’t be found on this server
        </p>
      </div>
    </main>
  );
};

export default NotFound;
