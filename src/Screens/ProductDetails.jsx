import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Rating from "@mui/material/Rating";
import { productSummary, createReview } from "../actions/ProductListActions";
import { addToCart } from "../actions/cartActions";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer, Flip } from "react-toastify";
import { Avatar } from "@mui/material";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [rateStar, setRateStar] = useState(2.5);
  const [comment, setComment] = useState("");
  const [qty, setQty] = useState(1);
  const productDetail = useSelector((state) => state.productDetail);
  const dispatch = useDispatch();

  const {
    loading: reviewLoading,
    error: reviewError,
    reviewMessage,
  } = useSelector((state) => state.reviews);

  useEffect(() => {
    dispatch(productSummary(id));
  }, [dispatch, id]);

  const quantityHandler = (e) => {
    setQty(e.target.value);
  };

  const addToCartHandler = (data, qty) => {
    dispatch(addToCart(data, qty));
    navigate(`/cart/${id}`);
  };

  const { loading, error, product } = productDetail;

  if (loading) {
    return <p>Loading...</p>;
  }

  console.log("review", reviewMessage);

  if (reviewMessage) {
    toast.success(reviewMessage.message, {
      position: "top-right",
      autoClose: 2000,
      theme: "dark",
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      className: "text-center font-nezto",
    });

    setTimeout(() => {
      document.location.reload();
    }, 1500);
  }

  const reviewHandler = (e) => {
    e.preventDefault();
    if (comment.length) {
      dispatch(createReview({ rating: rateStar, comment: comment }, id));
    } else {
      toast.error("Oppps !!! comments can't be empty", {
        position: "top-right",
        autoClose: 2000,
        theme: "dark",
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        className: "text-center font-nezto",
      });
    }
  };

  return (
    <div
      className=" px-40 pt-12 pb-24"
      style={{ height: "100%", minHeight: "100vh" }}>
      <h1 className="text-2xl font-gotham text-slate-300 tracking-widest border-b border-zinc-600 pb-2">
        Product Details
      </h1>
      <div className="grid grid-cols-12 mt-8 gap-4">
        <div className="col-span-4 flex items-center">
          <img
            src={product?.image}
            style={{ borderRadius: "7px", height: "300px", width: "450px" }}
            className="shadow-xl shadow-black"
          />
        </div>
        <div className=" col-span-4 shadow-xl  bg-white shadow-black rounded-lg px-8 py-4">
          <div className="border-b border-gray-500 pb-3 ">
            <p className="font-gotham tracking-widest text-2xl text-gray-700">
              {product?.name}
            </p>
            <p className="tracking-widest font-semibold text-gray-700 mt-1">
              {product?.brand}
            </p>
            <p className="tracking-widest font-semibold text-gray-700 mt-1">
              {product?.category}
            </p>
          </div>
          <div className="border-b tracking-widest font-semibold text-gray-700 border-gray-500 mb-2">
            <p className=" flex space-x-4 mb-2 items-center mt-4  ">
              <span className="">
                <Rating name="read-only" value={product?.rating} readOnly />
              </span>
              <span className=" text-base tracking-wide  ">{`${product?.rating} star's ${product?.numReviews} reviews`}</span>
            </p>
          </div>
          <p className="border-b border-gray-500 pb-3 text-xl text-gray-700 font-gotham tracking-widest">
            {" "}
            Price : $ {product?.price}{" "}
          </p>
          <p className="mt-1 tracking-wide font-semibold text-gray-700">
            {product?.description}
          </p>
        </div>
        <div className=" col-span-4 flex items-center text-center ">
          <div className="bg-white w-full pb-4 rounded-lg shadow-xl px-4 shadow-black">
            <div className=" flex item-center border-b border-gray-400 py-3 space-x-2 justify-center  tracking-wider font-semibold text-xl text-gray-700 ">
              <p>Price : </p>
              <p className="font-bold">$ {product?.price}</p>
            </div>
            <div className=" flex item-center justify-center space-x-2 mt-2 border-b border-gray-400 pb-2 tracking-wide font-semibold text-lg text-gray-700 ">
              <p>Status : </p>
              <p>
                {product?.countInStock > 0
                  ? ` ${product?.countInStock} items left`
                  : `Out of Stock`}
              </p>
            </div>
            {product?.countInStock > 0 && (
              <div className="flex justify-center items-center space-x-4 tracking-wide font-semibold text-lg text-gray-700">
                <p className="">Qty</p>
                <select
                  className="outline-none border-gray-400 border rounded-lg w-1/4 px-2 mt-2 py-1"
                  value={qty}
                  onChange={quantityHandler}>
                  {[...Array(product.countInStock).keys()].map((x) => (
                    <option value={x + 1} key={x + 1}>
                      {x + 1}
                    </option>
                  ))}
                </select>
              </div>
            )}
            <button
              onClick={() => addToCartHandler(product, qty)}
              className="mt-6 w-full border py-2 rounded-full bg-pink-700 text-pink-200 font-gotham tracking-wider ">
              Add To Cart
            </button>
          </div>
        </div>
      </div>

      {/* ==========Product reviews ============ */}
      <p className="text-white font-gotham text-2xl tracking-widest mt-8 border-b pb-1 border-zinc-500 ">
        Product Reviews
      </p>
      <div className="mt-6 px-16">
        {/* ================previous reviews================= */}
        {product.reviews.length === 0 ? (
          <p className="text-white font-nezto text-lg tracking-widest">
            {" "}
            This Product is not reviewed yet, Be the first person to review it.
          </p>
        ) : (
          product.reviews.map((item) => (
            <>
              <div className="flex justify-between items-center">
                <div>
                  <Rating
                    defaultValue={item.rating}
                    name="half-rating-read"
                    readOnly
                  />
                </div>
                <div className="flex text-white items-center space-x-4 font-nezto text-lg tracking-wider ">
                  <Avatar src="https://images.unsplash.com/photo-1500305614571-ae5b6592e65d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1176&q=80"/>
                  <p>{item.name}</p>
                  <p>{item.createdAt.substring(0, 10)}</p>
                </div>
              </div>
              <div className="mt-2 border-b pb-4 border-zinc-500">
                <p className="text-white font-nezto tracking-wide">
                  {item.comment}
                </p>
              </div>
            </>
          ))
        )}

        {/* =======================Write a review=========== */}
        <p className="text-white mt-8 font-gotham text-xl tracking-widest">
          Drop A Review For The Product
        </p>
        <div>
          <p className="mt-4">
            <Rating
              defaultValue={rateStar}
              name="simple-controlled"
              precision={0.5}
              onChange={(event, newValue) => {
                setRateStar(newValue);
              }}
            />
          </p>
          <textarea
            onChange={(e) => setComment(e.target.value)}
            placeholder="Comment goes here..."
            className="mt-3 w-full rounded bg-transparent border-zinc-500 border text-white font-nezto placeholder:text-gray-400 placeholder:font-nezto placeholder:tracking-wider px-2 py-1"
          />
          <div className="flex justify-end mt-4">
            <button
              onClick={reviewHandler}
              className="hover:scale-110 transition duration-300 hover:text-sky-500 hover:border-sky-500 tracking-wider font-nezto text-xl px-6 py-2 border rounded border-pink-600 text-pink-600">
              Submit
            </button>
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        transition={Flip}
      />
      <ToastContainer />
    </div>
  );
}

export default ProductDetails;
