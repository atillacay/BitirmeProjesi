import React, { useState, Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { userProfile } from "../../features/userSlice";
import LoadingSpinner from "../Spinner";
import { Link } from "react-router-dom";
import pdficon from "../../pdficon.png";

function DocManagement() {
  const baseUrl = process.env.REACT_APP_API_BASE_URL;
  const { authorization } = useSelector((state) => state.auth);
  const isLoading = useSelector((state) => state.loggedInUser.isLoading);
  const myApprovals = useSelector((state) => state.loggedInUser.myApprovals);
  const receivedDocs = useSelector((state) => state.loggedInUser.receivedDocs);
  const myPendings = useSelector((state) => state.loggedInUser.myPendings);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userProfile(authorization));
  }, []);
  return (
    <div className=" container min-h-screen -mt-[75px] ">
      <div className="row __sm:mt-[200px] lg:mt-[100px]">
        <div className="col-sm-12">
          {isLoading === "loading" ? (
            <LoadingSpinner />
          ) : (
            <div className="row">
              <div className="flex justify-center">
                <h5 className="mb-5 text-3xl">Received Docs</h5>
              </div>
              <div className="col-sm-12 mb-5 col-md-12">
                <div className="flex justify-center">
                  <p className="p-3">
                    Total:{" "}
                    <span>{receivedDocs ? receivedDocs.length : ""}</span>
                  </p>
                  <p className="p-3">
                    Approved:{" "}
                    <span>{myApprovals ? myApprovals.length : ""}</span>
                  </p>
                  <p className="p-3">
                    Pending: <span>{myPendings ? myPendings.length : ""}</span>
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="row">
        <div className="col-sm-12 ">
          <div className="text-center">
            <h1 className="text-3xl text-pendingDoc">Pending Documents</h1>
            <div className="my-[20px] flex justify-between sm:justify-center md:justify-center flex-wrap rounded-lg p-2 shadow-[0_0px_15px_0px_rgba(255,159,28)] mb-5">
              {myPendings && myPendings.length > 0 ? (
                myPendings.map((doc) => {
                  return (
                    <div
                      className="col-lg-3 col-md-4 col-sm-8 m-3 p-3 rounded-lg border border-gray-200 hover:scale-105 hover:shadow-[0_0px_15px_0px_rgba(255,159,28)] dark:bg-gray-800 dark:border-gray-700 text-white"
                      key={doc.Doc.id}
                    >
                      <Link
                        to={{
                          pathname: `/doc/${doc.Doc.docPath}`,
                          search: `?docId=${doc.Doc.id}`,
                        }}
                      >
                        <span>{doc.Doc.name}</span>
                        <div className="card-body d-flex flex-column">
                          <p>Shared By: {doc.ownerEmail}</p>
                          <p>Date: {dateFix(doc.createdAt)}</p>
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
                  );
                })
              ) : (
                <p className="__sm:m-auto">No pending documents</p>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-12">
          <div className="text-center">
            <h1 className="text-3xl text-aprovedDoc">Approved Documents</h1>
            <div className="my-[20px] flex justify-between sm:justify-center md:justify-center flex-wrap rounded-lg p-2 shadow-[0_0px_15px_0px_rgba(46,196,182)] mb-5">
              {myPendings && myApprovals.length > 0 ? (
                myApprovals.map((doc) => {
                  return (
                    <div
                      className="col-lg-3 col-md-4 col-sm-8 m-3 p-3 rounded-lg border border-gray-200 hover:scale-105 hover:shadow-[0_0px_15px_0px_rgba(46,196,182)] dark:bg-gray-800 dark:border-gray-700 text-white"
                      key={doc.Doc.id}
                    >
                      <Link
                        to={{
                          pathname: `/doc/${doc.Doc.docPath}`,
                          search: `?docId=${doc.Doc.id}`,
                        }}
                      >
                        <span>{doc.Doc.name}</span>
                        <div className="card-body d-flex flex-column">
                          <p>Shared By: {doc.ownerEmail}</p>
                          <p>Date: {dateFix(doc.createdAt)}</p>
                        </div>
                        <div className="col">
                          <button
                            type="button"
                            className="text-white bg-blue-900 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
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
                  );
                })
              ) : (
                <p className="__sm:m-auto">No approved documents</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
/**
 *
 * @param {*} date
 * @returns backend'den gelen tarih değerini local e çevirir.
 */
function dateFix(date) {
  const fixDate = new Date(date);
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return fixDate.toLocaleTimeString("tr-TR", options);
}

export default DocManagement;
