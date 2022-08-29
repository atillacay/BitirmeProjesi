import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getUserDetails } from "../../features/userListSlice";
import LoadingSpinner from "../Spinner";
import { logout } from ".././../features/loginLogoutSlice";
import pdficon from "../../pdficon.png";

function SingleUser() {
  const userDetails = useSelector((state) => state.singleUser);
  const docDetails = useSelector((state) => state.singleUser.docs);
  const dispatch = useDispatch();
  const user = useParams();
  useEffect(() => {
    dispatch(getUserDetails(user.id))
      .unwrap()
      .catch((error) => {
        if (error) {
          dispatch(logout());
        }
      });
  }, []);

  const pendingDocs = docDetails
    ? docDetails.filter((item) => {
        return item.DocUser.isApproved === true;
      })
    : "";
  const approveDocs = docDetails
    ? docDetails.filter((item) => {
        return item.DocUser.isApproved === false;
      })
    : "";
  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-12">
          {userDetails.isLoading === "loading" ? (
            <LoadingSpinner />
          ) : (
            <div className="row profile">
              <div className="col-sm-4 col-md-4">
                <div>
                  <h5>Profile Info</h5>
                  <p>
                    Name: <span>{userDetails.name}</span>
                  </p>
                  <p>
                    Lastname: <span>{userDetails.lastName}</span>
                  </p>
                  <p>
                    Email: <span className="email">{userDetails.email}</span>
                  </p>
                  <p>
                    Department: <span>{userDetails.department}</span>
                  </p>
                  <p>
                    Role: <span>{userDetails.role}</span>
                  </p>
                </div>
              </div>
              <div className="col-sm-4 col-md-4">
                <div>
                  <h5>Received Docs</h5>
                  <p>
                    Total: <span>{docDetails ? docDetails.length : ""}</span>
                  </p>
                  <p>
                    Pending: <span>{approveDocs.length}</span>
                  </p>
                  <p>
                    Approved: <span>{pendingDocs.length}</span>
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="row">
        <div className="col">
          <div className="text-center">
            <h6>Pending Docs</h6>
            <div className="doc-wrapper my-[20px] flex justify-between sm:justify-center md:justify-center flex-wrap rounded-lg p-2 shadow-[0_0px_15px_0px_rgba(255,159,28)] mb-5">
              {approveDocs
                ? approveDocs.map((doc) => (
                    <div
                      className="col-lg-3 col-md-4 col-sm-8 m-3 p-3 rounded-lg border border-gray-200 hover:scale-105 hover:shadow-[0_0px_15px_0px_rgba(255,159,28)] dark:bg-gray-800 dark:border-gray-700 text-white"
                      key={doc.id}
                    >
                      <Link
                        to={{
                          pathname: `/doc/${doc.docPath}`,
                        }}
                      >
                        <div className="doc-box m-auto">
                          <span>{doc.name}</span>
                        </div>
                        <div className="card-body d-flex flex-column">
                          <p>Shared By: {doc.DocUser.ownerEmail}</p>
                          <p>On: {doc.DocUser.createdAt}</p>
                        </div>
                        <div className="col">
                          <button
                            type="button"
                            className="text-white bg-blue-900 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm py-2.5 text-center inline-flex items-center dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
                          >
                            <img
                              className="w-10 h-13 ml-2 mr-3"
                              src={pdficon}
                              alt=""
                            />
                            Read More
                          </button>
                        </div>
                      </Link>
                    </div>
                  ))
                : ""}
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <div className="text-center">
            <h6>Approved Docs</h6>
            <div className="my-[20px] flex justify-between sm:justify-center md:justify-center flex-wrap rounded-lg p-2 shadow-[0_0px_15px_0px_rgba(46,196,182)] mb-5">
              {pendingDocs
                ? pendingDocs.map((doc) => (
                    <div
                      className="col-lg-3 col-md-4 col-sm-8 m-3 p-3 rounded-lg border border-gray-200 hover:scale-105 hover:shadow-[0_0px_15px_0px_rgba(46,196,182)] dark:bg-gray-800 dark:border-gray-700 text-white"
                      key={doc.id}
                    >
                      <Link to={`/doc/${doc.docPath}`}>
                        <div className="doc-box m-auto">
                          <span>{doc.name}</span>
                        </div>
                        <div className="card-body d-flex flex-column">
                          <p>Shared By: {doc.DocUser.ownerEmail}</p>
                          <p>On: {doc.DocUser.createdAt}</p>
                        </div>
                        <div className="col">
                          <button
                            type="button"
                            className="text-white bg-blue-900 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm py-2.5 text-center inline-flex items-center dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
                          >
                            <img
                              className="w-10 h-13 ml-2 mr-3"
                              src={pdficon}
                              alt=""
                            />
                            Read More
                          </button>
                        </div>
                      </Link>
                    </div>
                  ))
                : ""}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleUser;
