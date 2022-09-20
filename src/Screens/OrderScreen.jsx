import React, { useState, useEffect } from "react";
import CheckoutSteps from "../components/CheckoutSteps";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { clsx } from "clsx";
import { saveOrder } from "../actions/orderActions";
import { useNavigate } from "react-router-dom";

function OrderScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { shippingAddress, paymentMethod, cartItems } = useSelector(
    (state) => state.cart
  );

  const { success, loading, order } = useSelector((state) => state.orderCreate);
  useEffect(() => {
    if (success) {
      navigate(`/orders/${order._id}`);
    }
  }, [success]);

  const [stepCompleted, setStepCompleted] = useState({
    step2: false,
    step3: false,
    step4: true,
    step2Completed: true,
    step3Completed: true,
  });

  // =================calculate prices ===================//

  const addDecimals = (num) => {
    return Math.round((num * 100) / 100).toFixed(2);
  };

  const itemPrice = parseInt(
    addDecimals(cartItems.reduce((x, y) => x + y.price, 0))
  );

  const shippingPrice = parseInt(addDecimals(itemPrice > 100 ? 0 : 100));

  const taxPrice = parseInt(addDecimals((0.15 * itemPrice).toFixed(2)));

  const totalPrice = itemPrice + shippingPrice + taxPrice;



  // =================place order=========================//

  const placeOrderHandler = () => {
    dispatch(
      saveOrder({
        shippingAddress: shippingAddress,
        shippingPrice: shippingPrice,
        orderItems: cartItems,
        paymentMethod: paymentMethod,
        taxPrice: taxPrice,
        itemsPrice: itemPrice,
        totalPrice: totalPrice,
      })
    );
  };

  return (
    <div
      style={{ minHeight: "100vh" }}
      className="text-white px-28 pt-10 pb-12">
      <div className="pb-8 border-b border-zinc-500">
        <CheckoutSteps stepCompleted={stepCompleted} />
      </div>

      <div className="grid grid-cols-6 gap-x-8 mt-12">
        {/* ===========================left div ======================= */}

        <div className="col-span-4 shadow-xl px-6 pt-4 shadow-black rounded-lg">
          {/* =================shipping address */}
          <div className="   pb-6 border-b border-zinc-500">
            <p className=" font-gotham    text-2xl ">Shipping Details</p>
            <p className="font-nezto mt-4 text-lg tracking-wider">
              {shippingAddress.address} ,
              <span className="ml-1">{shippingAddress.city} ,</span>
              <span className="ml-1">
                {shippingAddress.country} ,
                <span className="ml-1">{shippingAddress.postalCode}</span>
              </span>
            </p>
          </div>
          {/* ================payment mode======= */}
          <div className=" mt-4  pb-6 border-b border-zinc-500 ">
            <p className="font-gotham text-2xl mt-2 ">Payment Mode</p>
            <p className="font-nezto mt-3 text-xl tracking-wider">
              {paymentMethod}
            </p>
          </div>
          {/* ===============order summary========= */}
          <div className=" mt-4">
            <p className="font-gotham text-2xl ">Order Summary</p>
            {cartItems.length > 0
              ? cartItems.map((item, index) => (
                  <div
                    key={index}
                    className={clsx("mt-2 grid grid-cols-8 items-center pb-2", {
                      "border-b border-zinc-500": index < cartItems.length - 1,
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
          style={{ height: "350px" }}>
          <div className="px-12 mt-2">
            <div className="flex space-x-2 py-3  text-xl font-nezto border-b border-zinc-500">
              <p className="w-1/2 ">Total Items</p>
              <p className="pl-12">
                {" "}
                {cartItems.reduce((x, y) => x + y.qty, 0)}
              </p>
            </div>
            <div className="flex space-x-2 py-3  text-xl font-nezto border-b border-zinc-500">
              <p className="w-1/2 "> Price</p>
              <p className="pl-12">$ {itemPrice}</p>
            </div>
            <div className="flex space-x-2 py-3  text-xl font-nezto border-b border-zinc-500">
              <p className="w-1/2 ">Shipping</p>
              <p className="pl-12">$ {shippingPrice}</p>
            </div>
            <div className="flex space-x-2 py-3  text-xl font-nezto border-b border-zinc-500">
              <p className="w-1/2 ">Tax</p>
              <p className="pl-12">$ {taxPrice}</p>
            </div>
            <div className="flex space-x-2 py-3  text-xl font-nezto ">
              <p className="w-1/2 ">total</p>
              <p className="pl-12">$ {totalPrice}</p>
            </div>
          </div>
          <button
            onClick={placeOrderHandler}
            style={{ marginTop: "24px" }}
            className="w-full hover:text-pink-600 hover:bg-white transition duration-300 bg-pink-600 rounded-b-lg py-3 text-xl font-gotham tracking-widest ">
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
}

export default OrderScreen;
