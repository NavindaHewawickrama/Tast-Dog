// "use client";

// import OrderSummery from "@/components/OrderSummery";
// import PageTransition from "@/components/PageTransition";
// import OrderSuccsess from "@/components/models/OrderSuccsess";
// // import { error } from "console";
// import React from "react";
// import { useState } from "react";
// import { BsCreditCard } from "react-icons/bs";
// import { FaPaypal } from "react-icons/fa";


// const CheckOut = () => {
//   const [modalOpen, setModalOpen] = useState(false);
//   const [clientSecretId, setClientSecretId] = useState("");
//   const [cardholderName, setCardholderName] = useState("");
//   const [cardNumber, setCardNumber] = useState("");
//   const [expiryDate, setExpiryDate] = useState("");
//   const [cvv, setCvv] = useState("");
//   // const stripePromise = loadStripe('pk_test_51P7Kv2P2T7YncC47Pyuo5PkqEX7wM9DPFBqRvGXhTksCqiwSg50p9qazEUc11BFZiyvAM9J6iThRvn7cdt6zC7GG00ZPU92lqa');

//   const handleCardDetails = async (e: any) => {
//     const { name, value } = e.target;
//     let isValid = true; // Flag to track overall validation status
  
//     switch (name) {
//       case 'cardholderName':
//         setCardholderName(value);
//         break;
//       case 'cardNumber':
//         // Validate card number format (e.g., length and numeric characters)
//         if (!/^\d{16}$/.test(value)) {
//           isValid = false;
//           // Handle invalid card number format (e.g., show error message)
//         } else {
//           setCardNumber(value);
//         }
//         break;
//       case 'expiryDate':
//         // Validate expiry date format (e.g., MM/YY)
//         if (!/^\d{2}\/\d{2}$/.test(value)) {
//           isValid = false;
//           // Handle invalid expiry date format (e.g., show error message)
//         } else {
//           setExpiryDate(value);
//         }
//         break;
//       case 'cvv':
//         // Validate CVV format (e.g., 3 or 4 digits)
//         if (!/^\d{3,4}$/.test(value)) {
//           isValid = false;
//           // Handle invalid CVV format (e.g., show error message)
//         } else {
//           setCvv(value);
//         }
//         break;
//       default:
//         break;
//     }
  
//     if (!isValid) {
//       // If any field is invalid, prevent further processing
//       return;
//     }
  
  
    
//   };
  

//     const handlePayment = async () =>{
//       const totalAmount = localStorage.getItem("totalPriceCart");
//       try{
//         const response = await fetch("https://tasty-dog.onrender.com/api/v1/orders/makePayment",{
//           method:"POST",
//           headers: {
//             "Content-Type":"application/json",
//           },
//           body: JSON.stringify({
//             totalAmount,
//           }),
//         });
//         const data = await response.json();
        
//         if(!response.ok){
//           window.alert("Payment UnSuccessful");
//           console.log(response);
//         }else{
//           window.alert("Payment Successfull");
//           setClientSecretId(data.clientSecret);
//         }
//       }catch (e) {
//         console.log("An error occurred. Please try again later.");
//       }
//     }

   


