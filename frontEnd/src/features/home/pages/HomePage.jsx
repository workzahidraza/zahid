import Posts from "../../post/pages/Posts";
import NavBar from "./NavBar";
import "remixicon/fonts/remixicon.css";
const HomePage = () => {
  return (
    <>
      <main className="h-screen  bg-black">
        <NavBar />
        <Posts />
      </main>
    </>
  );
};

export default HomePage;
