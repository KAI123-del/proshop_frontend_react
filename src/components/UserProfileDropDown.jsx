/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { logout } from "../actions/userActions";
import { useDispatch } from "react-redux";
import { RiArrowDropDownLine } from "react-icons/ri";
import { ToastContainer, Flip } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function UserProfileDropDown({ user }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(logout());
    navigate("/login");
    document.location.reload();
  };

  const profileHandler = () => {
    navigate("/profile");
  };

  return (
    <Menu as="div" className="relative inline-block text-left z-10">
      <div className="group  w-44">
        <Menu.Button className="inline-flex justify-center  rounded-md  text-xl tracking-wider ml-1 font-gotham text-pink-600   group-hover:text-white transition duration-500 ">
          {user}
          <p className="group-hover:text-pink-600 transition duration-500 text-gray-200">
            <RiArrowDropDownLine className="text-3xl   text-center" />
          </p>
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95">
        <Menu.Items className=" absolute -right-12  mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none">
          <div className="py-1 border-b border-gray-300">
            <Menu.Item>
              {({ active }) => (
                <a
                  href="#"
                  onClick={profileHandler}
                  className={classNames(
                    active
                      ? "bg-gray-100 text-gray-900 font-semibold"
                      : "text-gray-700",
                    "block px-4 py-2 text-sm font-semibold"
                  )}>
                  Profile
                </a>
              )}
            </Menu.Item>
          </div>
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <a
                  onClick={logoutHandler}
                  href="#"
                  className={classNames(
                    active
                      ? "bg-gray-100 text-gray-900 font-semibold"
                      : "text-gray-700",
                    "block px-4 py-2 text-sm font-semibold"
                  )}>
                  Logout
                </a>
              )}
            </Menu.Item>
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
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
