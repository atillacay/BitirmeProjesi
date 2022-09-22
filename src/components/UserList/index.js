import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getUsers } from "../../features/userListSlice";
import LoadingSpinner from "../Spinner";
import { logout } from "../../features/loginLogoutSlice";

function UserList() {
  const userList = useSelector((state) => state.userList.users);
  const isLoading = useSelector((state) => state.userList);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsers())
      .unwrap()
      .catch((error) => {
        if (error) {
          dispatch(logout());
        }
      });
  }, []);
  return (
    <div className=" container h-screen __sm:mt-[200px] lg:pt-[100px]">
      <div className="row text-2xl  ">
        <h1 className="">User List</h1>
      </div>
      <div className=" row mt-4 ">
        <div className="col">
          {isLoading === "loading" ? (
            <LoadingSpinner />
          ) : (
            <>
              <div className="text-white flex  justify-center row">
                {userList.map((user, index) => {
                  return (
                    <div className="col-12 col-md-4 border text-center border-white rounded-lg m-2 p-2">
                      <p className="capitalize">
                        <span>Name: </span>
                        {user.name} {user.lastName}
                      </p>
                      <p>
                        <span>e-mail: </span>
                        {user.email}
                      </p>
                      <p>
                        <span>Department: </span>
                        {user.Department.name}
                      </p>
                      <p>
                        <span>User Role: </span>
                        {user.Role.name}
                      </p>
                      <p>
                        <span>User Id: </span>
                        {user.id}
                      </p>
                      <Link to={`/users/${user.id}`}>
                        <button
                          type="button"
                          className="px-6 py-2.5 bg-indigo-300 text-koyu font-medium text-sm leading-tight w-50 rounded shadow-md hover:bg-aprovedDoc hover:shadow-lg transition duration-150 ease-in-out"
                        >
                          User Details
                        </button>
                      </Link>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserList;
