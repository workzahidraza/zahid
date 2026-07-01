import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api/auth",
  withCredentials: true,
});

async function register(use) {
  try {
    const response = await api.post("/register", {
      userName,
      userEmail,
      password,
    });
    return response.data;
  } catch (error) {
    message: error.message;
  }
}
