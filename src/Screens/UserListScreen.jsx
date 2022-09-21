import React, { useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { getUserList } from "../actions/userActions";
import { ImCross } from "react-icons/im";
import { MdOutlineDone } from "react-icons/md";
import { clsx } from "clsx";
import { IoIosAlert } from "react-icons/io";
import { deleteUser } from "../actions/userActions";
import { animate, spring } from "motion";
import { BsCheckCircleFill } from "react-icons/bs";
import { Modal } from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  USER_BY_ID_RESET,
  ADMIN_UPDATE_USER_RESET,
} from "../constants/userConstants";
import Paginate from "../components/Paginate";
import Loader from "../components/Loader";

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

function UserListScreen() {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const userList = useSelector((state) => state.userList);
  const { loading, users, page, pages } = userList;
  const userInfo = useSelector((state) => state.userLogin.userInfo);

  const {
    loading: delLoading,
    error: delError,
    success: delSuccess,
  } = useSelector((state) => state.deleteUserDetails);

  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState(null);

  const handleClose = () => {
    setOpen(!open);
  };

  useEffect(() => {
    dispatch({ type: USER_BY_ID_RESET });
    dispatch(getUserList());
    dispatch({ type: ADMIN_UPDATE_USER_RESET });
  }, []);



  useEffect(() => {
    animate(
      ".successAnimate",
      { translateY: [-200, -200] },
      { easing: spring() }
    );
  }, [delSuccess]);

  const deleteUserHandler = () => {
    dispatch(deleteUser(userId));
    setOpen(!open);
  };

  const openDelModal = (user_id) => {
    setUserId(user_id);
    setOpen(true);
  };

  if(loading){
    return <Loader/>
  }

  return (
    <div style={{ height: "100%", minHeight: "100vh" }} className="relative">
      <p className="text-white font-gotham text-3xl tracking-wider mt-24 ml-32 pb-1 mb-6 border-b border-zinc-500 w-32">
        Users
      </p>
      {delSuccess && (
        <p
          style={{ top: "-50px", right: "38%" }}
          className="absolute text-lg successAnimate font-nezto tracking-wider text-green-500 bg-green-200 px-12 py-4 rounded border-2 border-green-500 flex items-center justify-center ">
          <span className="mt-1 mr-5 text-2xl">
            <BsCheckCircleFill />
          </span>
          {delSuccess.message} !!!
        </p>
      )}
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
                    Email
                  </th>
                  <th className="border-r border-b border-zinc-600">isAdmin</th>
                  <th className="border-b border-zinc-600">Action</th>
                </tr>
              </thead>
              <tbody>
                {!loading &&
                  users?.map((item, index) => (
                    <tr className=" text-lg font-nezto tracking-wider space-x-10">
                      <td
                        className={clsx("border-r p-3 border-zinc-600", {
                          "  border-b": userList?.length - 1 !== index,
                          "bg-zinc-800": index % 2 === 0,
                        })}>
                        {item._id}
                      </td>
                      <td
                        className={clsx("border-r border-zinc-600", {
                          "  border-b": userList?.length - 1 !== index,
                          "bg-zinc-800": index % 2 === 0,
                        })}>
                        {item.name}
                      </td>
                      <td
                        className={clsx("border-r border-zinc-600 ", {
                          "  border-b": userList?.length - 1 !== index,
                          "bg-zinc-800": index % 2 === 0,
                        })}>
                        <a
                          href={`mailto:${item.email}`}
                          className="hover:text-sky-600 transition duration-300">
                          {item.email}
                        </a>
                      </td>
                      <td
                        className={clsx("border-r border-zinc-600", {
                          "  border-b ": userList?.length - 1 !== index,
                          "bg-zinc-800": index % 2 === 0,
                        })}>
                        {item.isAdmin ? (
                          <p className="text-3xl text-green-600 flex justify-center ">
                            <MdOutlineDone />
                          </p>
                        ) : (
                          <p className=" text-red-600 text-xl ml-3 flex justify-center">
                            <ImCross />
                          </p>
                        )}
                      </td>

                      <td
                        className={clsx("", {
                          "  border-b border-zinc-600":
                            userList?.length - 1 !== index,
                          "bg-zinc-800": index % 2 === 0,
                        })}>
                        <div className="flex justify-center text-xl space-x-4">
                          <p
                            onClick={() => navigate(`/userList/${item._id}`)}
                            className="hover:text-green-600 transition duration-300 hover:scale-125">
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
          <Paginate page={page} pages={pages}/>
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
              Are you sure you want to delete this account?
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

export default UserListScreen;
