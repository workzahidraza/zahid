import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "../features/auth/pages/Login";
import HomePage from "../features/home/pages/HomePage";
import Register from "./auth/pages/Register";
import CreatePostPage from "../features/post/pages/CreatePostPage";
import ProfileDetails from "./home/pages/ProfileDetails";
import Search from "./home/pages/Search";
import Saved from "./home/pages/Saved";
import Settings from "./home/pages/Settings";
import ProtectedRoute from "./auth/components/ProtectedRoute";
import GuestRoute from "./auth/components/GuestRoute";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/home" replace />,
  },
  {
    path: "/register",
    element: (
      <GuestRoute>
        <Register />
      </GuestRoute>
    ),
  },
  {
    path: "/login",
    element: (
      <GuestRoute>
        <Login />
      </GuestRoute>
    ),
  },
  {
    path: "/home",
    element: (
      <ProtectedRoute>
        <HomePage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/createPost",
    element: (
      <ProtectedRoute>
        <CreatePostPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/profile",
    element: (
      <ProtectedRoute>
        <ProfileDetails />
      </ProtectedRoute>
    ),
  },
  {
    path: "/search",
    element: (
      <ProtectedRoute>
        <Search />
      </ProtectedRoute>
    ),
  },
  {
    path: "/saved",
    element: (
      <ProtectedRoute>
        <Saved />
      </ProtectedRoute>
    ),
  },
  {
    path: "/settings",
    element: (
      <ProtectedRoute>
        <Settings />
      </ProtectedRoute>
    ),
  },
]);
