import api from "../../../lib/api";

export async function Register(userName, userEmail, password) {
  try {
    const response = await api.post("/auth/register", {
      userName,
      userEmail,
      password,
    });
    return response.data;
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || error.message,
    };
  }
}

export async function Login(userName, password) {
  try {
    const response = await api.post("/auth/login", {
      userName,
      password,
    });
    return response.data;
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || error.message,
    };
  }
}

export async function Logout() {
  try {
    const response = await api.post("/auth/logout");
    return response.data;
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || error.message,
    };
  }
}

export async function getMe() {
  try {
    const response = await api.get("/auth/me");
    return response.data;
  } catch {
    return { success: false, user: null };
  }
}

export async function searchUsers(query) {
  try {
    const response = await api.get("/auth/search", { params: { q: query } });
    return response.data;
  } catch (error) {
    return {
      success: false,
      users: [],
      message: error.response?.data?.message || error.message,
    };
  }
}

export async function getUserProfile(userName) {
  try {
    const response = await api.get(`/auth/profile/${userName}`);
    return response.data;
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || error.message,
    };
  }
}
