import { account } from "../lib/config";
import { ID } from "appwrite";

export const authService = {
  loginUser: async (email, password) => {
    try {
      // Login user
      await account.createEmailPasswordSession(email, password);
      // Get user details after login
      const user = await account.get();
      return user;
    } catch (error) {
      console.error("Error logging in user:", error);
      throw error;
    }
  },

  logoutUser: async () => {
    try {
      // Logout user
      await account.deleteSession("current");
      return true;
    } catch (error) {
      console.error("Error logging out user:", error);
      throw error;
    }
  },

  registerUser: async (email, password, name) => {
    try {

      // Check if a session is active
      const session = await account.getSession("current");
      if (session) {
        // Log out the current user
        await account.deleteSession("current");
      }

      // Register user
      await account.create(ID.unique(), email, password, name);
      // Automatically log the user in after registration
      await account.createEmailPasswordSession(email, password);
      // Get user details after registration
      const user = await account.get();
      return user;
    } catch (error) {
      console.error("Error registering user:", error);
      throw error;
    }
  },

  checkAuthStatus: async () => {
    try {
      // Check if the user is authenticated
      const session = await account.getSession("current");
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
};
