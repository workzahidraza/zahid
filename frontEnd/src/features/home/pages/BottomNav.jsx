import React from "react";

const BottomNav = () => {
  return (
    <>
      <div className="bottom fixed bottom-0 left-0  bg-[#2E3532] w-full flex items-center justify-between px-2 py-1 text-3xl rounded-t-2xl">
        <i class="ri-home-line"></i>
        <i class="ri-add-large-fill bg-[#8B2635] w-18 h-18 rounded-full flex justify-center items-center absolute left-1/2 -translate-x-1/2 -translate-y-4 "></i>
        <div className="profilePic h-10 w-10 rounded-full overflow-hidden">
          <img
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
