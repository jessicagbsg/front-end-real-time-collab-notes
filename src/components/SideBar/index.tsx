import { Dispatch, ElementRef, useEffect, useRef, useState } from "react";
import { ChevronsLeft, CirclePlus, Home, MenuIcon, NotebookIcon, Trash2 } from "lucide-react";
import { useMediaQuery } from "usehooks-ts";
import { Spinner, UserItem } from "@/components";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { useNotes } from "@/hooks/useNotes";
import { Path } from "@/config/path";
import { useAuthContext } from "@/context/AuthProvider";
import { io } from "socket.io-client";
import { API_URL } from "@/config/variables";
import { Note } from "@/types";

const socket = io(`${API_URL}${Path.note}`, {
  extraHeaders: {
    access_token: localStorage.getItem("token") as string,
  },
  auth: {
    token: localStorage.getItem("token") as string,
  },
});

export const SideBar = ({
  isCollapsed,
  setIsCollapsed,
}: {
  isCollapsed: boolean;
  setIsCollapsed: Dispatch<React.SetStateAction<boolean>>;
}) => {
  const navigate = useNavigate();
  const { notes, addNote, setNotes, isLoading: loadingNotes } = useNotes();
  const { user, isLoading: loadingUser } = useAuthContext();
  const pathname = window.location.pathname;
  const isMobile = useMediaQuery("(max-width: 640px)");
  const isResizingRef = useRef(false);
  const sideBarRef = useRef<ElementRef<"aside">>(null);
  const navBarRef = useRef<ElementRef<"div">>(null);
  const [isResetting, setIsResetting] = useState(false);

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

  const handleCreateNote = async () => {
    if (!user?.id) return;
    await addNote({ ownerId: user.id }).then((note) => {
      navigate(`${Path.notes}/${note.room}`);
      setNotes((prev) => [
        ...prev,
        {
          ownerId: user.id,
          room: note.room,
          title: note.title,
          content: note.content,
          members: note.members,
        } as Note,
      ]);
    });
  };

  const handleDeleteNote = (noteId: string, noteRoom: string, index: number) => {
    socket.emit("delete-note", { room: noteRoom });

    const updatedNotes = notes.filter((note) => note.id !== noteId);
    setNotes(updatedNotes);

    if (updatedNotes.length > 0) {
      const nextNote = updatedNotes[index] || updatedNotes[index - 1];
      navigate(`${Path.notes}/${nextNote.room}`);
    } else {
      navigate("/home");
    }
  };

  useEffect(() => {
    if (isMobile) handleCollapse();
    else handleResetWidth();
  }, [isMobile]);

  useEffect(() => {
    if (isMobile) handleCollapse();
  }, [pathname, isMobile]);

  if (loadingUser || loadingNotes) {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

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

        <div className="p-2 hover:bg-primary/5">
          <UserItem />
        </div>

        <div
          onClick={() => navigate("/home")}
          className="pl-5 flex items-center gap-x-2 p-2 hover:bg-primary/5 cursor-pointer w-full"
        >
          <Home className="h-4 w-4 text-muted-foreground" />
          <p className="text-muted-foreground text-sm">Home</p>
        </div>

        <div className="p-3 mt-3 w-full flex items-center">
          <p className="text-muted-foreground text-xs">Notes</p>
          <span className="h-[1px] w-full mx-3 bg-primary/10"></span>
          <CirclePlus
            onClick={handleCreateNote}
            className="h-6 w-6 text-muted-foreground/50 cursor-pointer"
          />
        </div>

        {notes.map((note, index) => (
          <div
            key={note.id}
            className={cn(
              "flex items-center justify-between hover:bg-primary/5",
              pathname.includes(note.room) && "bg-primary/5"
            )}
          >
            <div
              key={note.id}
              onClick={() => navigate(`${Path.notes}/${note.room}`)}
              className={cn("px-5 py-2 flex items-center gap-x-2  cursor-pointer w-full")}
            >
              <NotebookIcon
                className={cn(
                  "h-4 w-4 text-muted-foreground",
                  !note.title && "text-muted-foreground/30"
                )}
              />
              <p
                className={cn(
                  "text-muted-foreground text-sm w-2/3 line-clamp-1",
                  !note.title && "text-muted-foreground/30"
                )}
              >
                {note.title ?? "Untitled"}
              </p>
            </div>
            <div
              className={"px-3 py-2 cursor-pointer"}
              onClick={() => handleDeleteNote(note.id, note.room, index)}
            >
              <Trash2
                className={cn(
                  "h-4 w-4 text-muted-foreground hover:text-red-500 ",
                  !note.title && "text-muted-foreground/30"
                )}
              />
            </div>
          </div>
        ))}

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
