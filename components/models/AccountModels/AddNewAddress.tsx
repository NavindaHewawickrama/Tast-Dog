// import React,{useState} from "react";
// import { motion } from "framer-motion";
// import dropIn from "@/utils/motion";
// import {
//   CitySelect,
//   CountrySelect,
//   StateSelect,
// } from "react-country-state-city";
// import 'react-country-state-city/dist/react-country-state-city.css';

// interface ModalProps {
//   open: boolean;
//   onClose: () => void; // Add the onClose function prop
// }

// const AddNewAddress: React.FC<ModalProps> = ({ open, onClose }) => {
//   const [streetAddress, setStreet] = useState("Somewhere Street");
//   const [aptSuite, setSuitNo] = useState("2/222");
//   const [city, setCity] = useState("Melourn");
//   const [state, setState] = useState("Melbourn");
//   const [landmark, setLandMark] = useState("Infront of State Hospital");
//   const [country, setCountry] = useState("Australia");
//   const [countryId, setCountryId] = useState<number | null>(null);
//   const [stateId, setStateId] = useState<number | null>(null);


//   if (!open) return null;


//   const handleAddingNewAddress = async()=>{
//     const userId = localStorage.getItem("userId");
//     const userName= localStorage.getItem("userName");
//     const mobileNumber = localStorage.getItem("phoneNumber");

//     try{
//       const response = await fetch(`https://tasty-dog.onrender.com/api/v1/addresses/addAddress`,{method:"POST",
//       headers: {
//         "Content-Type":"application/json",
//       },
//       body:JSON.stringify({
//         landmark,
//         state,
//         city,
//         streetAddress,
//         aptSuite,
//         mobileNumber,
//         userName,
//         userId,
//         country,
//       })
//       });
//       const data = await response.json();
//       if(!response.ok){
//         window.alert("Some kind of problem occured. Please try again.");
//         console.log(data);
//       }else{
//         window.alert(" Changes Saved")
//         window.location.reload()
//       }
//     }catch(e){

//     }
//   }
//   return (
//     <>
//       <div
//         className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
//         onClick={onClose}>
//         <motion.div
//           variants={dropIn}
//           initial="hidden"
//           animate="visible"
//           exit="exit"
//           className="w-[564px] bg-white shadow-xl py-[20px] rounded-xl"
//           onClick={(e) => {
//             e.stopPropagation();
//           }}>
//             <div className="w-[452px] mx-auto">
//                 <div className="flex flex-row justify-between">
//                   <h4 className="text-[15px] capitalize">add new address</h4>
//                   <p
//                     className="text-[15px] cursor-pointer transition-transform duration-300 ease-in-out transform hover:scale-[1.3] hover:text-red-600"
//                     onClick={onClose}
//                   >
//                     X
//                   </p>
//                 </div>

//               <div className="w-full flex flex-col justify-center mt-10 ">
//                   <div className="w-full mb-4 flex flex-col gap-2">
//                     <p className="text-[12px] text-inputText capitalize">
//                       street address
//                     </p>
//                       <div className="w-full h-[48px] bg-inputBlue  rounded-lg border-2 border-inputBorder">
//                         <input
//                           type="text"
//                           onChange={(e) => setStreet(e.target.value)}
//                           className="w-full outline-none bg-transparent h-full font-normal text-[14px] text-inputText px-4"
//                         />
//                       </div>
//                   </div>
//                 <div className="w-full mb-4 flex flex-col gap-2 ">
//                     <p className="text-[12px] text-inputText capitalize">
//                       apt/suit no.
//                     </p>
//                     <div className="w-full h-[48px] bg-inputBlue  rounded-lg border-2 border-inputBorder">
//                       <input
//                         type="text"
//                         onChange={(e)=>setSuitNo(e.target.value)}
//                         className="w-full outline-none bg-transparent h-full font-normal text-[14px] text-inputText px-4"
//                       />
//                     </div>
//                 </div>
//               <div className="w-full mb-4 flex flex-col gap-2">
//                   <p className="text-[12px] text-inputText capitalize">
//                     Country
//                   </p>
//                   <CountrySelect
//                     value={countryId as  any}  // Add this line
//                     onChange={(e: any) => {
//                       setCountryId(e.id);
//                       setCountry(e.name);
//                     }}
//                     placeHolder="Select Country"
//                     className="w-full"
//                   />
//                 </div>
//                 <div className="w-full mb-4 flex flex-col gap-2">

