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
    <div className=" container min-h-screen -mt-[75px] lg:pt-[100px]">
      <div className="row text-2xl  profile">
        <h1 className="">User List</h1>
      </div>
      <div className=" row mt-4 ">
        <div className="col">
          {isLoading === "loading" ? (
            <LoadingSpinner />
          ) : (
            <table className="usersTable shadow-lg bg-white border-separate over">
              <thead className="">
                <tr>
                  <th>User ID</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Department</th>
                  <th>Role</th>
                </tr>
              </thead>
              <tbody className="">
                {userList.map((user, index) => {
                  return (
                    <tr key={index}>
                      <td>
                        <Link to={`/users/${user.id}`}>
                          {" "}
                          <button
                            type="button"
                            className="px-6 py-2.5 bg-pendingDoc font-medium text-xs leading-tight w-100 rounded shadow-md hover:bg-aprovedDoc hover:shadow-lg transition duration-150 ease-in-out"
                          >
                            {user.id}
                          </button>
                        </Link>
                      </td>
                      <td>{user.name}</td>
                      <td>{user.lastName}</td>
                      <td>{user.email}</td>
                      <td>{user.Department.name}</td>
                      <td>{user.Role.name}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserList;
