import { useAuth } from "@/hooks/useAuth";
import { Navigate } from "react-router-dom";

export const PrivateRoute = ({ element }: { element: JSX.Element }) => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? element : <Navigate to="/login" />;
};
