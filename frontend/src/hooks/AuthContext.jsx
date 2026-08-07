import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  useLoginMutation,
  useLogoutMutation,
  useMeQuery,
} from "../services/auth.api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("accessToken"));

  const {
    data: user,
    isLoading,
    refetch,
  } = useMeQuery(undefined, {
    skip: !token,
  });

  const [loginMutation] = useLoginMutation();
  const [logoutMutation] = useLogoutMutation();

  useEffect(() => {
    const storedToken = localStorage.getItem("accessToken");
    if (storedToken && storedToken !== token) {
      setToken(storedToken);
    }
  }, [token]);

  const login = async (credentials) => {
    const response = await loginMutation(credentials).unwrap();

    if (response.accessToken) {
      localStorage.setItem("accessToken", response.accessToken);
      localStorage.setItem("refreshToken", response.refreshToken);
      setToken(response.accessToken);
      await refetch();
    }

    return response;
  };

  const logout = async () => {
    try {
      await logoutMutation().unwrap();
    } catch (err) {
      // Ignore logout API errors
    }

    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setToken(null);
  };

  const value = useMemo(
    () => ({
      user: user?.user || user,
      isAuthenticated: !!token,
      isLoading,
      login,
      logout,
      refetchUser: refetch,
    }),
    [user, token, isLoading, refetch],
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
