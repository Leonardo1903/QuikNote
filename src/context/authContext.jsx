import { createContext, useContext, useState, useEffect } from "react";
import { authService } from "../appwrite/auth";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [profileImageUrl, setProfileImageUrl] = useState(null);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const loginUser = async (userInfo) => {
    setLoading(true);
    try {
      const accountDetails = await authService.loginUser(
        userInfo.email,
        userInfo.password
      );
      setUser(accountDetails);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const logoutUser = async () => {
    setLoading(true);
    try {
      await authService.logoutUser();
      setUser(null);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const registerUser = async (userInfo) => {
    setLoading(true);
    try {
      const accountDetails = await authService.registerUser(
        userInfo.email,
        userInfo.password,
        userInfo.name
      );
      setUser(accountDetails);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const checkAuthStatus = async () => {
    setLoading(true);
    try {
      const accountDetails = await authService.checkAuthStatus();
      setUser(accountDetails);
      if (accountDetails?.prefs?.profileImageId) {
        setProfileImageUrl(
          authService.getProfileImageUrl(accountDetails.prefs.profileImageId)
        );
      } else {
        setProfileImageUrl(null);
      }
    } catch (error) {
      console.error("User is not authenticated", error);
      setUser(null);
      setProfileImageUrl(null);
    } finally {
      setLoading(false);
    }
  };

  const contextData = {
    loading,
    user,
    profileImageUrl,
    loginUser,
    logoutUser,
    registerUser,
    checkAuthStatus,
  };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};
