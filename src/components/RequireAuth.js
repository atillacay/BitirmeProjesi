import React from "react";
import { Navigate, useParams } from "react-router-dom";

function RequireAuth({ children, redirectTo }) {
  let isAuth = localStorage.getItem("auth-token");

  return isAuth ? children : <Navigate to={redirectTo} />;
}

export function RequireToken({ children, redirectTo }) {
  let { token } = useParams();
  return token ? children : <Navigate to={redirectTo} />;
}

export default RequireAuth;
