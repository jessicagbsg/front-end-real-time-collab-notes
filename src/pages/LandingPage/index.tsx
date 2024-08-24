import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Heading, Heros, Footer, ExternalLayout } from "@/components";

export function LandingPage() {
  const { isLoading, isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/home" />;
  }

  return (
    !isLoading && (
      <ExternalLayout>
        <div className="h-full flex flex-col">
          <div
            className={`flex flex-col flex-1 items-center justify-center 
          text-center gap-y-8 px-6 pb-10`}
          >
            <Heading />
            <Heros />
          </div>
          <Footer />
        </div>
      </ExternalLayout>
    )
  );
}
