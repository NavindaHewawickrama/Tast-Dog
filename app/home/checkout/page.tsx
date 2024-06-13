"use client";

import React, { useState, useEffect} from "react";
import { BsCreditCard } from "react-icons/bs";
import { FaPaypal } from "react-icons/fa";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import OrderSummery from "@/components/OrderSummery";
import PageTransition from "@/components/PageTransition";
import OrderSuccsess from "@/components/models/OrderSuccsess";
import PaymentCard from "@/components/PaymentCard";

const stripePromise = loadStripe('pk_test_51P7Kv2P2T7YncC47Pyuo5PkqEX7wM9DPFBqRvGXhTksCqiwSg50p9qazEUc11BFZiyvAM9J6iThRvn7cdt6zC7GG00ZPU92lqa');

const CheckoutForm = ({ setModalOpen, cardholderName, setCardholderName }: { setModalOpen: React.Dispatch<React.SetStateAction<boolean>>, cardholderName: string, setCardholderName: React.Dispatch<React.SetStateAction<string>> }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState<any>("");
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [userId, setUserId] = useState<string | null>("");
  const [userName, setUserName] = useState<string | null>("");
  const [addressBuyer, setAddressBuyer] = useState<string | null>("");

  useEffect(() => {
    const userIDSvd = localStorage.getItem("userId");
    const userNameSvd = localStorage.getItem("userName");
    const address = localStorage.getItem("buyerAddress");
    setAddressBuyer(address);
    setUserName(userName);
    setUserId(userIDSvd);
  },[]);

  const handlePayment = async () => {
    // const totalAmount = '1000';
    //To the payment success need to call two api calls.
    //1st call is to make payment and get the client secret key and reduce total amount feom user bank account
    //2nd call is if 1stapi call sucess then to make order and send the order details to the database.

    //MakePayment (1st Request)
    console.log(addressBuyer);
    try {
      const response = await fetch("https://tasty-dog.onrender.com/api/v1/orders/makePayment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ totalAmount: '10000' }),
      });

      const data = await response.json();
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
      //  console.log(data.clientSecret);
        setClientSecret(data.clientSecret);
        // window.alert("client secret");
        // window.alert("Payment Successful");
       await handleShopDetails(data.clientSecret);

        if (!stripe || !elements) {
          return;
        }
 
        const cardElement = elements.getElement(CardElement);

        const { error: confirmError } = await stripe.confirmCardPayment(data.clientSecret, {
          payment_method: {
            card: cardElement!,
            billing_details: { name: cardholderName },
          },
        });

        if (confirmError) {
          console.error(confirmError);
          // window.alert("Payment failed. Please try again.");
        } else {
          // window.alert("Payment Successful");
          setModalOpen(true);
          setCardholderName("");
        }
      }
    } catch (e) {
      console.log("An error occurred. Please try again later.");
    }
  };


  const handleShopDetails = async (secret: any) => {
    const itemsCart = sessionStorage.getItem("cartItems");
    const cartItems = itemsCart ? JSON.parse(itemsCart) : [];
  
    for (const element of cartItems) {
      try {
        const response = await fetch(`https://tasty-dog.onrender.com/api/v1/shops/item/${element._id}`);
        const data = await response.json();
  
        if (!response.ok) {
          console.log(data.message || "An error occurred while fetching shop details.");
        } else {
          // window.alert("Shop details retrieved successfully."); // Informative message
          await handleOrderDetails(data.shopId, element._id, data.soldQty, element.price, secret);
        }
      } catch (error) {
        console.error("Error fetching shop details:", error);
      }
    }
  };

  const handleOrderDetails = async (shopId: any, id: any, qty: any, price: any, secret: any) => {
    try {
      const orderItems = []; // Initialize an empty array to hold order items
  
      // Construct the order item object
      const orderItem = {
        itemId: id,
        quantity: qty,
        price: price,
        shopId: shopId,
      };
  
      // Push the order item object into the orderItems array
      orderItems.push(orderItem);
      
      const orderAddress = {addressBuyer};
  
      const requestBody = {
        paymentIntentId: secret,
        userId,
        userName,
        orderItems, 
        orderAddress,
      };
      console.log(requestBody);
  
      const response = await fetch(`https://tasty-dog.onrender.com/api/v1/payments/placeOrder`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });
  
      if (!response.ok) {
        console.error("Error placing order:", response.statusText);
        return;
      }
      console.log("Order placed successfully");
      window.alert("Payment success");
      sessionStorage.removeItem("cartItems");  
    } catch (error) {
      console.error("An error occurred while placing order:", error);
    }
  };
  

  

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
  const [shopID, setShopId]= useState<any>("");
  const[secondCartItems, setSecondCartItems] = useState<any>("");
  useEffect(() => {
    handleShopDetails();
  }, []);

  const handleShopDetails = async () => {
    const itemsCart = sessionStorage.getItem("cartItems");
    const cartItems2 = itemsCart ? JSON.parse(itemsCart) : [];
    setSecondCartItems(cartItems2);
    for (const element of cartItems2) {
      try {
        const response = await fetch(`https://tasty-dog.onrender.com/api/v1/shops/item/${element._id}`);
        const data = await response.json();
  
        if (!response.ok) {
          console.log(data.message || "An error occurred while fetching shop details.");
        } else { 
          setShopId(data.shopId);
          sessionStorage.setItem("promoCodeShopId", data.shopId);
        }
      } catch (error) {
        console.error("Error fetching shop details:", error);
      }
    }
  };

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
                            {/* <button className="w-[224px] h-[48px] flex text-center bg-none text-black border border-gray-400 justify-center items-center rounded-[4px] gap-3">
                                <FaPaypal className="text-[20px] text-blue-900" />
                                    PayPal
                                </button> */}
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
                    <OrderSummery/>
                </div>
            </div>
      </section>
      </PageTransition>
      <OrderSuccsess open={modalOpen} onClose={() => setModalOpen(false)} />
      </>
  )
};
export default CheckOut;