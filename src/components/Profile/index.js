import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { userProfile } from "../../features/userSlice";
import LoadingSpinner from "../Spinner";
import { Link, useNavigate } from "react-router-dom";
import AddDoc from "../AddDoc";
import DocDetails from "./DocDetails";
import { logout } from "../../features/loginLogoutSlice";
import pdficon from "../../pdficon.png";

function Profile() {
  const baseUrl = process.env.REACT_APP_API_BASE_URL;
  const profileData = useSelector((state) => state.loggedInUser);
  const ownedDocs = useSelector((state) => state.loggedInUser.docs);
  const sharedWith = useSelector((state) => state.loggedInUser.sharedWith);
  const receivedDocs = useSelector((state) => state.loggedInUser.receivedDocs);
  const navigate = useNavigate();

  const approved = sharedWith
    ? sharedWith.filter((item) => item.isApproved === true)
    : "";
  const pending = sharedWith
    ? sharedWith.filter((item) => item.isApproved === false)
    : "";

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userProfile())
      .unwrap()
      .catch((error) => {
        if (error) {
          dispatch(logout());
          navigate("login");
        }
      });
  }, []);

  const [showModal, setShow] = useState({});

  const openDocDetails = (e) => {
    const docData = ownedDocs.filter((i) => i.id == e.target.id);
    setShow({
      show: true,
      docs: docData,
    });
  };
  const handleHide = () => {
    setShow(false);
  };

  return (
    <div className="container min-h-screen -mt-[75px] lg:pt-[100px]">
      <div className="row">
        <div className="col-sm-12">
          {profileData.isLoading === "loading" ? (
            <LoadingSpinner />
          ) : (
            <div className="row profile profile-page">
              <div className="col-sm-4 col-md-4">
                <div className="">
                  <h5>Profile Info</h5>
                  <p>
                    Name: <span>{profileData.name}</span>
                  </p>
                  <p>
                    Lastname: <span>{profileData.lastName}</span>
                  </p>
                  <p>
                    Email: <span className="email">{profileData.email}</span>
                  </p>
                  <p>
                    Department: <span>{profileData.department}</span>
                  </p>
                  <p>
                    Role: <span>{profileData.role}</span>
                  </p>
                </div>
              </div>
              <div className="col-sm-4 col-md-4">
                <div className="">
                  <h5>Uploaded Docs</h5>
                  <p>
                    Owned Docs: <span>{ownedDocs ? ownedDocs.length : ""}</span>
                  </p>
                  <p>
                    Shared With:{" "}
                    <span>{sharedWith ? sharedWith.length : ""}</span>
                  </p>
                  <p>
                    Approved: <span>{approved.length}</span>
                  </p>
                  <p>
                    Pending: <span>{pending.length}</span>
                  </p>
                </div>
              </div>

              <div className="col-sm-4 col-md-4">
                <div className="">
                  <h5>Received Docs</h5>
                  <p>
                    Total:{" "}
                    <span>{receivedDocs ? receivedDocs.length : ""}</span>
                  </p>
                  <p>
                    Approved:{" "}
                    <span>
                      {profileData.myApprovals
                        ? profileData.myApprovals.length
                        : ""}
                    </span>
                  </p>
                  <p>
                    Pending:{" "}
                    <span>
                      {profileData.myPendings
                        ? profileData.myPendings.length
                        : ""}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="row ">
        <div className="col-sm-12">
          <div className="text-center">
            <div className="lg:text-2lg p-2 ">
              <AddDoc />
              <DocDetails docId={showModal} hide={handleHide} />
            </div>
            <h2 className="text-[22px] mt-5">Uploaded Documents</h2>
            <div className="my-[20px] flex justify-between sm:justify-center md:justify-center flex-wrap rounded-lg p-2 shadow-[0_0px_15px_0px_rgba(255,159,28)] mb-5">
              {ownedDocs
                ? ownedDocs.map((doc) => (
                    <div
                      className="col-lg-3 col-md-4 col-sm-8 m-3 p-3 rounded-lg border border-gray-200 hover:scale-105 hover:shadow-[0_0px_15px_0px_rgba(255,159,28)] dark:bg-gray-800 dark:border-gray-700 text-white"
                      key={doc.id}
                    >
                      <Link
                        to={{
                          pathname: `/doc/${doc.docPath}`,
                          search: `?docId=${doc.id}`,
                        }}
                      >
                        <button
                          type="button"
                          className="text-white bg-blue-900 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm py-2.5 text-center inline-flex items-center dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
                        >
                          <img
                            className="w-10 h-13 ml-2 mr-3"
                            src={pdficon}
                            alt=""
                          />
                          <span>{doc.name}</span>
                        </button>
                      </Link>
                      <div className="card-body d-flex flex-column">
                        <h6>Shared with: {doc.DocUsers.length}</h6>
                        <h6>
                          Approved:{" "}
                          {
                            doc.DocUsers.filter((item) => {
                              return item.isApproved === true;
                            }).length
                          }
                        </h6>
                        <h6>
                          Pending:{" "}
                          {
                            doc.DocUsers.filter((item) => {
                              return item.isApproved === false;
                            }).length
                          }
                        </h6>
                        <div className="add-doc lg:text-2lg p-2 mt-2">
                          <Link
                            className="bg-logoColor rounded p-1"
                            to="##"
                            id={doc.id}
                            onClick={(e) => openDocDetails(e)}
                          >
                            Details
                          </Link>
                        </div>
                      </div>
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

export default Profile;
