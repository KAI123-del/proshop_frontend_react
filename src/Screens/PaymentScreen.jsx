import React, { useState } from "react";
import CheckoutSteps from "../components/CheckoutSteps";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GrPaypal } from "react-icons/gr";
import { BsCreditCard2FrontFill } from "react-icons/bs";
import { savePaymentMethod } from "../actions/cartActions";

function PaymentScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [stepCompleted, setStepCompleted] = useState({
    step2: false,
    step3: true,
    step4: false,
    step2Completed: true,
    step3Completed: false,
  });

  // const elements=useElements();
  // const stripe = useStripe();

  // if (!stripe || !elements) {
  //   return}

  // const card = elements.getElement(CardElement)

  // if(!card){
  //   return
  // }

  const paypalHandler = () => {
    dispatch(savePaymentMethod("paypal"));
    navigate("/orders");
  };

  const creditHandler = () => {
    dispatch(savePaymentMethod("creditCard"));
    navigate("/orders");
  };

  return (
    <div style={{ minHeight: "100vh" }} className="text-white px-40 pt-10 ">
      <div className="mb-16">
        <CheckoutSteps stepCompleted={stepCompleted} />
      </div>
      <div className="flex justify-center">
        <div className="w-3/4 ">
          <p className="text-3xl tracking-widest text-center border-b border-zinc-500 pb-3 font-gotham ">
            Choose a payment method
          </p>
          <div className="flex items-center justify-between mt-12">
            <div
              onClick={paypalHandler}
              className="flex items-center border text-2xl rounded-lg bg-gray-200 text-gray-600 font-gotham tracking-wider px-16 py-4 space-x-8 justify-between  shadow-lg hover:scale-110 hover:shadow-2xl  transition duration-300">
              <p>Pay using paypal</p>
              <p className="mt-1 text-blue-600 text-3xl">
                <GrPaypal />
              </p>
            </div>
            <div
              onClick={creditHandler}
              className="flex items-center  text-2xl rounded-lg bg-gray-200 text-gray-600 font-gotham tracking-wider px-16 py-4 space-x-8 justify-between shadow-lg hover:scale-110 hover:shadow-2xl  transition duration-300">
              <p>Pay using card</p>
              <p className="mt-1 text-yellow-600 text-3xl">
                <BsCreditCard2FrontFill />
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentScreen;
