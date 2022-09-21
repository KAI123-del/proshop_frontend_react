import React, { useState, useEffect } from "react";
import Rating from "@mui/material/Rating";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/ProductListActions";
import Paginate from "../components/Paginate";
import TopProductsCarousel from "../components/TopProductsCarousel";
import Loader from "../components/Loader";

const Products = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const { keyword } = useParams();

  const productList = useSelector((state) => state.productList);

  const { loading, error, products, page, pages } = productList;

  const productAvailable = products?.filter((x) => x.name !== "sample name");

  useEffect(() => {
    dispatch(listProducts(keyword));
  }, [dispatch, keyword]);

  const productPageHandler = (data) => {
    navigate(`/products/${data._id}`);
  };

  if(loading){
    return <Loader/>
  }

  return (
    <div style={{ minHeight: "100vh" }} className="px-20">
      {error ? (
        <div className="flex justify-center mt-32">
          <p className=" text-white font-nezto tracking-wider  text-2xl">
            Ooops!!! No product found with the keyword '{keyword}'
          </p>
        </div>
      ) : (
        <>
          <p className="mt-6 text-3xl text-zinc-400 font-gotham tracking-wider pb-2 border-b border-zinc-500">
            Top Products{" "}
          </p>
          <TopProductsCarousel />
          <div className="mt-12 pb-3 border-b border-gray-500  text-3xl font-gotham tracking-widest text-slate-200 opacity-70 ">
            Latest Arrival's
          </div>
          <div className="grid grid-cols-12 mt-6   gap-x-4 gap-y-8 pb-12 ">
           {
             (
              !error &&
              productAvailable.map((item) => (
                <div className="col-span-3  shadow-lg shadow-black hover:scale-105 transition duration-500   rounded-lg flex flex-col items-star ">
                  <div className="rounded-lg  shadow-lg shadow-black">
                    <img
                      src={item?.image}
                      style={{
                        borderTopRightRadius: "7px",
                        borderTopLeftRadius: "7px",
                        height: "300px",
                        width: "100%",
                      }}
                    />
                  </div>
                  <div>
                    <p className=" text-xl text-slate-300 opacity-70 font-gotham mt-4  px-4 tracking-wider">
                      {item.name}
                    </p>
                    <p className="text-base text-slate-300 opacity-70 font-gotham mt-1    px-4 tracking-widest">
                      {item.category}
                    </p>

                    <div className="flex justify-between pr-4  items-center">
                      <p className="text-xl  mt-2  text-slate-300 opacity-75  font-gotham  mb-6 px-4  tracking-widest">
                        $ {item.price}
                      </p>
                      <button
                        onClick={() => productPageHandler(item)}
                        className="px-6 rounded-full mb-6 bg-pink-700 py-2  text-pink-300 font-gotham tracking-wider shadow-lg shadow-black hover:text-pink-700 hover:bg-white transition duration-300">
                        Product Info
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )
           }
          </div>
          <Paginate page={page} pages={pages} />
        </>
      )}
    </div>
  );
};

export default Products;
