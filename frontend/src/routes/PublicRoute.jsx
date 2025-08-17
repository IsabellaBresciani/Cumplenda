import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import React from "react";

const PublicRoute = ({ children }) => {

  const { isAuthenticated } = useContext(AuthContext);

  if (isAuthenticated) return <Navigate to="/" />;

  return children;
};

export default PublicRoute;