import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

const ProtectedRoute = ({ allowedRoles }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const userRole = user.role?.toLowerCase();
  // Treat 'teammember' as 'member'
  const normalizedUserRole = userRole === "teammember" ? "member" : userRole;
  
  if (allowedRoles && !allowedRoles.map(r => r.toLowerCase()).includes(normalizedUserRole)) {
    if (normalizedUserRole === "admin") return <Navigate to="/admin" replace />;
    if (normalizedUserRole === "manager") return <Navigate to="/manager" replace />;
    if (normalizedUserRole === "member") return <Navigate to="/member" replace />;
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
