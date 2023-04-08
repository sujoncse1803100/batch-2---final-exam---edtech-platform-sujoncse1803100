import React from "react";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { userLoggedIn } from "../../features/auth/authSlice";

const AdminPrivateRoute = ({ children }) => {
  const dispatch = useDispatch();

  const loggedInUser = JSON.parse(localStorage.getItem("user"));

  loggedInUser?.accessToken && dispatch(userLoggedIn({ ...loggedInUser }));

  return loggedInUser?.user?.role === "admin" ? (
    children
  ) : (
    <Navigate to="/admin/login" />
  );
};

export default AdminPrivateRoute;
