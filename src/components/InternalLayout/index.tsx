import { ReactNode, useState } from "react";
import { SideBar } from "../SideBar";
import { useMediaQuery } from "usehooks-ts";
import { cn } from "@/lib/utils";

export const InternalLayout = ({ children }: { children: ReactNode }) => {
  const isMobile = useMediaQuery("(max-width: 640px)");
  const [isCollapsed, setIsCollapsed] = useState(isMobile);

  return (
    <div className="h-full flex">
      <SideBar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <main
        className={cn(
          "h-full",
          isCollapsed && "w-full",
          isMobile ? "w-full" : "w-[calc(100%-240px)]"
        )}
      >
        {children}
      </main>
    </div>
  );
};
