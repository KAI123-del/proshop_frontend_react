import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { saveShippingAddress } from "../actions/cartActions";
import CheckoutSteps from "../components/CheckoutSteps";
import { toast, ToastContainer, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function ShippingScreen() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const shippingInfo = useSelector((state) => state.cart.shippingAddress);
  const [address, setAddress] = useState(shippingInfo?.address);
  const [city, setCity] = useState(shippingInfo?.city);
  const [postalCode, setPostalCode] = useState(shippingInfo?.postalCode);
  const [country, setCountry] = useState(shippingInfo?.country);
  const [stepCompleted, setStepCompleted] = useState({
    step2: true,
    step3: false,
    step4: false,
    step2Completed: false,
    step3Completed: false,
  });

  const submitHandler = (e) => {
    e.preventDefault();
    if (
      city.length > 0 &&
      postalCode.length > 0 &&
      country.length > 0 &&
      address.length > 0
    ) {
      toast.success("shipping address saved !!!", {
        autoClose: 2000,
        theme: "dark",
      });

      dispatch(
        saveShippingAddress({
          address: address,
          city: city,
          postalCode: postalCode,
          country: country,
        })
      );
      setCity("");
      setAddress("");
      setCountry("");
      setPostalCode("");
      setStepCompleted({
        step2: true,
        step3: false,
        step4: false,
        step2Completed: true,
        step3Completed: false,
      });

      navigate("/payment");
    } else {
      toast.error("empty field's can't be submitted !!!", {
        autoClose: 2000,
        theme: "dark",
      });
    }
  };

  return (
    <div style={{ minHeight: "100vh" }} className="text-white px-40 pt-10 ">
      <div className="border-b pb-8 border-zinc-500">
        <CheckoutSteps stepCompleted={stepCompleted} />
      </div>
      <div className="pb-8 shadow-xl shadow-black rounded-lg pt-4 mt-12 px-4">
        <div className="flex justify-between space-x-12 items-center">
          <div className="  w-1/2 ">
            <div>
              <label className="font-semibold text-xl tracking-wider">
                Address
              </label>
            </div>
            <input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full py-3 rounded-lg px-2 mt-2 text-gray-600 outline-none"
              placeholder="Type an address"
              type="text"
            />
          </div>
          <div className="w-1/2 ">
            <div>
              <label className="font-semibold text-xl tracking-wider">
                City
              </label>
            </div>
            <input
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full py-3 rounded-lg px-2 mt-2 text-gray-600 outline-none"
              placeholder="City Name"
              type="text"
            />
          </div>
        </div>
        <div className="flex items-center mt-6 space-x-12 justify-between">
          <div className="w-1/2">
            <div>
              <label className="font-semibold text-xl tracking-wider">
                Postal Code
              </label>
            </div>
            <input
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              className="w-full py-3 rounded-lg px-2 mt-2 text-gray-600 outline-none"
              placeholder="Postal Code"
              type="text"
            />
          </div>
          <div className="w-1/2">
            <div>
              <label className="font-semibold text-xl tracking-wider">
                Country
              </label>
            </div>
            <input
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full py-3 rounded-lg px-2 mt-2 text-gray-600 outline-none"
              placeholder="Country Name"
              type="text"
            />
          </div>
        </div>
        <button
          onClick={submitHandler}
          className="w-full mt-8 bg-pink-600 py-3 rounded-lg text-xl font-gotham tracking-widest">
          Submit
        </button>
      </div>
      <ToastContainer transition={Flip} className="text-center" />
    </div>
  );
}

export default ShippingScreen;
