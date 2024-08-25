import { Spinner } from "@/components";
import { useAuth } from "@/hooks/useAuth";
import { Navigate } from "react-router-dom";

export const PrivateRoute = ({ element }: { element: JSX.Element }) => {
  const { isLoading, isAuthenticated } = useAuth();

  if (isLoading) {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return isAuthenticated ? element : <Navigate to="/" />;
};
