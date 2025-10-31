console.log("Navbar is rendering!");
import { NavLink } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
import "./Navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="links">
        <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>
          Home
        </NavLink>
        <NavLink to="/meetups" className={({ isActive }) => (isActive ? "active" : "")}>
          Meetups
        </NavLink>
        <NavLink to="/profile" className={({ isActive }) => (isActive ? "active" : "")}>
          Profile
        </NavLink>
      </div>
      <FaSignOutAlt className="icon" />
    </nav>
  );
}
