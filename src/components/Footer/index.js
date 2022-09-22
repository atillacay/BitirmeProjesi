import React from "react";
import { useSelector, useDispatch } from "react-redux";

import logo from "../../logo.svg";
import { Link } from "react-router-dom";

const Footer = () => {
  const user = useSelector((state) => state.auth);

  return (
    <>
      <footer className="p-4 bg-koyu shadow md:px-6 md:py-8 ">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div className="flex justify-center items-center flex-shrink-0 text-white lg:mr-6">
            <img className="logo" src={logo} alt="" />
            <span className="font-semibold text-lg tracking-tight text-logoColor">
              Doc Tracker
            </span>
          </div>
          <nav className="z-50 flex items-center justify-between flex-wrap p-6  border-zinc-100  shadow-sm">
            <div className="w-full block  lg:flex lg:items-center lg:w-auto">
              <div className="text-xl lg:flex-grow hidden lg:block">
                <ul className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0">
                  {user.isAuthenticated && (
                    <>
                      <li className="text-white hover:text-indigo-200">
                        <Link to="/">Doc Management</Link>
                      </li>
                      <Link
                        className="block lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-10"
                        to="/users"
                      >
                        Users
                      </Link>
                      <Link
                        className="block  lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-10"
                        to="/profile"
                      >
                        Profile
                      </Link>
                      <li className="text-white hover:text-indigo-200">
                        <Link to="/aboutus">About Us</Link>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </nav>
        </div>

        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2022{" "}
          <Link to="/" className="hover:underline">
            DocTracker™
          </Link>
          . All Rights Reserved.
        </span>
      </footer>
    </>
  );
};

export default Footer;
