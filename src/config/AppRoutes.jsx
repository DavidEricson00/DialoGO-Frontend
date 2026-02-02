import { Routes, Route } from "react-router-dom";
import Login from "../pages/auth/Login.jsx";
import SignUp from "../pages/auth/SignUp.jsx";

export default function AppRoutes () {
    return (
        <Routes>
            <Route path="/login" element={<Login/>}/>
            <Route path="/signup" element={<SignUp/>}/>
        </Routes>
    )
}