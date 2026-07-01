import React, { useState } from "react";
import "remixicon/fonts/remixicon.css";
const NavBar = () => {
  const [menu, setMenu] = useState(false);
  return (
    <>
      <div className="navbar bg-[#8B2635] flex justify-between items-center px-2.5 py-2.5">
        <i
          className="ri-menu-2-line font-bold text-lg"
          onClick={() => {
            if (menu == false) {
              setMenu(true);
            } else {
              setMenu(false);
            }
          }}
        ></i>
        <h1 className="text-xl font-semibold">CollegeGram</h1>
         <div className="profilePic h-9 w-9 rounded-full overflow-hidden">
              <img
                className="w-full h-full object-cover object-center"
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=928&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt=""
              />
            </div>
          
        
      </div>
      <div
        className={`sideMenu h-screen w-3xs  top-0 bg-cyan-200 flex justify-start items-center flex-col gap-0.5 ${menu ? "block" : "hidden"}`}
      >
        <div className="profileDiv  w-full bg-rose-300 flex justify-start gap-3 items-center px-1.5 py-2.5">
          <div className="img h-7 w-7 rounded-full bg-red-700"></div>
          <h2 className="text-xl font-bold uppercase">Profile</h2>
        </div>
        <div className="searchDiv w-full bg-rose-300 text-xl font-bold flex justify-start gap-5 items-center px-1.5 py-2.5">
          <i class="ri-search-line text-xl font-bold"></i>
          <h2 className="text-xl font-bold uppercase">search</h2>
        </div>
        <div className="createPostDiv  w-full bg-rose-300 text-xl font-bold flex justify-start gap-5 items-center px-1.5 py-2.5">
          <i class="ri-add-large-line"></i>
          <h2 className="text-xl font-bold uppercase">upload photo</h2>
        </div>
      </div>
    </>
  );
};

export default NavBar;
