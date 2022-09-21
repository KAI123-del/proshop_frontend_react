import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { clsx } from "clsx";
import { useNavigate, useParams } from "react-router-dom";
import { getOrderById } from "../actions/orderActions";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import { BsCheckCircleFill } from "react-icons/bs";
import { animate, spring } from "motion";
import { cartItemReset } from "../actions/cartActions";

function OrderDetails() {
  const options = {
    style: {
      base: {
        fontSize: "16px",
        color: "#1e1d43",
        letterSpacing: "0.025em",
        fontFamily: "Source Code Pro, monospace",
        "::placeholder": {
          color: "gray",
        },
      },
      invalid: {
        color: "#9e2146",
      },
    },
  };

  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const stripe = useStripe();
  const elements = useElements();
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const { loading, order } = useSelector((state) => state.orderDetails);
  const { userInfo } = useSelector((state) => state.userLogin);

  useEffect(() => {
    animate(
      ".successAnimate",
      { translateY: [-200, 200] },
      { easing: spring() }
    );
  }, [paymentSuccess]);

  const submitHandler = async () => {
    try {
      if (!stripe || !elements) {
        return;
      }
      setPaymentLoading(true);

      if (order) {
        const paymentIntent = await axios.post(
          "https://jobless-nerd.onrender.com/create-payment-intent",
          {
            ...order,
          }
        );

        const clientSecret = paymentIntent.data.clientSecret;

        const card = elements.getElement(CardElement);
        if (!card) {
          return;
        }

        await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: card,
          },
        });

        if (paymentIntent.status === 200) {
          setPaymentLoading(false);
          const config = {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${userInfo.token}`,
            },
          };

          setPaymentSuccess(true);

          const { data } = await axios.put(
            `https://jobless-nerd.onrender.com/api/orders/${order._id}/orderPaid`,
            {},
            config
          );

          if (data) {
            dispatch(cartItemReset());
            setTimeout(() => {
              navigate("/profile");
            }, 1000);
          }
        }
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    if (!order || order._id !== id) {
      dispatch(getOrderById(id));
    }
  }, [order, id]);

  return loading ? (
    "...loading"
  ) : (
    <div
      style={{ minHeight: "100vh" }}
      className="text-white px-28 pt-10 pb-12 relative">
      {paymentSuccess && (
        <p
          style={{ top: "-50px", right: "38%" }}
          className="absolute text-lg successAnimate font-nezto tracking-wider text-green-500 bg-green-200 px-12 py-4 rounded border-2 border-green-500 flex items-center justify-center ">
          <span className="mt-1 mr-5 text-2xl">
            <BsCheckCircleFill />
          </span>
          payment successfull !!!
        </p>
      )}
      <div className="grid grid-cols-6 gap-x-8 mt-12">
        {/* ===========================left div ======================= */}

        <div className="col-span-4 shadow-xl px-6 pt-4 shadow-black rounded-lg">
          {/* =================shipping address */}
          <div className="   pb-6 border-b border-zinc-500">
            <p className=" font-gotham    text-2xl ">Shipping Details</p>
            <div className="mt-4 ">
              <div className="flex   space-x-12 items-center">
                <p className="font-nezto  text-lg tracking-wider">Address</p>
                <p className="font-nezto  text-lg tracking-wider">
                  {order.shippingAddress.address} ,
                  <span className="ml-1">{order.shippingAddress.city} ,</span>
                  <span className="ml-1">
                    {order.shippingAddress.country} ,
                    <span className="ml-1">
                      {order.shippingAddress.postalCode}
                    </span>
                  </span>
                </p>
              </div>
              <div className="flex mt-2  items-center">
                <p className="font-nezto  text-lg tracking-wider">Name</p>
                <p
                  style={{ marginLeft: "68px" }}
                  className="font-nezto text-lg tracking-wider">
                  {order.user.name}
                </p>
              </div>
              <div className="flex mt-2  items-center">
                <p className="font-nezto  text-lg tracking-wider">Email</p>
                <a
                  style={{ marginLeft: "68px" }}
                  className="font-nezto text-lg tracking-wider"
                  href={`mailto:${order.user.email}`}>
                  {order.user.email}
                </a>
              </div>
              {order.isDelivered ? (
                <p className="border-2 py-2 px-4 mt-4 text-lg font-nezto tracking-wide text-green-500 bg-green-200 border-green-600 rounded">
                  Delivered
                </p>
              ) : (
                <p className="border-2 py-2 px-4 mt-4 text-lg font-nezto tracking-wide text-red-500 bg-red-200 border-red-600 rounded">
                  not delivered
                </p>
              )}
            </div>
          </div>
          {/* ================payment mode======= */}
          <div className=" mt-4  pb-6 border-b border-zinc-500 ">
            <p className="font-gotham text-2xl mt-2 ">Payment Mode</p>
            <p className="font-nezto mt-3 text-xl tracking-wider">
              {order.paymentMethod}
            </p>
            {order.isPaid ? (
              <p className="border-2 py-2 px-4 mt-4 text-lg font-nezto tracking-wide text-green-500 bg-green-200 border-green-600 rounded">
                Paid
              </p>
            ) : (
              <p className="border-2 py-2 px-4 mt-4 text-lg font-nezto tracking-wide text-red-500 bg-red-200 border-red-600 rounded">
                not paid
              </p>
            )}
          </div>
          {/* ===============order summary========= */}
          <div className=" mt-4">
            <p className="font-gotham text-2xl ">Order Summary</p>
            {order.orderItems.length > 0
              ? order.orderItems.map((item, index) => (
                  <div
                    key={index}
                    className={clsx("mt-2 grid grid-cols-8 items-center pb-2", {
                      "border-b border-zinc-500":
                        index < order.orderItems.length - 1,
                    })}>
                    <div className="col-span-2 ">
                      <img
                        src={item.image}
                        style={{
                          height: "100px",
                          width: "150px",
                          borderRadius: "6px",
                        }}
                      />
                    </div>
                    <div className="col-span-2 text-xl font-nezto tracking-wider">
                      <Link to={`/products/${item._id}`}>{item.name}</Link>
                    </div>
                    <div className="col-span-2 text-center text-xl font-nezto tracking-wide">
                      {item.category}
                    </div>
                    <p className="text-xl font-nezto text-center col-span-2 ">
                      {item.qty} x {item.price}=${" "}
                      {Math.round(item.qty * item.price).toFixed(2)}
                    </p>
                  </div>
                ))
              : " "}
          </div>
        </div>

        {/* ===========================right div (payment) ======================= */}

        <div
          className="col-span-2 shadow-xl shadow-black rounded-lg "
          style={{ height: "280px" }}>
          <div className="px-12 mt-2">
            <div className="flex space-x-2 py-3  text-xl font-nezto border-b border-zinc-500">
              <p className="w-1/2 ">Total Items</p>
              <p className="pl-12">
                {" "}
                {order.orderItems.reduce(
                  (x, y) => parseInt(x) + parseInt(y.qty),
                  0
                )}
              </p>
            </div>
            <div className="flex space-x-2 py-3  text-xl font-nezto border-b border-zinc-500">
              <p className="w-1/2 "> Price</p>
              <p className="pl-12">
                $ {order.totalPrice - (order.taxPrice + order.shippingPrice)}
              </p>
            </div>
            <div className="flex space-x-2 py-3  text-xl font-nezto border-b border-zinc-500">
              <p className="w-1/2 ">Shipping</p>
              <p className="pl-12">$ {order.shippingPrice}</p>
            </div>
            <div className="flex space-x-2 py-3  text-xl font-nezto border-b border-zinc-500">
              <p className="w-1/2 ">Tax</p>
              <p className="pl-12">$ {order.taxPrice}</p>
            </div>
            <div className="flex space-x-2 py-3  text-xl font-nezto ">
              <p className="w-1/2 ">total</p>
              <p className="pl-12">$ {order.totalPrice}</p>
            </div>
          </div>

          {/* ====================payment card================================ */}
          {!order.isPaid && (
            <div className="mt-16 px-3 pb-4 pt-3 shadow-xl shadow-black rounded-lg flex flex-col">
              <p className="text-center  mb-3 text-lg font-nezto tracking-wider">
                Complete your payment
              </p>
              <div className="bg-white rounded p-3">
                <CardElement options={options} />
              </div>
              <div>
                <button
                  onClick={submitHandler}
                  className="w-full flex relative justify-center items-center  bg-green-500 font-nezto tracking-wider mt-4 rounded h-10">
                  {paymentLoading ? (
                    <>
                      <p className="w-8 h-8  rounded-full border-2  border-green-300"></p>
                      <p className="w-8 h-8 absolute top-1 animate-spin  rounded-full border-y-2 border-green-500"></p>{" "}
                    </>
                  ) : (
                    <p>pay now</p>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default OrderDetails;
