import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import React from "react";

const PrivateRoute = ({ children, requiredRoles = [] }) => {

  const { currentUser } = useContext(AuthContext);

  if (!currentUser) return <Navigate to="/auth" />;

  if (requiredRoles.length > 0 && !requiredRoles.includes(currentUser.role)) {
    return <Navigate to="/unauthorized" />; 
  }

  return children;
};

export default PrivateRoute;