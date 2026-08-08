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

  const login = async (credentials) => {
    const data = await loginUser(credentials);

    const loggedInUser = data.data?.user || data.data;

    setUser(loggedInUser);

    return data;
  };

  const register = async (userData) => {
    const data = await registerUser(userData);

    return data;
  };

  const logout = async () => {
    await logoutUser();
    setUser(null);
  };

  const checkAuth = async () => {
    try {
      const data = await getCurrentUser();

      const currentUser = data.data?.user || data.data;

      setUser(currentUser);
    } catch (error) {
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