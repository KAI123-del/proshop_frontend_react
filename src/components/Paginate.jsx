import React from "react";
import { clsx } from "clsx";
import { listProducts } from "../actions/ProductListActions";
import { useDispatch } from "react-redux";
import { getAllOrders } from "../actions/orderActions";
import { getUserList } from "../actions/userActions";

function Paginate({ page, pages }) {
  const dispatch = useDispatch();
  let keyword = " ";

  const paginateProductHandler = (currentPage) => {
    if (
      document.location.pathname === "/" ||
      document.location.pathname === "/productList"
    ) {
      dispatch(listProducts(keyword, currentPage));
    }

    if (document.location.pathname === "/ListAllOrders") {
      dispatch(getAllOrders(currentPage));
    }

    if (document.location.pathname === "/userList") {
      dispatch(getUserList(currentPage));
    }
  };
  return (
    pages > 1 && (
      <div>
        <div className="flex justify-center items-center">
          <div className="flex justify-center space-x-2 text-white     items-center ">
            {[...Array(pages).keys()].map((x, index) => (
              <p
                onClick={() => paginateProductHandler(x + 1)}
                className={clsx(
                  "rounded w-10 h-10 flex items-center justify-center shadow-md shadow-black",
                  {
                    "bg-green-500": x === page - 1,
                    "hover:bg-pink-600 transition duration-300": x !== page - 1,
                  }
                )}>
                <span>{index}</span>
              </p>
            ))}
          </div>
        </div>
      </div>
    )
  );
}

export default Paginate;
