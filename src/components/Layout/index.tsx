import { ReactNode } from "react";
import { Navbar } from "@/components/Navbar";
import { Toaster } from "../ui/toaster";

export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="h-full">
      <Navbar />
      <main className="h-full mx-3 sm:mx-0 mt-12 sm:mt-0">{children}</main>
      <Toaster />
    </div>
  );
};
