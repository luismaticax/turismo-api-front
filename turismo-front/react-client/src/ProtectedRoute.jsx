import { Navigate, Outlet } from "react-router-dom";
import { useAuthAdmin } from "./context/AuthContext";

function ProtectedRoute() {
  const { user, isAuthenticated } = useAuthAdmin();

  if (!isAuthenticated) return <Navigate to="/" replace />;

  return <Outlet />;
}
export default ProtectedRoute;
