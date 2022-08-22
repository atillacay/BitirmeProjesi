import axios from "axios";
import React from "react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import logo from "../../logo.svg";

const ChangePassword = () => {
  const [resp, setResp] = useState();
  const [newPassword, setNewPassword] = useState("");
  const [passStatus, setPassStatus] = useState(true);
  const { token } = useParams();

  const checkPass = (e) => {
    newPassword === e.target.value ? setPassStatus(true) : setPassStatus(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let data = {
      password: e.target["password"].value,
    };

    axios({
      method: "POST",
      url: process.env.REACT_APP_API_BASE_URL + "/password-reset/reset",
      data: data,
      headers: {
        token: token,
      },
    })
      .then((res) => {
        setResp(200);
        document.querySelectorAll("input").forEach((i) => {
          i.value = "";
        });
      })
      .catch((error) => {
        setResp(400);
      });
  };

  return (
    <>
      <section className="container bg-koyu">
        <div className="flex -mt-20 flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <Link
            to="##"
            className="flex items-center mb-6 text-2xl font-semibold text-logoColor"
          >
            <img className="logo" src={logo} alt="logo" />
            Doc Tracker
          </Link>
          <div className="w-full p-6 bg-koyu rounded-lg shadow border md:mt-0 sm:max-w-md border-gray-700 sm:p-8">
            <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight md:text-2xl text-white">
              Change Password
            </h2>
            <form
              onSubmit={handleSubmit}
              className="mt-4 space-y-4 lg:mt-5 md:space-y-5"
              action="#"
            >
              <div>
                <label
                  for="password"
                  className="block mb-2 text-sm font-medium  text-white"
                >
                  New Password
                </label>
                <input
                  onChange={(e) => setNewPassword(e.target.value)}
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700  placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                  required=""
                />
              </div>
              <div>
                <label
                  for="confirm-password"
                  className="block mb-2 text-sm font-medium  text-white"
                >
                  Confirm password
                </label>
                <input
                  onKeyUp={(e) => checkPass(e)}
                  type="password"
                  name="confirm-password"
                  id="confirm-password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300  sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700  placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                  required=""
                />
                <span>{passStatus ? "" : "Password dosent match"}</span>
              </div>
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="newsletter"
                    aria-describedby="newsletter"
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 bg-gray-700  focus:ring-primary-600 ring-offset-gray-800"
                    required=""
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300   text-sm px-5 py-2.5 text-center bg-primary-600 hover:bg-primary-700 focus:ring-primary-800 add-doc inline-block font-medium rounded"
              >
                Reset passwod
              </button>
            </form>
            {resp === 200 && (
              <>
                <p>Password Changed</p>
                <Link to="/login">Login</Link>
              </>
            )}
            {resp === 400 && <p>invalid or expired link</p>}
          </div>
        </div>
      </section>
    </>
  );
};

export default ChangePassword;
