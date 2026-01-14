import { useAuth } from "@/context/authContext";
import { Outlet, Navigate } from "react-router-dom";
import { Spinner } from "./ui/spinner";

export default function PrivateRoutes() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <Spinner className="h-32 w-32 text-primary" />
      </div>
    );
  }

  return user ? <Outlet /> : <Navigate to="/login" />;
}
