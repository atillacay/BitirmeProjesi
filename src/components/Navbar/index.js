import React, { useState, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import NavDropdown from "react-bootstrap/NavDropdown";
import { logout } from "../../features/loginLogoutSlice";
import logo from "../../logo.svg";
import { loggedInUser } from "../../features/userSlice";

function Navigation() {
  const user = useSelector((state) => state.loggedInUser.name);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  const handleLogout = async () => {
    dispatch(logout());
    setExpanded(false);
    navigate("/login");
  };
  return (
    <nav className=" z-50 flex items-center justify-between flex-wrap p-6 shadow-[0px_5px_5px_-5px_rgba(231,29,54)] ">
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
    </nav>
  );
}

export default Navigation;
