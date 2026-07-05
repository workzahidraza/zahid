import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api/auth",
  withCredentials: true,
});

export async function Register(userName, userEmail, password) {
  try {
    const response = await api.post("/register", {
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
    const response = await api.post("/login", {
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
