import { ID, Query } from "appwrite";
import { database, DATABASE_ID, COLLECTION_ID } from "../lib/config";

export const dbService = {
  createNote: async (note) => {
    try {
      const response = await database.createDocument(
        DATABASE_ID,
        COLLECTION_ID,
        ID.unique(),
        note
      );
      return response;
    } catch (error) {
      console.error("Error creating note:", error);
      throw error;
    }
  },

  getNotes: async (userId) => {
    try {
      const response = await database.listDocuments(
        DATABASE_ID,
        COLLECTION_ID,
        [Query.equal("UserID", userId)]
      );
      return response.documents;
    } catch (error) {
      console.error("Error fetching notes:", error);
      throw error;
    }
  },

  updateNote: async (noteId, note) => {
    try {
      const response = await database.updateDocument(
        DATABASE_ID,
        COLLECTION_ID,
        noteId,
        note
      );
      return response;
    } catch (error) {
      console.error("Error updating note:", error);
      throw error;
    }
  },

  deleteNote: async (noteId) => {
    try {
      const response = await database.deleteDocument(
        DATABASE_ID,
        COLLECTION_ID,
        noteId
      );
      return response;
    } catch (error) {
      console.error("Error deleting note:", error);
      throw error;
    }
  },
};
