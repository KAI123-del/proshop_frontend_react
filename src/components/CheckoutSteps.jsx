import React from "react";
import { Link } from "react-router-dom";


function CheckoutSteps({ stepCompleted }) {
  // console.log(stepCompleted.step2);

  return (
    <div className="flex items-center justify-center space-x-8 ">
      <div
        className={
          "text-2xl font-gotham border border-green-500 rounded-full px-6 py-2 italic tracking-wider text-green-500"
        }>
        <Link to={"/login"} className="disabled-link ">
          Sign In
        </Link>
      </div>
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-10 h-8 text-green-500">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5"
          />
        </svg>
      </div>
      <div
        className={
          stepCompleted.step2 === true
            ? "text-2xl text-pink-600 hover:text-white transition duration-500 border px-6 py-2 rounded-full scale-110 border-pink-600 hover:border-white font-gotham tracking-wider"
            : stepCompleted.step2Completed === true
            ? "text-green-500 border border-green-500 px-6 py-2 text-2xl font-gotham rounded-full tracking-wider"
            : "text-2xl font-gotham   italic tracking-wide text-zinc-500 px-6 py-2 border border-zinc-500 rounded-full"
        }>
        <Link
          to={"/shipping"}
          className={
            stepCompleted.step2 !== true ? "disabled-link" : "active-link"
          }>
          Shipping
        </Link>
      </div>
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className={
            stepCompleted.step2Completed === true
              ? "w-10 h-8 text-green-500"
              : "w-6 h-6 text-zinc-500"
          }>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5"
          />
        </svg>
      </div>
      <div
        className={
          stepCompleted.step3 === true
            ? "text-2xl text-pink-600 hover:text-white transition duration-500 border px-6 py-2 rounded-full scale-110 border-pink-600 hover:border-white font-gotham tracking-wider"
            : stepCompleted.step3Completed === true
            ? "text-green-500 border border-green-500 px-6 py-2 font-gotham tracking-wider rounded-full text-2xl"
            : "text-2xl font-gotham  italic tracking-wide text-zinc-500 px-6 py-2 border border-zinc-500 rounded-full"
        }>
        <Link
          to={"/payment"}
          className={
            stepCompleted.step3 !== true ? "disabled-link" : "active-link"
          }>
          Payment Method
        </Link>
      </div>
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className={
            stepCompleted.step3Completed === true
              ? "w-10 h-8 text-green-500"
              : "w-6 h-6 text-zinc-500"
          }>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5"
          />
        </svg>
      </div>
      <div
        className={
          stepCompleted.step4 === true
            ? "text-2xl text-pink-600 hover:text-white transition duration-500 border px-6 py-2 rounded-full scale-110 border-pink-600 hover:border-white font-gotham tracking-wider"
            : "text-2xl font-gotham  italic tracking-wide text-zinc-500 px-6 py-2 border border-zinc-500 rounded-full"
        }>
        <Link
          to={"/orderList"}
          className={
            stepCompleted.step4 !== true ? "disabled-link" : "active-link"
          }>
          Place Order
        </Link>
      </div>
    </div>
  );
}

export default CheckoutSteps;
