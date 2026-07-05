// import React from "react";

// const SinglePost = () => {
//   return (
//     <>
//       <div className="post max-h-1/2 bg-[#2E3532] text-white rounded-2xl flex flex-col justify-between overflow-hidden ">
//         <div className="topPostdiv  bg-transparent flex justify-start items-center px-0.5 py-1 gap-3">
//           <div className="profilePic h-10 w-10 rounded-full overflow-hidden">
//             <img
//               className="w-full h-full object-cover object-center"
//               src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=928&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
//               alt=""
//             />
//           </div>
//           <h2 className="font-bold text-[#E0E2DB] uppercase">username</h2>
//         </div>
//         <div className="centerPostdiv   h-full  rounded-lg  overflow-hidden ">
//           <img
//             className="w-full h-full object-cover object-center  bg-no-repeat"
//             src="https://images.unsplash.com/photo-1781642349478-44eb9d615d6a?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
//             alt=""
//           />
//         </div>
//         <div className="bottomPostdiv  ">
//           <div className="likes flex items-center justify-between px-0.5 py-1  font-bold text-2xl text-[#E0E2DB]">
//             <div className="rightbutton flex justify-center items-center gap-2">
//               <i class="ri-heart-line"></i>
//               <i class="ri-chat-1-line"></i>
//             </div>
//             <div className="leftbutton">
//               <i class="ri-bookmark-line"></i>
//             </div>
//           </div>

//           <div className="captionDiv px-1 py-1 text-[#E0E2DB] ">
//             <h2>likes count</h2>
//             <span className="font-bold mr-2">username</span>
//             <h2>
//               Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione
//               reprehenderit odio impedit cumque quia, exercitationem facere
//               accusantium quidem aliquid ex.
//             </h2>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default SinglePost;

//updated cod eui design
import React from "react";

const SinglePost = () => {
  return (
    <>
      <div className="post max-h-1/2 bg-[#FAF9F5] text-[#2A2A28]  border border-[#2A2A28]/10 flex flex-col justify-between overflow-hidden">
        {/* Top: avatar + username */}
        <div className="topPostdiv bg-transparent flex justify-start items-center px-3 py-2.5 gap-3">
          <div className="profilePic h-9 w-9 rounded-full overflow-hidden">
            <img
              className="w-full h-full object-cover object-center"
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=928&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
            />
          </div>
          <h2 className="font-medium text-sm text-[#2A2A28]">username</h2>
        </div>

        {/* Middle: image */}
        <div className="centerPostdiv h-full overflow-hidden">
          <img
            className="w-full h-full object-cover object-center bg-no-repeat"
            src="https://images.unsplash.com/photo-1781642349478-44eb9d615d6a?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />
        </div>

        {/* Bottom: actions + caption */}
        <div className="bottomPostdiv">
          <div className="likes flex items-center justify-between px-3 py-2 text-xl text-[#2A2A28]">
            <div className="rightbutton flex justify-center items-center gap-4">
              <i className="ri-heart-line cursor-pointer"></i>
              <i className="ri-chat-1-line cursor-pointer"></i>
            </div>
            <div className="leftbutton">
              <i className="ri-bookmark-line cursor-pointer"></i>
            </div>
          </div>

          <div className="captionDiv px-3 pb-3 text-[#2A2A28] text-sm leading-relaxed">
            <p className="text-[#8C8479] text-xs mb-1">248 likes</p>
            <p>
              <span className="font-medium text-[#2F4A3C] mr-1.5">
                username
              </span>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione
              reprehenderit odio impedit cumque quia, exercitationem facere
              accusantium quidem aliquid ex.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SinglePost;
