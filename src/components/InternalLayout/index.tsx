import { ReactNode } from "react";
import { SideBar } from "../SideBar";

export const InternalLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="h-full flex">
      <SideBar />
      <main>{children}</main>
    </div>
  );
};
