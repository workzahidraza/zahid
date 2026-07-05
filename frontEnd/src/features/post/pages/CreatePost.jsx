// import React from "react";
// import { useState, useNavigate } from "react";
// const CretePost = () => {
//   const [cretePost, setCreatepost] = useState(false);
//   const navigate = useNavigate();
//   return (
//     <>
//       <div
//         className={`post-container w-[95vw] bg-white/10 backdrop-blur-md h-[50vh] rounded-2xl fixed top-[70%] left-[50%] -translate-x-1/2
//     -translate-y-1/2 px-2 py-1 ${cretePost ? "block" : "hidden"}`}
//       >
//         <div className="formBox  h-full w-full flex justify-center items-center ">
//           <form className="form h-full w-full px-2 py-1 flex flex-col justify-center items-center gap-3 ">
//             <label
//               htmlFor="photo"
//               className="h-32 w-32 rounded-full bg-[#2E3532] flex items-center justify-center cursor-pointer hover:bg-gray-600"
//             >
//               <i className="ri-image-upload-line text-4xl text-white"></i>
//             </label>
//             <input
//               className="hidden "
//               type="file"
//               placeholder="upload pics"
//               id="photo"
//               name="photo"
//             />
//             <input
//               className="bg-amber-50 w-full mt-2 px-2 y-1 h-10 rounded-lg outline-none border-none"
//               type="text"
//               placeholder="enter caption"
//             />
//             <button className="bg-[#2E3532] text-[#8B2635] text-2xl font-bold w-full mt-2 px-2 y-1 h-10 rounded-lg outline-none border-none">
//               upload
//             </button>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// };

// export default CretePost;

//update ui
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreatePost = ({ isOpen, onClose }) => {
  const [caption, setCaption] = useState("");
  const [photo, setPhoto] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // hook this up to your upload API
    console.log({ photo, caption });
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-[#2A2A28]/30 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="w-[85vw] max-w-sm bg-[#FAF9F5] rounded-2xl px-5 py-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-sm font-medium text-[#2A2A28]">New post</h2>
          <i
            className="ri-close-line text-xl text-[#8C8479] cursor-pointer hover:text-[#2A2A28] transition-colors"
            onClick={onClose}
          ></i>
        </div>

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
            disabled={!photo}
            className="bg-[#2F4A3C] text-[#FAF9F5] font-medium text-sm w-full h-10 rounded-lg outline-none border-none hover:bg-[#28402F] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Share post
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
