import React from "react";
import "remixicon/fonts/remixicon.css";
import SinglePost from "./SinglePost";
const Post = () => {
  return (
    <>
      <main className="h-auto bg-[#FAF9F5] px-1 py-1">
        <SinglePost />
        <SinglePost />
        <SinglePost />
      </main>
    </>
  );
};

export default Post;
