import Post from "../../post/pages/Post";
import NavBar from "./NavBar";
import "remixicon/fonts/remixicon.css";
const HomePage = () => {
  return (
    <>
      <main className="h-screen overflow-hidden bg-black">
        <NavBar />
        <Post />
      </main>
    </>
  );
};

export default HomePage;
