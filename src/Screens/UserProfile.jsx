import React, { useState, useEffect } from "react";
import { Avatar, Modal } from "@mui/material";
import { getUserDetails, updateProfile } from "../actions/userActions";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer, Flip, toast } from "react-toastify";
import { USER_PROFILE_RESET } from "../constants/userConstants";
import { getMyOrders } from "../actions/orderActions";
import { ImCross } from "react-icons/im";
import { MdOutlineDone } from "react-icons/md";

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

function UserProfile() {
  // states to be used
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userDetail = useSelector((state) => state.userDetail);
  const userInfo = useSelector((state) => state.userLogin.userInfo);
  const myOrders = useSelector((state) => state.myOrders.myOrders);
  const userProfileUpdate = useSelector((state) => state.userProfileUpdate);
  const shippingAddress = useSelector((state) => state.cart.shippingAddress);
  console.log("shipping", shippingAddress);
  const { success } = userProfileUpdate;

  const { loading, error, user } = userDetail;

  const handleClose = () => {
    setOpen(false);
  };
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else {
      if (!user || !user.name || success) {
        dispatch({ type: USER_PROFILE_RESET });
        dispatch(getUserDetails("profile"));
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [dispatch, navigate, userInfo, user]);

  useEffect(() => {
    dispatch(getMyOrders());
  }, []);

  const editProfileHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("password and confirm password should be same", {
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
    } else if (password.length > 0) {
      dispatch(updateProfile({ _id: user._id, name, email, password }));
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setOpen(false);
    } else {
      dispatch(updateProfile({ _id: user._id, name, email }));
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setOpen(false);
    }
  };

  console.log("orders", myOrders);

  if (loading) {
    return <p>...Loading</p>;
  }

  return (
    <div style={{ height: "100%" }} className="pt-20 px-32 pb-32">
      {/* ==================edit modal===================== */}
      {open && (
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description">
          <div className="px-4 py-8 rounded-lg" style={style}>
            <div className="mb-6">
              <input
                value={name}
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
                type="text"
                className="rounded-md w-full py-4 px-3 outline-none placeholder:tracking-wider text-gray-500"
              />
            </div>
            <div className="mb-6">
              <input
                value={email}
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                className="rounded-md w-full py-4 px-3 outline-none placeholder:tracking-wider text-gray-500"
              />
            </div>
            <div className="mb-8">
              <input
                value={password}
                placeholder="change password"
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                className="rounded-md w-full py-4 px-3 outline-none placeholder:tracking-wider text-gray-500"
              />
            </div>
            <div className="mb-8">
              <input
                value={confirmPassword}
                placeholder="Confirm Password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                type="password"
                className="rounded-md w-full py-4 px-3 outline-none placeholder:tracking-wider text-gray-500"
              />
            </div>
            <button
              onClick={editProfileHandler}
              className="border-2 w-full py-4 rounded-lg text-pink-600 border-pink-600 hover:text-white hover:border-white transition duration-500 text-xl font-gotham tracking-widest">
              Save Changes
            </button>
          </div>
        </Modal>
      )}
      {/* ====================main parent ================ */}
      <div className=" shadow-xl shadow-black rounded-lg p-4">
        {/* =============================profile details and edit profile============ */}
        <p className="text-2xl font-gotham tracking-widest text-zinc-300 pb-1 border-b w-44 mb-6 border-zinc-600">
          User Details
        </p>
        <div className="flex justify-between  items-center px-24 pb-6 border-b border-zinc-600 ">
          <div className="">
            <div className="rounded-full  shadow-lg shadow-sky-400">
              <Avatar
                alt="Remy Sharp"
                src="https://images.unsplash.com/photo-1500305614571-ae5b6592e65d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1176&q=80"
                sx={{ height: "200px", width: "200px" }}
              />
            </div>
            <div className="flex items-center justify-center space-x-2 mt-6">
              <button
                onClick={() => setOpen(true)}
                className=" shadow-xl border  px-6 rounded-lg text-lg tracking-widest hover:text-pink-600 hover:border-pink-600 transition duration-500  text-white font-gotham  py-1">
                Edit Profile
              </button>
            </div>
          </div>
          <div className=" space-y-3    ">
            <div className="grid grid-cols-4 space-x-32 border-b pb-2 border-zinc-600 text-xl font-gotham tracking-widest text-zinc-300 ">
              <p className=" col-span-1  ">Name </p>
              <p className="col-span-3">{user?.name}</p>
            </div>
            <div className="grid grid-cols-4 space-x-32 border-b pb-2 border-zinc-600 text-xl font-gotham tracking-widest text-zinc-300 ">
              <p className=" col-span-1  ">Email</p>
              <p className="col-span-3">{user?.email}</p>
            </div>
            <div className="grid grid-cols-4 space-x-32 text-xl font-gotham tracking-widest text-zinc-300 ">
              <p className=" col-span-1  t">Premium User</p>
              <p className="col-span-3">
                {user?.isAdmin === true ? "Yes" : "No"}
              </p>
            </div>
          </div>
        </div>

        {/* =============================orders details============================== */}
        <div className="mt-6">
          <p className="text-2xl font-gotham tracking-widest text-zinc-300 pb-1 border-b w-60 mb-6 border-zinc-600">
            Order Summary
          </p>
          <div>
            {/* <div className="flex items-center justify-center  text-white text-xl font-nezto tracking-wider ">
               <p className="px-6 py-2 border">Product image</p>
               <p className="px-6 py-2 border">Product Name</p>
               <p className="px-16 py-2 border">Description</p>
               <p className="px-6 py-2 border">Payment Status</p>
               <p className="px-6 py-2 border">Delivery Status</p>
            </div> */}
            <table className="table-auto w-full  text-white font-nezto tracking-wider ">
              <thead>
                <tr>
                  <th className="text-start text-xl pb-2 border-b">Order Id</th>
                  <th className="text-start text-xl pb-2 border-b">Date</th>
                  <th className="text-start text-xl pb-2 border-b">Total</th>
                  <th className="text-start text-xl pb-2 border-b">Paid</th>
                  <th className="text-start text-xl pb-2 border-b">
                    Delivered
                  </th>
                </tr>
              </thead>
              <tbody>
                {myOrders
                  ? myOrders.map((item) => (
                      <tr>
                        <td className="pt-3">{item._id}</td>
                        <td className="pt-3">
                          {item.createdAt.toString().substring(0, 10)}
                        </td>
                        <td className="pt-3  pl-4">{item.totalPrice}</td>
                        <td className="pt-3">
                          {item.isPaid ? (
                            <p className="text-3xl text-green-600  ">
                              <MdOutlineDone />
                            </p>
                          ) : (
                            <p className=" text-red-600 text-xl ml-3 ">
                              <ImCross />
                            </p>
                          )}
                        </td>
                        <td className="pt-3">
                          {item.isDelivered ? (
                            <p className="text-3xl text-green-600  ">
                              <MdOutlineDone />
                            </p>
                          ) : (
                            <p className=" text-red-600 text-xl ml-8">
                              <ImCross />
                            </p>
                          )}
                        </td>
                        <td>{item.isDelivered}</td>
                      </tr>
                    ))
                  : " "}
              </tbody>
            </table>
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

export default UserProfile;
