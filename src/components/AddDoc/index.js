import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUsers } from "../../features/userListSlice";
import axios from "axios";
import { userProfile } from "../../features/userSlice";
import { Link } from "react-router-dom";

function AddDoc() {
  const baseUrl = process.env.REACT_APP_API_BASE_URL;
  const dispatch = useDispatch();
  const users = useSelector((state) => state.userList.users);
  const [showModal, setShowModal] = useState(false);
  const [file, setFile] = useState({});
  const [docResponse, setDocResponse] = useState({});
  const token = localStorage.getItem("auth-token");

  const openForm = () => {
    dispatch(getUsers());
    setDocResponse({});
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const mailList = document.querySelectorAll("#mailList input");
    const emailList = [];
    mailList.forEach((i) => {
      if (i.checked) {
        emailList.push(i.value);
      }
    });
    const formData = new FormData();

    formData.append("emailList", JSON.stringify(emailList));
    formData.append("doc", file);

    axios({
      method: "POST",
      url: `${baseUrl}/docs/create`,
      data: formData,
      headers: {
        "auth-token": token,
      },
    })
      .then((response) => {
        setDocResponse({
          status: response.status,
          message: `${response.data.savedDoc.name} shared with ${emailList.length} users`,
        });
        dispatch(userProfile());
      })
      .catch((error) => {
        setDocResponse({
          status: error.status,
          message: error.response.data,
        });
      });
  };

  return (
    <div>
      <Link
        to="##"
        onClick={openForm}
        className="add-doc inline-block px-6 py-2.5 text-white font-medium text-sm rounded"
      >
        Add Documents
      </Link>
      {showModal ? (
        <>
          <div className="flex justify-center items-center overflow-x-hidden bg-koyu/80 overflow-y-auto fixed inset-0 z-[9999] outline-none focus:outline-none">
            <div className="relative  w-auto my-6 mx-auto max-w-3xl ">
              <div className="border-1 border-logoColor  rounded-lg shadow-lg relative flex flex-col w-full bg-koyu outline-none focus:outline-none">
                <div className="flex items-start justify-between p-3 border-b border-solid border-gray rounded-t ">
                  <h3 className="text-3xl font=semibold">Add Documents</h3>

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
                  <form onSubmit={handleSubmit}>
                    <div className="  bg-koyu px-2">
                      <div className="max-w-md mx-auto bg-koyu rounded-lg overflow-hidden md:max-w-lg">
                        <div className="md:flex">
                          <div className="w-full">
                            <div className="p-3">
                              <div className="mb-2">
                                <div className="relative h-40 rounded-lg border-dashed border-2 border-gray-200 bg-koyu flex justify-center items-center hover:cursor-pointer">
                                  <div className="absolute">
                                    <div className="flex flex-col items-center ">
                                      <i className="fa fa-cloud-upload fa-3x text-gray-200"></i>
                                      <span className="block text-white font-normal">
                                        Attach you files here
                                      </span>
                                      <span className="block text-gray-400 font-normal">
                                        or
                                      </span>

                                      <span className="block text-blue-400 font-normal">
                                        Browse files
                                      </span>
                                    </div>
                                  </div>{" "}
                                  <input
                                    className="h-full w-full opacity-0"
                                    type="file"
                                    placeholder="Dosya Seçin"
                                    name="doc"
                                    onChange={(e) => setFile(e.target.files[0])}
                                  />
                                </div>
                                <div className="flex justify-between items-center text-white">
                                  <span>Accepted file type:.pdf only</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <p className="error-message">
                      {docResponse.status !== 200 ? docResponse.message : ""}
                    </p>
                    <p className="success-message">
                      {docResponse.status === 200 ? docResponse.message : ""}
                    </p>
                    <h6 className="mt-3 mb-3 text-xs">
                      Select the people you want to share your attached document
                      with.
                    </h6>
                    <div className="userList">
                      {users.map((user) => (
                        <div
                          className="flex items-center mb-4"
                          key={user.id}
                          id="mailList"
                        >
                          <input
                            id={user.id}
                            type="checkbox"
                            label={user.email}
                            name="email"
                            value={user.email}
                            className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                          />
                          <label
                            htmlFor="checkbox-2"
                            className="ml-2 text-sm font-medium text-white dark:text-gray-300"
                          >
                            {user.email}
                          </label>
                        </div>
                      ))}
                    </div>

                    <button
                      type="submit"
                      className="text-white bg-green-800 rounded w-100 font-bold uppercase px-6 py-4 mt-5 text-sm outline-none focus:outline-none mr-1 mb-1"
                    >
                      Send
                    </button>
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

export default AddDoc;
