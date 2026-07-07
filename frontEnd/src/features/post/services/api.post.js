import api from "../../../lib/api";

export async function getFeed() {
  try {
    const response = await api.get("/posts");
    return response.data;
  } catch (error) {
    return {
      success: false,
      posts: [],
      message: error.response?.data?.message || error.message,
    };
  }
}

export async function getUserPosts(userName) {
  try {
    const response = await api.get(`/posts/user/${userName}`);
    return response.data;
  } catch (error) {
    return {
      success: false,
      posts: [],
      message: error.response?.data?.message || error.message,
    };
  }
}

export async function createPost(photo, caption) {
  try {
    const formData = new FormData();
    formData.append("photo", photo);
    if (caption) formData.append("caption", caption);

    const response = await api.post("/posts", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || error.message,
    };
  }
}

export async function deletePost(postId) {
  try {
    const response = await api.delete(`/posts/${postId}`);
    return response.data;
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || error.message,
    };
  }
}
