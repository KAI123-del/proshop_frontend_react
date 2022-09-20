import React, { useState, useEffect } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../actions/userActions";
import { ToastContainer, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const location = useLocation();

  const redirect = location.search ? location.search.split("=")[1] : "/";

  const submitHandler = (event) => {
    event.preventDefault();
    dispatch(login(email, password));
  };

  const { loading, error, userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo]);

  return (
    <div
      style={{ height: "100%", minHeight: "100vh" }}
      className="flex relative justify-center ">
      <p className="absolute top-8 pb-4 border-b border-zinc-600   text-slate-300 text-2xl font-gotham tracking-widest ">
        Sign In To Your Account
      </p>
      <div className="w-2/5 mt-24 shadow-xl shadow-black rounded-lg h-1/2 pb-12 items-center flex flex-col">
        <div className="text-xl flex pt-4 items-center space-x-2 tracking-wide font-gotham">
          <p className="text-white">Welcome To</p>{" "}
          <p className="text-5xl  tracking-widest font-gotham">
            <span className="text-pink-600">Jobless</span>
            <span className="text-white">Nerd</span>
          </p>
        </div>
        <div className=" w-5/6 mt-8">
          <div className="mb-6">
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="rounded-md w-full p-3 outline-none placeholder:tracking-wider text-gray-500"
              placeholder="john1234@gmail.com"
            />
          </div>
          <div>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="rounded-md w-full p-3 outline-none placeholder:tracking-wider text-gray-500"
              placeholder="password"
            />
          </div>
          <div className="w-full mt-8">
            <button
              onClick={submitHandler}
              className="w-full py-3 rounded-lg text-xl font-gotham tracking-widest text-pink-200 bg-pink-600 hover:shadow-xl hover:shadow-black shadow-xl hover:bg-pink-200 hover:text-pink-600 transition duration-300 ">
              Sign In
            </button>
          </div>
          <div class="relative flex py-5 items-center">
            <div class="flex-grow border-t border-gray-600"></div>
            <span class="flex-shrink mx-4 text-lg tracking-wider text-gray-400">
              or
            </span>
            <div class="flex-grow border-t border-gray-600"></div>
          </div>
          <div className="flex space-x-4 items-center">
            <p className="text-xl text-white italic tracking-wider">
              Don't have an Account ?
            </p>
            <button className="flex-grow  py-2 rounded-lg bg-sky-400 text-sky-100 hover:text-sky-500 hover:bg-sky-200 transition duration-300 hover:shadow-xl hover:shadow-black text-xl font-gotham tracking-widest">
              <Link
                to={redirect ? `/register?redirect=${redirect}` : "/register"}>
                Register
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
  );
}

export default Login;