//                   {/* <div className="mb-4">
//                     <p className="text-[12px] text-inputText capitalize mb-2">Country</p>
//                     <CountrySelect
//                       onChange={(e: { id: number }) => setCountryId(e.id)}
//                       placeHolder="Select Country"
//                       className="w-full"
//                                 />
//                               </div> */}
//                     <div className="flex flex-row item-center gap-3 w-full h-full">
//                       <div className="w-[225px]">
//                         <p className="text-[12px] text-inputText capitalize mb-2">State/Province</p>
//                         <StateSelect
//                           countryid={countryId || 0}
//                           onChange={(e: { id: number }) => setStateId(e.id)}
//                           placeHolder="Select State"
//                           className="w-full"
//                           isDisabled={!countryId}
//                         />
//                       </div>
//                       <div className="w-[225px]">
//                         <p className="text-[12px] text-inputText capitalize mb-2">City</p>
//                         <CitySelect
//                           countryid={countryId || 0}
//                           stateid={stateId || 0}
//                           onChange={(e: any) => console.log(e)}
//                           placeHolder="Select City"
//                           className="w-full"
//                           isDisabled={!stateId}
//                         />
//                       </div>
//                     </div>
//                   </div>

//                   <p className="text-[12px] text-inputText capitalize">
//                     State/Province
//                   </p>
//                   <StateSelect
//                     countryid={countryId || 0}
//                     value={stateId as any}  // Add this line
//                     onChange={(e: any) => {
//                       setStateId(e.id);
//                       setState(e.name);
//                     }}
//                     placeHolder="Select State"
//                     className="w-full"
//                     isDisabled={!countryId}
//                   />
//                 </div>
//                 <div className="w-full mb-4 flex flex-col gap-2">
//                   <p className="text-[12px] text-inputText capitalize">
//                     City
//                   </p>
//                   <CitySelect
//                     countryid={countryId || 0}
//                     stateid={stateId || 0}
//                     onChange={(e: any) => setCity(e.name)}
//                     placeHolder="Select City"
//                     className="w-full"
//                     isDisabled={!stateId}
//                   />
//                 </div>

//                 <div className="w-full mb-4 flex flex-col gap-2 ">
//                   <p className="text-[12px] text-inputText capitalize">
//                     Landmark
//                   </p>
//                   <div className="w-full h-[48px] bg-inputBlue  rounded-lg border-2 border-inputBorder">
//                     <input
//                       type="text"
//                       onChange={(e)=>setLandMark(e.target.value)}
//                       className="w-full outline-none bg-transparent h-full font-normal text-[14px] text-inputText px-4"
//                     />
//                   </div>
//                 </div>
//               </div>
//               <div className="w-full flex items-center gap-5 mt-10">
//                 <button
//                   className="w-[214px] h-[38px] text-center bg-Green2 text-[14px] text-white rounded-md transition-transform duration-300 ease-in-out transform hover:scale-95"
//                   onClick={() => handleAddingNewAddress()}
//                 >
//                   Save
//                 </button>
//                 <button
//                   className="w-[214px] h-[38px] text-center bg-none text-[14px] text-button2 rounded-md border border-button2 transition-transform duration-300 ease-in-out transform hover:scale-95"
//                   onClick={onClose}
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </div>
//         </motion.div>
//       </div>
//     </>
//   );
// };

// export default AddNewAddress;

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import dropIn from "@/utils/motion";
import {
  CitySelect,
  CountrySelect,
  StateSelect,
} from "react-country-state-city";
import 'react-country-state-city/dist/react-country-state-city.css';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import { City, Country, State,IState,ICity } from "country-state-city";
import DropDownList from "@/components/DropDownList";

interface ModalProps {
  open: boolean;
  onClose: () => void;
}