//   return (
//     <>
//       <PageTransition>
//         <section className="w-full px-[50px] xl:py-[50px] md:py-[35px]">
//           <div className="flex lg:flex-row md:flex-col xl:gap-[50px] md:gap-[25px]">
//             <div className="lg:w-[65%] md:w-full shadow-xl py-[50px] rounded-[10px]">
//               <div className="max-w-[452px] flex flex-col mx-auto">
//                 <div className="w-full flex flex-col gap-3 ">
//                   <h2 className="text-[24px] font-semibold capitalize">
//                     Select Payment Method
//                   </h2>
//                   <div className="w-full flex items-center gap-2">
//                     <button className="w-[224px] h-[48px] flex text-center bg-primary text-white text-[12px] rounded-[4px] justify-center items-center gap-3">
//                       <BsCreditCard className=" text-[20px]  text-white" />
//                       Credit/Debit Card
//                     </button>
//                     <button className="w-[224px] h-[48px] flex text-center bg-none text-black border border-gray-400 justify-center items-center rounded-[4px] gap-3">
//                       <FaPaypal className="text-[20px] text-blue-900" />
//                       PayPal
//                     </button>
//                   </div>
//                 </div>
//                   <div className="w-full flex flex-col justify-center mt-10 ">
//                     <div className="w-full mb-4 flex flex-col gap-2">
//                       <p className="text-[12px] text-inputText capitalize">
//                         cardholder name
//                       </p>
//                       <div className="w-full h-[48px] bg-inputBlue  rounded-lg border-2 border-inputBorder">
//                       <input
//                           type="text"
//                           name="cardholderName"
//                           value={cardholderName}
//                           className="w-full outline-none bg-transparent h-full font-normal text-[14px] text-inputText px-4"
//                           onChange={handleCardDetails}
//                         />
//                       </div>
//                     </div>
//                     <div className="w-full mb-4 flex flex-col gap-2 ">
//                       <p className="text-[12px] text-inputText capitalize">
//                         card Number
//                       </p>
//                       <div className="w-full h-[48px] bg-inputBlue  rounded-lg border-2 border-inputBorder">
//                       <input
//                           type="text"
//                           name="cardNumber"
//                           value={cardNumber}
//                           className="w-full outline-none bg-transparent h-full font-normal text-[14px] text-inputText px-4"
//                           onChange={handleCardDetails}
//                         />
//                       </div>
//                     </div>
//                     <div className="w-full mb-4 flex flex-col gap-2 ">
//                       <div className="flex flex-row item-center gap-3 w-full h-full">
//                         <div className="w-[225px]">
//                           <p className="text-[12px] text-inputText capitalize mb-2">
//                             Expiration Date
//                           </p>
//                           <div className="w-full h-[48px] bg-inputBlue  rounded-lg border-2 border-inputBorder">
//                           <input
//                               type="text"
//                               name="expiryDate"
//                               value={expiryDate}
//                               className="w-full outline-none bg-transparent h-full font-normal text-[14px] text-inputText px-4"
//                               onChange={handleCardDetails}
//                             />
//                           </div>
//                         </div>
//                         <div className="w-[225px]">
//                           <p className="text-[12px] text-inputText capitalize mb-2">
//                             CVV
//                           </p>
//                           <div className="w-full h-[48px] bg-inputBlue  rounded-lg border-2 border-inputBorder">
//                                             <input
//                                 type="text"
//                                 name="cvv"
//                                 value={cvv}
//                                 className="w-full outline-none bg-transparent h-full font-normal text-[14px] text-inputText px-4"
//                                 onChange={handleCardDetails}
//                               />
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 <div className="flex items-center mt-4">
//                   <input
//                     id="default-checkbox"
//                     type="checkbox"
//                     value=""
//                     className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
//                   />
//                   <label
//                     htmlFor="save for future payments"
//                     className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
//                   >
//                     Save This Card For Future Payments
//                   </label>
//                 </div>

//                 <button
//                   // onClick={() => setModalOpen(true)}
//                   onClick={()=>handlePayment()}
//                   className="w-full h-[45px] text-center bg-Green2 text-[20px] text-white rounded-[10px] capitalize mt-10 transition-transform duration-300 ease-in-out transform hover:scale-95"
//                 >
//                   pay now
//                 </button>
//               </div>
//             </div>
//             <div className="lg:w-[35%] md:w-full h-full shadow-xl rounded-[10px] px-[25px] py-[25px]">
//               <OrderSummery />
//             </div>
//           </div>
//         </section>
//       </PageTransition>
//       <OrderSuccsess open={modalOpen} onClose={() => setModalOpen(false)} />
//     </>
//   );
// };

// export default CheckOut;

// // "use client";
// // import OrderSummery from "@/components/OrderSummery";
// // import PageTransition from "@/components/PageTransition";
// // import OrderSuccsess from "@/components/models/OrderSuccsess";
// // import React, { useState } from "react";
// // import { BsCreditCard } from "react-icons/bs";
// // import { FaPaypal } from "react-icons/fa";
// // import { useElements, useStripe, CardElement} from "@stripe/react-stripe-js";
// // import { Elements } from '@stripe/react-stripe-js';
// // import { loadStripe } from "@stripe/stripe-js";

