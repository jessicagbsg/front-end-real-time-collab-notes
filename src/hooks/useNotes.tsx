import { useState, useEffect } from "react";
import type { Note, CreateNoteDTO } from "@/types";
import { createNote, getNotesFromUser } from "@/api";

export const useNotes = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const user = localStorage.getItem("user");
      if (!user) {
        setIsLoading(false);
        return;
      }
      const parsedUser = JSON.parse(user);
      const notes = await getNotesFromUser(parsedUser.id);
      setNotes(notes);
    } catch (error: any) {
      setError(error.response?.data?.message || "Failed to fetch notes");
    } finally {
      setIsLoading(false);
    }
  };

  const addNote = async (note: CreateNoteDTO) => {
    try {
      const createdNote = createNote(note);
      fetchNotes();
      return createdNote;
    } catch (error: any) {
      setError(error.response?.data?.message || "Failed to create note");
    }
  };

  return { notes, isLoading, error, addNote };
};
