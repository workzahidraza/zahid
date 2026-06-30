import React, { useState } from "react";
import "remixicon/fonts/remixicon.css";
const HomePage = () => {
  const [menu, setMenu] = useState(false);

  //   function setClickedOnMenu() {
  //     if (menu) {
  //     }
  //   }
  return (
    <>
      <main className="h-screen overflow-hidden bg-black">
        <div className="navbar bg-red-500 flex justify-between items-center px-2.5 py-2.5">
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
          <i className="ri-user-line font-bold text-lg"></i>
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
      </main>
    </>
  );
};

export default HomePage;
