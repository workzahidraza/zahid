import React from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import BottomNav from "./BottomNav";
import { useAuth } from "../../auth/hooks/useAuth";
import { useContext } from "react";
import { AuthContext } from "../../auth/context/authContext";

const Settings = () => {
  const { handleLogout, loading } = useAuth();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const onLogout = async () => {
    const response = await handleLogout();
    if (response.success) {
      navigate("/login");
    }
  };

  return (
    <main className="min-h-screen bg-[#FAF9F5] pb-20">
      <NavBar />

      <div className="px-4 py-6">
        <h2 className="text-sm font-medium text-[#2A2A28] mb-4">Settings</h2>

        <div className="bg-[#FAF9F5] border border-[#2A2A28]/10 rounded-2xl overflow-hidden">
          <div className="px-4 py-4 border-b border-[#2A2A28]/10">
            <p className="text-xs text-[#8C8479]">Account</p>
            <p className="text-sm font-medium text-[#2A2A28] mt-1">
              {user?.userName}
            </p>
            <p className="text-xs text-[#8C8479] mt-0.5">{user?.userEmail}</p>
          </div>

          <button
            onClick={onLogout}
            disabled={loading}
            className="w-full text-left px-4 py-4 text-sm font-medium text-[#791F1F] hover:bg-[#F7C1C1]/30 transition-colors disabled:opacity-60"
          >
            {loading ? "Logging out..." : "Log out"}
          </button>
        </div>
      </div>

      <BottomNav />
    </main>
  );
};

export default Settings;
