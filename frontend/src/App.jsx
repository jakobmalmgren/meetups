import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Profile from "./pages/Profile.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
import Login from "./components/signup-login/Login";
import Signup from "./components/signup-login/SignUp";
import Layout from "./components/signup-login/Layout.jsx";

function App() {
  return <></>;
}

export default App;
