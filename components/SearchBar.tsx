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
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setAllData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
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

  const filteredResults = allData.filter((item) =>
    item.itemName.toLowerCase().includes(query.toLowerCase())
  );
  if(query == ""){
    const qry = "No search items";
    localStorage.setItem("query", qry);
    // localStorage.setItem("NoSearchResult", JSON.stringify(allData));
    localStorage.setItem("searchResults", JSON.stringify(filteredResults));
    router.push("/home/SearchResults");
  }

  if (filteredResults.length === 0) {
    setSearchResults(filteredResults);
    localStorage.setItem("searchResults", JSON.stringify(filteredResults));
    localStorage.setItem("query", query);
    window.location.reload()
    router.push("/home/SearchResults");
  } else {
    setSearchResults(filteredResults);
    localStorage.setItem("searchResults", JSON.stringify(filteredResults));
    localStorage.setItem("query", query);
    window.location.reload()
    router.push("/home/SearchResults");
  }

  // setSearchResults(filteredResults);
  // localStorage.removeItem("searchResults");
  //   localStorage.setItem("searchResults", JSON.stringify(filteredResults));
  //   localStorage.setItem("query", query);
  //   router.push("/home/SearchResults");
  //   window.location.reload()
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
      placeholder="Search Foods or Restaurants"
      className="w-[92%] outline-none bg-transparent h-full font-normal text-[14px] text-inputText px-4"
    />
  </div>
);
};

export default SearchBar;
