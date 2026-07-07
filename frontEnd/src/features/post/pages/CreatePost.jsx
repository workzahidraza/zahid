import React, { useState } from "react";
import { createPost } from "../services/api.post";

const CreatePost = ({ isOpen, onClose, onPostCreated }) => {
  const [caption, setCaption] = useState("");
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const resetForm = () => {
    setCaption("");
    setPhoto(null);
    setMessage("");
    setIsSuccess(false);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!photo) return;

    setLoading(true);
    setMessage("");

    const response = await createPost(photo, caption);
    setMessage(response.message);
    setIsSuccess(response.success);

    if (response.success) {
      onPostCreated?.();
      setTimeout(() => {
        handleClose();
      }, 800);
    }
    setLoading(false);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-[#2A2A28]/30 flex items-center justify-center z-50"
      onClick={handleClose}
    >
      <div
        className="w-[85vw] max-w-sm bg-[#FAF9F5] rounded-2xl px-5 py-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-sm font-medium text-[#2A2A28]">New post</h2>
          <i
            className="ri-close-line text-xl text-[#8C8479] cursor-pointer hover:text-[#2A2A28] transition-colors"
            onClick={handleClose}
          ></i>
        </div>

        {message && (
          <div
            className={`text-center text-xs font-medium rounded-lg px-3 py-2 mb-4 ${
              isSuccess
                ? "bg-[#E4EBE3] text-[#2F4A3C]"
                : "bg-[#F7C1C1] text-[#791F1F]"
            }`}
          >
            {message}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center gap-4"
        >
          <label
            htmlFor="photo"
            className="h-28 w-28 rounded-full border-2 border-dashed border-[#B7A98A] bg-[#F3EFE4] flex items-center justify-center cursor-pointer hover:bg-[#EDE6D8] transition-colors overflow-hidden"
          >
            {photo ? (
              <img
                src={URL.createObjectURL(photo)}
                alt="preview"
                className="h-full w-full object-cover"
              />
            ) : (
              <i className="ri-image-add-line text-3xl text-[#2F4A3C]"></i>
            )}
          </label>
          <input
            className="hidden"
            type="file"
            accept="image/*"
            id="photo"
            name="photo"
            onChange={(e) => setPhoto(e.target.files[0])}
          />

          <input
            className="bg-[#F3EFE4] text-[#2A2A28] placeholder-[#8C8479] w-full h-10 px-3 rounded-lg outline-none border-none text-sm"
            type="text"
            placeholder="Write a caption..."
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
          />

          <button
            type="submit"
            disabled={!photo || loading}
            className="bg-[#2F4A3C] text-[#FAF9F5] font-medium text-sm w-full h-10 rounded-lg outline-none border-none hover:bg-[#28402F] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Sharing..." : "Share post"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
