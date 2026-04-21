import { createContext, useContext, useMemo, useState } from "react";
import { loginUser, registerUser } from "../lib/api";
import { clearTokens, hasToken } from "../lib/authStorage";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(hasToken());
  const [isLoading, setIsLoading] = useState(false);

  const login = async ({ username, password }) => {
    setIsLoading(true);
    try {
      await loginUser({ username, password });
      setIsAuthenticated(true);
    } finally {
      setIsLoading(false);
    }
  };

  const register = async ({ username, email, password }) => {
    setIsLoading(true);
    try {
      await registerUser({ username, email, password });
      await loginUser({ username, password });
      setIsAuthenticated(true);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    clearTokens();
    setIsAuthenticated(false);
  };

  const value = useMemo(
    () => ({ isAuthenticated, isLoading, login, register, logout }),
    [isAuthenticated, isLoading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
}
