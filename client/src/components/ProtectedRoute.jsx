import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children, roles = [] }) => {
  const { auth } = useAuth();

  if (!auth) return <Navigate to="/Auth" />;
  if (roles.length && !roles.includes(auth.user.role)) return <Navigate to="/unauthorized" />;

  return children;
};

export default ProtectedRoute;
