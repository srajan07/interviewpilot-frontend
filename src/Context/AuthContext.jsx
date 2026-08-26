import { createContext, useContext, useEffect, useState } from "react";

import {
  loginUser,
  registerUser,
  logoutUser,
  getCurrentUser,
} from "../services/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // LOGIN
  const login = async (credentials) => {
    const data = await loginUser(credentials);

    console.log("Login response:", data);

    // Backend response:
    // data.data.accessToken

    const accessToken = data.data?.accessToken;

    if (!accessToken) {
      throw new Error("Access token not received from server");
    }

    // Store access token
    localStorage.setItem("accessToken", accessToken);

  
    const profileResponse = await getCurrentUser();

    const currentUser =
      profileResponse.data?.user || profileResponse.data;

    setUser(currentUser);

    return data;
  };

  // REGISTER
  const register = async (userData) => {
    const data = await registerUser(userData);

    return data;
  };

  // LOGOUT
  const logout = async () => {
    try {
      await logoutUser();
    } finally {
      localStorage.removeItem("accessToken");
      setUser(null);
    }
  };

  // CHECK AUTHENTICATION
  const checkAuth = async () => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const data = await getCurrentUser();

      const currentUser =
        data.data?.user || data.data;

      setUser(currentUser);
    } catch (error) {
      console.error("Authentication check failed:", error);

      localStorage.removeItem("accessToken");
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};