"use client";

import React, { useState,useEffect } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { BiData } from "react-icons/bi";

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const [allData, setAllData] = useState<any[]>([]); // State to store all data from API
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const router = useRouter();
  const filteredResults = [];

  useEffect(() => {
    fetchDataFromAPI();
  }, []);

  const fetchDataFromAPI = async () => {
    try {
      const response = await fetch(
        "https://tasty-dog.onrender.com/api/v1/shops/shops/getAllShopItems",
        { method: "POST" }
      );

      console.log(response);
      if (!response.ok) {
        console.log(response);
        
      }else{
        const data = await response.json();
        console.log("data is ",data);
        console.log(response);
        // console.log(data);
        setAllData(data);
      }
      
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
    setQuery(event.target.value);
    // fetchDataFromAPI();
  };


//   const handleSearch = async () => {
//     await fetchDataFromAPI();
//     let filteredResults: any[] = [];

//     for (let i = 0; i < allData.length; i++) {
//       if (allData[i].itemName === query.toString()) {
//         filteredResults.push(allData[i]);
//       }
//     }
//     if(filteredResults.length === 0){
//       setSearchResults(filteredResults);
//       localStorage.setItem("searchResults", query);
//       router.push("/home/SearchResults");
//     }else{
//       setSearchResults(filteredResults);
//       localStorage.setItem("searchResults", JSON.stringify(filteredResults));
//       router.push("/home/SearchResults");
//     }
// };

const handleSearch = () => {
try{
  // console.log(filteredResults);
  if(query == ""){
    console.log('query is empty');
    console.log('hello');
    setSearchResults(allData);
    console.log('worldss', allData);
    localStorage.setItem("searchResults", JSON.stringify(allData));
    localStorage.setItem("query", query);
    // console.log(filteredResults);
    router.push("/home/SearchResults");
  }else{
    console.log('query is not empty');
    const filteredResults = allData.filter((item) =>
      item.itemName.toLowerCase().includes(query.toLowerCase())
    );

    setSearchResults(filteredResults);
    localStorage.setItem("searchResults", JSON.stringify(filteredResults));
    localStorage.setItem("query", query);
    router.push("/home/SearchResults");
  }

  

  // setSearchResults(filteredResults);
  // localStorage.removeItem("searchResults");
  //   localStorage.setItem("searchResults", JSON.stringify(filteredResults));
  //   localStorage.setItem("query", query);
  //   router.push("/home/SearchResults");
  //   window.location.reload()
}catch(e){
  console.log(e);
}
};

return (
  <div className="xl:w-[550px] lg:w-[350px] md:w-[250px] h-[40ppx] flex items-center flex-row rounded-lg border-2 border-lightGray py-[5px]">
    <button
      className="w-[8%] flex flex-col items-center justify-center"
      onClick={handleSearch}
    >
      <p className="text-lightGray transition-transform duration-300 ease-in-out transform hover:scale-[1.5]">
        <IoSearchOutline className="w-[22px] h-[22px] " />
      </p>
    </button>
    <input
      type="text"
      value={query}
      onChange={handleInputChange}
      placeholder="Search Foods"
      className="w-[92%] outline-none bg-transparent h-full font-normal text-[14px] text-inputText px-4"
    />
  </div>
);
};

export default SearchBar;
