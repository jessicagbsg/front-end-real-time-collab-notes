import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import { Input, InternalLayout, useToast } from "@/components";
import { API_URL } from "@/config/variables";
import { Path } from "@/config/path";
import { useNotes } from "@/hooks/useNotes";

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
  const [noteContent, setNoteContent] = useState({ title: note?.title, content: note?.content });

  useEffect(() => {
    setNoteContent({ title: note?.title, content: note?.content });
  }, [note]);

  useEffect(() => {
    socket.emit("join-room", { room: roomId });

    socket.on("join-room", (message: string) => {
      toast({ title: "Joining", description: message });
    });

    return () => {
      socket.off("join-room");
    };
  }, [roomId]);

  useEffect(() => {
    socket.on("edit-note", (updatedNote: { title: string; content: string }) => {
      setNoteContent(updatedNote);
    });

    return () => {
      socket.off("edit-note");
    };
  }, []);

  const handleEditNoteTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedTitle = e.target.value;
    setNoteContent((prevContent) => ({
      ...prevContent,
      title: updatedTitle,
    }));
    socket.emit("edit-note", { room: roomId, title: updatedTitle, content: noteContent.content });
  };

  const handleEditNoteContent = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedContent = e.target.value;
    setNoteContent((prevContent) => ({
      ...prevContent,
      content: updatedContent,
    }));
    socket.emit("edit-note", {
      room: roomId,
      title: noteContent.title,
      content: updatedContent,
    });
  };

  return (
    <InternalLayout>
      <div className="h-full flex flex-col">
        <h2 className="ml-10 mt-10 text-2xl sm:text-3xl md:text-4xl font-bold ">
          {noteContent.title ?? "untitled"}
        </h2>
        <Input value={noteContent.title} onChange={handleEditNoteTitle} />
        <h2 className="ml-10 mt-10 text-2xl sm:text-3xl md:text-4xl font-bold ">
          {noteContent.content}
        </h2>
        <Input value={noteContent.content} onChange={handleEditNoteContent} />
      </div>
    </InternalLayout>
  );
};
