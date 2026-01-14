import { ID, Query } from "appwrite";
import {
  database,
  DATABASE_ID,
  NOTES_COLLECTION_ID,
  NOTEBOOKS_COLLECTION_ID,
} from "../lib/config";

export const dbService = {
  // ==================== NOTES ====================
  createNote: async (note) => {
    try {
      const response = await database.createRow({
        databaseId: DATABASE_ID,
        tableId: NOTES_COLLECTION_ID,
        rowId: ID.unique(),
        data: note,
      });
      return response;
    } catch (error) {
      console.error("Error creating note:", error);
      throw error;
    }
  },

  getNotes: async (userId) => {
    try {
      const response = await database.listRows({
        databaseId: DATABASE_ID,
        tableId: NOTES_COLLECTION_ID,
        queries: [Query.equal("userID", userId)],
        expand: ["notebooks"],
      });
      return response.rows;
    } catch (error) {
      console.error("Error fetching notes:", error);
      throw error;
    }
  },

  getNote: async (noteId) => {
    try {
      const response = await database.getRow({
        databaseId: DATABASE_ID,
        tableId: NOTES_COLLECTION_ID,
        rowId: noteId,
      });
      return response;
    } catch (error) {
      console.error("Error fetching note:", error);
      throw error;
    }
  },

  updateNote: async (noteId, note) => {
    try {
      const response = await database.updateRow({
        databaseId: DATABASE_ID,
        tableId: NOTES_COLLECTION_ID,
        rowId: noteId,
        data: note,
      });
      return response;
    } catch (error) {
      console.error("Error updating note:", error);
      throw error;
    }
  },

  deleteNote: async (noteId) => {
    try {
      const response = await database.deleteRow({
        databaseId: DATABASE_ID,
        tableId: NOTES_COLLECTION_ID,
        rowId: noteId,
      });
      return response;
    } catch (error) {
      console.error("Error deleting note:", error);
      throw error;
    }
  },

  getFavoriteNotes: async (userId) => {
    try {
      const response = await database.listRows({
        databaseId: DATABASE_ID,
        tableId: NOTES_COLLECTION_ID,
        queries: [
          Query.equal("userID", userId),
          Query.equal("isFavorite", true),
        ],
      });
      return response.rows;
    } catch (error) {
      console.error("Error fetching favorite notes:", error);
      throw error;
    }
  },

  getTrashedNotes: async (userId) => {
    try {
      const response = await database.listRows({
        databaseId: DATABASE_ID,
        tableId: NOTES_COLLECTION_ID,
        queries: [
          Query.equal("userID", userId),
          Query.equal("isTrashed", true),
        ],
      });
      return response.rows;
    } catch (error) {
      console.error("Error fetching trashed notes:", error);
      throw error;
    }
  },

  trashNote: async (noteId) => {
    try {
      const response = await database.updateRow({
        databaseId: DATABASE_ID,
        tableId: NOTES_COLLECTION_ID,
        rowId: noteId,
        data: {
          isTrashed: true,
          trashedAt: new Date().toISOString(),
        },
      });
      return response;
    } catch (error) {
      console.error("Error trashing note:", error);
      throw error;
    }
  },

  restoreNote: async (noteId) => {
    try {
      const response = await database.updateRow({
        databaseId: DATABASE_ID,
        tableId: NOTES_COLLECTION_ID,
        rowId: noteId,
        data: {
          isTrashed: false,
          trashedAt: null,
        },
      });
      return response;
    } catch (error) {
      console.error("Error restoring note:", error);
      throw error;
    }
  },

  toggleFavorite: async (noteId, isFavorite) => {
    try {
      const response = await database.updateRow({
        databaseId: DATABASE_ID,
        tableId: NOTES_COLLECTION_ID,
        rowId: noteId,
        data: {
          isFavorite,
        },
      });
      return response;
    } catch (error) {
      console.error("Error toggling favorite:", error);
      throw error;
    }
  },

  getNotesByNotebook: async (notebookId) => {
    try {
      const response = await database.listRows({
        databaseId: DATABASE_ID,
        tableId: NOTES_COLLECTION_ID,
        queries: [Query.equal("notebooks", notebookId)],
        expand: ["notebooks"],
      });
      return response.rows;
    } catch (error) {
      console.error("Error fetching notes by notebook:", error);
      throw error;
    }
  },

  // ==================== NOTEBOOKS ====================
  createNotebook: async (notebook) => {
    try {
      const response = await database.createRow({
        databaseId: DATABASE_ID,
        tableId: NOTEBOOKS_COLLECTION_ID,
        rowId: ID.unique(),
        data: notebook,
      });
      return response;
    } catch (error) {
      console.error("Error creating notebook:", error);
      throw error;
    }
  },

  getNotebooks: async (userId) => {
    try {
      const response = await database.listRows({
        databaseId: DATABASE_ID,
        tableId: NOTEBOOKS_COLLECTION_ID,
        queries: [Query.equal("userID", userId)],
      });
      return response.rows;
    } catch (error) {
      console.error("Error fetching notebooks:", error);
      throw error;
    }
  },

  getNotebook: async (notebookId) => {
    try {
      const response = await database.getRow({
        databaseId: DATABASE_ID,
        tableId: NOTEBOOKS_COLLECTION_ID,
        rowId: notebookId,
      });
      return response;
    } catch (error) {
      console.error("Error fetching notebook:", error);
      throw error;
    }
  },

  updateNotebook: async (notebookId, notebook) => {
    try {
      const response = await database.updateRow({
        databaseId: DATABASE_ID,
        tableId: NOTEBOOKS_COLLECTION_ID,
        rowId: notebookId,
        data: notebook,
      });
      return response;
    } catch (error) {
      console.error("Error updating notebook:", error);
      throw error;
    }
  },

  deleteNotebook: async (notebookId) => {
    try {
      const response = await database.deleteRow({
        databaseId: DATABASE_ID,
        tableId: NOTEBOOKS_COLLECTION_ID,
        rowId: notebookId,
      });
      return response;
    } catch (error) {
      console.error("Error deleting notebook:", error);
      throw error;
    }
  },

  getTrashedNotebooks: async (userId) => {
    try {
      const response = await database.listRows({
        databaseId: DATABASE_ID,
        tableId: NOTEBOOKS_COLLECTION_ID,
        queries: [
          Query.equal("userID", userId),
          Query.equal("isTrashed", true),
        ],
      });
      return response.rows;
    } catch (error) {
      console.error("Error fetching trashed notebooks:", error);
      throw error;
    }
  },

  trashNotebook: async (notebookId) => {
    try {
      const response = await database.updateRow({
        databaseId: DATABASE_ID,
        tableId: NOTEBOOKS_COLLECTION_ID,
        rowId: notebookId,
        data: {
          isTrashed: true,
          trashedAt: new Date().toISOString(),
        },
      });
      return response;
    } catch (error) {
      console.error("Error trashing notebook:", error);
      throw error;
    }
  },

  restoreNotebook: async (notebookId) => {
    try {
      const response = await database.updateRow({
        databaseId: DATABASE_ID,
        tableId: NOTEBOOKS_COLLECTION_ID,
        rowId: notebookId,
        data: {
          isTrashed: false,
          trashedAt: null,
        },
      });
      return response;
    } catch (error) {
      console.error("Error restoring notebook:", error);
      throw error;
    }
  },
};
