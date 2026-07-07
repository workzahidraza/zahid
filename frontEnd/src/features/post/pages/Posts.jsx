import React, { useEffect, useState } from "react";
import "remixicon/fonts/remixicon.css";
import SinglePost from "./SinglePost";
import { getFeed } from "../services/api.post";

const Posts = ({ refreshKey = 0, onPostDeleted }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFeed() {
      setLoading(true);
      const response = await getFeed();
      if (response.success) {
        setPosts(response.posts);
      }
      setLoading(false);
    }
    loadFeed();
  }, [refreshKey]);

  const handleLikeUpdate = (postId, likeCount, isLiked) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId ? { ...post, likeCount, isLiked } : post,
      ),
    );
  };

  const handleSaveUpdate = (postId, isSaved) => {
    setPosts((prev) =>
      prev.map((post) => (post.id === postId ? { ...post, isSaved } : post)),
    );
  };

  const handleDelete = (postId) => {
    setPosts((prev) => prev.filter((post) => post.id !== postId));
    onPostDeleted?.();
  };

  if (loading) {
    return (
      <main className="h-auto bg-[#FAF9F5] px-1 py-4 flex justify-center">
        <p className="text-sm text-[#8C8479]">Loading feed...</p>
      </main>
    );
  }

  if (posts.length === 0) {
    return (
      <main className="h-auto bg-[#FAF9F5] px-4 py-16 flex flex-col items-center gap-2">
        <i className="ri-image-line text-3xl text-[#B7A98A]"></i>
        <p className="text-[#2A2A28] font-medium text-sm">No posts yet</p>
        <p className="text-[#8C8479] text-xs text-center">
          Follow people or create your first post to see content here.
        </p>
      </main>
    );
  }

  return (
    <main className="h-auto bg-[#FAF9F5] px-1 py-1 pb-24 flex flex-col gap-3 md:max-w-[470px] md:mx-auto md:pb-12 md:pt-6 md:px-0">
      {posts.map((post) => (
        <SinglePost
          key={post.id}
          post={post}
          onLikeUpdate={handleLikeUpdate}
          onSaveUpdate={handleSaveUpdate}
          onDelete={handleDelete}
        />
      ))}
    </main>
  );
};

export default Posts;
