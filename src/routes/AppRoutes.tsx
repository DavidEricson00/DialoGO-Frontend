import { Routes, Route } from "react-router-dom";
import Login from "../pages/auth/Login.js";
import SignUp from "../pages/auth/SignUp.js";
import Home from "../pages/home/Home.js";
import { PrivateRoute } from "./PrivateRoute.js";

export default function AppRoutes () {
    return (
        <Routes>
            <Route path="/login" element={<Login/>}/>
            <Route path="/signup" element={<SignUp/>}/>
            <Route path="/home" element={
                <PrivateRoute>
                    <Home/>
                </PrivateRoute>
            }/>
        </Routes>
    )
}