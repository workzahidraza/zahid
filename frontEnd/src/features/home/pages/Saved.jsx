import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import BottomNav from "./BottomNav";
import SinglePost from "../../post/pages/SinglePost";
import { getSavedPosts } from "../services/api.saved";

const Saved = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadSaved() {
      setLoading(true);
      const response = await getSavedPosts();
      if (response.success) {
        setPosts(response.posts);
      }
      setLoading(false);
    }
    loadSaved();
  }, []);

  const handleLikeUpdate = (postId, likeCount, isLiked) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId ? { ...post, likeCount, isLiked } : post,
      ),
    );
  };

  const handleSaveUpdate = (postId, isSaved) => {
    if (!isSaved) {
      setPosts((prev) => prev.filter((post) => post.id !== postId));
    }
  };

  return (
    <main className="min-h-screen bg-[#FAF9F5] pb-20 md:pl-64">
      <NavBar />

      <div className="px-1 py-2 md:max-w-[470px] md:mx-auto md:py-8">
        <h2 className="text-sm font-medium text-[#2A2A28] px-3 mb-3 md:text-lg md:px-0">
          Saved posts
        </h2>

        {loading && (
          <p className="text-center text-sm text-[#8C8479] py-8">Loading...</p>
        )}

        {!loading && posts.length === 0 && (
          <div className="flex flex-col items-center justify-center gap-2 py-16 text-center">
            <i className="ri-bookmark-line text-3xl text-[#B7A98A]"></i>
            <p className="text-[#2A2A28] font-medium text-sm">
              No saved posts yet
            </p>
            <p className="text-[#8C8479] text-xs">
              Tap the bookmark icon on a post to save it here.
            </p>
          </div>
        )}

        <div className="flex flex-col gap-3">
          {posts.map((post) => (
            <SinglePost
              key={post.id}
              post={post}
              onLikeUpdate={handleLikeUpdate}
              onSaveUpdate={handleSaveUpdate}
            />
          ))}
        </div>
      </div>

      <BottomNav />
    </main>
  );
};

export default Saved;
