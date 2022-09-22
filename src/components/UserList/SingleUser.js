import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getUserDetails } from "../../features/userListSlice";
import LoadingSpinner from "../Spinner";
import { logout } from ".././../features/loginLogoutSlice";
import pdficon from "../../pdficon.png";

function SingleUser() {
  const baseUrl = process.env.REACT_APP_API_BASE_URL;
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

  console.log(approveDocs);
  return (
    <div className="container">
      <div className="row">
        <div>
          {userDetails.isLoading === "loading" ? (
            <LoadingSpinner />
          ) : (
            <div className="row text-xs __sm:mt-[200px]">
              <div className="col-6">
                <h5 className="underline">Profile Info</h5>
                <p>
                  Name: <span>{userDetails.name}</span>
                </p>
                <p>
                  Lastname: <span>{userDetails.lastName}</span>
                </p>
                <p>
                  Email: <span>{userDetails.email}</span>
                </p>
                <p>
                  Department: <span>{userDetails.department}</span>
                </p>
                <p>
                  Role: <span>{userDetails.role}</span>
                </p>
              </div>
              <div className="col-6">
                <h5 className="underline">Received Docs</h5>
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
          )}
        </div>
      </div>
      <div className="row">
        <div className="col">
          <div className="text-center text-xs">
            <h6>Pending Docs</h6>
            <div className="doc-wrapper my-[20px] flex justify-between sm:justify-center md:justify-center flex-wrap rounded-lg p-2 shadow-[0_0px_15px_0px_rgba(255,159,28)] mb-5">
              {approveDocs
                ? approveDocs.map((doc) => (
                    <div
                      className="col-lg-3 col-md-4 col-sm-8 m-3 p-3 rounded-lg border border-gray-200 hover:scale-105 hover:shadow-[0_0px_15px_0px_rgba(255,159,28)] text-white"
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
                            className="text-white bg-blue-900  font-xs rounded-lg text-sm py-2.5 text-center inline-flex items-center "
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
        <dic classNamecol>
          <div className="text-center text-xs">
            <h6>Approved Docs</h6>
            <div className="my-[20px] flex justify-between sm:justify-center md:justify-center flex-wrap rounded-lg p-2 shadow-[0_0px_15px_0px_rgba(46,196,182)] mb-5">
              {pendingDocs
                ? pendingDocs.map((doc) => (
                    <div
                      className="col-lg-3 col-md-4 col-sm-8 m-3 p-3 rounded-lg border border-gray-200 hover:scale-105 hover:shadow-[0_0px_15px_0px_rgba(46,196,182)]  text-white"
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
                            className="text-white bg-blue-900   font-xs rounded-lg text-sm py-2.5 text-center inline-flex items-center "
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
        </dic>
      </div>
    </div>
  );
}

export default SingleUser;
