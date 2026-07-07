import React, { useState } from "react";
import { likePost, unlikePost } from "../services/api.like";
import { savePost, unsavePost } from "../../home/services/api.saved";
import { deletePost } from "../services/api.post";

const SinglePost = ({ post, onLikeUpdate, onSaveUpdate, onDelete }) => {
  const [actionLoading, setActionLoading] = useState(false);

  const toggleLike = async () => {
    if (actionLoading) return;
    setActionLoading(true);

    const response = post.isLiked
      ? await unlikePost(post.id)
      : await likePost(post.id);

    if (response.success) {
      onLikeUpdate(post.id, response.likeCount, response.isLiked);
    }
    setActionLoading(false);
  };

  const toggleSave = async () => {
    if (actionLoading) return;
    setActionLoading(true);

    const response = post.isSaved
      ? await unsavePost(post.id)
      : await savePost(post.id);

    if (response.success) {
      onSaveUpdate(post.id, response.isSaved);
    }
    setActionLoading(false);
  };

  const handleDelete = async () => {
    if (!window.confirm("Delete this post?")) return;
    setActionLoading(true);
    const response = await deletePost(post.id);
    if (response.success) {
      onDelete(post.id);
    }
    setActionLoading(false);
  };

  return (
    <div className="post max-h-1/2 md:max-h-none bg-[#FAF9F5] text-[#2A2A28] border border-[#2A2A28]/10 flex flex-col justify-between overflow-hidden rounded-xl md:shadow-sm">
      <div className="topPostdiv bg-transparent flex justify-between items-center px-3 py-2.5 gap-3">
        <div className="flex items-center gap-3">
          <div className="profilePic h-9 w-9 rounded-full overflow-hidden">
            <img
              className="w-full h-full object-cover object-center"
              src={post.author?.profile_pic}
              alt={post.author?.userName}
            />
          </div>
          <h2 className="font-medium text-sm text-[#2A2A28]">
            {post.author?.userName}
          </h2>
        </div>
        {post.isOwner && (
          <button
            onClick={handleDelete}
            disabled={actionLoading}
            className="text-[#8C8479] hover:text-[#791F1F] transition-colors"
            aria-label="Delete post"
          >
            <i className="ri-delete-bin-line text-lg"></i>
          </button>
        )}
      </div>

      <div className="centerPostdiv h-full md:h-auto md:max-h-[470px] overflow-hidden">
        <img
          className="w-full h-full object-cover object-center bg-no-repeat"
          src={post.photo_url}
          alt={post.caption || "Post"}
        />
      </div>

      <div className="bottomPostdiv">
        <div className="likes flex items-center justify-between px-3 py-2 text-xl text-[#2A2A28]">
          <div className="rightbutton flex justify-center items-center gap-4">
            <i
              className={`${post.isLiked ? "ri-heart-fill text-[#C97B4A]" : "ri-heart-line"} cursor-pointer`}
              onClick={toggleLike}
            ></i>
            <i className="ri-chat-1-line cursor-pointer"></i>
          </div>
          <div className="leftbutton">
            <i
              className={`${post.isSaved ? "ri-bookmark-fill text-[#2F4A3C]" : "ri-bookmark-line"} cursor-pointer`}
              onClick={toggleSave}
            ></i>
          </div>
        </div>

        <div className="captionDiv px-3 pb-3 text-[#2A2A28] text-sm leading-relaxed">
          <p className="text-[#8C8479] text-xs mb-1">
            {post.likeCount} {post.likeCount === 1 ? "like" : "likes"}
          </p>
          {post.caption && (
            <p>
              <span className="font-medium text-[#2F4A3C] mr-1.5">
                {post.author?.userName}
              </span>
              {post.caption}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SinglePost;
