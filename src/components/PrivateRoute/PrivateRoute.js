import React from "react";
import useAuth from "./useAuth";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const loggedInUser = useAuth();
  return loggedInUser ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
