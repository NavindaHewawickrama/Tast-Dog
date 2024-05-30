import React,{useState, useEffect} from "react";
import { DiVim } from "react-icons/di";
import { HiGiftTop } from "react-icons/hi2";
import { AiOutlinePercentage } from "react-icons/ai";

const OrderSummery = () => {
  const [totalPriceCart, setTotalPriceCart] = useState("");
  const [deliveryFee, setDiliveryFee] = useState("1.99");
  const [inputPromoCode,setInputPromoCode]=useState("");
  const [promoCodeData, setpromoCodeData] = useState<any[]>([]);
  const [discount, setDiscount]=useState("");

  const handleCalculations = () => {
    const price = parseFloat(totalPriceCart); 
    var total = price - parseFloat(deliveryFee); 
    if(parseFloat(discount) != 0){
      total = total - total*(parseFloat(discount)/100);
    }
  
    // Optionally, you might want to return the calculated total if needed
    localStorage.setItem("finalTotalCart", total.toString());
    return total;
  }

  const handlePromoCode =async()=>{
    const promoCodeShopID = localStorage.getItem("promoCodeShopId");
    try{
      const response = await fetch(`https://tasty-dog.onrender.com/api/v1/promocodes/promocodes/getPromoCodesByShopId/${promoCodeShopID}`);
      const data = await response.json();
      if(!response){
        console.log("error");
      }else{
        setpromoCodeData(data);
        validatePromoCode();
      }
    }catch(e){
      console.log(e);
    }
  };

  const validatePromoCode = ()=>{
    const data = promoCodeData;
    // const promoCode = data.find((item:any)=>item.code === inputPromoCode);
    // // if(promoCode){
    //   window.alert(promoCode);
    // }
    data.forEach(element => {
      if(element.code === inputPromoCode){
        const date = Date();
        if(date < element.validTillDate){
          setDiscount(element.discountAmount);
        }
      }else{
        console.log("not found");
      }
    });
    
  }

  useEffect(()=>{
    const totalPrice = localStorage.getItem("totalPriceCart") ?? "";
    setTotalPriceCart(totalPrice);
  },[])

  return (
    <div className="w-full flex flex-col">
      <div className="flex items-center gap-2">
        {" "}
        <HiGiftTop className="text-[40px] text-buttonGreen" />
        <h3 className="text-[18px] font-semibold capitalize">
          Loyalty Progress
        </h3>
      </div>
      <div className="w-full flex flex-col gap-1 mt-2">
        <p className="text-[14px] text-inputText capitalize">
          You Are 3 Meals Away From our 10$ Discount
        </p>
        <div className="w-full bg-lightGreen rounded-full h-5 dark:bg-lightGreen mt-[10px] flex justify-between">
          <div className="bg-buttonGreen h-5 rounded-full w-[45%] flex justify-between   px-[25px]">
            <p className="text-[12px] text-white">0</p>
          </div>
          <p className="text-[12px] mr-[25px]">5</p>
        </div>
      </div>
      <div className="w-full h-full mx-auto mt-[70px]">
        <h3 className="text-[20px] font-semibold capitalize">Order Summery</h3>
        <div className="flex flex-col justify-center gap-1 mt-4">
          <div className="flex justify-between">
            <p className="text-[15px] text-detail">Item’s Total</p>
            <p className="text-[15px] text-detail">{totalPriceCart}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-[15px] text-detail">Delivery Fees</p>
            <p className="text-[15px] text-detail">$1.99</p>
          </div>
          <div className="flex justify-between">
            <p className="text-[15px] text-detail">Total Payment</p>
            <p className="text-[15px] text-detail">${handleCalculations()}</p>
          </div>
        </div>
      </div>
      <div className="w-full flex gap-5 mt-10">
        <AiOutlinePercentage className="text-[36px] text-buttonGreen" />
        <div className="w-full h-[45px] border bg-inputBlue border-inputBorder rounded-lg ">
          <input
            type="text"
            placeholder="promo code"
            onChange={(e)=>setInputPromoCode(e.target.value)}
            className="w-full h-full bg-inputBlue border-none rounded-xl px-3 text-inputText2"
          />
        </div>
      </div>
      <button onClick={handlePromoCode} 
      className="w-full py-[10px] rounded-xl bg-buttonGreen text-[20px] text-white capitalize text-center mt-4 cursor-pointer transition-transform duration-300 ease-in-out transform hover:scale-95">
        Reedem
      </button>
    </div>
  );
};

export default OrderSummery;
