import React from "react";
import { useSelector, useDispatch } from "react-redux";

import logo from "../../logo.svg";
import { Link } from "react-router-dom";

const Footer = () => {
  const user = useSelector((state) => state.loggedInUser.role);

  return (
    <>
      <footer className="p-4 bg-koyu rounded-lg shadow md:px-6 md:py-8 dark:bg-gray-800">
        <div className="sm:flex sm:items-center sm:justify-between">
          <a
            href="https://flowbite.com/"
            className="flex items-center mb-4 sm:mb-0"
          >
            <img className="logo" src={logo} alt="" />

            <span className="ml-5 font-semibold text-4xl tracking-tight text-logoColor">
              Doc Tracker
            </span>
          </a>
          <nav className="z-50 flex items-center justify-between flex-wrap p-6  border-zinc-100  shadow-sm">
            <div className="w-full block  lg:flex lg:items-center lg:w-auto">
              <div className="text-xl lg:flex-grow">
                <Link
                  className="block  lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-10"
                  to="/"
                >
                  Doc Management
                </Link>
                {user !== "user" ? (
                  <>
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
                  </>
                ) : (
                  ""
                )}
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
