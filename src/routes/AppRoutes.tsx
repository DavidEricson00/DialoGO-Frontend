import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/auth/Login.js";
import SignUp from "../pages/auth/SignUp.js";
import Home from "../pages/home/Home.js";
import NotFound from "../pages/errors/NotFound.js";
import { PrivateRoute } from "./PrivateRoute.js";

function RootRedirect() {
  const token = localStorage.getItem("token");

  return token ? <Navigate to="/home" replace /> : <Navigate to="/login" replace />;
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<RootRedirect />} />

      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />

      <Route
        path="/home"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
