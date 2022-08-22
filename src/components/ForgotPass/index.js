import { data } from "autoprefixer";
import axios from "axios";
import { React, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../logo.svg";

const ForgotPass = () => {
  const [resetRes, setResetRes] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(e);

    const data = {
      email: e.target["email"].value,
    };
    console.log(data);

    axios({
      method: "POST",
      url: process.env.REACT_APP_API_BASE_URL + "/password-reset",
      data: data,
    })
      .then((res) => {
        setResetRes(true);
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
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
              Forgot Password
            </h2>
            <form
              onSubmit={handleSubmit}
              className="mt-4 space-y-4 lg:mt-5 md:space-y-5"
              action="#"
            >
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Enter Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border  sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700  placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                  placeholder="name@company.com"
                  required=""
                />
              </div>

              <div className="flex items-start">
                <div className="flex items-center h-5">
                  {resetRes && <span>Check Your Email</span>}
                </div>
              </div>
              <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300   text-sm px-5 py-2.5 text-center bg-primary-600 hover:bg-primary-700 focus:ring-primary-800 add-doc inline-block font-medium rounded"
              >
                Reset passwod
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default ForgotPass;
