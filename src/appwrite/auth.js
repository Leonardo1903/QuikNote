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
      // Safely check for and delete an active session
      const session = await account.getSession("current");
      if (session) {
        await account.deleteSession("current");
      }

      // Register the user
      await account.create(ID.unique(), email, password, name);

      // Automatically log in the user after registration
      await account.createEmailPasswordSession(email, password);

      // Fetch user details
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
