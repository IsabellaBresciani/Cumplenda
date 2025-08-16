import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";


const PrivateRoute = ({ children, requiredRoles = [] }) => {

  const { currentUser } = useContext(AuthContext);

  if (!currentUser) return <Navigate to="/login" />;

  if (requiredRoles.length > 0 && !requiredRoles.includes(currentUser.role)) {
    return <Navigate to="/unauthorized" />; 
  }

  return children;
};

export default PrivateRoute;