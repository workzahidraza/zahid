import React from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../../home/pages/NavBar";
import BottomNav from "../../home/pages/BottomNav";
import CreatePost from "./CreatePost";

const CreatePostPage = () => {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-[#FAF9F5]">
      <NavBar />
      <CreatePost
        isOpen={true}
        onClose={() => navigate("/home")}
        onPostCreated={() => navigate("/home")}
      />
      <BottomNav />
    </main>
  );
};

export default CreatePostPage;
