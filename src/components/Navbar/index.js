import React, { useState, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import NavDropdown from "react-bootstrap/NavDropdown";
import { logout } from "../../features/loginLogoutSlice";
import logo from "../../logo.svg";
import { loggedInUser } from "../../features/userSlice";

function Navigation() {
  const user = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);
  const [navbar, setNavbar] = useState(false);
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  const handleLogout = async () => {
    dispatch(logout());
    setExpanded(false);
    navigate("/login");
  };
  return (
    <>
      <nav className="z-50 w-full bg-purple-500 shadow">
        <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
          <div>
            <div className="flex items-center justify-between py-3 md:py-5 md:block">
              <div className="flex justify-center items-center flex-shrink-0 text-white lg:mr-6">
                <img className="logo" src={logo} alt="" />
                <span className="font-semibold text-lg tracking-tight text-logoColor">
                  Doc Tracker
                </span>
              </div>
              <div className="md:hidden">
                <button
                  className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                  onClick={() => setNavbar(!navbar)}
                >
                  {navbar ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6 text-white"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
          <div>
            <div
              className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
                navbar ? "block" : "hidden"
              }`}
            >
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

              <div className="mt-3 space-y-2 lg:hidden md:hidden sm:inline-block">
                <NavDropdown
                  className="text-capitalize"
                  title={
                    user.isAuthenticated ? `Hello ${user.name}` : `Hello User`
                  }
                  id="collasible-nav-dropdown"
                >
                  {user.isAuthenticated ? (
                    <NavDropdown.Item onClick={handleLogout}>
                      Logout
                    </NavDropdown.Item>
                  ) : (
                    <NavDropdown.Item
                      as={Link}
                      to="/login"
                      onClick={() => setExpanded(false)}
                    >
                      Login
                    </NavDropdown.Item>
                  )}
                </NavDropdown>
              </div>
            </div>
          </div>
          <div className="hidden space-x-2 md:inline-block">
            <NavDropdown
              className="text-capitalize"
              title={user.isAuthenticated ? `Hello ${user.name}` : `Hello User`}
              id="collasible-nav-dropdown"
            >
              {user.isAuthenticated ? (
                <NavDropdown.Item onClick={handleLogout}>
                  Logout
                </NavDropdown.Item>
              ) : (
                <NavDropdown.Item
                  as={Link}
                  to="/login"
                  onClick={() => setExpanded(false)}
                >
                  Login
                </NavDropdown.Item>
              )}
            </NavDropdown>
          </div>
        </div>
      </nav>

      {/*  <nav className=" z-50 flex items-center justify-between flex-wrap p-6 shadow-[0px_5px_5px_-5px_rgba(231,29,54)] ">
        <div className="flex items-center flex-shrink-0 text-white lg:mr-6">
          <img className="logo" src={logo} alt="" />
          <span className="font-semibold text-lg tracking-tight text-logoColor">
            Doc Tracker
          </span>
        </div>
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
        <NavDropdown
          className="text-capitalize"
          title={user ? `Hello ${user}` : `Hello User`}
          id="collasible-nav-dropdown"
        >
          {user ? (
            <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
          ) : (
            <NavDropdown.Item
              as={Link}
              to="/login"
              onClick={() => setExpanded(false)}
            >
              Login
            </NavDropdown.Item>
          )}
        </NavDropdown>
      </nav> */}
    </>
  );
}

export default Navigation;
