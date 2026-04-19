import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

/** Map JWT / signup role strings to route keys used in `allowedRoles`. */
const normalizeUserRole = (role) => {
  if (role == null || role === "") return "";
  const s = String(role).trim();
  const lower = s.toLowerCase();

  if (lower === "teammember" || lower === "team member") return "member";
  if (lower === "projectmanager" || lower === "project manager") return "manager";
  if (lower === "admin") return "admin";
  if (lower === "manager") return "manager";
  if (lower === "member") return "member";

  return lower;
};

const ProtectedRoute = ({ allowedRoles }) => {
  const { token, user } = useAuth();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const normalizedUserRole = normalizeUserRole(user.role);

  if (
    allowedRoles &&
    !allowedRoles
      .map((r) => String(r).toLowerCase())
      .includes(normalizedUserRole)
  ) {
    if (normalizedUserRole === "admin") return <Navigate to="/admin" replace />;
    if (normalizedUserRole === "manager")
      return <Navigate to="/manager" replace />;
    if (normalizedUserRole === "member")
      return <Navigate to="/member" replace />;
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
