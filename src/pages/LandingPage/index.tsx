import { Heading, Heros, Footer } from "@/components";
import { Layout } from "../../components/Layout";

export function LandingPage() {
  return (
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
  );
}
