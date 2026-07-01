import React from "react";
import { useState, useNavigate } from "react";
const CretePost = () => {
  const [cretePost, setCreatepost] = useState(false);
  const navigate = useNavigate();
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
    </>
  );
};

export default CretePost;
