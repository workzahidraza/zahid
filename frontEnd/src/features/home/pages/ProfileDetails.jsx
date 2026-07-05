// import React, { useEffect } from "react";
// import NavBar from "./NavBar";
// import BottomNav from "./BottomNav";
// import { useAuth } from "../../auth/hooks/useAuth";
// import axios from "axios";

// const ProfileDetails = () => {
//   return (
//     <>
//       <main className="h-screen overflow-hidden  bg-[#2E3532]">
//         <NavBar />
//         <div className="profile-container h-screen ">
//           {/* <div className="profile_details h-[40%]  flex flex-col items-center py-2 ">
//             <img className=" h-42 w-42 bg-amber-950 rounded-full border-none" src="" alt="" /> 
//             <div className="profilePic h-42 w-42  rounded-full overflow-hidden flex justify-center items-center">
//               <img
//                 className="w-full h-full object-cover object-center"
//                 src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=928&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
//                 alt=""
//               />
//             </div>
//             <div className="followercontainer h-[20%]  bg-sky-900">
//               <div className="follower"></div>
//               <div className="following"></div>
//               <div className="post"></div>
//             </div>
//           </div>  */}
//           <div className="profile_details h-[40%] w-full flex flex-col items-center justify-center gap-5 px-5 py-6">
//             {/* Profile Picture */}
//             <div className="h-36 w-36 rounded-full overflow-hidden border-4 border-[#8B2635] shadow-lg">
//               <img
//                 className="h-full w-full object-cover"
//                 src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=928&auto=format&fit=crop"
//                 alt="Profile"
//               />
//             </div>

//             <div className="text-center">
//               <h1 className="text-2xl font-bold text-white">Zahid Shaikh</h1>
//               <p className="text-gray-400">@zahidshaikh</p>
//             </div>

//             <div className="w-full flex justify-evenly">
//               <div className="flex flex-col items-center">
//                 <h2 className="text-white text-xl font-bold">120</h2>
//                 <p className="text-gray-400 text-sm">Posts</p>
//               </div>

//               <div className="flex flex-col items-center">
//                 <h2 className="text-white text-xl font-bold">2.5K</h2>
//                 <p className="text-gray-400 text-sm">Followers</p>
//               </div>

//               <div className="flex flex-col items-center">
//                 <h2 className="text-white text-xl font-bold">180</h2>
//                 <p className="text-gray-400 text-sm">Following</p>
//               </div>
//             </div>
//           </div>
//           <div className="posts h-[60%] bg-black flex flex-col justify-start items-center gap-1 py-2">
//             {/* <div className="box h-1/2 w-[90vw] bg-amber-400 rounded-2xl"></div>
//             <div className="box h-1/2 w-[90vw] bg-amber-400 rounded-2xl"></div> */}
//           </div>
//         </div>
//         <BottomNav />
//       </main>
//     </>
//   );
// };

// export default ProfileDetails;


//updated
import React from "react";
import NavBar from "./NavBar";
import BottomNav from "./BottomNav";

const ProfileDetails = () => {
  // Replace with real post data later
  const posts = [
    { id: 1, img: "https://images.unsplash.com/photo-1781642349478-44eb9d615d6a?q=80&w=774&auto=format&fit=crop" },
    { id: 2, img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=928&auto=format&fit=crop" },
    { id: 3, img: "https://images.unsplash.com/photo-1781642349478-44eb9d615d6a?q=80&w=774&auto=format&fit=crop" },
    { id: 4, img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=928&auto=format&fit=crop" },
    { id: 5, img: "https://images.unsplash.com/photo-1781642349478-44eb9d615d6a?q=80&w=774&auto=format&fit=crop" },
    { id: 6, img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=928&auto=format&fit=crop" },
  ];

  return (
    <main className="min-h-screen bg-[#FAF9F5]">
      <NavBar />

      <div className="profile-container pb-20">
        {/* Profile header */}
        <div className="profile_details w-full flex flex-col items-center justify-center gap-4 px-5 py-8">
          <div className="h-28 w-28 rounded-full overflow-hidden border-2 border-[#C97B4A]">
            <img
              className="h-full w-full object-cover"
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=928&auto=format&fit=crop"
              alt="Profile"
            />
          </div>

          <div className="text-center">
            <h1
              className="text-xl font-semibold text-[#2A2A28]"
              style={{ fontFamily: "'Source Serif 4', serif" }}
            >
              Zahid Shaikh
            </h1>
            <p className="text-[#8C8479] text-sm">@zahidshaikh</p>
          </div>

          <div className="w-full flex justify-evenly">
            <div className="flex flex-col items-center">
              <h2 className="text-[#2A2A28] text-lg font-medium">120</h2>
              <p className="text-[#8C8479] text-xs">Posts</p>
            </div>
            <div className="flex flex-col items-center">
              <h2 className="text-[#2A2A28] text-lg font-medium">2.5K</h2>
              <p className="text-[#8C8479] text-xs">Followers</p>
            </div>
            <div className="flex flex-col items-center">
              <h2 className="text-[#2A2A28] text-lg font-medium">180</h2>
              <p className="text-[#8C8479] text-xs">Following</p>
            </div>
          </div>

          <button className="w-40 bg-[#E4EBE3] text-[#2F4A3C] text-sm font-medium py-2 rounded-lg hover:bg-[#d9e3d7] transition-colors">
            Edit profile
          </button>
        </div>

        {/* Posts grid */}
        <div className="posts grid grid-cols-3 gap-0.5 px-0.5">
          {posts.map((post) => (
            <div key={post.id} className="aspect-square overflow-hidden bg-[#EDE6D8]">
              <img
                className="w-full h-full object-cover object-center cursor-pointer hover:opacity-90 transition-opacity"
                src={post.img}
                alt=""
              />
            </div>
          ))}
        </div>

        {/* Empty state, shown only if no posts */}
        {posts.length === 0 && (
          <div className="flex flex-col items-center justify-center gap-2 py-16 text-center">
            <i className="ri-image-line text-3xl text-[#B7A98A]"></i>
            <p className="text-[#2A2A28] font-medium text-sm">No posts yet</p>
            <p className="text-[#8C8479] text-xs">Photos you share will show up here.</p>
          </div>
        )}
      </div>

      <BottomNav />
    </main>
  );
};

export default ProfileDetails;
