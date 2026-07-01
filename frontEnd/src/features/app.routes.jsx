import { createBrowserRouter } from "react-router-dom";
import Login from "../features/auth/pages/Login";
import HomePage from "../features/home/pages/HomePage";
import Register from "./auth/pages/Register";

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
]);
