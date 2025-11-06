import "./Home.css";
import SmallIcon from "../components/general-components/SmallIcon.jsx";
import meetingImage from "../assets/meet.png";
import Navbar from "../components/navbar/Navbar.jsx";
import { useState, useEffect } from "react";

export default function Home() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const storedUser = localStorage.getItem("userEmail");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);
  return (
    <div className="home">
      <div className="icon-corner">
        <SmallIcon />
      </div>

   
      <div className="home-content-wrapper">
        <div className="home-card">
          <h2>Welcome to</h2>
          <h1>
            Meetup <span>Z</span>
          </h1>
          <p className="home_user">{user}</p>
          <p>-The future of meetups</p>
          <img src={meetingImage} alt="Business meeting" />
        </div>
      </div>
      {/* SLUT PÅ WRAPPER */}

      <Navbar />
    </div>
  );
}