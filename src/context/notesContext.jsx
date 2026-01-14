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

  // Fetch all data when user is authenticated
  useEffect(() => {
    if (user) {
      fetchAllData();
    } else {
      // Clear data when user logs out
      setNotes([]);
      setNotebooks([]);
    }
  }, [user]);

  // Normalize relationship fields so the rest of the app can safely assume
  // notebook = single ID string | null.
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

  // ==================== NOTES ====================
  const fetchNotes = async () => {
    try {
      const fetchedNotes = await dbService.getNotes(user.$id);
      // Ensure relationships are flattened to IDs for predictable filtering
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
      // Refetch all data to ensure relationships (notebooks) are properly loaded
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
            // Preserve the notebooks field if API doesn't return it
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

  // ==================== NOTEBOOKS ====================
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
      // Get all notes in this notebook and trash them
      const notesInNotebook = notes.filter(
        (note) => note.notebooks === notebookId && !note.isTrashed
      );

      // Trash all notes in the notebook
      await Promise.all(
        notesInNotebook.map((note) => dbService.trashNote(note.$id))
      );

      // Trash the notebook itself
      const updatedNotebook = await dbService.trashNotebook(notebookId);

      // Update state - mark all notes in this notebook as trashed
      setNotes((prev) =>
        prev.map((note) =>
          note.notebooks === notebookId
            ? { ...note, isTrashed: true, trashedAt: new Date().toISOString() }
            : note
        )
      );

      // Update notebook state
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
      // Get all trashed notes in this notebook and restore them
      const trashedNotesInNotebook = notes.filter(
        (note) => note.notebooks === notebookId && note.isTrashed
      );

      // Restore all trashed notes in the notebook
      await Promise.all(
        trashedNotesInNotebook.map((note) => dbService.restoreNote(note.$id))
      );

      // Restore the notebook itself
      const updatedNotebook = await dbService.restoreNotebook(notebookId);

      // Update state - mark all notes in this notebook as restored
      setNotes((prev) =>
        prev.map((note) =>
          note.notebooks === notebookId && note.isTrashed
            ? { ...note, isTrashed: false }
            : note
        )
      );

      // Update notebook state
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

  // ==================== COMPUTED VALUES ====================
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

      // Delete all trashed notes
      await Promise.all(
        trashedNotes.map((note) => dbService.deleteNote(note.$id))
      );

      // Delete all trashed notebooks
      await Promise.all(
        trashedNotebooks.map((notebook) =>
          dbService.deleteNotebook(notebook.$id)
        )
      );

      // Update state to remove trashed items
      setNotes((prev) => prev.filter((note) => !note.isTrashed));
      setNotebooks((prev) => prev.filter((notebook) => !notebook.isTrashed));
    } catch (error) {
      console.error("Error emptying trash:", error);
      throw error;
    }
  };

  const contextData = {
    // State
    notes,
    notebooks,
    loading,

    // Notes methods
    fetchNotes,
    createNote,
    updateNote,
    deleteNote,
    trashNote,
    restoreNote,
    toggleFavorite,

    // Notebooks methods
    fetchNotebooks,
    createNotebook,
    updateNotebook,
    deleteNotebook,
    trashNotebook,
    restoreNotebook,

    // Computed values
    getFavoriteNotes,
    getTrashedNotes,
    getTrashedNotebooks,
    getActiveNotes,
    getActiveNotebooks,
    getNotesByNotebook,
    emptyTrash,

    // Refresh all data
    refreshData: fetchAllData,
  };

  return (
    <NotesContext.Provider value={contextData}>
      {children}
    </NotesContext.Provider>
  );
};
