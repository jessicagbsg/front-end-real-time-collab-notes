import { Heading, Heros, Footer } from "@/components";
import { Layout } from "../../components/Layout";
import { useAuth } from "@/hooks/useAuth";
import { Navigate } from "react-router-dom";

export function LandingPage() {
  const { isLoading, isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/home" />;
  }

  return (
    !isLoading && (
      <Layout>
        <div className="min-h-[100vh] flex flex-col">
          <div
            className={`flex flex-col flex-1 items-center justify-center 
          text-center gap-y-8 px-6 pb-10`}
          >
            <Heading />
            <Heros />
          </div>
          <Footer />
        </div>
      </Layout>
    )
  );
}
