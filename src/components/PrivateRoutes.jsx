import { useAuth } from "../context/authContext";
import { Outlet, Navigate } from "react-router-dom";

export default function PrivateRoutes() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return user ? <Outlet /> : <Navigate to="/login" />;
}
