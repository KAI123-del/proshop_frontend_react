import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserById } from "../actions/userActions";
import { useNavigate, useParams } from "react-router-dom";
import { adminUserUpdate } from "../actions/userActions";
import { animate, spring } from "motion";
import { BsCheckCircleFill } from "react-icons/bs";
import Loader from "../components/Loader";

function EditUserScreen() {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const { loading: userLoading, allUsers } = useSelector(
    (state) => state.userById
  );

  const { loading, updatedUser, success } = useSelector(
    (state) => state.updateUserAdmin
  );

  const backButtonHandler = () => {
    navigate("/userList");
  };

  useEffect(() => {
    if (!allUsers) {
      dispatch(getUserById(id));
    } else {
      setName(allUsers.name);
      setEmail(allUsers.email);
      setAdmin(allUsers.isAdmin);
    }
  }, [allUsers]);

  useEffect(() => {
    animate(
      ".successAnimate",
      { translateY: [-300, 200] },
      { easing: spring() }
    );
  }, [loading]);

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [admin, setAdmin] = useState();

  const editUserHandler = () => {
    dispatch(adminUserUpdate({ name: name, email: email, isAdmin: admin }, id));
    setName(updatedUser.name);
    setEmail(updatedUser.email);
    setAdmin(updatedUser.isAdmin);
  };

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        navigate("/userList");
      }, 1000);
    }
  }, [success]);

  if(userLoading){
    return <Loader/>
  }

  return (
    <div style={{ height: "100%", minHeight: "100vh" }} className="px-32">
      {success && (
        <p
          style={{ top: "-50px", right: "38%" }}
          className="absolute text-lg successAnimate font-nezto tracking-wider text-green-500 bg-green-200 px-12 py-4 rounded border-2 border-green-500 flex items-center justify-center ">
          <span className="mt-1 mr-5 text-2xl">
            <BsCheckCircleFill />
          </span>
          {success} !!!
        </p>
      )}
      <p
        onClick={backButtonHandler}
        className="text-xl font-nezto tracking-wider w-36 py-1 rounded-full text-center border mt-6 border-pink-600 text-pink-600 hover:text-sky-600 hover:border-sky-600 transition duration-300 shadow-lg shadow-black  ">
        Go back
      </p>

      <div className="flex flex-col justify-center items-center mt-20 ">
        <div className="mb-6 w-1/2">
          <input
            value={name}
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
            type="text"
            className="rounded-md w-full py-4 px-3 font-nezto tracking-wider outline-none placeholder:tracking-wider text-gray-500"
          />
        </div>
        <div className="mb-6 w-1/2">
          <input
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            className="rounded-md w-full py-4 px-3 font-nezto tracking-wider outline-none placeholder:tracking-wider text-gray-500"
          />
        </div>
        <div className=" w-1/2 ">
          <span className="mr-6 text-xl text-white font-nezto tracking-wider ">
            is Admin
          </span>
          <select
            className="w-full py-4 rounded mb-6 outline-none text-lg font-nezto tracking wider"
            value={admin}
            onChange={(e) => setAdmin(e.target.value)}>
            {admin === true ? (
              <>
                <option value={true} className="pt-6">
                  admin user
                </option>
                <option value={false}>Take admin access</option>
              </>
            ) : (
              <>
                <option
                  value={true}
                  className="mt-6 text-lg font-nezto tracking-wider">
                  provide admin access
                </option>
                <option value={false}>not an admin User</option>
              </>
            )}
          </select>
        </div>
        <div className="flex justify-end items-center  mt-1  w-1/2">
          <button
            onClick={editUserHandler}
            className="border-2 w-full text-green-300 font-nezto tracking-wider hover:text-green-600 hover:border-green-600 transition duration-300  border-green-300 px-6 py-3 rounded-lg text-xl ">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditUserScreen;