// // // const stripePromise = loadStripe('pk_test_51P7Kv2P2T7YncC47Pyuo5PkqEX7wM9DPFBqRvGXhTksCqiwSg50p9qazEUc11BFZiyvAM9J6iThRvn7cdt6zC7GG00ZPU92lqa');

// // const CheckOut = () => {
// //   const [modalOpen, setModalOpen] = useState(false);
// //   const [clientSecretId, setClientSecretId] = useState("");
// //   const [cardholderName, setCardholderName] = useState("");
// //   const [cardNumber, setCardNumber] = useState("");
// //   const [expiryDate, setExpiryDate] = useState("");
// //   const [cvv, setCvv] = useState("");

// //   const stripe = useStripe();
// //   const elements = useElements();
// //   const stripePromise = loadStripe('pk_test_51P7Kv2P2T7YncC47Pyuo5PkqEX7wM9DPFBqRvGXhTksCqiwSg50p9qazEUc11BFZiyvAM9J6iThRvn7cdt6zC7GG00ZPU92lqa');

// //   const handleCardDetails = async (e: any) => {
// //     const { name, value } = e.target;
// //     let isValid = true;

// //     switch (name) {
// //       case 'cardholderName':
// //         setCardholderName(value);
// //         break;
// //       case 'cardNumber':
// //         if (!/^\d{16}$/.test(value)) {
// //           isValid = false;
// //           alert("Invalid card number format.");
// //         } else {
// //           setCardNumber(value);
// //         }
// //         break;
// //       case 'expiryDate':
// //         if (!/^\d{2}\/\d{2}$/.test(value)) {
// //           isValid = false;
// //           alert("Invalid expiry date format.");
// //         } else {
// //           const [month, year] = value.split("/").map(Number);
// //           const currentYear = new Date().getFullYear() % 100;
// //           const currentMonth = new Date().getMonth() + 1;

// //           if (month < 1 || month > 12) {
// //             isValid = false;
// //             alert("Invalid month.");
// //           } else if (year < currentYear || (year === currentYear && month < currentMonth)) {
// //             isValid = false;
// //             alert("Card has expired.");
// //           } else {
// //             setExpiryDate(value);
// //           }
// //         }
// //         break;
// //       case 'cvv':
// //         if (!/^\d{3,4}$/.test(value)) {
// //           isValid = false;
// //           alert("Invalid CVV format.");
// //         } else {
// //           setCvv(value);
// //         }
// //         break;
// //       default:
// //         break;
// //     }

// //     if (!isValid) {
// //       return;
// //     }
// //   };
  

// //   const handlePayment = async () => {
// //     if (!stripe || !elements) {
// //       return;
// //     }

// //     const cardElement = elements.getElement(CardElement);

// //     if (!cardElement) {
// //       console.error('Card element not found');
// //       return;
// //     }

// //     const { paymentMethod, error } = await stripe.createPaymentMethod({
// //       type: 'card',
// //       card: cardElement,
// //       billing_details: {
// //         name: cardholderName,
// //       },
// //     });

// //     if (error) {
// //       console.error('Payment error:', error);
// //       alert('Payment error. Please try again.');
// //       return;
// //     }

// //     const totalAmount = localStorage.getItem("totalPriceCart");
// //     try {
// //       const response = await fetch("https://tasty-dog.onrender.com/api/v1/orders/makePayment", {
// //         method: "POST",
// //         headers: {
// //           "Content-Type": "application/json",
// //         },
// //         body: JSON.stringify({
// //           totalAmount,
// //           paymentMethodId: paymentMethod.id,
// //         }),
// //       });
// //       const data = await response.json();

// //       if (!response.ok) {
// //         alert("Payment Unsuccessful");
// //         console.log(response);
// //       } else {
// //         alert("Payment Successful");
// //         setClientSecretId(data.clientSecret);
// //         setModalOpen(true);
// //       }
// //     } catch (e) {
// //       console.error("An error occurred. Please try again later.", e);
// //     }
// //   };

   


