import React from "react";
import { MdShoppingCart } from "react-icons/md";
import { BsPersonFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import UserProfileDropDown from "./UserProfileDropDown";
import AdminDropDown from "./AdminDropDown";
import SearchBox from "./SearchBox";
import {clsx} from 'clsx'

function Header() {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.userLogin.userInfo);

  const cart = useSelector((state) => state.cart.cartItems);
  let navigate = useNavigate();
  const homePageHandler = () => {
    navigate("/");
  };

  const cartPageHandler = () => {
    navigate("/cart");
  };

  const userLoginHandler = () => {
    navigate("/login");
  };
  // <div style={{ backgroundColor: " #333", height: "100vh" }}>

  return (
    <div
      className={clsx("pl-8 py-8   shadow-2xl shadow-black ",{
        "pr-12":userInfo?.isAdmin===true
      })}
      style={{ backgroundColor: " #333" }}>
      <div className="flex justify-between  items-center">
        <div className="flex w-3/4 space-x-10">
        <div
          onClick={homePageHandler}
          className="font-gotham group  text-3xl tracking-wider  text-white ">
          <span className=" transition duration-500 group-hover:text-pink-600 ">
            Jobless
          </span>{" "}
          <span className="text-pink-600 transition duration-500 group-hover:text-white ">
            Nerd
          </span>
        </div>
        <SearchBox />
        </div>
        <div className="flex  justify-center items-center space-x-16 text-lg tracking-wider">
          <div className="text-white group   flex items-center space-x-2">
            <p className="text-xl transition duration-500 group-hover:text-pink-600 focus:scale-105">
              <MdShoppingCart />
            </p>
            <div className="font-gotham text-pink-600 group-hover:text-white transition duration-500 flex space-x-2">
              <p onClick={cartPageHandler}>CART</p>
              <span>{cart.length}</span>
            </div>
          </div>
          <div className="flex space-x-10  items-center ">
            <div>
              {userInfo ? (
                <UserProfileDropDown user={userInfo.name} />
              ) : (
                <div className="flex items-center font-gotham  space-x-2 text-white group ">
                  <p className="text-xl transition duration-500 group-hover:text-pink-600 ">
                    <BsPersonFill />
                  </p>
                  <p
                    onClick={userLoginHandler}
                    className="transition duration-500 text-pink-600 group-hover:text-white ">
                    SIGN IN
                  </p>
                </div>
              )}
            </div>
            <div className="">{userInfo?.isAdmin && <AdminDropDown />}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
