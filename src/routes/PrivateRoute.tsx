import { InternalLayout, Spinner } from "@/components";
import { useAuthContext } from "@/context/AuthProvider";
import { Navigate } from "react-router-dom";

export const PrivateRoute = ({ element }: { element: JSX.Element }) => {
  const { isLoading, isAuthenticated } = useAuthContext();

  if (isLoading) {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (!isAuthenticated) return <Navigate to="/" />;

  return <InternalLayout>{element}</InternalLayout>;
};