// //   return (
// //     <>
// //     <Elements stripe={stripePromise}>
// //       <PageTransition>
// //         <section className="w-full px-[50px] xl:py-[50px] md:py-[35px]">
// //           <div className="flex lg:flex-row md:flex-col xl:gap-[50px] md:gap-[25px]">
// //             <div className="lg:w-[65%] md:w-full shadow-xl py-[50px] rounded-[10px]">
// //               <div className="max-w-[452px] flex flex-col mx-auto">
// //                 <div className="w-full flex flex-col gap-3 ">
// //                   <h2 className="text-[24px] font-semibold capitalize">
// //                     Select Payment Method
// //                   </h2>
// //                   <div className="w-full flex items-center gap-2">
// //                     <button className="w-[224px] h-[48px] flex text-center bg-primary text-white text-[12px] rounded-[4px] justify-center items-center gap-3">
// //                       <BsCreditCard className=" text-[20px]  text-white" />
// //                       Credit/Debit Card
// //                     </button>
// //                     <button className="w-[224px] h-[48px] flex text-center bg-none text-black border border-gray-400 justify-center items-center rounded-[4px] gap-3">
// //                       <FaPaypal className="text-[20px] text-blue-900" />
// //                       PayPal
// //                     </button>
// //                   </div>
// //                 </div>
// //                   <div className="w-full flex flex-col justify-center mt-10 ">
// //                     <div className="w-full mb-4 flex flex-col gap-2">
// //                       <p className="text-[12px] text-inputText capitalize">
// //                         cardholder name
// //                       </p>
// //                       <div className="w-full h-[48px] bg-inputBlue  rounded-lg border-2 border-inputBorder">
// //                       <input
// //                           type="text"
// //                           name="cardholderName"
// //                           value={cardholderName}
// //                           className="w-full outline-none bg-transparent h-full font-normal text-[14px] text-inputText px-4"
// //                           onChange={handleCardDetails}
// //                         />
// //                       </div>
// //                     </div>
// //                     <div className="w-full mb-4 flex flex-col gap-2 ">
// //                       <p className="text-[12px] text-inputText capitalize">
// //                         card Number
// //                       </p>
// //                       <div className="w-full h-[48px] bg-inputBlue  rounded-lg border-2 border-inputBorder">
// //                       <input
// //                           type="text"
// //                           name="cardNumber"
// //                           value={cardNumber}
// //                           className="w-full outline-none bg-transparent h-full font-normal text-[14px] text-inputText px-4"
// //                           onChange={handleCardDetails}
// //                         />
// //                       </div>
// //                     </div>
// //                     <div className="w-full mb-4 flex flex-col gap-2 ">
// //                       <div className="flex flex-row item-center gap-3 w-full h-full">
// //                         <div className="w-[225px]">
// //                           <p className="text-[12px] text-inputText capitalize mb-2">
// //                             Expiration Date
// //                           </p>
// //                           <div className="w-full h-[48px] bg-inputBlue  rounded-lg border-2 border-inputBorder">
// //                           <input
// //                               type="text"
// //                               name="expiryDate"
// //                               value={expiryDate}
// //                               className="w-full outline-none bg-transparent h-full font-normal text-[14px] text-inputText px-4"
// //                               onChange={handleCardDetails}
// //                             />
// //                           </div>
// //                         </div>
// //                         <div className="w-[225px]">
// //                           <p className="text-[12px] text-inputText capitalize mb-2">
// //                             CVV
// //                           </p>
// //                           <div className="w-full h-[48px] bg-inputBlue  rounded-lg border-2 border-inputBorder">
// //                                             <input
// //                                 type="text"
// //                                 name="cvv"
// //                                 value={cvv}
// //                                 className="w-full outline-none bg-transparent h-full font-normal text-[14px] text-inputText px-4"
// //                                 onChange={handleCardDetails}
// //                               />
// //                           </div>
// //                         </div>
// //                       </div>
// //                     </div>
// //                   </div>
// //                 <div className="flex items-center mt-4">
// //                   <input
// //                     id="default-checkbox"
// //                     type="checkbox"
// //                     value=""
// //                     className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
// //                   />
// //                   <label
// //                     htmlFor="save for future payments"
// //                     className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
// //                   >
// //                     Save This Card For Future Payments
// //                   </label>
// //                 </div>

