import { ElementRef, useEffect, useRef, useState } from "react";
import { ChevronsLeft, MenuIcon } from "lucide-react";
import { useMediaQuery } from "usehooks-ts";
import { Spinner, Button } from "@/components";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";

export const SideBar = () => {
  const pathname = window.location.pathname;
  const isMobile = useMediaQuery("(max-width: 640px)");
  const { isAuthenticated, user } = useAuth();
  const isResizingRef = useRef(false);
  const sideBarRef = useRef<ElementRef<"aside">>(null);
  const navBarRef = useRef<ElementRef<"div">>(null);
  const [isResetting, setIsResetting] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(isMobile);

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.preventDefault();
    event.stopPropagation();

    isResizingRef.current = true;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (event: MouseEvent) => {
    if (!isResizingRef.current) return;
    let newWith = event.clientX;
    if (newWith < 240) newWith = 240;
    if (newWith > 480) newWith = 480;

    if (sideBarRef.current && navBarRef.current) {
      sideBarRef.current.style.width = `${newWith}px`;
      navBarRef.current.style.setProperty("left", `${newWith}px`);
      navBarRef.current.style.setProperty("width", `calc(100% - ${newWith}px)`);
    }
  };

  const handleMouseUp = () => {
    isResizingRef.current = false;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  const handleResetWidth = () => {
    if (!(sideBarRef.current && navBarRef.current)) return;
    setIsResetting(true);
    setIsCollapsed(false);
    sideBarRef.current.style.width = isMobile ? "100%" : "240px";
    navBarRef.current.style.setProperty("left", isMobile ? "100%" : "240px");
    navBarRef.current.style.setProperty("width", isMobile ? "0" : `calc(100% - 240px)`);
    setTimeout(() => setIsResetting(false), 300);
  };

  const handleCollapse = () => {
    if (!(sideBarRef.current && navBarRef.current)) return;
    setIsCollapsed(true);
    setIsResetting(true);
    sideBarRef.current.style.width = "0";
    navBarRef.current.style.setProperty("left", "0");
    navBarRef.current.style.setProperty("width", "100%");
    setTimeout(() => setIsResetting(false), 300);
  };

  useEffect(() => {
    if (isMobile) handleCollapse();
    else handleResetWidth();
  }, [isMobile]);

  useEffect(() => {
    if (isMobile) handleCollapse();
  }, [pathname, isMobile]);

  return (
    <>
      <aside
        ref={sideBarRef}
        className={cn(
          `group/sidebar h-full bg-secondary overflow-y-auto 
          relative flex w-60 flex-col z-[99999] sm:z-auto`,
          isResetting && "transition-all ease-in-out duration-300",
          isMobile && "w-0 absolute left-0"
        )}
      >
        <div
          role="button"
          onClick={handleCollapse}
          className={cn(
            `h-6 w-6 text-muted-foreground rounded-sm
          hover:bg-neutral-300 absolute top-3 right-2 opacity-0
            group-hover/sidebar:opacity-100 transition`,
            isMobile && "opacity-100"
          )}
        >
          <ChevronsLeft className="h-6 w-6" />
        </div>
        <div className="p-2">
          {isAuthenticated && user ? (
            <Button size="sm" asChild>
              <div className="h-fit w-fit bg-red rounded-full">
                {user.firstName[0].toUpperCase()}
                {user.lastName[0].toUpperCase()}
              </div>
            </Button>
          ) : (
            <Spinner />
          )}
        </div>
        <div className="p-2">Action items</div>
        <div className="p-2">Notes</div>

        <div
          onMouseDown={handleMouseDown}
          onClick={handleResetWidth}
          className={`opacity-0 group-hover/sidebar:opacity-100 
          cursor-ew-resize absolute h-full w-1 bg-primary/10 right-0 top-0`}
        />
      </aside>
      <div
        ref={navBarRef}
        className={cn(
          `absolute top-0 left-60 w-[calc(100%-240px)] z-[99999]`,
          isResetting && "transition-all ease-in-out duration-300",
          !isCollapsed && "hidden",
          isMobile && "w-full left-0"
        )}
      >
        <nav className="bg-transparent px-3 py-2 w-full">
          {isCollapsed && <MenuIcon role="button" onClick={handleResetWidth} className="h-6 w-6" />}
        </nav>
      </div>
    </>
  );
};
