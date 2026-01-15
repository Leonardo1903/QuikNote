import { account, storage, STORAGE_BUCKET_ID } from "@/lib/config";
import { ID } from "appwrite";

export const authService = {
  loginUser: async (email, password) => {
    try {
      await account.createEmailPasswordSession({ email, password });
      
      const user = await account.get();
      return user;
    } catch (error) {
      console.error("Error logging in user:", error);
      throw error;
    }
  },

  logoutUser: async () => {
    try {
      await account.deleteSession({ sessionId: "current" });
      return true;
    } catch (error) {
      console.error("Error logging out user:", error);
      throw error;
    }
  },

  registerUser: async (email, password, name) => {
    try {
      await account.create({
        userId: ID.unique(),
        email,
        password,
        name,
      });

      await account.createEmailPasswordSession({ email, password });

      const user = await account.get();
      return user;
    } catch (error) {
      console.error("Error registering user:", error);
      throw error;
    }
  },

  checkAuthStatus: async () => {
    try {
      const session = await account.getSession({ sessionId: "current" });
      if (session) {
        const user = await account.get();
        return user;
      }
      return null;
    } catch (error) {
      console.error("Error checking auth status:", error);
      return null;
    }
  },

  getAccount: async () => {
    try {
      return await account.get();
    } catch (error) {
      console.error("Error fetching account:", error);
      throw error;
    }
  },

  updateName: async (name) => {
    try {
      return await account.updateName({ name });
    } catch (error) {
      console.error("Error updating name:", error);
      throw error;
    }
  },

  updateEmail: async (email, password) => {
    try {
      return await account.updateEmail({ email, password });
    } catch (error) {
      console.error("Error updating email:", error);
      throw error;
    }
  },

  updatePreferences: async (prefs) => {
    try {
      return await account.updatePrefs({ prefs });
    } catch (error) {
      console.error("Error updating preferences:", error);
      throw error;
    }
  },

  uploadProfileImage: async (file) => {
    try {
      const response = await storage.createFile({
        bucketId: STORAGE_BUCKET_ID,
        fileId: ID.unique(),
        file,
      });
      return response;
    } catch (error) {
      console.error("Error uploading profile image:", error);
      if (error.code === 401) {
        throw new Error(
          "Storage bucket not configured. Please set up permissions in Appwrite Console."
        );
      }
      throw error;
    }
  },

  deleteProfileImage: async (fileId) => {
    try {
      await storage.deleteFile({
        bucketId: STORAGE_BUCKET_ID,
        fileId,
      });
      return true;
    } catch (error) {
      console.error("Error deleting profile image:", error);
      throw error;
    }
  },

  getProfileImageUrl: (fileId) => {
    if (!fileId) return null;
    try {
      const url = storage.getFileView({
        bucketId: STORAGE_BUCKET_ID,
        fileId,
      });
      return url.href || url.toString();
    } catch (error) {
      console.error("Error generating image URL:", error);
      return null;
    }
  },
};
