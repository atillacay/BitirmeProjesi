import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useState } from "react";
import { LockClosedIcon } from "@heroicons/react/solid";
import { addUser, getUsers } from "../../features/userListSlice";
import { useEffect } from "react";

function AddUser() {
  const [showModal, setShowModal] = useState(false);
  const [refreshUsers, setRefreshUsers] = useState(false);
  const [addError, setAddError] = useState(null);
  const dispatch = useDispatch();

  const openForm = () => {
    setShowModal(true);
  };

  const handleAddUser = async (e) => {
    e.preventDefault();

    const userData = {
      name: e.target["name"].value,
      lastName: e.target["lastname"].value,
      email: e.target["email"].value,
      department: "",
      password: e.target["password"].value,
    };

    if (e.target["department"].value == "IT") {
      userData.department = "1";
    } else {
      userData.department = "2";
    }

    dispatch(addUser(userData))
      .unwrap()
      .then((resp) => {
        setRefreshUsers(true);
      })
      .catch((error) => {
        setAddError(error);
      });
  };
  useEffect(() => {
    dispatch(getUsers());
  }, [refreshUsers, dispatch]);
  return (
    <div>
      <Link
        to="##"
        onClick={openForm}
        className="add-doc inline-block px-6 py-2.5 text-white font-medium text-sm rounded"
      >
        Add User
      </Link>
      {showModal ? (
        <>
          <div className="flex justify-center items-center overflow-x-hidden bg-koyu/80 overflow-y-auto fixed inset-0 z-[9999] outline-none focus:outline-none">
            <div className="relative  w-auto my-6 mx-auto max-w-3xl ">
              <div className="border-1 border-logoColor  rounded-lg shadow-lg relative flex flex-col w-full bg-koyu outline-none focus:outline-none">
                <div className="flex items-start justify-between p-3 border-b border-solid border-gray rounded-t ">
                  <h3 className="text-3xl font=semibold">Add User</h3>

                  <button
                    type="button"
                    className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <svg
                      className="h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
                <div className="relative p-6 flex-auto">
                  {addError ? (
                    <span className="text-logoColor">Existing user</span>
                  ) : (
                    ""
                  )}
                  <form
                    onSubmit={(e) => handleAddUser(e)}
                    className="space-y-6"
                    action="#"
                    method="POST"
                    id="adduser"
                  >
                    <input type="hidden" name="remember" defaultValue="true" />
                    <div className="rounded-md shadow-sm -space-y-px">
                      <div className="my-2">
                        <label htmlFor="email-address" className="sr-only">
                          Name
                        </label>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          autoComplete="name"
                          required
                          className="appearance-none  rounded-none relative block w-full px-3 py-2 border rounded-t-md sm:text-sm"
                          placeholder="Name"
                        />
                      </div>
                      <div className="my-2">
                        <label htmlFor="email-address" className="sr-only">
                          Lastname
                        </label>
                        <input
                          id="lastname"
                          name="lastname"
                          type="text"
                          autoComplete="lastname"
                          required
                          className="appearance-none  rounded-none relative block w-full px-3 py-2 border rounded-t-md sm:text-sm"
                          placeholder="Lastname"
                        />
                      </div>
                      <div className="my-2">
                        <label htmlFor="email-address" className="sr-only">
                          Email address
                        </label>
                        <input
                          id="email-address"
                          name="email"
                          type="email"
                          autoComplete="email"
                          required
                          className="appearance-none  rounded-none relative block w-full px-3 py-2 border rounded-t-md sm:text-sm"
                          placeholder="Email address"
                        />
                      </div>
                      <div className="my-2 flex justify-between ">
                        <label
                          htmlFor="email-address"
                          className="text-gray-300 p-2 sm:text-sm"
                        >
                          Department
                        </label>
                        <select
                          className="text-koyu"
                          name="department"
                          id="department"
                        >
                          <option value="IT">IT</option>
                          <option value="operations">Operations</option>
                        </select>
                      </div>
                      <div className="my-2">
                        <label htmlFor="password" className="sr-only">
                          Password
                        </label>
                        <input
                          id="password"
                          name="password"
                          type="password"
                          autoComplete="current-password"
                          required
                          className="appearance-none  rounded-none relative block w-full px-3 py-2 border rounded-b-md focus:outline-none  sm:text-sm"
                          placeholder="Password"
                        />
                      </div>
                    </div>
                    <div className="my-2">
                      <button
                        type="submit"
                        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white "
                      >
                        <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                          <LockClosedIcon
                            className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                            aria-hidden="true"
                          />
                        </span>
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}

export default AddUser;
