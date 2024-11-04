import { useAuth } from "../context/authContext";
import { Outlet, Navigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

export default function PrivateRoutes() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <Loader2 className="h-32 w-32 animate-spin text-purple-400" />
      </div>
    );
  }

  return user ? <Outlet /> : <Navigate to="/login" />;
}
