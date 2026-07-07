import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { Register, Login, Logout } from "../services/api.auth";

export const useAuth = () => {
  const context = useContext(AuthContext);
  const { user, setUser, loading, setLoading } = context;

  const handleRegister = async (userName, userEmail, password) => {
    setLoading(true);
    const response = await Register(userName, userEmail, password);
    if (response.success) {
      setUser(response.user);
    }
    setLoading(false);
    return response;
  };

  const handlelogin = async (userName, password) => {
    setLoading(true);
    const response = await Login(userName, password);
    if (response.success) {
      setUser(response.user);
    }
    setLoading(false);
    return response;
  };

  const handleLogout = async () => {
    setLoading(true);
    const response = await Logout();
    if (response.success) {
      setUser(null);
    }
    setLoading(false);
    return response;
  };

  return {
    user,
    loading,
    handlelogin,
    handleRegister,
    handleLogout,
  };
};
