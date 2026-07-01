import React from "react";
import HomePage from "./features/home/pages/HomePage";
import { RouterProvider } from "react-router-dom";
import { routes } from "./features/app.routes";

const App = () => {
  return <RouterProvider router={routes} />;
};

export default App;
