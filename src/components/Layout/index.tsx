import { ReactNode } from "react";
import { Navbar } from "@/components/Navbar";
import { Toaster } from "../ui/toaster";

export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="h-full">
      <Navbar />
      <main className="h-full">{children}</main>
      <Toaster />
    </div>
  );
};
