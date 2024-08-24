import { ReactNode } from "react";
import { SideBar } from "../SideBar";
import { useMediaQuery } from "usehooks-ts";
import { cn } from "@/lib/utils";

export const InternalLayout = ({ children }: { children: ReactNode }) => {
  const isMobile = useMediaQuery("(max-width: 640px)");

  return (
    <div className="h-full flex">
      <SideBar />
      <main className={cn("h-full", isMobile ? "w-full" : "w-[calc(100%-240px)]")}>{children}</main>
    </div>
  );
};
