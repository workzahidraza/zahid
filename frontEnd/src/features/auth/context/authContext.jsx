import { createContext, useEffect, useState } from "react";
import { getMe } from "../services/api.auth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    async function loadSession() {
      const response = await getMe();
      if (response.success) {
        setUser(response.user);
      }
      setAuthLoading(false);
    }
    loadSession();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, setUser, loading, setLoading, authLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
