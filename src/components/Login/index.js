import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../features/loginLogoutSlice";
import { LockClosedIcon } from "@heroicons/react/solid";
import logo from "../../logo.svg";
import { useState } from "react";
import { useSelector } from "react-redux";

function Login() {
  const { error } = useSelector((state) => state.auth);
  const [loginErr, setLoginErr] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = (e) => {
    e.preventDefault();
    const loginData = {
      email: e.target["email"].value,
      password: e.target["password"].value,
    };
    dispatch(login(loginData))
      .unwrap()
      .then(() => {
        navigate("/");
      })
      .catch((error) => setLoginErr(true));
  };

  return (
    <div className="container bg-koyu">
      <div className=" row h-screen justify-content-center align-items-center">
        <div className=" flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8">
            <div>
              <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
                Sign in to your account
              </h2>
            </div>
            <form
              onSubmit={handleLogin}
              className="space-y-6"
              action="#"
              method="POST"
            >
              <input type="hidden" name="remember" defaultValue="true" />
              <div className="rounded-md shadow-sm -space-y-px">
                <div>
                  <label htmlFor="email-address" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="appearance-none text-[#282828] rounded-none relative block w-full px-3 py-2 border rounded-t-mdsm:text-sm"
                    placeholder="Email address"
                  />
                </div>
                <div>
                  <label htmlFor="password" className="sr-only">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="appearance-none text-[#282828] rounded-none relative block w-full px-3 py-2 border rounded-b-md focus:outline-none  sm:text-sm"
                    placeholder="Password"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  {loginErr ? (
                    <span className="text-logoColor">
                      {" "}
                      Invalid Password or E-mail{" "}
                    </span>
                  ) : (
                    ""
                  )}
                </div>

                <div className="text-sm">
                  <a
                    href="/forgotpassword"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot your password?
                  </a>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    <LockClosedIcon
                      className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                      aria-hidden="true"
                    />
                  </span>
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
