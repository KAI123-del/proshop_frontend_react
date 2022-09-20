import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, removeItem } from "../actions/cartActions";
import { MdDelete } from "react-icons/md";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";

function Cart() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cartItems);

  console.log("cart", cart);

  const shippingHandler = () => {
    navigate("/login?redirect=/shipping");
  };

  return (
    <div style={{ height: "100%", minHeight: "100vh" }} className="pb-20">
      <div className="px-6">
        <p className=" pt-8 text-2xl text-gray-200 font-gotham tracking-widest pb-2 border-b-2 border-zinc-400">
          Cart Summary
        </p>
      </div>
      <div className="grid grid-cols-12 gap-4  px-6 py-8">
        {cart.length > 0 && (
          <div className="col-span-9">
            {cart.map((x, index) => (
              <div
                className={clsx(
                  "  text-gray-200 grid grid-cols-12 shadow-xl shadow-black py-1 ",
                  {
                    " ": index !== cart.length - 1,
                  }
                )}>
                <div className="col-span-2 ">
                  <img
                    src={x.image}
                    style={{ height: "150px", width: "200px" }}
                  />
                </div>
                <div className="col-span-3 flex flex-col items-start  px-4  ">
                  <p className="text-xl mt-4 tracking-wider font-gotham ">
                    {x.name}
                  </p>
                  <p className="text-lg  tracking-widest font-semibold italic  ">
                    {x.category}
                  </p>
                  <p className="text-lg  tracking-widest font-semibold italic  ">
                    {x.brand}
                  </p>
                </div>
                <div className="col-span-2  flex justify-center items-center">
                  <p className="text-xl font-gotham tracking-widest ">
                    ${(x.price * x.qty).toFixed(2)}
                  </p>
                </div>
                <div className="col-span-3  flex justify-center items-center">
                  <select
                    value={x.qty}
                    className="w-full rounded-lg py-1 px-4 text-gray-600 font-semibold outline-none"
                    onChange={(e) => dispatch(addToCart(x, e.target.value))}>
                    {[...Array(x.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex justify-center items-center col-span-2">
                  <button
                    onClick={() => dispatch(removeItem(x.product))}
                    className="text-2xl hover:scale-125 transition duration-300">
                    <MdDelete />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        {cart.length === 0 && (
          <div className="col-span-9 flex items-center justify-center">
            <p className="text-2xl text-gray-200 italic font-semibold tracking-wide">
              Your cart is empty . Try adding some products first{" "}
            </p>
          </div>
        )}

        {/* ================Checkout button and total price and total items to be displayed here ============= */}
        <div className="col-span-3    ">
          <div className=" flex flex-col mt-8 text-gray-200 rounded-b-lg text-xl pt-4  shadow-xl shadow-black italic">
            <div className="px-4 ">
              <p className="text-center  mb-4 mt-2 border-b-2 pb-4 tracking-wider ">
                SubTotal{" "}
                <span className="font-gotham tracking-widest">
                  {cart.reduce((acc, item) => acc + item.qty, 0)}
                </span>{" "}
                items for Checkout
              </p>
            </div>
            <p className="text-center mb-8 tracking-wider">
              Total ${" "}
              <span className="font-gotham tracking-widest">
                {cart
                  .reduce((acc, item) => acc + item.price * item.qty, 0)
                  .toFixed(2)}
              </span>{" "}
              to be paid
            </p>
            <button
              type="button"
              onClick={shippingHandler}
              className="bg-pink-600 py-3 text-pink-200 hover:bg-pink-200 hover:text-pink-600 transition duration-500 font-semibold tracking-wider rounded-b-lg ">
              Proceed To Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
