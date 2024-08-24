import { Button, InternalLayout, Spinner, useToast } from "@/components";
import { capitalize } from "lodash";
import { useAuth } from "@/hooks/useAuth";
import { BookOpen, PlusCircle } from "lucide-react";
import { useNotes } from "@/hooks/useNotes";
import { cn } from "@/lib/utils";
import { Path } from "@/config/path";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const Home = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { notes, isLoading, addNote, error } = useNotes();
  const { toast } = useToast();

  const handleCreateNote = async () => {
    if (!user.id) return;
    await addNote({ ownerId: user.id }).then((note) => {
      navigate(`${Path.note}/${note.room}`);
    });
  };

  useEffect(() => {
    if (!!error)
      toast({
        title: "Error",
        description: error || "An error occurred",
      });
  }, [error]);

  return (
    <InternalLayout>
      <div className="h-full flex flex-col">
        <h2 className="pl-10 pt-20 pb-10 text-2xl sm:text-3xl md:text-4xl font-bold ">
          Welcome, {capitalize(user?.firstName)} {capitalize(user?.lastName)}
        </h2>
        <div
          className={cn(
            "flex flex-col w-full flex-1 gap-y-8 p-8 overflow-hidden",
            !isLoading && notes.length
              ? "items-start justify-start"
              : "text-center items-center justify-center"
          )}
        >
          {isLoading && <Spinner />}
          {!isLoading && notes.length ? (
            <>
              <div className="flex w-full items-center justify-between">
                <div className="text-muted-foreground flex items-center gap-x-2">
                  <BookOpen className="h-4 w-4" />
                  <h3 className="text-sm sm:text-md font-semibold">Your notes</h3>
                </div>

                <Button variant="ghost" onClick={handleCreateNote}>
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Create a new note
                </Button>
              </div>
              <div className="h-full overflow-x-auto pb-6">
                <div className="flex gap-6 w-full flex-wrap">
                  {notes.map((note) => (
                    <div
                      key={note.id}
                      onClick={() => navigate(`${Path.note}/${note.room}`)}
                      className={`flex flex-col items-start min-w-44 w-full max-w-full 
                        sm:max-w-56 h-44  gap-y-2 p-4 cursor-pointer
                        bg-secondary/10 rounded-lg shadow-md`}
                    >
                      <h4
                        className={cn(
                          "text-base font-semibold text-primary line-clamp-1",
                          !note.title && "text-muted-foreground/40"
                        )}
                      >
                        {note.title ?? "Untitled"}
                      </h4>
                      <p
                        className={cn(
                          "text-sm text-muted-foreground line-clamp-5",
                          !note.content && "text-muted-foreground/30"
                        )}
                      >
                        {note.content ?? "No content"}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <>
              <img
                src="/hero-illo.png"
                alt=" "
                className="h-72 max-w-96 md:max-w-screen-sm object-contain"
              />
              <h3 className="text-base sm:text-lg md:text-xl font-semibold">
                Get started by creating a new note
              </h3>
              <Button onClick={handleCreateNote}>
                <PlusCircle className="h-4 w-4 mr-2" />
                Create a new note
              </Button>
            </>
          )}
        </div>
      </div>
    </InternalLayout>
  );
};
