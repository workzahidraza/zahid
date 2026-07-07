import React, { useState, useContext } from "react";
import "remixicon/fonts/remixicon.css";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../auth/context/authContext";

const NavBar = () => {
  const [menu, setMenu] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useContext(AuthContext);

  const isActive = (path) => location.pathname === path;

  const menuItems = [
    { icon: "ri-user-line", label: "Profile", path: "/profile" },
    { icon: "ri-search-line", label: "Search", path: "/search" },
    { icon: "ri-bookmark-line", label: "Saved", path: "/saved" },
    { icon: "ri-settings-3-line", label: "Settings", path: "/settings" },
  ];

  const goTo = (path) => {
    navigate(path);
    setMenu(false);
  };

  return (
    <>
      <div className="navbar bg-[#FAF9F5] border-b border-[#2A2A28]/10 flex justify-between items-center px-4 py-3 relative z-30">
        <button
          className="relative w-6 h-6 flex flex-col justify-center items-center cursor-pointer"
          onClick={() => setMenu((prev) => !prev)}
          aria-label="Toggle menu"
        >
          <span
            className={`absolute h-0.5 w-6 bg-[#2F4A3C] rounded-full transition-all duration-300 ease-in-out ${
              menu ? "rotate-45" : "-translate-y-2"
            }`}
          ></span>
          <span
            className={`absolute h-0.5 w-6 bg-[#2F4A3C] rounded-full transition-all duration-300 ease-in-out ${
              menu ? "opacity-0" : "opacity-100"
            }`}
          ></span>
          <span
            className={`absolute h-0.5 w-6 bg-[#2F4A3C] rounded-full transition-all duration-300 ease-in-out ${
              menu ? "-rotate-45" : "translate-y-2"
            }`}
          ></span>
        </button>

        <h1
          className="text-lg font-semibold text-[#2F4A3C] cursor-pointer"
          style={{ fontFamily: "'Source Serif 4', serif" }}
          onClick={() => navigate("/home")}
        >
          CollegeGram
        </h1>

        <div className="profilePic h-9 w-9 rounded-full overflow-hidden border border-[#C97B4A] cursor-pointer hover:opacity-80 transition-opacity">
          <img
            onClick={() => {
              if (location.pathname === "/home") {
                navigate("/profile");
              } else {
                navigate("/home");
              }
            }}
            className="w-full h-full object-cover object-center"
            src={user?.profile_pic}
            alt="Profile"
          />
        </div>
      </div>

      <div
        className={`fixed inset-0 bg-[#2A2A28]/30 z-40 transition-opacity duration-300 ${
          menu ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMenu(false)}
      ></div>

      <div
        className={`sideMenu h-screen w-64 fixed top-0 left-0 bg-[#FAF9F5] rounded-r-2xl shadow-xl flex flex-col justify-between items-stretch z-50 transform transition-transform duration-300 ease-out ${
          menu ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div>
          <div className="profileDiv w-full flex justify-start gap-3 items-center px-4 py-4 border-b border-[#2A2A28]/10">
            <div className="profilePic h-10 w-10 rounded-full overflow-hidden">
              <img
                className="w-full h-full object-cover object-center"
                src={user?.profile_pic}
                alt="Profile"
              />
            </div>
            <div>
              <h2 className="text-sm font-medium text-[#2A2A28]">
                {user?.userName}
              </h2>
              <p className="text-xs text-[#8C8479]">@{user?.userName}</p>
            </div>
          </div>

          <div className="py-2">
            {menuItems.map((item) => (
              <div
                key={item.path}
                className={`flex justify-start gap-3 items-center px-4 py-3 mx-2 rounded-lg cursor-pointer transition-colors ${
                  isActive(item.path)
                    ? "bg-[#E4EBE3] text-[#2F4A3C]"
                    : "text-[#2A2A28] hover:bg-[#E4EBE3]/60"
                }`}
                onClick={() => goTo(item.path)}
              >
                <i className={`${item.icon} text-lg`}></i>
                <h2 className="text-sm font-medium">{item.label}</h2>
              </div>
            ))}
          </div>
        </div>

        <div
          className="createPostDiv w-full flex justify-start gap-3 items-center px-4 py-4 cursor-pointer border-t border-[#2A2A28]/10 hover:bg-[#C97B4A]/10 transition-colors"
          onClick={() => goTo("/createPost")}
        >
          <i className="ri-add-line text-lg text-[#C97B4A]"></i>
          <h2 className="text-sm font-medium text-[#C97B4A]">Upload photo</h2>
        </div>
      </div>
    </>
  );
};

export default NavBar;
