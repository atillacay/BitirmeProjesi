import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getUsers, deleteUser } from "../../features/userListSlice";
import LoadingSpinner from "../Spinner";
import { logout } from "../../features/loginLogoutSlice";
import AddUser from "../AddUser";
import { useState } from "react";
import EditUser from "../EditUser";

function UserList() {
  const userList = useSelector((state) => state.userList.users);
  const isLoading = useSelector((state) => state.userList);
  const [deleted, setDeleted] = useState(false);

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
  const handleDelete = (e) => {
    const userId = { id: e };
    dispatch(deleteUser(userId))
      .unwrap()
      .then((resp) => setDeleted(true))
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    dispatch(getUsers());
  }, [deleted, dispatch]);
  return (
    <div className=" container h-screen -mt-[75px]">
      <div className=" row __sm:mt-[200px] lg:mt-[100px] ">
        <div className=" text-2xl flex justify-around my-4 ">
          <div>
            <h1 className="">User List</h1>
          </div>
          <div>
            <AddUser />
          </div>
        </div>

        <div className="col">
          {isLoading === "loading" ? (
            <LoadingSpinner />
          ) : (
            <>
              <div className="text-white flex  justify-center row">
                {userList.map((user, index) => {
                  return (
                    <div
                      key={user.id}
                      className="col-12 col-md-3 border text-center border-white rounded-lg m-2 p-2"
                    >
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
                      <div className="col flex items-center justify-center p-2">
                        <Link
                          to={`/users/${user.id}`}
                          type="button"
                          className="col-4 px-3 py-2 m-1 bg-indigo-300 text-koyu font-medium text-sm leading-tight rounded shadow-md hover:bg-aprovedDoc hover:shadow-lg transition duration-150 ease-in-out"
                        >
                          Details
                        </Link>
                        <EditUser userId={user.id} />
                        <button
                          className="col-4 px-3 py-2 m-1 bg-indigo-300 text-koyu font-medium text-sm leading-tight rounded shadow-md hover:bg-aprovedDoc hover:shadow-lg transition duration-150 ease-in-out"
                          onClick={() => handleDelete(user.id)}
                        >
                          Delete
                        </button>
                      </div>
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
