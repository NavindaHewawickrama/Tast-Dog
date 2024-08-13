import React,{useState, useEffect} from "react";
import { DiVim } from "react-icons/di";
import { HiGiftTop } from "react-icons/hi2";
import { AiOutlinePercentage } from "react-icons/ai";
import axios from "axios";

interface Milestone {
  milestoneId: string;
  name: string;
  description: string;
  remainingOrders: number;
  expectedTotalOrders: number;
}


const OrderSummery = () => {
  const [totalPriceCart, setTotalPriceCart] = useState("");
  const [deliveryFee, setDiliveryFee] = useState("1.99");
  const [inputPromoCode,setInputPromoCode]=useState("");
  const [promoCodeData, setpromoCodeData] = useState<any[]>([]);
  const [discount, setDiscount]=useState<GLfloat | null>(null);
  const [finalTotal, setFinalTotal] = useState("");
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [userId, setUserId] = useState<string | null>(null);

  //getting userId 
  useEffect(() => {
    const userIDSvd = localStorage.getItem("userId");
    setUserId(userIDSvd);
  }, []);

  

  const handlePromoCode =async()=>{
    console.log("Redeem button clicked"); // Debugging line
    if (typeof window !== 'undefined') {
      const promoCodeShopID = sessionStorage.getItem("promoCodeShopId");
      try{
        const response = await fetch(`https://tasty-dog.onrender.com/api/v1/promocodes/promocodes/getPromoCodesByShopId/${promoCodeShopID}`);
        const data = await response.json();
        console.log('data', data);
        if(!response || data.length === 0){
          alert('Invalid promo or expired');
        }else{
          setpromoCodeData(data);
          validatePromoCode();
        }
      }catch(e){
        console.log(e);
      }
    }
  };


  const validatePromoCode = () => {
    const data = promoCodeData;
    let promoCodeFound = false;

    data.forEach(element => {
        if (element.code === inputPromoCode) {
            promoCodeFound = true;
            const currentDate = new Date(); // Get the current date
            const validTillDate = new Date(element.validTillDate); // Convert the validTillDate string to a Date object

            if (currentDate < validTillDate) {
                setDiscount(element.discountAmount);
                console.log(element.discountAmount);
                window.alert("Promo code found! Discount added!");
            } else {
                window.alert("Promo code expired.");
            }
            return; // Exit the loop since we found the promo code
        }
    });

    if (!promoCodeFound) {
        window.alert("Promo code incorrect.");
    }
};

  //check for milestones
  const fetchMilestones = async () => {
    try {
      if (userId) {
        const response = await axios.post<Milestone[]>(
          "https://tasty-dog.onrender.com/api/v1/milestones/checkAvailableMilstonesForUser",
          {
            userId,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setMilestones(response.data);
      }
    } catch (error) {
      console.error("Error fetching milestones:", error);
    }
  };

  useEffect(()=>{
    var hasBuyNowPrice;
    if (typeof window !== 'undefined') {
        // if((localStorage.getItem("hasBuyNowPrice"))?.toString() == "yes"){
        //   const totalPrice = localStorage.getItem("totalPriceBuyNow") ?? "";
        //   setTotalPriceCart(totalPrice);
        //   fetchMilestones();
        //   hasBuyNowPrice = "No";
        //   localStorage.setItem("hasBuyNowPrice", hasBuyNowPrice);
        // }else{
        //   const totalPrice = localStorage.getItem("totalPriceCart") ?? "";
        //   setTotalPriceCart(totalPrice);
        //   fetchMilestones();
        // }

        const totalPrice = localStorage.getItem("totalPriceCart") ?? "";
          setTotalPriceCart(totalPrice);
          fetchMilestones();
    }
  },[userId])


  //final price of the products
  const handleCalculations = () => {
    const price = parseFloat(totalPriceCart); 
    var totalNew = price + parseFloat(deliveryFee); 
    var total = Math.round(totalNew * 100) / 100;
    if(discount != null){
      total = total - discount ;
      total = Math.round(total * 100) / 100;


      if (typeof window !== 'undefined') {
        localStorage.setItem("finalTotalCart", total.toString());
      }
    return total;
    }else{
      if (typeof window !== 'undefined') {
        localStorage.setItem("finalTotalCart", total.toString());
      }
      return total;
    }
    
    // Optionally, you might want to return the calculated total if needed
    if (typeof window !== 'undefined') {
      localStorage.setItem("finalTotalCart", total.toString());
    }
    console.log(total);
    return total;
    
  }

  return (
    <div className="w-full flex flex-col">
      <div className="flex items-center gap-2">
        {" "}
        <HiGiftTop className="text-[40px] text-buttonGreen" />
        <h3 className="text-[18px] font-semibold capitalize">
          Loyalty Progress
        </h3>
      </div>
      {milestones.length === 0 && (
              <p className="mt-5">No data available</p>
            )}
     {milestones.length !=0 &&  <div className="mt-10 w-full flex flex-col gap-2 px-4">
          <h3 className="capitalize text-white font-semibold text-[15px] font-sans">
            Milestones
          </h3>
          {milestones.length === 0 && (
            <p className="text-white text-[13px]">No milestones available</p>
          )}
          {milestones.map((milestone) => (
            <div
              key={milestone.milestoneId}
              className="flex flex-col bg-lighterGreen p-2 rounded-lg shadow-lg mt-2"
            >
              <h4 className="text-[14px] font-medium text-black">
                {milestone.name}
              </h4>
              <p className="text-[12px] text-black">
                {milestone.description}
              </p>
              <p className="text-[12px]text-black">
                {`Remaining Orders: ${milestone.remainingOrders}/${milestone.expectedTotalOrders}`}
              </p>
            </div>
          ))}
          </div>}
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
