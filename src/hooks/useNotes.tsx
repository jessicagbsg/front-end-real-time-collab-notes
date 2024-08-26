import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import type { Note, CreateNoteDTO } from "@/types";
import { createNote, getNote, getNotesFromUser } from "@/api";

export const useNotes = () => {
  const { roomId } = useParams();
  const [notes, setNotes] = useState<Note[]>([]);
  const [note, setNote] = useState<Note | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchNotes();
  }, []);

  useEffect(() => {
    if (roomId) fetchNote();
  }, [roomId]);

  const fetchNote = async () => {
    try {
      if (!roomId) return;
      const note = await getNote(roomId);
      setNote(note);
    } catch (error: any) {
      setError(error.response?.data?.message || "Failed to fetch note");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchNotes = async () => {
    try {
      const notes = await getNotesFromUser();
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

  return { notes, setNotes, fetchNotes, note, isLoading, error, addNote };
};
