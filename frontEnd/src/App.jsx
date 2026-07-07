import React from "react";
import { RouterProvider } from "react-router-dom";
import { routes } from "./features/app.routes";
import { AuthProvider } from "./features/auth/context/authContext";

const App = () => {
  return (
    <AuthProvider>
      <RouterProvider router={routes} />
    </AuthProvider>
  );
};

export default App;
