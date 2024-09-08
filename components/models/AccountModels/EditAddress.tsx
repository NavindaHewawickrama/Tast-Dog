import React, { useState } from "react";
import { motion } from "framer-motion";
import dropIn from "@/utils/motion";
import CustomAlert from "../../../app/alerts/customalert";

interface ModalProps {
  open: boolean;
  onClose: () => void; // Add the onClose function prop
  addressData: {
    streetAddress: string;
    aptSuite: string;
    city: string;
    state: string;
    landmark: string;
  };
}

const EditAddress: React.FC<ModalProps> = ({ open, onClose, addressData }) => {
  const [streetAddress, setStreet] = useState(addressData.streetAddress); 
  const [aptSuite, setSuitNo] = useState(addressData.aptSuite);
  const [city, setCity] = useState(addressData.city);
  const [state, setState] = useState(addressData.state);
  const [landmark, setLandMark] = useState(addressData.landmark);
  const [country, setCountry] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

    const handleShowAlert = () => {
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000); // Auto-close after 3 seconds
    };
  if (!open) return null;

  const handleEditAddress = async () => {
    const addressId = localStorage.getItem("addressId");
    const userName= localStorage.getItem("userName");
    const mobileNumber = localStorage.getItem("userEmail");
    try{
      const response = await fetch(`https://tasty-dog.onrender.com/api/v1/addresses/editAddress/${addressId}`,{
        method:"PUT",
        headers: {
          "Content-Type":"application/json",
        },
        body: JSON.stringify({
          addressId,
          userName,
          mobileNumber,
          aptSuite,
          streetAddress,
          city,
          state,
          landmark,
          country,
        }),
      });
      const data = response.json;
      if(!response){
        console.log(data);
        // window.alert("cannot update the address");
        setAlertMessage("cannot update the address");
       handleShowAlert();
      }else{
        console.log(data);
        window.location.reload();
        // window.alert("Address edit complete");
        setAlertMessage("Address edit complete");
       handleShowAlert();
      }
    }catch(e){

    }
  };

  return (
    <>
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
              <h4 className="text-[15px] capitalize">Edit address</h4>
              <p
                className="text-[15px] cursor-pointer transition-transform duration-300 ease-in-out transform hover:scale-[1.3] hover:text-red-600"
                onClick={onClose}
              >
                X
              </p>
            </div>

            <div className="w-full flex flex-col justify-center mt-10 ">
              <div className="w-full mb-4 flex flex-col gap-2">
                <p className="text-[12px] text-inputText capitalize">
                  street address
                </p>
                <div className="w-full h-[48px] bg-inputBlue  rounded-lg border-2 border-inputBorder">
                  <input
                    type="text"
                    value={streetAddress}
                    className="w-full outline-none bg-transparent h-full font-normal text-[14px] text-inputText px-4"
                    onChange={(e) => setStreet(e.target.value)}
                  />
                </div>
              </div>
              <div className="w-full mb-4 flex flex-col gap-2 ">
                <p className="text-[12px] text-inputText capitalize">
                  apt/suit no.
                </p>
                <div className="w-full h-[48px] bg-inputBlue  rounded-lg border-2 border-inputBorder">
                  <input
                    type="text"
                    value={aptSuite}
                    className="w-full outline-none bg-transparent h-full font-normal text-[14px] text-inputText px-4"
                    onChange={(e) => setSuitNo(e.target.value)}
                  />
                </div>
              </div>
              <div className="w-full mb-4 flex flex-col gap-2 ">
                <p className="text-[12px] text-inputText capitalize">
                  country
                </p>
                <div className="w-full h-[48px] bg-inputBlue  rounded-lg border-2 border-inputBorder">
                  <input
                    type="text"
                    value={country}
                    className="w-full outline-none bg-transparent h-full font-normal text-[14px] text-inputText px-4"
                    onChange={(e) => setCountry(e.target.value)}
                  />
                </div>
              </div>
              <div className="w-full mb-4 flex flex-col gap-2 ">
                <div className="flex flex-row item-center gap-3 w-full h-full">
                  <div className="w-[225px]">
                    <p className="text-[12px] text-inputText capitalize mb-2">
                      city
                    </p>
                    <div className="w-full h-[48px] bg-inputBlue  rounded-lg border-2 border-inputBorder">
                      <input
                        type="text"
                        value={city}
                        className="w-full outline-none bg-transparent h-full font-normal text-[14px] text-inputText px-4"
                        onChange={(e) => setCity(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="w-[225px]">
                    <p className="text-[12px] text-inputText capitalize mb-2">
                      state/province
                    </p>
                    <div className="w-full h-[48px] bg-inputBlue  rounded-lg border-2 border-inputBorder">
                      <input
                        type="text"
                        value={state}
                        className="w-full outline-none bg-transparent h-full font-normal text-[14px] text-inputText px-4"
                        onChange={(e) => setState(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full mb-4 flex flex-col gap-2 ">
                <p className="text-[12px] text-inputText capitalize">
                  LandMark
                </p>
                <div className="w-full h-[48px] bg-inputBlue  rounded-lg border-2 border-inputBorder">
                  <input
                    type="text"
                    value={landmark}
                    className="w-full outline-none bg-transparent h-full font-normal text-[14px] text-inputText px-4"
                    onChange={(e) => setLandMark(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="w-full flex items-center gap-5 mt-10">
              <button
                className="w-[214px] h-[38px] text-center bg-Green2 text-[14px] text-white rounded-md transition-transform duration-300 ease-in-out transform hover:scale-95"
                onClick={() => handleEditAddress()}
              >
                Save
              </button>
              <button
                className="w-[214px] h-[38px] text-center bg-none text-[14px] text-button2 rounded-md border border-button2 transition-transform duration-300 ease-in-out transform hover:scale-95"
                onClick={onClose}
              >
                Cancel
              </button>
            </div>
          </div>
          <CustomAlert 
              message={alertMessage}
              show={showAlert} 
              onClose={() => setShowAlert(false)} 
            />
        </motion.div>
      </div>
    </>
  );
};

export default EditAddress;
