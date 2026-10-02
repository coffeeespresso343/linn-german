import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "./useAuth";

const Loading = () => <p className="p-8 text-muted">Loading...</p>;

export function ProtectedRoute() {
  const { user, loading } = useAuth();

  const location = useLocation();

  if (loading) return <Loading />;

  if (!user) return <Navigate to="/login" replace state={{ from: location.pathname }} />;

  return <Outlet />;
}

export function AdminRoute() {
  const { user, isAdmin, loading } = useAuth();

  const location = useLocation();

  if (loading) return <Loading />;

  if (!user) return <Navigate to="/login" replace state={{ from: location.pathname }} />;

  if (!isAdmin) return <Navigate to="/dashboard" replace />;

  return <Outlet />;
}

export function GuestRoute() {
  const { user, loading } = useAuth();
  if (loading) return <Loading />;
  if (user) return <Navigate to="/dashboard" replace />;
  return <Outlet />;
}
