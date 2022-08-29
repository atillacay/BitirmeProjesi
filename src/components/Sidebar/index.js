import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Navigation from "../Navbar";
import logo from "../../logo.svg";

function Sidebar() {
  const user = useSelector((state) => state.loggedInUser.role);
  return (
    <div className="container h-100 flex flex-col justify-between">
      <div className="row">
        <Link as={Link} to="/">
          <img className="logo" src={logo} alt="" />
        </Link>
      </div>
      <div className="sidebar row">
        <ul>
          <li>
            <Link to="/">Doc Management</Link>
          </li>
          {user !== "user" ? (
            <>
              <li>
                <Link to="/profile">Profile</Link>
              </li>
              <li>
                <Link to="/users">Users</Link>
              </li>
            </>
          ) : (
            ""
          )}
        </ul>
      </div>
      <div className="row">
        <Navigation />
      </div>
    </div>
  );
}

export default Sidebar;
