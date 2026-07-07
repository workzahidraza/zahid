import api from "../../../lib/api";

export async function getSavedPosts() {
  try {
    const response = await api.get("/saved");
    return response.data;
  } catch (error) {
    return {
      success: false,
      posts: [],
      message: error.response?.data?.message || error.message,
    };
  }
}

export async function savePost(postId) {
  try {
    const response = await api.post(`/saved/${postId}`);
    return response.data;
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || error.message,
    };
  }
}

export async function unsavePost(postId) {
  try {
    const response = await api.delete(`/saved/${postId}`);
    return response.data;
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || error.message,
    };
  }
}