// //                 <button
// //                   // onClick={() => setModalOpen(true)}
// //                   onClick={()=>handlePayment()}
// //                   className="w-full h-[45px] text-center bg-Green2 text-[20px] text-white rounded-[10px] capitalize mt-10 transition-transform duration-300 ease-in-out transform hover:scale-95"
// //                 >
// //                   pay now
// //                 </button>
// //               </div>
// //             </div>
// //             <div className="lg:w-[35%] md:w-full h-full shadow-xl rounded-[10px] px-[25px] py-[25px]">
// //               <OrderSummery />
// //             </div>
// //           </div>
// //         </section>
// //       </PageTransition>
// //       </Elements>
// //       <OrderSuccsess open={modalOpen} onClose={() => setModalOpen(false)} />
// //     </>
// //   );
// // };

// // export default CheckOut;

"use client";

import React, { useState } from "react";
import { BsCreditCard } from "react-icons/bs";
import { FaPaypal } from "react-icons/fa";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import OrderSummery from "@/components/OrderSummery";
import PageTransition from "@/components/PageTransition";
import OrderSuccsess from "@/components/models/OrderSuccsess";
import PaymentCard from "@/components/PaymentCard";

const stripePromise = loadStripe('pk_test_51P7Kv2P2T7YncC47Pyuo5PkqEX7wM9DPFBqRvGXhTksCqiwSg50p9qazEUc11BFZiyvAM9J6iThRvn7cdt6zC7GG00ZPU92lqa');

