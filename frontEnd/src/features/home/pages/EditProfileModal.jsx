import React, { useState, useEffect } from "react";
import { updateProfile } from "../../auth/services/api.auth";

const EditProfileModal = ({ isOpen, onClose, profile, onUpdate }) => {
  const [bio, setBio] = useState("");
  const [photo, setPhoto] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (profile) {
      setBio(profile.bio || "");
      setPreviewUrl(profile.profile_pic || "");
      setPhoto(null);
      setMessage("");
    }
  }, [profile, isOpen]);

  if (!isOpen) return null;

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const formData = new FormData();
    formData.append("bio", bio);
    if (photo) {
      formData.append("profile_pic", photo);
    }

    const response = await updateProfile(formData);
    setMessage(response.message);
    setIsSuccess(response.success);

    if (response.success) {
      onUpdate?.(response.user);
      setTimeout(() => {
        onClose();
      }, 800);
    }
    setLoading(false);
  };

  return (
    <div
      className="fixed inset-0 bg-[#2A2A28]/30 flex items-center justify-center z-50 px-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm bg-[#FAF9F5] rounded-2xl px-5 py-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-sm font-medium text-[#2A2A28]">Edit profile</h2>
          <i
            className="ri-close-line text-xl text-[#8C8479] cursor-pointer hover:text-[#2A2A28] transition-colors"
            onClick={onClose}
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

        <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4">
          <div className="relative group cursor-pointer">
            <label
              htmlFor="profile_pic_input"
              className="h-24 w-24 rounded-full border-2 border-[#C97B4A] bg-[#F3EFE4] flex items-center justify-center cursor-pointer overflow-hidden relative"
            >
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt="preview"
                  className="h-full w-full object-cover"
                />
              ) : (
                <i className="ri-user-line text-3xl text-[#2A2A28]"></i>
              )}
              <div className="absolute inset-0 bg-[#2A2A28]/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <i className="ri-camera-line text-lg text-white"></i>
              </div>
            </label>
          </div>
          <input
            className="hidden"
            type="file"
            accept="image/*"
            id="profile_pic_input"
            onChange={handlePhotoChange}
          />
          <p className="text-[11px] text-[#8C8479] -mt-2">Click photo to upload new picture</p>

          <div className="w-full">
            <label className="text-[11px] text-[#8C8479] block mb-1 font-medium">Bio</label>
            <textarea
              className="bg-[#F3EFE4] text-[#2A2A28] placeholder-[#8C8479] w-full min-h-[80px] p-3 rounded-lg outline-none border-none text-sm resize-none focus:ring-2 focus:ring-[#2F4A3C]/30"
              placeholder="Write something about yourself..."
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-[#2F4A3C] text-[#FAF9F5] font-medium text-sm w-full h-10 rounded-lg outline-none border-none hover:bg-[#28402F] transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {loading ? "Saving changes..." : "Save details"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;
