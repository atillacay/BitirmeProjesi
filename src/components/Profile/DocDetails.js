import { React, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function DocDetails(props) {
  const ownedDocs = useSelector((state) => state.loggedInUser.docs);
  const docDetails = props.docId.docs && props.docId.docs[0].DocUsers;

  /*   const openDocDetails = (e) => {
    const docData = ownedDocs.filter((i) => i.id == e.target.id);
    setShow({
      docs: docData,
    });
  }; */

  const approvedBy = docDetails
    ? docDetails.filter((item) => {
        return item.isApproved === true;
      })
    : "";
  const pendingBy = docDetails
    ? docDetails.filter((item) => {
        return item.isApproved === false;
      })
    : "";

  return (
    <div>
      {props.docId.show ? (
        <>
          <div className="flex justify-center  items-center bg-koyu/80 overflow-x-hidden overflow-y-auto fixed inset-0 z-[9999] outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl ">
              <div className="border-1 border-logoColor rounded-lg shadow-lg relative flex flex-col w-full bg-koyu outline-none focus:outline-none">
                <div className="flex items-start justify-between p-3 border-b border-solid border-gray-300 rounded-t ">
                  <h3 className="text-3xl font=semibold">General Info</h3>
                  <button
                    type="button"
                    className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                    onClick={props.hide}
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
                <div className="relative p-0 flex ">
                  <div className="container p-5">
                    <div className="row">
                      <div className="col">
                        <h6 className="flex ">
                          Approved By: <span>{approvedBy.length}</span>
                        </h6>
                        <ul>
                          {approvedBy
                            ? approvedBy.map((item) => (
                                <li className="flex " key={item.id}>
                                  <Link to={`/users/${item.UserId}`}>
                                    {item.sharedTo}
                                  </Link>
                                </li>
                              ))
                            : "No Data"}
                        </ul>
                      </div>
                      <div className="col border-l-2 border-logoColor">
                        <h6 className="flex ">
                          Pending: <span>{pendingBy.length}</span>
                        </h6>
                        <ul>
                          {pendingBy
                            ? pendingBy.map((item) => (
                                <li className="flex " key={item.id}>
                                  <Link to={`/users/${item.UserId}`}>
                                    {item.sharedTo}
                                  </Link>
                                </li>
                              ))
                            : "No Data"}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}

export default DocDetails;
