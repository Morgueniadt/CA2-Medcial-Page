import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, loggedIn, role, allowedRoles }) {
  if (!loggedIn) return <Navigate to="/login" replace />;
  if (allowedRoles && !allowedRoles.includes(role)) return <Navigate to="/" replace />;
  return children;
}
