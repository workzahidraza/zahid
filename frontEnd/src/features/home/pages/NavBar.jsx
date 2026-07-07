import React, { useState, useContext } from "react";
import "remixicon/fonts/remixicon.css";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../auth/context/authContext";
import { useAuth } from "../../auth/hooks/useAuth";

const NavBar = () => {
  const [menu, setMenu] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useContext(AuthContext);
  const { handleLogout } = useAuth();

  const isActive = (path) => location.pathname === path;

  const menuItems = [
    { icon: "ri-user-line", label: "Profile", path: "/profile" },
    { icon: "ri-search-line", label: "Search", path: "/search" },
    { icon: "ri-bookmark-line", label: "Saved", path: "/saved" },
    { icon: "ri-settings-3-line", label: "Settings", path: "/settings" },
  ];

  const desktopMenuItems = [
    { icon: "ri-home-line", activeIcon: "ri-home-fill", label: "Home", path: "/home" },
    { icon: "ri-search-line", activeIcon: "ri-search-fill", label: "Search", path: "/search" },
    { icon: "ri-add-circle-line", activeIcon: "ri-add-circle-fill", label: "Create", path: "/createPost" },
    { icon: "ri-bookmark-line", activeIcon: "ri-bookmark-fill", label: "Saved", path: "/saved" },
    { icon: "ri-user-line", activeIcon: "ri-user-fill", label: "Profile", path: "/profile" },
    { icon: "ri-settings-3-line", activeIcon: "ri-settings-3-fill", label: "Settings", path: "/settings" },
  ];

  const goTo = (path) => {
    navigate(path);
    setMenu(false);
  };

  const onLogout = async () => {
    const response = await handleLogout();
    if (response.success) {
      navigate("/login");
    }
  };

  return (
    <>
      {/* Mobile view top navigation & side menu */}
      <div className="md:hidden">
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
      </div>

      {/* Desktop view left sidebar (permanent) */}
      <div className="hidden md:flex fixed top-0 left-0 h-screen w-64 border-r border-[#2A2A28]/10 bg-[#FAF9F5] flex-col justify-between z-30 p-6">
        <div>
          <h1
            className="text-2xl font-bold text-[#2F4A3C] px-4 py-4 cursor-pointer mb-6"
            style={{ fontFamily: "'Source Serif 4', serif" }}
            onClick={() => navigate("/home")}
          >
            CollegeGram
          </h1>

          <div className="flex flex-col gap-1">
            {desktopMenuItems.map((item) => {
              const active = isActive(item.path);
              if (item.path === "/profile") {
                return (
                  <div
                    key={item.path}
                    className={`flex justify-start gap-4 items-center px-4 py-3 rounded-xl cursor-pointer transition-all duration-200 ${
                      active
                        ? "bg-[#E4EBE3] text-[#2F4A3C] font-semibold"
                        : "text-[#2A2A28] hover:bg-[#E4EBE3]/55"
                    }`}
                    onClick={() => navigate(item.path)}
                  >
                    <div className={`h-6 w-6 rounded-full overflow-hidden border ${active ? "border-[#2F4A3C] border-2" : "border-[#C97B4A]"}`}>
                      <img
                        className="w-full h-full object-cover"
                        src={user?.profile_pic}
                        alt="Profile"
                      />
                    </div>
                    <span className="text-sm font-medium">Profile</span>
                  </div>
                );
              }

              return (
                <div
                  key={item.path}
                  className={`flex justify-start gap-4 items-center px-4 py-3 rounded-xl cursor-pointer transition-all duration-200 ${
                    active
                      ? "bg-[#E4EBE3] text-[#2F4A3C] font-semibold"
                      : "text-[#2A2A28] hover:bg-[#E4EBE3]/55"
                  }`}
                  onClick={() => navigate(item.path)}
                >
                  <i className={`${active ? item.activeIcon : item.icon} text-xl`}></i>
                  <span className="text-sm font-medium">{item.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-auto border-t border-[#2A2A28]/10 pt-4 flex flex-col gap-3">
          <div className="flex items-center gap-3 px-2">
            <div className="h-9 w-9 rounded-full overflow-hidden border border-[#C97B4A]">
              <img
                className="w-full h-full object-cover"
                src={user?.profile_pic}
                alt="Profile"
              />
            </div>
            <div className="truncate">
              <p className="text-xs font-semibold text-[#2A2A28] truncate">{user?.userName}</p>
              <p className="text-[10px] text-[#8C8479] truncate">@{user?.userName}</p>
            </div>
          </div>
          <button
            onClick={onLogout}
            className="w-full flex items-center justify-start gap-4 px-4 py-3 rounded-xl text-sm font-medium text-[#791F1F] hover:bg-[#F7C1C1]/20 transition-all duration-200 cursor-pointer"
          >
            <i className="ri-log-out-line text-xl"></i>
            <span>Log out</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default NavBar;
