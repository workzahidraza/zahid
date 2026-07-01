import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const BottomNav = () => {
  const [cretePost, setCreatepost] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <>
      <div
        className={`post-container w-[95vw] bg-white/10 backdrop-blur-md h-[50vh] rounded-2xl fixed top-[70%] left-[50%] -translate-x-1/2
    -translate-y-1/2 px-2 py-1 ${cretePost ? "block" : "hidden"}`}
      >
        <div className="formBox  h-full w-full flex justify-center items-center ">
          <form className="form h-full w-full px-2 py-1 flex flex-col justify-center items-center gap-3 ">
            <label
              htmlFor="photo"
              className="h-32 w-32 rounded-full bg-[#2E3532] flex items-center justify-center cursor-pointer hover:bg-gray-600"
            >
              <i className="ri-image-upload-line text-4xl text-white"></i>
            </label>
            <input
              className="hidden "
              type="file"
              placeholder="upload pics"
              id="photo"
              name="photo"
            />
            <input
              className="bg-amber-50 w-full mt-2 px-2 y-1 h-10 rounded-lg outline-none border-none"
              type="text"
              placeholder="enter caption"
            />
            <button className="bg-[#2E3532] text-[#8B2635] text-2xl font-bold w-full mt-2 px-2 y-1 h-10 rounded-lg outline-none border-none">
              upload
            </button>
          </form>
        </div>
      </div>

      <div className="bottom fixed bottom-0 left-0  bg-[#2E3532] w-full flex items-center justify-between px-2 py-1 text-3xl rounded-t-2xl">
        <i
          class="ri-home-line"
          onClick={() => {
            navigate("/home");
          }}
        ></i>
        <i
          class={`ri-add-large-fill bg-[#8B2635] w-18 h-18 rounded-full flex justify-center items-center absolute left-1/2 -translate-x-1/2 -translate-y-4 `}
          onClick={() => {
            if (cretePost == false) {
              setCreatepost(true);
              // navigate("/createPost")
            } else {
              setCreatepost(false);
            }
          }}
        ></i>

        <div className="profilePic h-10 w-10 rounded-full overflow-hidden">
          <img
            onClick={(e) => {
              if (location.pathname == "/profile") {
                navigate("/home");
              } else {
                navigate("/profile");
              }
            }}
            className="w-full h-full object-cover object-center"
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=928&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />
        </div>
      </div>
    </>
  );
};

export default BottomNav;
