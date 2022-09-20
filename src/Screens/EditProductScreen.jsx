import React, { useState, useEffect } from "react";
import { Divider } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { productCreate } from "../actions/ProductListActions";
import axios from "axios";
import { animate, spring } from "motion";
import { productSummary, productUpdate } from "../actions/ProductListActions";
import { BsCheckCircleFill } from "react-icons/bs";

function EditProductScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  // const createProduct = useSelector((state) => state.createProduct);
  // const { createProductData, loading } = createProduct;

  const { product } = useSelector((state) => state.productDetail);
  const { updatedProduct, success } = useSelector(
    (state) => state.updateProduct
  );
  console.log("updatedProduct", updatedProduct);

  const [name, setName] = useState();
  const [description, setDesc] = useState();
  const [brand, setBrand] = useState();
  const [category, setCategory] = useState();
  const [price, setPrice] = useState();
  const [image, setImage] = useState();
  const [countInStock, setCountInStock] = useState();
  const [review, setReview] = useState();
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (product._id !== id) {
      dispatch(productSummary(id));
    } else {
      setName(product.name);
      setBrand(product.brand);
      setDesc(product.description);
      setImage(product.image);
      setPrice(product.price);
      setCategory(product.category);
      setCountInStock(product.countInStock);
      setReview(product.numReviews);
    }
  }, [product]);

  const uploadImageHandler = async (e) => {
    const file = e.target.files[0];
    const formdata = new FormData();
    formdata.append("image", file);
    setUploading(true);
    console.log("formData", formdata);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const { data } = await axios.post(
        "http://localhost:5000/api/upload",
        formdata,
        config
      );
      setImage(data);
      setUploading(false);
    } catch (error) {
      setUploading(false);
      console.log("error from create product", error);
    }
  };

  const updateProductHandler = () => {
    const updateData = {
      _id: id,
      name,
      price,
      description,
      image,
      brand,
      category,
      countInStock,
    };
    dispatch(productUpdate(updateData));
  };

  if (success) {
    setTimeout(() => {
      navigate("/productList");
    }, 1000);
  }

  useEffect(() => {
    animate(
      ".successAnimate",
      { translateY: [-200, 200] },
      { easing: spring() }
    );
  }, [success]);

  return (
    <div
      style={{ height: "100%", minHeight: "100vh" }}
      className="relative px-32 pb-12">
      {success && (
        <p
          style={{ top: "-50px", right: "38%" }}
          className="absolute text-lg successAnimate font-nezto tracking-wider text-green-500 bg-green-200 px-12 py-4 rounded border-2 border-green-500 flex items-center justify-center ">
          <span className="mt-1 mr-5 text-2xl">
            <BsCheckCircleFill />
          </span>
          Product Successfully Updated !!!
        </p>
      )}

      <div className="mt-24 ">
        <p className="text-white font-gotham text-2xl tracking-widest border-b pb-1 border-zinc-500 w-96">
          Create Your Own Product
        </p>
      </div>
      <div className=" mt-6 pt-4 rounded shadow-xl shadow-black ">
        <div className="w-full flex flex-col items-between justify-center pt-4 pb-16 pr-8  ">
          <div className="flex justify-between  items-center">
            <div className="flex items-center w-1/2 ">
              <p className="w-72 text-white text-xl font-nezto text-center">
                Name
              </p>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type={"text"}
                className="rounded w-full py-3 outline-none text-gray-500 font-nezto px-2"
              />
            </div>
            <div className="flex items-center  w-1/2">
              <p className="w-72 text-white text-xl font-nezto text-center">
                Brand
              </p>
              <input
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                type={"text"}
                className="rounded w-full py-3 outline-none text-gray-500 font-nezto px-2"
              />
            </div>
          </div>
          <div className="flex justify-between  items-center mt-6">
            <div className="flex items-center w-1/2">
              <p className="w-72 text-white text-xl font-nezto text-center">
                Category
              </p>
              <input
                onChange={(e) => setCategory(e.target.value)}
                value={category}
                type={"text"}
                className="rounded w-full py-3 outline-none text-gray-500 font-nezto px-2"
              />
            </div>
            <div className="flex items-center w-1/2">
              <p className="w-72 text-white text-xl font-nezto text-center">
                No. of Reviews
              </p>
              <input
                value={review}
                type={"number"}
                className="rounded w-full py-3 outline-none text-gray-500 font-nezto px-2"
              />
            </div>
          </div>
          <div className="flex justify-between  items-center mt-6">
            <div className="flex items-center w-1/2 ">
              <p className="w-72 text-white text-xl font-nezto text-center">
                Price
              </p>
              <input
                onChange={(e) => setPrice(e.target.value)}
                value={price}
                type={"number"}
                className="rounded w-full py-3 outline-none text-gray-500 font-nezto px-2"
              />
            </div>
            <div className="flex items-center w-1/2 ">
              <p className="w-72 text-white text-xl font-nezto text-center">
                Count In Stock
              </p>
              <input
                onChange={(e) => setCountInStock(e.target.value)}
                value={countInStock}
                type={"number"}
                className="rounded w-full py-3 outline-none text-gray-500 font-nezto px-2"
              />
            </div>
          </div>
          <div className="flex mt-6 items-center">
            <p className="w-52 mr-5  text-white text-xl font-nezto text-center">
              description
            </p>
            <textarea
              onChange={(e) => setDesc(e.target.value)}
              value={description}
              type={"text"}
              className="rounded w-full py-3 outline-none text-gray-500 font-nezto px-2"
            />
          </div>
          <div className="flex mt-6 items-start">
            <p className="w-56 mr-2 text-white text-xl font-nezto text-center">
              Image
            </p>
            <div className="w-full">
              <input
                onChange={(e) => setImage(e.target.value)}
                value={image}
                type="text"
                className="rounded w-full py-3 outline-none text-gray-500 font-nezto px-2"
              />
              <div className="flex items-center justify-start mt-3 mb-6 w-full">
                <p className="border-b border-gray-500 w-1/2"></p>
                <p className="text-white font-nezto text-xl mx-3 tracking-wider">
                  or
                </p>
                <p className="border-b border-gray-500 w-1/2 "></p>
              </div>

              <label
                htmlFor="file"
                style={{ paddingRight: "440px", paddingLeft: "450px" }}
                className=" text-xl hover:text-white flex justify-center hover:border-white transition duration-300  text-pink-600 border py-1 border-pink-600 rounded font-nezto tracking-wider  ">
                {uploading ? (
                  <div className="relative">
                    <p className="w-10 h-10  rounded-full border-2  border-pink-600"></p>
                    <p
                      style={{ top: "1px", borderColor: "#333" }}
                      className="w-10 h-10 absolute  animate-spin  rounded-full border-y-4 border-green-500"></p>{" "}
                  </div>
                ) : (
                  <p className="py-1">Choose a file</p>
                )}
              </label>

              <input
                id="file"
                type="file"
                onChange={uploadImageHandler}
                className="rounded w-full  py-1 text-xl mt-1 border hidden outline-none  text-gray-500 font-nezto px-2"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-end px-8 pb-8">
          <button
            onClick={updateProductHandler}
            className=" px-6 rounded text-sky-600 border border-sky-600 hover:text-green-600 hover:border-green-600 transition duration-300 py-3">
            <p className=" text-xl  font-nezto tracking-wider ">
              update Product
            </p>
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditProductScreen;
