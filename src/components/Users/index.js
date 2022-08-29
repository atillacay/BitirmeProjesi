import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUsers } from "../../features/userListSlice";
import { logout } from "../../features/loginLogoutSlice";

function Users() {
  const dispatch = useDispatch();
  const { users, loading } = useSelector((state) => state.userList);

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
      <div className="row">
        <div className="col">
          <h1>Users</h1>
          <ul>
            {loading === true ? (
              <p>Loading...</p>
            ) : (
              users.map((user) => <li key={user.id}>{user.name}</li>)
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Users;
