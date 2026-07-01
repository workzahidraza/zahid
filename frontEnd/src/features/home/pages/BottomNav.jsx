import React from "react";
import { Link } from "react-router-dom";
const BottomNav = () => {
  return (
    <>
      <div
        className="post-container w-[95vw] bg-white/10 backdrop-blur-md h-[50vh] rounded-2xl fixed top-[70%] left-[50%] -translate-x-1/2
    -translate-y-1/2 px-2 py-1"
      >
        <div className="formBox  h-full w-full flex justify-center items-center ">
          <form className="form bg-red-400 h-[40vh] w-[70vw] px-2 py-1 ">asda</form>
        </div>
      </div>

      <div className="bottom fixed bottom-0 left-0  bg-[#2E3532] w-full flex items-center justify-between px-2 py-1 text-3xl rounded-t-2xl">
        <i
          class="ri-home-line"
          onClick={() => {
            <Link to="/home"></Link>;
          }}
        ></i>
        <i
          class="ri-add-large-fill bg-[#8B2635] w-18 h-18 rounded-full flex justify-center items-center absolute left-1/2 -translate-x-1/2 -translate-y-4"
          onClick={() => {
            <Link to="/createPost"></Link>;
          }}
        ></i>

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
