import { ChangeEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { io, Socket } from "socket.io-client";
import { Textarea, useToast } from "@/components";
import { API_URL } from "@/config/variables";
import { Path } from "@/config/path";
import { useNotes } from "@/hooks/useNotes";
import { Share2 } from "lucide-react";
import { isString } from "lodash";
import { formatDistance, subDays } from "date-fns";
import { useAuthContext } from "@/context/AuthProvider";

const socket: Socket = io(`${API_URL}${Path.note}`, {
  extraHeaders: {
    access_token: localStorage.getItem("token") as string,
  },
  auth: {
    token: localStorage.getItem("token") as string,
  },
});

export const Note = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const { note } = useNotes();
  const { toast } = useToast();
  const { user } = useAuthContext();
  const [noteContent, setNoteContent] = useState({
    title: note?.title ?? "",
    content: note?.content ?? "",
    updatedAt: "",
  });

  useEffect(() => {
    if (note) {
      const updatedDate = new Date(note.updatedAt || subDays(new Date(), 1).toString());
      const diff = formatDistance(updatedDate, new Date(), { addSuffix: true });
      setNoteContent((prev) => ({
        ...prev,
        title: note.title ?? "",
        content: note.content ?? "",
        updatedAt: diff,
      }));
    }
  }, [note]);

  useEffect(() => {
    if (!roomId) return;

    socket.emit("join-room", { room: roomId });

    const handleJoinRoom = (content: string | { user: string; message: string }) => {
      const message = isString(content) ? content : content.message;
      const userId = isString(content) ? "" : content.user;
      if (userId !== user?.id) {
        toast({ title: "Joined Note", description: message });
      }
    };

    const handleLeaveRoom = (content: string | { user: string; message: string }) => {
      const message = isString(content) ? content : content.message;
      const userId = isString(content) ? "" : content.user;
      if (userId !== user?.id) {
        toast({ title: "Left Note", description: message });
      }
    };

    socket.on("join-room", handleJoinRoom);
    socket.on("leave-room", handleLeaveRoom);

    return () => {
      socket.off("join-room", handleJoinRoom);
      socket.off("leave-room", handleLeaveRoom);
    };
  }, [roomId, user?.id, toast]);

  useEffect(() => {
    const handleEditNote = (updatedNote: { title: string; content: string }) => {
      setNoteContent({ ...updatedNote, updatedAt: "just now" });
    };

    socket.on("edit-note", handleEditNote);

    return () => {
      socket.off("edit-note", handleEditNote);
    };
  }, []);

  const handleEditNote = (e: ChangeEvent<HTMLTextAreaElement>, field: "title" | "content") => {
    const value = e.target.value;
    setNoteContent((prev) => ({
      ...prev,
      [field]: value,
    }));

    socket.emit("edit-note", {
      room: roomId,
      title: field === "title" ? value : noteContent.title,
      content: field === "content" ? value : noteContent.content,
    });
  };

  const handleShareNote = () => {
    navigator.clipboard.writeText(`${window.location.origin}/notes/${roomId}`);
    toast({ title: "Copied", description: "Link copied to clipboard", color: "success" });
  };

  return (
    <div className="relative h-full flex flex-col">
      <Share2
        className="z-[999999] absolute w-6 h-6 top-2 right-4 text-muted-foreground cursor-pointer"
        onClick={handleShareNote}
      />
      <div className="flex h-full flex-col gap-y-3 mt-20 mx-10">
        <div className="flex items-center w-full justify-end gap-x-2">
          <p className="text-sm text-muted-foreground">Last updated: {noteContent.updatedAt}</p>
        </div>
        <div className="min-h-2/6 w-full">
          <Textarea
            className="text-2xl sm:text-3xl h-full w-full md:text-4xl font-bold"
            onChange={(e) => handleEditNote(e, "title")}
            placeholder="Title"
            value={noteContent.title}
          />
        </div>
        <div className="h-full w-full pb-10">
          <Textarea
            className="h-full w-full"
            onChange={(e) => handleEditNote(e, "content")}
            placeholder="Content"
            value={noteContent.content}
          />
        </div>
      </div>
    </div>
  );
};
