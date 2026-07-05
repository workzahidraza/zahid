import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { Register, Login } from "../services/api.auth";

export const useAuth = () => {
  const context = useContext(AuthContext);
  const { username, setUsername, loading, setLoading } = context;

  const handleRegister = async (userName, userEmail, password) => {
    setLoading(true);
    const response = await Register(userName, userEmail, password);
    if (response.success) {
      setUsername(response.user.userName);
    }
    setUsername(response.user);

    setLoading(false);
    return response;
  };

  const handlelogin = async (userName, password) => {
    setLoading(true);
    const response = await Login(userName, password);
    setUsername(response.user);
    setLoading(false);
  };

  return {
    username,
    loading,
    handlelogin,
    handleRegister,
  };
};
