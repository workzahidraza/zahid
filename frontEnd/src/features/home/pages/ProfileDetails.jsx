import React from "react";
import NavBar from "./NavBar";
import BottomNav from "./BottomNav";

const ProfileDetails = () => {
  return (
    <>
      <main className="h-screen overflow-hidden  bg-[#2E3532]">
        <NavBar />
        <div className="profile-container h-screen ">
          {/* <div className="profile_details h-[40%]  flex flex-col items-center py-2 ">
            <img className=" h-42 w-42 bg-amber-950 rounded-full border-none" src="" alt="" /> 
            <div className="profilePic h-42 w-42  rounded-full overflow-hidden flex justify-center items-center">
              <img
                className="w-full h-full object-cover object-center"
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=928&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt=""
              />
            </div>
            <div className="followercontainer h-[20%]  bg-sky-900">
              <div className="follower"></div>
              <div className="following"></div>
              <div className="post"></div>
            </div>
          </div>  */}
          <div className="profile_details h-[40%] w-full flex flex-col items-center justify-center gap-5 px-5 py-6">
            {/* Profile Picture */}
            <div className="h-36 w-36 rounded-full overflow-hidden border-4 border-[#8B2635] shadow-lg">
              <img
                className="h-full w-full object-cover"
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=928&auto=format&fit=crop"
                alt="Profile"
              />
            </div>

           
            <div className="text-center">
              <h1 className="text-2xl font-bold text-white">Zahid Shaikh</h1>
              <p className="text-gray-400">@zahidshaikh</p>
            </div>

           
            <div className="w-full flex justify-evenly">
              <div className="flex flex-col items-center">
                <h2 className="text-white text-xl font-bold">120</h2>
                <p className="text-gray-400 text-sm">Posts</p>
              </div>

              <div className="flex flex-col items-center">
                <h2 className="text-white text-xl font-bold">2.5K</h2>
                <p className="text-gray-400 text-sm">Followers</p>
              </div>

              <div className="flex flex-col items-center">
                <h2 className="text-white text-xl font-bold">180</h2>
                <p className="text-gray-400 text-sm">Following</p>
              </div>
            </div>
          </div>
          <div className="posts h-[60%] bg-black flex flex-col justify-start items-center gap-1 py-2">
            {/* <div className="box h-1/2 w-[90vw] bg-amber-400 rounded-2xl"></div>
            <div className="box h-1/2 w-[90vw] bg-amber-400 rounded-2xl"></div> */}
            
          </div>
        </div>
        <BottomNav />
      </main>
    </>
  );
};

export default ProfileDetails;
