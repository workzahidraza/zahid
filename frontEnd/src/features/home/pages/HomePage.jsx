import React, { useState } from "react";
import Posts from "../../post/pages/Posts";
import BottomNav from "./BottomNav";
import NavBar from "./NavBar";
import "remixicon/fonts/remixicon.css";

const HomePage = () => {
  const [refreshKey, setRefreshKey] = useState(0);

  const handlePostCreated = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <main className="h-screen bg-[#FAF9F5] md:pl-64">
      <NavBar />
      <Posts refreshKey={refreshKey} />
      <BottomNav onPostCreated={handlePostCreated} />
    </main>
  );
};

export default HomePage;
