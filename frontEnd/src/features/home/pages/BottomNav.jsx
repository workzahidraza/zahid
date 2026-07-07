import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../auth/context/authContext";
import CreatePost from "../../post/pages/CreatePost";

const BottomNav = ({ onPostCreated }) => {
  const [cretePost, setCreatepost] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useContext(AuthContext);

  return (
    <>
      <CreatePost
        isOpen={cretePost}
        onClose={() => setCreatepost(false)}
        onPostCreated={onPostCreated}
      />

      <div className="bottom fixed bottom-0 left-0 bg-[#FAF9F5] border-t border-[#2A2A28]/10 w-full flex items-center justify-between px-6 py-2.5">
        <i
          className="ri-home-line text-2xl text-[#2A2A28] cursor-pointer"
          onClick={() => navigate("/home")}
        ></i>

        <div
          className="w-11 h-11 rounded-full bg-[#2F4A3C] flex justify-center items-center absolute left-1/2 -translate-x-1/2 -translate-y-4 cursor-pointer"
          onClick={() => setCreatepost((prev) => !prev)}
        >
          <i className="ri-add-large-fill text-xl text-[#FAF9F5]"></i>
        </div>

        <div className="profilePic h-9 w-9 rounded-full overflow-hidden border border-[#C97B4A]">
          <img
            onClick={() => {
              if (location.pathname === "/profile") {
                navigate("/home");
              } else {
                navigate("/profile");
              }
            }}
            className="w-full h-full object-cover object-center cursor-pointer"
            src={user?.profile_pic}
            alt="Profile"
          />
        </div>
      </div>
    </>
  );
};

export default BottomNav;
