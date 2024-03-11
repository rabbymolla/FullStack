import React from "react";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Registration from "../pages/Registration";
import Otp from "../pages/Otp";
import Login from "../pages/Login";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Registration />} />
      <Route path="/otp/:email" element={<Otp />} />
      <Route path="/login" element={<Login />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
