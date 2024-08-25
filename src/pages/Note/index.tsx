import { ChangeEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import { InternalLayout, Textarea, useToast } from "@/components";
import { API_URL } from "@/config/variables";
import { Path } from "@/config/path";
import { useNotes } from "@/hooks/useNotes";
import { Share2 } from "lucide-react";
import { isString } from "lodash";
import { useAuth } from "@/hooks/useAuth";
import { formatDistance, subDays } from "date-fns";

const socket = io(`${API_URL}${Path.note}`, {
  extraHeaders: {
    access_token: localStorage.getItem("token") as string,
  },
  auth: {
    token: localStorage.getItem("token") as string,
  },
});

export const Note = () => {
  const { roomId } = useParams();
  const { note } = useNotes();
  const { toast } = useToast();
  const { user } = useAuth();
  const [noteContent, setNoteContent] = useState({
    title: note?.title ?? "",
    content: note?.content ?? "",
    updatedAt: "",
  });

  useEffect(() => {
    if (note) {
      const updatedDate = new Date(note.updatedAt?.toString() ?? subDays(new Date(), 1).toString());
      const now = new Date();
      const diff = formatDistance(updatedDate, now, { addSuffix: true });
      setNoteContent({
        title: note.title ?? "",
        content: note.content ?? "",
        updatedAt: diff,
      });
    }
  }, [note]);

  useEffect(() => {
    socket.emit("join-room", { room: roomId });

    socket.on("join-room", (content: string | { user: string; message: string }) => {
      const message = isString(content) ? content : content.message;
      const userId = isString(content) ? "" : content.user;
      if (userId === user.id) return;
      toast({ title: "Joined Note", description: message });
    });

    socket.on("leave-room", (content: string | { user: string; message: string }) => {
      const message = isString(content) ? content : content.message;
      const userId = isString(content) ? "" : content.user;
      if (userId === user.id) return;
      toast({ title: "Left Note", description: message });
    });

    return () => {
      socket.off("join-room");
    };
  }, [roomId]);

  useEffect(() => {
    socket.on("edit-note", (updatedNote: { title: string; content: string }) => {
      setNoteContent({ ...updatedNote, updatedAt: "just now" });
    });

    return () => {
      socket.off("edit-note");
    };
  }, []);

  const handleEditNoteTitle = (title: ChangeEvent<HTMLTextAreaElement>) => {
    title.preventDefault();
    setNoteContent((prevContent) => ({
      ...prevContent,
      title: title.target.value,
    }));
    socket.emit("edit-note", {
      room: roomId,
      title: title.target.value,
      content: noteContent.content,
    });
  };

  const handleEditNoteContent = (content: ChangeEvent<HTMLTextAreaElement>) => {
    content.preventDefault();

    setNoteContent((prevContent) => ({
      ...prevContent,
      content: content.target.value,
    }));
    socket.emit("edit-note", {
      room: roomId,
      title: noteContent.title,
      content: content.target.value,
    });
  };

  const handleShareNote = () => {
    navigator.clipboard.writeText(`${window.location.origin}/notes/${roomId}`);
    toast({ title: "Copied", description: "Link copied to clipboard", color: "success" });
  };

  return (
    <InternalLayout>
      <div className="relative h-full flex flex-col">
        <Share2
          className="z-[999999] absolute w-6 h-6 top-2 right-4 text-muted-foreground cursor-pointer"
          onClick={handleShareNote}
        />
        <div className="flex h-full flex-col gap-y-3 mt-20 mx-10">
          <div className="flex items-center w-full justify-end gap-x-2">
            <p className="text-sm text-muted-foreground">Last updated: {noteContent.updatedAt}</p>
          </div>
          <div className="min-h-2/6 w-full ">
            <Textarea
              className="text-2xl sm:text-3xl h-full w-full md:text-4xl font-bold"
              onChange={handleEditNoteTitle}
              placeholder="Title"
              value={noteContent.title}
            />
          </div>
          <div className="h-full w-full pb-10">
            <Textarea
              className="h-full w-full"
              onChange={handleEditNoteContent}
              placeholder="Content"
              value={noteContent.content}
            />
          </div>
        </div>
      </div>
    </InternalLayout>
  );
};
