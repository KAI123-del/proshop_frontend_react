import React, { useState, useEffect } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../actions/userActions";
import { ToastContainer, Flip, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const location = useLocation();

  const redirect = location.search ? location.search.split("=")[1] : "/";
  console.log("redirect", redirect);

  const submitHandler = (event) => {
    event.preventDefault();
    if (password === confirmPassword) {
      dispatch(register(name, email, password));
    } else {
      toast.error("Password's do not match", {
        position: "top-right",
        autoClose: 2000,
        theme: "dark",
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        className: "text-center",
      });
    }
  };

  const { loading, error, userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
      toast.success(`Welcome Back ! ${userInfo.name}`, {
        position: "top-right",
        autoClose: 3000,
        theme: "dark",
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        className: "text-center",
      });
    }
  }, [userInfo, redirect]);

  return (
    <div
      style={{ height: "100%", minHeight: "100vh" }}
      className="flex relative justify-center ">
      <p className="absolute top-8 pb-4 border-b border-zinc-600   text-slate-300 text-2xl font-gotham tracking-widest ">
        Create a New Account
      </p>
      <div className="w-full flex justify-center items-start ">
        <div className="w-2/5 mt-24 shadow-xl shadow-black rounded-lg  pb-6 items-center flex flex-col">
          <div className="text-xl flex pt-2 items-center space-x-2 tracking-wide font-gotham">
            <p className="text-white">Welcome To</p>{" "}
            <p className="text-5xl  tracking-widest font-gotham">
              <span className="text-pink-600">Jobless</span>
              <span className="text-white">Nerd</span>
            </p>
          </div>
          <div className=" w-5/6 mt-5">
            <div className="mb-3">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                className="rounded-md w-full py-2 px-3 outline-none placeholder:tracking-wider text-gray-500"
                placeholder="i.e John wick"
              />
            </div>
            <div className="mb-3">
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                className="rounded-md w-full py-2 px-3 outline-none placeholder:tracking-wider text-gray-500"
                placeholder="john1234@gmail.com"
              />
            </div>
            <div className="mb-3">
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                className="rounded-md w-full py-2 px-3 outline-none placeholder:tracking-wider text-gray-500"
                placeholder="password"
              />
            </div>
            <div>
              <input
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                type="password"
                className="rounded-md w-full py-2 px-3 outline-none placeholder:tracking-wider text-gray-500"
                placeholder="Confirm Password"
              />
            </div>
            <div className="w-full mt-6">
              <button
                onClick={submitHandler}
                className="w-full py-3 rounded-lg text-xl font-gotham tracking-widest text-pink-200 bg-pink-600 hover:shadow-xl hover:shadow-black shadow-xl hover:bg-pink-200 hover:text-pink-600 transition duration-300 ">
                Sign Up
              </button>
            </div>
            <div class="relative flex py-2 items-center">
              <div class="flex-grow border-t border-gray-600"></div>
              <span class="flex-shrink mx-4 text-lg tracking-wider text-gray-400">
                or
              </span>
              <div class="flex-grow border-t border-gray-600"></div>
            </div>
            <div className="flex space-x-4 items-center ">
              <p className="text-xl text-white italic tracking-wider">
                Already have an Account ?
              </p>
              <button className="flex-grow  py-2 rounded-lg bg-sky-400 text-sky-100 hover:text-sky-500 hover:bg-sky-200 transition duration-300 hover:shadow-xl hover:shadow-black text-xl font-gotham tracking-widest">
                <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
                  Log In
                </Link>
              </button>
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
