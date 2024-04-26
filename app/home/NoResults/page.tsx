import Image from "next/image";
import React from "react";

const NoResults = () => {
  return (
    <div className="w-full px-[70px] py-[30px]">
      <p className="text-[14px] text-detail font-medium">
        No results found for
        <span className="text-button2 ml-2">&quot;Kottu&quot;</span>
      </p>
      <div className="w-full flex flex-col justify-center items-center">
        <Image
          src="/no_result.webp"
          alt="no-results_image"
          width={552}
          height={552}
        />
        <div className="flex flex-col justify-center items-center gap-1 mt-[-50px]">
          <h1 className="text-[32px] font-semibold capitalize">
            no results found
          </h1>
          <p className="text-[20px] text-inputText capitalize ">
            {" "}
            sorry we couldn’t find any results
          </p>
        </div>
      </div>
    </div>
  );
};

export default NoResults;
