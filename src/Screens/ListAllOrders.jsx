import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clsx } from "clsx";
import { IoIosAlert } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { getAllOrders } from "../actions/orderActions";
import { ImCross } from "react-icons/im";
import { MdOutlineDone } from "react-icons/md";
import Paginate from "../components/Paginate";
import Loader from "../components/Loader";

function ListAllOrders() {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const { allOrders, error, loading, pages, page } = useSelector(
    (state) => state.orderList
  );
  const userInfo = useSelector((state) => state.userLogin.userInfo);

  useEffect(() => {
    if (!allOrders) {
      dispatch(getAllOrders());
    }
  }, []);

  const orderDetailPageHandler = (userId) => {
    navigate(`/orders/${userId}`);
  };

  if(loading){
    return <Loader/>
  }

  return (
    <div style={{ height: "100%", minHeight: "100vh" }} className="relative">
      <div className="flex items-center justify-between mt-24 mb-6 px-28">
        <p className="text-white font-gotham text-3xl tracking-wider    border-b border-zinc-500 w-36">
          Orders
        </p>
      </div>
      {userInfo.isAdmin ? (
        <div className="px-32">
          <div className="shadow-xl shadow-black rounded-lg text-center mx-auto ">
            <table className={" text-white w-full "}>
              <thead>
                <tr className=" font-nezto  tracking-wider text-xl">
                  <th
                    style={{ width: "350px" }}
                    className="border-r border-zinc-600 border-b p-4 ">
                    ID
                  </th>
                  <th
                    style={{ width: "200px" }}
                    className="border-r border-b border-zinc-600">
                    User
                  </th>
                  <th
                    style={{ width: "200px" }}
                    className="border-r border-b border-zinc-600">
                    Date
                  </th>
                  <th
                    style={{ width: "150px" }}
                    className="border-r border-b border-zinc-600">
                    Total Price
                  </th>
                  <th
                    style={{ width: "150px" }}
                    className="border-b border-zinc-600 border-r">
                    Paid
                  </th>
                  <th
                    style={{ width: "150px" }}
                    className="border-b border-zinc-600 border-r">
                    Delivered
                  </th>
                  <th
                    style={{ width: "150px" }}
                    className="border-b border-zinc-600"></th>
                </tr>
              </thead>
              <tbody>
                {!loading &&
                  allOrders?.map((item, index) => (
                    <tr className=" text-lg font-nezto tracking-wider ">
                      <td
                        className={clsx("border-r p-3 border-zinc-600", {
                          "  border-b": allOrders?.length - 1 !== index,
                          "bg-zinc-800": index % 2 === 0,
                        })}>
                        {item?._id}
                      </td>
                      <td
                        className={clsx("border-r border-zinc-600", {
                          "  border-b": allOrders?.length - 1 !== index,
                          "bg-zinc-800": index % 2 === 0,
                        })}>
                        {item?.user?.name}
                      </td>
                      <td
                        className={clsx("border-r border-zinc-600 ", {
                          "  border-b": allOrders?.length - 1 !== index,
                          "bg-zinc-800": index % 2 === 0,
                        })}>
                        <p>{item?.createdAt.substring(0, 10)}</p>
                      </td>
                      <td
                        className={clsx("border-r border-zinc-600", {
                          "  border-b ": allOrders?.length - 1 !== index,
                          "bg-zinc-800": index % 2 === 0,
                        })}>
                        $ {item?.totalPrice}
                      </td>

                      <td
                        className={clsx("border-r border-zinc-600", {
                          "  border-b ": allOrders?.length - 1 !== index,
                          "bg-zinc-800": index % 2 === 0,
                        })}>
                        <p className="flex items-start justify-center">
                          {item?.isPaid ? (
                            <p className="text-3xl text-green-600  ">
                              <MdOutlineDone />
                            </p>
                          ) : (
                            <p className=" text-red-600 text-xl ml-3 ">
                              <ImCross />
                            </p>
                          )}
                        </p>
                      </td>

                      <td
                        className={clsx(" border-r border-zinc-600  ", {
                          "  border-b ": allOrders?.length - 1 !== index,
                          "bg-zinc-800": index % 2 === 0,
                        })}>
                        <p className="flex items-center justify-center">
                          {item?.isDelivered ? (
                            <p className="text-3xl text-green-600 flex  ">
                              <MdOutlineDone />
                            </p>
                          ) : (
                            <p className=" text-red-600 text-xl ml-3 ">
                              <ImCross />
                            </p>
                          )}
                        </p>
                      </td>

                      <td
                        className={clsx(" ", {
                          "  border-b border-zinc-600":
                            allOrders?.length - 1 !== index,
                          "bg-zinc-800": index % 2 === 0,
                        })}>
                        <button
                          onClick={() => orderDetailPageHandler(item?._id)}
                          className="px-2 rounded-lg border-pink-600 text-pink-600 hover:text-white hover:border-white transition duration-300 border">
                          Details
                        </button>
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
    </div>
  );
}

export default ListAllOrders;
