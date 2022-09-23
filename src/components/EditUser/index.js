import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useState } from "react";
import { LockClosedIcon } from "@heroicons/react/solid";
import {
  editUser,
  getUserDetails,
  getUsers,
} from "../../features/userListSlice";
import { useEffect } from "react";

function EditUser(props) {
  const [showModal, setShowModal] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const [updated, setUpdated] = useState(false);
  const [updateError, setUpdateError] = useState(false);

  const dispatch = useDispatch();

  const openForm = () => {
    setShowModal(true);
  };

  useEffect(() => {
    dispatch(getUserDetails(props.userId))
      .unwrap()
      .then((response) => {
        setUserDetails(response);
      });
  }, [showModal, props.userId, dispatch]);

  const handleEditUser = async (e) => {
    e.preventDefault();

    const userData = {
      name: e.target["name"].value,
      lastName: e.target["lastname"].value,
      email: e.target["email"].value,
      department: e.target["department"].value,
      role: e.target["role"].value,
      userId: props.userId,
    };

    if (e.target["department"].value == "IT") {
      userData.department = "1";
    } else {
      userData.department = "2";
    }
    switch (e.target["role"].value) {
      case "admin":
        userData.role = 1;
        break;
      case "owner":
        userData.role = 2;
        break;
      case "user":
        userData.role = 3;
        break;

      default:
        break;
    }
    dispatch(editUser(userData))
      .unwrap()
      .then((resp) => {
        setUpdated(true);
      })
      .catch((error) => setUpdateError(error));
  };

  return (
    <div>
      <Link
        to="##"
        onClick={openForm}
        className="col-4 px-3 py-2 m-1 bg-indigo-300 text-koyu font-medium text-sm leading-tight rounded shadow-md hover:bg-aprovedDoc hover:shadow-lg transition duration-150 ease-in-out"
      >
        Edit
      </Link>
      {showModal ? (
        <>
          <div className="flex justify-center items-center overflow-x-hidden bg-koyu/80 overflow-y-auto fixed inset-0 z-[9999] outline-none focus:outline-none">
            <div className="relative  w-auto my-6 mx-auto max-w-3xl ">
              <div className="border-1 border-logoColor  rounded-lg shadow-lg relative flex flex-col w-full bg-koyu outline-none focus:outline-none">
                <div className="flex items-start justify-between p-3 border-b border-solid border-gray rounded-t ">
                  <h3 className="text-3xl font=semibold">Edit User</h3>

                  <button
                    type="button"
                    className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                    onClick={() => {
                      setShowModal(false);
                      dispatch(getUsers());
                    }}
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
                  <form
                    onSubmit={(e) => handleEditUser(e)}
                    className="space-y-6"
                    action="#"
                    method="POST"
                    id="editUser"
                  >
                    <input type="hidden" name="remember" defaultValue="true" />
                    <div className="rounded-md shadow-sm -space-y-px">
                      {updated ? (
                        <span className="text-aprovedDoc">User Updated</span>
                      ) : (
                        ""
                      )}
                      {updateError ? <span>Update Failed</span> : ""}
                      <div className="my-2">
                        <label htmlFor="email-address" className="sr-only">
                          Name
                        </label>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          autoComplete="name"
                          onChange={(e) =>
                            setUserDetails({
                              ...userDetails,
                              name: e.target.value,
                            })
                          }
                          value={userDetails.name}
                          required
                          className="appearance-none text-[#282828] rounded-none relative block w-full px-3 py-2 border rounded-t-mdsm:text-sm"
                          placeholder="Name"
                        />
                      </div>
                      <div className="my-2">
                        <label htmlFor="email-address" className="sr-only ">
                          Lastname
                        </label>
                        <input
                          id="lastname"
                          name="lastname"
                          type="text"
                          autoComplete="lastname"
                          onChange={(e) =>
                            setUserDetails({
                              ...userDetails,
                              lastName: e.target.value,
                            })
                          }
                          value={userDetails.lastName}
                          required
                          className="appearance-none text-[#282828] rounded-none relative block w-full px-3 py-2 border rounded-t-mdsm:text-sm"
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
                          onChange={(e) =>
                            setUserDetails({
                              ...userDetails,
                              email: e.target.value,
                            })
                          }
                          value={userDetails.email}
                          required
                          className="appearance-none text-[#282828] rounded-none relative block w-full px-3 py-2 border rounded-t-mdsm:text-sm"
                          placeholder="Email address"
                        />
                      </div>
                      <div className="my-2 text-koyu flex justify-between">
                        <label htmlFor="email-address" className="text-white">
                          Department
                        </label>
                        <select name="department" id="department">
                          <option value={userDetails.department}>
                            {userDetails.department}
                          </option>
                          <option value="IT">IT</option>
                          <option value="operations">Operations</option>
                        </select>
                      </div>
                      <div className="my-2 text-white flex justify-between">
                        <label htmlFor="role" className="">
                          Role
                        </label>
                        <select className="text-koyu" name="role" id="role">
                          <option value={userDetails.role}>
                            {userDetails.role}
                          </option>
                          <option value="owner">Owner</option>
                          <option value="admin">admin</option>
                          <option value="user">user</option>
                        </select>
                      </div>
                    </div>
                    <div className="my-2 ">
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

export default EditUser;
