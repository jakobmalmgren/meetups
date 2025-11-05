import { NavLink, useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
import "./Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();

  // Funktion som hanterar utloggningen
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");

    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="links">
        <NavLink
          to="/home"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Home
        </NavLink>
        <NavLink
          to="/meetups"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Meetups
        </NavLink>
        <NavLink
          to="/profile"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Profile
        </NavLink>
      </div>
      
      <FaSignOutAlt className="icon-navbar" onClick={handleLogout} />
    </nav>
  );
}