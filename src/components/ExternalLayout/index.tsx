import { ReactNode } from "react";
import { Navbar } from "@/components";

export const ExternalLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="h-full">
      <Navbar />
      <main className="h-full mx-3 sm:mx-0 mt-12 sm:mt-0">{children}</main>
    </div>
  );
};
