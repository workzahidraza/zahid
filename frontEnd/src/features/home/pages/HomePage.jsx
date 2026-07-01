import Posts from "../../post/pages/Posts";
import BottomNav from "./BottomNav";
import NavBar from "./NavBar";
import "remixicon/fonts/remixicon.css";
const HomePage = () => {
  return (
    <>
      <main className="h-screen  bg-black">
        <NavBar />
        <Posts />
        <BottomNav/>
      </main>
    </>
  );
};

export default HomePage;
