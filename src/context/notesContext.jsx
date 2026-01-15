import { createContext, useContext, useState, useEffect } from "react";
import { dbService } from "../appwrite/db";
import { useAuth } from "./authContext";

const NotesContext = createContext();

export const useNotes = () => useContext(NotesContext);

export const NotesProvider = ({ children }) => {
  const { user } = useAuth();
  const [notes, setNotes] = useState([]);
  const [notebooks, setNotebooks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      fetchAllData();
    } else {
      setNotes([]);
      setNotebooks([]);
    }
  }, [user]);

  const normalizeNotebook = (notebooksField) => {
    if (Array.isArray(notebooksField)) {
      const first = notebooksField[0];
      if (typeof first === "string") return first || null;
      return first?.$id || null;
    }
    if (typeof notebooksField === "string") return notebooksField || null;
    if (notebooksField && typeof notebooksField === "object") {
      return notebooksField.$id || null;
    }
    return null;
  };

  const normalizeNote = (note) => ({
    ...note,
    notebooks: normalizeNotebook(note.notebooks),
  });

  const fetchAllData = async () => {
    if (!user) return;
    setLoading(true);
    try {
      await Promise.all([fetchNotes(), fetchNotebooks()]);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchNotes = async () => {
    try {
      const fetchedNotes = await dbService.getNotes(user.$id);
      const normalized = fetchedNotes.map(normalizeNote);
      setNotes(normalized);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  const createNote = async (noteData) => {
    try {
      const newNote = await dbService.createNote({
        ...noteData,
        userID: user.$id,
      });
      setNotes((prev) => [normalizeNote(newNote), ...prev]);
      return newNote;
    } catch (error) {
      console.error("Error creating note:", error);
      throw error;
    }
  };

  const updateNote = async (noteId, noteData) => {
    try {
      await dbService.updateNote(noteId, noteData);
      await fetchAllData();
      return;
    } catch (error) {
      console.error("Error updating note:", error);
      throw error;
    }
  };

  const deleteNote = async (noteId) => {
    try {
      await dbService.deleteNote(noteId);
      setNotes((prev) => prev.filter((note) => note.$id !== noteId));
    } catch (error) {
      console.error("Error deleting note:", error);
      throw error;
    }
  };

  const trashNote = async (noteId) => {
    try {
      const updatedNote = await dbService.trashNote(noteId);
      setNotes((prev) =>
        prev.map((note) =>
          note.$id === noteId ? normalizeNote(updatedNote) : note
        )
      );
      return updatedNote;
    } catch (error) {
      console.error("Error trashing note:", error);
      throw error;
    }
  };

  const restoreNote = async (noteId) => {
    try {
      const updatedNote = await dbService.restoreNote(noteId);
      setNotes((prev) =>
        prev.map((note) =>
          note.$id === noteId ? normalizeNote(updatedNote) : note
        )
      );
      return updatedNote;
    } catch (error) {
      console.error("Error restoring note:", error);
      throw error;
    }
  };

  const toggleFavorite = async (noteId, isFavorite) => {
    try {
      const updatedNote = await dbService.toggleFavorite(noteId, isFavorite);
      setNotes((prev) => {
        return prev.map((note) => {
          if (note.$id === noteId) {
            const normalized = normalizeNote(updatedNote);
            if (!normalized.notebooks && note.notebooks) {
              normalized.notebooks = note.notebooks;
            }
            return normalized;
          }
          return note;
        });
      });
      return updatedNote;
    } catch (error) {
      console.error("Error toggling favorite:", error);
      throw error;
    }
  };

  const fetchNotebooks = async () => {
    try {
      const fetchedNotebooks = await dbService.getNotebooks(user.$id);
      setNotebooks(fetchedNotebooks);
    } catch (error) {
      console.error("Error fetching notebooks:", error);
    }
  };

  const createNotebook = async (notebookData) => {
    try {
      const newNotebook = await dbService.createNotebook({
        ...notebookData,
        userID: user.$id,
      });
      setNotebooks((prev) => [newNotebook, ...prev]);
      return newNotebook;
    } catch (error) {
      console.error("Error creating notebook:", error);
      throw error;
    }
  };

  const updateNotebook = async (notebookId, notebookData) => {
    try {
      const updatedNotebook = await dbService.updateNotebook(
        notebookId,
        notebookData
      );
      setNotebooks((prev) =>
        prev.map((notebook) =>
          notebook.$id === notebookId ? updatedNotebook : notebook
        )
      );
      return updatedNotebook;
    } catch (error) {
      console.error("Error updating notebook:", error);
      throw error;
    }
  };

  const deleteNotebook = async (notebookId) => {
    try {
      await dbService.deleteNotebook(notebookId);
      setNotebooks((prev) =>
        prev.filter((notebook) => notebook.$id !== notebookId)
      );
    } catch (error) {
      console.error("Error deleting notebook:", error);
      throw error;
    }
  };

  const trashNotebook = async (notebookId) => {
    try {
      const notesInNotebook = notes.filter(
        (note) => note.notebooks === notebookId && !note.isTrashed
      );

      await Promise.all(
        notesInNotebook.map((note) => dbService.trashNote(note.$id))
      );

      const updatedNotebook = await dbService.trashNotebook(notebookId);

      setNotes((prev) =>
        prev.map((note) =>
          note.notebooks === notebookId
            ? { ...note, isTrashed: true, trashedAt: new Date().toISOString() }
            : note
        )
      );

      setNotebooks((prev) =>
        prev.map((notebook) =>
          notebook.$id === notebookId ? updatedNotebook : notebook
        )
      );
      return updatedNotebook;
    } catch (error) {
      console.error("Error trashing notebook:", error);
      throw error;
    }
  };

  const restoreNotebook = async (notebookId) => {
    try {
      const trashedNotesInNotebook = notes.filter(
        (note) => note.notebooks === notebookId && note.isTrashed
      );

      await Promise.all(
        trashedNotesInNotebook.map((note) => dbService.restoreNote(note.$id))
      );

      const updatedNotebook = await dbService.restoreNotebook(notebookId);

      setNotes((prev) =>
        prev.map((note) =>
          note.notebooks === notebookId && note.isTrashed
            ? { ...note, isTrashed: false }
            : note
        )
      );

      setNotebooks((prev) =>
        prev.map((notebook) =>
          notebook.$id === notebookId ? updatedNotebook : notebook
        )
      );
      return updatedNotebook;
    } catch (error) {
      console.error("Error restoring notebook:", error);
      throw error;
    }
  };

  const getFavoriteNotes = () => {
    return notes.filter((note) => note.isFavorite && !note.isTrashed);
  };

  const getTrashedNotes = () => {
    return notes.filter((note) => note.isTrashed);
  };

  const getTrashedNotebooks = () => {
    return notebooks.filter((notebook) => notebook.isTrashed);
  };

  const getActiveNotes = () => {
    return notes.filter((note) => !note.isTrashed);
  };

  const getActiveNotebooks = () => {
    return notebooks.filter((notebook) => !notebook.isTrashed);
  };

  const getNotesByNotebook = (notebookId) => {
    return notes.filter(
      (note) => !note.isTrashed && note.notebooks === notebookId
    );
  };

  const emptyTrash = async () => {
    try {
      const trashedNotes = getTrashedNotes();
      const trashedNotebooks = getTrashedNotebooks();

      await Promise.all(
        trashedNotes.map((note) => dbService.deleteNote(note.$id))
      );

      await Promise.all(
        trashedNotebooks.map((notebook) =>
          dbService.deleteNotebook(notebook.$id)
        )
      );

      setNotes((prev) => prev.filter((note) => !note.isTrashed));
      setNotebooks((prev) => prev.filter((notebook) => !notebook.isTrashed));
    } catch (error) {
      console.error("Error emptying trash:", error);
      throw error;
    }
  };

  const contextData = {
    notes,
    notebooks,
    loading,

    fetchNotes,
    createNote,
    updateNote,
    deleteNote,
    trashNote,
    restoreNote,
    toggleFavorite,

    fetchNotebooks,
    createNotebook,
    updateNotebook,
    deleteNotebook,
    trashNotebook,
    restoreNotebook,

    getFavoriteNotes,
    getTrashedNotes,
    getTrashedNotebooks,
    getActiveNotes,
    getActiveNotebooks,
    getNotesByNotebook,
    emptyTrash,

    refreshData: fetchAllData,
  };

  return (
    <NotesContext.Provider value={contextData}>
      {children}
    </NotesContext.Provider>
  );
};
