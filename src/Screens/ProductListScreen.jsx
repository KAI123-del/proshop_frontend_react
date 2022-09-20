import React, { useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { clsx } from "clsx";
import { IoIosAlert } from "react-icons/io";
import { animate, spring } from "motion";
import { Modal } from "@mui/material";
import { productCreate } from "../actions/ProductListActions";
import { useNavigate } from "react-router-dom";
import { listProducts, productDelete } from "../actions/ProductListActions";
import { PRODUCT_CREATE_RESET } from "../constants/ProductConstants";
import Paginate from "../components/Paginate";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  boxShadow: 24,
  backgroundColor: "#333",
  p: 4,
};

function ProductListScreen() {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const product = useSelector((state) => state.productList);
  const { loading, products, error, pages, page } = product;
  const userInfo = useSelector((state) => state.userLogin.userInfo);
  const createProduct = useSelector((state) => state.createProduct);
  const { createProductData, error: productCreateError } = createProduct;
  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState(null);

  const handleClose = () => {
    setOpen(!open);
  };

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET });

    dispatch(listProducts());

    if (!createProduct.length) {
      dispatch(productCreate());
    }
  }, []);

  useEffect(() => {
    animate(
      ".successAnimate",
      { translateY: [-200, -200] },
      { easing: spring() }
    );
  }, []);

  const deleteUserHandler = () => {
    dispatch(productDelete(userId));
    setOpen(!open);
  };

  const openDelModal = (user_id) => {
    setUserId(user_id);
    setOpen(true);
  };

  const createProductHandler = () => {
    if (!productCreateError) {
      navigate(`/editProduct/${createProductData?._id}`);
    } else {
      alert("product id exists !!! please delete sample product on the last page");
    }
  };

  const editProductHandler = (userId) => {
    navigate(`/editProduct/${userId}`);
  };

  return (
    <div style={{ height: "100%", minHeight: "100vh" }} className="relative">
      <div className="flex items-center justify-between mt-24 mb-6 px-32">
        <p className="text-white font-gotham text-3xl tracking-wider    border-b border-zinc-500 w-36">
          Products
        </p>
        <button
          onClick={createProductHandler}
          className="hover:text-white hover:border-white transition duration-300 text-xl font-nezto tracking-wider px-6 p-2 border rounded-lg border-pink-600 text-pink-600">
          Create a Product
        </button>
      </div>
      {userInfo.isAdmin ? (
        <div className="px-32">
          <div className="shadow-xl shadow-black rounded-lg text-center mx-auto ">
            <table className={"table-fixed text-white w-full "}>
              <thead>
                <tr className=" font-nezto  tracking-wider text-xl">
                  <th
                    style={{ width: "350px" }}
                    className="border-r border-zinc-600 border-b p-4 ">
                    ID
                  </th>
                  <th
                    style={{ width: "250px" }}
                    className="border-r border-b border-zinc-600">
                    Name
                  </th>
                  <th
                    style={{ width: "350px" }}
                    className="border-r border-b border-zinc-600">
                    Category/Brand
                  </th>
                  <th className="border-r border-b border-zinc-600">Price</th>
                  <th className="border-b border-zinc-600">Action</th>
                </tr>
              </thead>
              <tbody>
                {!loading &&
                  products?.map((item, index) => (
                    <tr className=" text-lg font-nezto tracking-wider space-x-10">
                      <td
                        className={clsx("border-r p-3 border-zinc-600", {
                          "  border-b": products?.length - 1 !== index,
                          "bg-zinc-800": index % 2 === 0,
                        })}>
                        {item._id}
                      </td>
                      <td
                        className={clsx("border-r border-zinc-600", {
                          "  border-b": products?.length - 1 !== index,
                          "bg-zinc-800": index % 2 === 0,
                        })}>
                        {item.name}
                      </td>
                      <td
                        className={clsx("border-r border-zinc-600 ", {
                          "  border-b": products?.length - 1 !== index,
                          "bg-zinc-800": index % 2 === 0,
                        })}>
                        <a
                          onClick={() => navigate(`/products/${item._id}`)}
                          className="hover:text-sky-600 transition duration-300">
                          {item.category}{" "}
                          <span className="ml-3">({item.brand})</span>
                        </a>
                      </td>
                      <td
                        className={clsx("border-r border-zinc-600", {
                          "  border-b ": products?.length - 1 !== index,
                          "bg-zinc-800": index % 2 === 0,
                        })}>
                        ${item.price}
                      </td>

                      <td
                        className={clsx("", {
                          "  border-b border-zinc-600":
                            products?.length - 1 !== index,
                          "bg-zinc-800": index % 2 === 0,
                        })}>
                        <div className="flex justify-center text-xl space-x-4">
                          <p
                            onClick={() => editProductHandler(item._id)}
                            className="hover:text-green-600  transition duration-300 hover:scale-125">
                            <FiEdit />
                          </p>
                          <p
                            onClick={() => openDelModal(item._id)}
                            className="hover:text-red-500 transition duration-300 hover:scale-125">
                            <MdDelete />
                          </p>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          <div className="mt-8">
          <Paginate page={page} pages={pages} />
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center  mt-48 ">
          <p className="text-2xl text-red-500 border-2 border-red-500 bg-red-200 py-8 px-20 flex items-center rounded-lg font-nezto tracking-wider">
            <span className="mr-4 text-3xl ">
              <IoIosAlert />
            </span>
            not authorized as an admin
          </p>
        </div>
      )}

      {open && (
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description">
          <div className="px-4 py-8 rounded-lg" style={style}>
            <p className="text-center text-xl text-white font-nezto tracking-wider">
              Are you sure you want to delete this product?
            </p>
            <div className="flex justify-end items-center space-x-6 mt-8 px-6">
              <button
                onClick={handleClose}
                className="border-2 text-sky-400 hover:text-sky-600 hover:border-sky-600 transition duration-300 font-nezto tracking-wider border-sky-400 px-6 py-2 rounded-lg text-xl ">
                Cancel
              </button>
              <button
                onClick={deleteUserHandler}
                className="border-2 text-red-400 font-nezto tracking-wider hover:text-red-600 hover:border-red-600 transition duration-300 border-red-400 px-6 py-2 rounded-lg text-xl ">
                Delete
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default ProductListScreen;