const AddNewAddress: React.FC<ModalProps> = ({ open, onClose }) => {
  let countryData = Country.getAllCountries();
  const [country, setCountry] = useState(countryData[13]);
  const [stateData, setStateData] = useState<IState[] | undefined>(); 
  const [cityData, setCityData] = useState<ICity[] | undefined>(undefined); // Type updated
  const [state, setState] = useState<IState | undefined>(undefined); 
  const [city, setCity] = useState<ICity | undefined>(undefined);
  const [streetAddress, setStreet] = useState("Somewhere Street");
  const [aptSuite, setSuitNo] = useState("2/222");
  const [landmark, setLandMark] = useState("Infront of State Hospital");
  const [countryId, setCountryId] = useState<number | null>(null);
  const [stateId, setStateId] = useState<number | null>(null);
  const [region, setRegion] = useState('');

useEffect(()=>{
  setStateData(State.getStatesOfCountry(country?.isoCode));
  // console.log(State.getStatesOfCountry(country?.isoCode));
},[country])

useEffect(()=>{
  setCityData(City.getCitiesOfState(country?.isoCode || '', state?.isoCode || '') || undefined);
  //  console.log(City.getCitiesOfState(country?.isoCode || '', state?.isoCode || '') || undefined);
},[state])

useEffect(()=>{
  stateData && setState(stateData[0]);
},[stateData])

useEffect(()=>{
  cityData && setCity(cityData[0]);
},[cityData])

//  console.log(countryData[13].name);
  if (!open) return null;

  const handleAddingNewAddress = async () => {
    const userId = localStorage.getItem("userId");
    const userName = localStorage.getItem("userName");
    const mobileNumber = localStorage.getItem("phoneNumber");
    console.log(landmark,
      state?.name,
      city?.name,
      streetAddress,
      aptSuite,
      mobileNumber,
      userName,
      userId,
      country.name,)
    try {
      const response = await fetch(`https://tasty-dog.onrender.com/api/v1/addresses/addAddress`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          landmark,
          state:state?.name,
          city:city?.name,
          streetAddress,
          aptSuite,
          mobileNumber,
          userName,
          userId,
          country:country.name,
        })
      });
      const data = await response.json();
      if (!response.ok) {
        window.alert("Some kind of problem occurred. Please try again.");
        console.log(data);
      } else {
        window.alert("Changes Saved");
        window.location.reload();
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      <motion.div
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="w-[564px] bg-white shadow-xl py-[20px] rounded-xl"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="w-[452px] mx-auto">
          <div className="flex flex-row justify-between">
            <h4 className="text-[18px] capitalize font-bold">Add New Address</h4>
            <p
              className="text-[15px] cursor-pointer transition-transform duration-300 ease-in-out transform hover:scale-[1.3] hover:text-red-600"
              onClick={onClose}
            >
              X
            </p>
          </div>
          <div className="w-full flex flex-col justify-center mt-5 ">
            <div className="w-full mb-4 flex flex-col gap-2">
              <p className="text-[12px] text-inputText capitalize">
                Street Address
              </p>
              <div className="w-full h-[48px] bg-inputBlue rounded-lg border-2 border-inputBorder">
                <input
                  type="text"
                  value={streetAddress}
                  onChange={(e) => setStreet(e.target.value)}
                  className="w-full outline-none bg-transparent h-full font-normal text-[14px] text-inputText px-4"
                />
              </div>
            </div>
            <div className="w-full mb-4 flex flex-col gap-2 ">
              <p className="text-[12px] text-inputText capitalize">
                Apt/Suit No.
              </p>
              <div className="w-full h-[48px] bg-inputBlue rounded-lg border-2 border-inputBorder">
                <input
                  type="text"
                  value={aptSuite}
                  onChange={(e) => setSuitNo(e.target.value)}
                  className="w-full outline-none bg-transparent h-full font-normal text-[14px] text-inputText px-4"
                />
              </div>
            </div>
            {/* <div className="w-full mb-4 flex flex-col gap-2 ">
              <p className="text-[12px] text-inputText capitalize">
                country
              </p>
              <div className="w-full h-[48px] bg-inputBlue rounded-lg border-2 border-inputBorder">
                <input
                  type="text"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full outline-none bg-transparent h-full font-normal text-[14px] text-inputText px-4"
                />
              </div>
            </div> */}
            <div className="w-full mb-4 flex flex-col gap-2">
              <p className="text-[12px] text-inputText capitalize">Country</p>
              <div >
              {/* <CountrySelect
                value={countryId}
                onChange={(e: any) => {
                  setCountryId(e.id);
                  setCountry(e.name);
                }}
                placeHolder="Select Country"
                className="w-full"
              /> */ }
                <select value={country.name} onChange={(e) => setCountry(countryData.find(c => c.name === e.target.value) || country)} aria-placeholder="Select Country" className="w-full h-[48px] bg-inputBlue rounded-lg border-2 text-inputText border-inputBorder">
                  {countryData.map((country) => (
                    <option key={country.name} value={country.name} className="pl-7">
                      {country.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="w-full mb-4 flex flex-col gap-2">
              <div className="flex flex-row item-center gap-3 w-full h-full">
                <div className="w-[225px]">
                  <p className="text-[12px] text-inputText capitalize mb-2">State/Province</p>
                  {/* <div className="w-full h-[48px] bg-inputBlue rounded-lg border-2 border-inputBorder">
                    <input
                      type="text"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      className="w-full outline-none bg-transparent h-full font-normal text-[14px] text-inputText px-4"
                    />
                  </div> */}
                  <div >
                  {/* <StateSelect
                      countryid={countryId || 0}
                      value={stateId}
                      onChange={(e: any) => {
                        setStateId(e.id);
                        setState(e.name);
                      }}
                      placeHolder="Select State"
                      className="w-full"
                      isDisabled={!countryId}
                    /> */}
                    <select value={state?.name} onChange={(e)=>setState(stateData?.find(c => c.name === e.target.value) || state)} className="w-full h-[48px] bg-inputBlue rounded-lg border-2 text-inputText border-inputBorder">
                    {stateData && stateData.map((state) => (
                    <option key={state.name} value={state.name} className="pl-7">
                      {state.name}
                    </option>
                  ))}
                    </select>
                  </div>
                </div>
                <div className="w-[225px]">
                  <p className="text-[12px] text-inputText capitalize mb-2">City</p>
                  {/* <div className="w-full h-[48px] bg-inputBlue rounded-lg border-2 border-inputBorder">
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full outline-none bg-transparent h-full font-normal text-[14px] text-inputText px-4"
                    />
                  </div> */}

                  <div>
                  {/* <CitySelect
                        countryid={countryId || 0}
                        stateid={stateId || 0}
                        onChange={(e: any) => setCity(e.name)}
                        placeHolder="Select City"
                        className="w-full"
                        isDisabled={!stateId}
                      /> */}
                      <select value={city?.name} onChange={(e)=>setCity(cityData?.find(c=>c.name=== e.target.value) || city)} className="w-full h-[48px] bg-inputBlue rounded-lg border-2 text-inputText border-inputBorder">
                        {cityData && cityData.map((city)=>(
                          <option key={city.name} value={city.name} className="pl-7">
                            {city.name}
                          </option>
                        ))}
                      </select>
                    </div>
                </div>
              </div>
            </div>
            <div className="w-full mb-4 flex flex-col gap-2">
              <p className="text-[12px] text-inputText capitalize">
                Landmark
              </p>
              <div className="w-full h-[48px] bg-inputBlue rounded-lg border-2 border-inputBorder">
                <input
                  type="text"
                  value={landmark}
                  onChange={(e) => setLandMark(e.target.value)}
                  className="w-full outline-none bg-transparent h-full font-normal text-[14px] text-inputText px-4"
                />
              </div>
            </div>
            <div className="w-full flex items-center gap-5 mt-1">
              <button
                className="w-[214px] h-[45px] text-center bg-Green2 text-[14px] text-white rounded-md transition-transform duration-300 ease-in-out transform hover:scale-95"
                onClick={handleAddingNewAddress}
              >
                Save
              </button>
              <button
                className="w-[214px] h-[45px] text-center bg-none text-[14px] text-button2 rounded-md border border-button2 transition-transform duration-300 ease-in-out transform hover:scale-95"
                onClick={onClose}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AddNewAddress;
