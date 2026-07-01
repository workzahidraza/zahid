import { createBrowserRouter } from "react-router-dom";
import Login from "../features/auth/pages/Login";
import HomePage from "../features/home/pages/HomePage";

export const routes = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/home",
    element: <HomePage />,
  },
]);
