import { ReactNode } from "react";
import { Navbar } from "@/components/Navbar";

export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="h-full">
      <Navbar />
      <main className="h-full">{children}</main>
    </div>
  );
};
