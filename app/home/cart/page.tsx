  import CartTotal from "@/components/CartTotal";
  import MyCartComponent from "@/components/MyCartComponent";
  import PageTransition from "@/components/PageTransition";
  import React from "react";


  const Cart = () => {
    return (
      <>
        <PageTransition>
          <div className="w-full px-[50px] py-[25px]">
            <h2 className="ml-[50px] capitalize mb-[20px] text-[24px] font-semibold">
              my cart
            </h2>
            <div className="w-full flex lg:flex-row md:flex-col gap-6">
              <div className="xl:w-[65%] lg:w-[60%] md:w-[100%]">
                <MyCartComponent />
              </div>
              <div className="xl:w-[35%] lg:w-[40%] md:w-[80%] md:mx-auto  h-full">
                <CartTotal />
              </div>
            </div>
          </div>
        </PageTransition>
      </>
    );
  };

  export default Cart;
