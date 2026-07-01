import { createBrowserRouter } from "react-router-dom";
import Login from "../features/auth/pages/Login";
import HomePage from "../features/home/pages/HomePage";
import Register from "./auth/pages/Register";
import CreatePost from "../features/post/pages/CreatePost";
import ProfileDetails from "./home/pages/ProfileDetails";
export const routes = createBrowserRouter([
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/home",
    element: <HomePage />,
  },
  {
    path: "/createPost",
    element: <CreatePost />,
  },
  {
    path: "/profile",
    element: <ProfileDetails />,
  },
]);
