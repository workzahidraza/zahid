import api from "../../../lib/api";

export async function likePost(postId) {
  try {
    const response = await api.post(`/likes/${postId}`);
    return response.data;
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || error.message,
    };
  }
}

export async function unlikePost(postId) {
  try {
    const response = await api.delete(`/likes/${postId}`);
    return response.data;
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || error.message,
    };
  }
}