<<<<<<< HEAD
const CheckoutForm = ({ setModalOpen, cardholderName, setCardholderName }) => {
  const stripe = useStripe();
  const elements = useElements();
=======
const CheckoutForm = ({ setModalOpen, cardholderName, setCardholderName }: { setModalOpen: React.Dispatch<React.SetStateAction<boolean>>, cardholderName: string, setCardholderName: React.Dispatch<React.SetStateAction<string>> }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState("");
  const [cartItems, setCartItems] = useState<any[] | null>(null);
>>>>>>> 111f2fa8a7b9e5b9d7dbad3741bf3513389d6af3

  const handlePayment = async () => {
    // const totalAmount = '1000';
    //To the payment success need to call two api calls.
    //1st call is to make payment and get the client secret key and reduce total amount feom user bank account
    //2nd call is if 1stapi call sucess then to make order and send the order details to the database.

    //MakePayment (1st Request)
    try {
      const response = await fetch("https://tasty-dog.onrender.com/api/v1/orders/makePayment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ totalAmount: '10000' }),
      });

      const data = await response.json();

<<<<<<< HEAD
      console.log(data);  

=======
>>>>>>> 111f2fa8a7b9e5b9d7dbad3741bf3513389d6af3
      if (!response.ok) {
        window.alert("Payment Unsuccessful");
        console.log(response);
      } else {

        /*After recieve the client secret from the server payment success.
         like this (33 line will print like this ), 
               {
              "clientSecret": "pi_3PJcukP2T7YncC470UlLYZlb_secret_Z9zowEVblZHakBcIm9K6crLdp"
              }

       //MakeOrder(2nd Request)

          Now from user card payment is reduces and now need to send what user orderd details to 
          the database. For that need to call api callin postman Orders/Make order req here
          adding order details.

          and then its done.
        */
<<<<<<< HEAD

        window.alert("Payment Successful");

=======
        setClientSecret(data);
        window.alert("Payment Successful");

        handleOrderDetails(data);

>>>>>>> 111f2fa8a7b9e5b9d7dbad3741bf3513389d6af3
        if (!stripe || !elements) {
          return;
        }
 
        const cardElement = elements.getElement(CardElement);

        const { error: confirmError } = await stripe.confirmCardPayment(data.clientSecret, {
          payment_method: {
<<<<<<< HEAD
            card: cardElement,
=======
            card: cardElement!,
>>>>>>> 111f2fa8a7b9e5b9d7dbad3741bf3513389d6af3
            billing_details: { name: cardholderName },
          },
        });

        if (confirmError) {
          console.error(confirmError);
          window.alert("Payment failed. Please try again.");
        } else {
          window.alert("Payment Successful");
          setModalOpen(true);
          setCardholderName("");
        }
      }
    } catch (e) {
      console.log("An error occurred. Please try again later.");
    }
  };

<<<<<<< HEAD
=======
  const handleOrderDetails = async (clientSecret: any) => {
      // Getting cart items from localStorage
      const cartItems = localStorage.getItem("cartItems");
      setCartItems(cartItems ? JSON.parse(cartItems) : null);
      console.log(cartItems);
      if (cartItems && Array.isArray(cartItems)) {
        cartItems.forEach(async (item) => {
          const id = item._id;
          try{
            const response = await fetch(`https://tasty-dog.onrender.com/api/v1/shops/item/${id}`);
            const data = await response.json();
            if(!response.ok){
              console.log(data.message || "An error occurred.");
            }else{
              // const shopIdData = data.shopId;
              console.log(response);
              // // Initialize quantities array with default quantities for each item
              // const initialQuantities = cartItems.map((cartItem: any) => cartItem.shopId);
              const orderItems = JSON.parse(localStorage.getItem("cartItems") || "[]").map((item: { itemId: any; quantity: any; price: any; shopId: any; }) => ({
                itemId: item.itemId,
                quantity: item.quantity,
                price: item.price,
                shopId: item.shopId,
              }));
              try{
                const response = await fetch(`https://tasty-dog.onrender.com/api/v1/payments/placeOrder`,{method: "POST"
                  ,headers:{
                    "Content-type": "application/json",},
                    body: JSON.stringify({
                      paymentIntentId:clientSecret,
                      userId:localStorage.getItem("userId"),
                      userName:localStorage.getItem("userName"),
                      orderItems:orderItems,
                      orderAddress: localStorage.getItem("userAddress"),
                    })
                });
                if(!response){
                  console.log(response);
                }else{
                  localStorage.removeItem("cartItems");
                }
                
              }catch(e){
                console.log("An error occurred. Please try again later." , e);
              }
            }
          }catch(e){
            console.log("An error occurred. Please try again later." , e);
          }
        });
      } else {
        console.log("No cart items found or invalid format");
      }
  };

>>>>>>> 111f2fa8a7b9e5b9d7dbad3741bf3513389d6af3
  return (
    <div>
      <div className="w-full mb-4 flex flex-col gap-2">
        <p className="text-[12px] text-inputText capitalize">Cardholder Name</p>
        <div className="w-full h-[48px] bg-inputBlue rounded-lg border-2 border-inputBorder">
          <input
            type="text"
            name="cardholderName"
            value={cardholderName}
            className="w-full outline-none bg-transparent h-full font-normal text-[14px] text-inputText px-4"
            onChange={(e) => setCardholderName(e.target.value)}
          />
        </div>
      </div>
      <CardElement className="w-full h-[48px] bg-inputBlue rounded-lg border-2 border-inputBorder" />
      <button
        onClick={handlePayment}
        className="w-full h-[45px] text-center bg-Green2 text-[20px] text-white rounded-[10px] capitalize mt-10 transition-transform duration-300 ease-in-out transform hover:scale-95"
      >
        Pay Now
      </button>
    </div>
  );
};

const CheckOut = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [cardholderName, setCardholderName] = useState("");

  return (
    <>
      <PageTransition>
        <section className="w-full px-[50px] xl:py-[50px] md:py-[35px]">
          <div className="flex lg:flex-row md:flex-col xl:gap-[50px] md:gap-[25px]">
            <div className="lg:w-[65%] md:w-full shadow-xl py-[50px] rounded-[10px]">
              <div className="max-w-[452px] flex flex-col mx-auto">
                <div className="w-full flex flex-col gap-3 ">
                  <h2 className="text-[24px] font-semibold capitalize">Select Payment Method</h2>
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
                  <CheckoutForm
                    setModalOpen={setModalOpen}
                    cardholderName={cardholderName}
                    setCardholderName={setCardholderName}
                  />
                </Elements>
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