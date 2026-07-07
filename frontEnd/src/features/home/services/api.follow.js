import api from "../../../lib/api";

export async function followUser(userName) {
  try {
    const response = await api.post(`/follows/${userName}`);
    return response.data;
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || error.message,
    };
  }
}

export async function unfollowUser(userName) {
  try {
    const response = await api.delete(`/follows/${userName}`);
    return response.data;
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || error.message,
    };
  }
}
