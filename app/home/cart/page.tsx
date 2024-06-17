  "use client";
  import CartTotal from "@/components/CartTotal";
  import MyCartComponent from "@/components/MyCartComponent";
  import PageTransition from "@/components/PageTransition";
  import React, { useCallback, useEffect, useState } from "react";


  const Cart = () => {

    const [cartItems, setCartItems] = useState<any[]>([]);
    const [totalPrice, setTotalPrice] = useState<number>(0);


    useEffect(() => {
      const storedCartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
      const initializedCartItems = storedCartItems.map((item: any) => ({
        ...item,
        quantity: item.quantity ?? 0,
      }));
      setCartItems(initializedCartItems);
    }, []);
  
    useEffect(() => {
      handleTotal();
    }, [cartItems]);

    const handleTotal = useCallback(() => {
      let total = 0;
      cartItems.forEach((item) => {
        total += item.price * item.quantity;
      });
      total = parseFloat(total.toFixed(2));
      setTotalPrice(total);
      localStorage.setItem("totalPriceCart", total.toFixed(2));
    }, [cartItems]);
 

    const updateLocalStorage = (updatedCartItems: any[]) => {
      localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
      sessionStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    };
  
    const incrementQty = (index: number) => {
      const updatedCartItems = cartItems.map((item, i) => (
        i === index ? { ...item, quantity: item.quantity + 1 } : item
      ));
      setCartItems(updatedCartItems);
      updateLocalStorage(updatedCartItems);
    };
  
    const decrementQty = (index: number) => {
      const updatedCartItems = cartItems.map((item, i) => (
        i === index && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
      ));
      setCartItems(updatedCartItems);
      updateLocalStorage(updatedCartItems);
    };
  
    const removeItem = (index: number) => {
      const updatedCartItems = cartItems.filter((_, i) => i !== index);
      setCartItems(updatedCartItems);
      updateLocalStorage(updatedCartItems);
    };
    
    return (
      <>
        <PageTransition>
          <div className="w-full px-[50px] py-[25px]">
            <h2 className="ml-[50px] capitalize mb-[20px] text-[24px] font-semibold">
              my cart
            </h2>
            <div className="w-full flex lg:flex-row md:flex-col gap-6">
              <div className="xl:w-[65%] lg:w-[60%] md:w-[100%]">
              <MyCartComponent 
              cartItems={cartItems}
              incrementQty={incrementQty}
              decrementQty={decrementQty}
              removeItem={removeItem}
            />
              </div>
              <div className="xl:w-[35%] lg:w-[40%] md:w-[80%] md:mx-auto  h-full">
              <CartTotal 
              cartItems={cartItems}
              totalPrice={totalPrice}
            />
              </div>
            </div>
          </div>
        </PageTransition>
      </>
    );
  };

  export default Cart;
