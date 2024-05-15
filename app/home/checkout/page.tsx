"use client";

import OrderSummery from "@/components/OrderSummery";
import PageTransition from "@/components/PageTransition";
import PaymentCard from "@/components/PaymentCard";
import OrderSuccsess from "@/components/models/OrderSuccsess";
// import { error } from "console";
import React from "react";
import { useState } from "react";
import { BsCreditCard } from "react-icons/bs";
import { FaPaypal } from "react-icons/fa";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useStripe } from "@stripe/react-stripe-js";

const CheckOut = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [clientSecretId, setClientSecretId] = useState("");
  const [cardholderName, setCardholderName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const stripe = useStripe();
  const stripePromise = loadStripe('pk_test_51P7Kv2P2T7YncC47Pyuo5PkqEX7wM9DPFBqRvGXhTksCqiwSg50p9qazEUc11BFZiyvAM9J6iThRvn7cdt6zC7GG00ZPU92lqa');

  const handleCardDetails = async (e: any) => {
    const { name, value } = e.target;
    let isValid = true; // Flag to track overall validation status
  
    switch (name) {
      case 'cardholderName':
        setCardholderName(value);
        break;
      case 'cardNumber':
        // Validate card number format (e.g., length and numeric characters)
        if (!/^\d{16}$/.test(value)) {
          isValid = false;
          // Handle invalid card number format (e.g., show error message)
        } else {
          setCardNumber(value);
        }
        break;
      case 'expiryDate':
        // Validate expiry date format (e.g., MM/YY)
        if (!/^\d{2}\/\d{2}$/.test(value)) {
          isValid = false;
          // Handle invalid expiry date format (e.g., show error message)
        } else {
          setExpiryDate(value);
        }
        break;
      case 'cvv':
        // Validate CVV format (e.g., 3 or 4 digits)
        if (!/^\d{3,4}$/.test(value)) {
          isValid = false;
          // Handle invalid CVV format (e.g., show error message)
        } else {
          setCvv(value);
        }
        break;
      default:
        break;
    }
  
    if (!isValid) {
      // If any field is invalid, prevent further processing
      return;
    }
  
  
    
  };
  

    const handlePayment = async () =>{
      const totalAmount = localStorage.getItem("totalPriceCart");
      try{
        const response = await fetch("https://tasty-dog.onrender.com/api/v1/orders/makePayment",{
          method:"POST",
          headers: {
            "Content-Type":"application/json",
          },
          body: JSON.stringify({
            totalAmount,
          }),
        });
        const data = await response.json();
        
        if(!response.ok){
          window.alert("Payment UnSuccessful");
          console.log(response);
        }else{
          window.alert("Payment Successfull");
          setClientSecretId(data.clientSecret);

          if (!stripe) {
            // Stripe.js has not yet loaded.
            return;
          }

          const cardElement = {
            number: cardNumber,
            exp_month: parseInt(expiryDate.split("/")[0]),
            exp_year: parseInt(expiryDate.split("/")[1]),
            cvc: cvv,
          };


          const { error: confirmError } = await stripe.confirmCardPayment(data.clientSecret, {
            payment_method: {
              card: cardElement,
              billing_details: {
                name: cardholderName,
              },
            },
          });
    
          if (confirmError) {
            console.error(confirmError);
            window.alert("Payment failed. Please try again.");
          } else {
            window.alert("Payment Successful");
            setModalOpen(true);
            // Reset form fields or update state as needed
            setCardholderName("");
            setCardNumber("");
            setExpiryDate("");
            setCvv("");
          }
        }
          
        
      }catch(e){
        console.log("An error occurred. Please try again later.");
      }
    }


  return (
    <>
      <PageTransition>
        <section className="w-full px-[50px] xl:py-[50px] md:py-[35px]">
          <div className="flex lg:flex-row md:flex-col xl:gap-[50px] md:gap-[25px]">
            <div className="lg:w-[65%] md:w-full shadow-xl py-[50px] rounded-[10px]">
              <div className="max-w-[452px] flex flex-col mx-auto">
                <div className="w-full flex flex-col gap-3 ">
                  <h2 className="text-[24px] font-semibold capitalize">
                    Select Payment Method
                  </h2>
                  <div className="w-full flex items-center gap-2">
                    <button className="w-[224px] h-[48px] flex text-center bg-primary text-white text-[12px] rounded-[4px] justify-center items-center gap-3">
                      <BsCreditCard className=" text-[20px]  text-white" />
                      Credit/Debit Card
                    </button>
                    <button className="w-[224px] h-[48px] flex text-center bg-none text-black border border-gray-400 justify-center items-center rounded-[4px] gap-3">
                      <FaPaypal className="text-[20px] text-blue-900" />
                      PayPal
                    </button>
                  </div>
                </div>
                <Elements stripe={stripePromise}>
                  <div className="w-full flex flex-col justify-center mt-10 ">
                    <div className="w-full mb-4 flex flex-col gap-2">
                      <p className="text-[12px] text-inputText capitalize">
                        cardholder name
                      </p>
                      <div className="w-full h-[48px] bg-inputBlue  rounded-lg border-2 border-inputBorder">
                      <input
                          type="text"
                          name="cardholderName"
                          value={cardholderName}
                          className="w-full outline-none bg-transparent h-full font-normal text-[14px] text-inputText px-4"
                          onChange={handleCardDetails}
                        />
                      </div>
                    </div>
                    <div className="w-full mb-4 flex flex-col gap-2 ">
                      <p className="text-[12px] text-inputText capitalize">
                        card Number
                      </p>
                      <div className="w-full h-[48px] bg-inputBlue  rounded-lg border-2 border-inputBorder">
                      <input
                          type="text"
                          name="cardNumber"
                          value={cardNumber}
                          className="w-full outline-none bg-transparent h-full font-normal text-[14px] text-inputText px-4"
                          onChange={handleCardDetails}
                        />
                      </div>
                    </div>
                    <div className="w-full mb-4 flex flex-col gap-2 ">
                      <div className="flex flex-row item-center gap-3 w-full h-full">
                        <div className="w-[225px]">
                          <p className="text-[12px] text-inputText capitalize mb-2">
                            Expiration Date
                          </p>
                          <div className="w-full h-[48px] bg-inputBlue  rounded-lg border-2 border-inputBorder">
                          <input
                              type="text"
                              name="expiryDate"
                              value={expiryDate}
                              className="w-full outline-none bg-transparent h-full font-normal text-[14px] text-inputText px-4"
                              onChange={handleCardDetails}
                            />
                          </div>
                        </div>
                        <div className="w-[225px]">
                          <p className="text-[12px] text-inputText capitalize mb-2">
                            CVV
                          </p>
                          <div className="w-full h-[48px] bg-inputBlue  rounded-lg border-2 border-inputBorder">
                                            <input
                                type="text"
                                name="cvv"
                                value={cvv}
                                className="w-full outline-none bg-transparent h-full font-normal text-[14px] text-inputText px-4"
                                onChange={handleCardDetails}
                              />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <CardElement
                        options={{
                          style: {
                            base: {
                              fontSize: "16px",
                              color: "#424770",
                              "::placeholder": {
                                color: "#aab7c4",
                              },
                            },
                            invalid: {
                              color: "#9e2146",
                            },
                          },
                        }}
                      /> */}
                </Elements>
                <div className="flex items-center mt-4">
                  <input
                    id="default-checkbox"
                    type="checkbox"
                    value=""
                    className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    htmlFor="save for future payments"
                    className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Save This Card For Future Payments
                  </label>
                </div>

                <button
                  // onClick={() => setModalOpen(true)}
                  onClick={()=>handlePayment()}
                  className="w-full h-[45px] text-center bg-Green2 text-[20px] text-white rounded-[10px] capitalize mt-10 transition-transform duration-300 ease-in-out transform hover:scale-95"
                >
                  pay now
                </button>
              </div>
            </div>
            <div className="lg:w-[35%] md:w-full h-full shadow-xl rounded-[10px] px-[25px] py-[25px]">
              <OrderSummery />
            </div>
          </div>
        </section>
      </PageTransition>
      <OrderSuccsess open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
};

export default CheckOut;
