import "./Home.css";
import SmallIcon from "../components/general-components/SmallIcon.jsx";
import meetingImage from "../assets/meet.png";
import Navbar from "../components/navbar/Navbar.jsx";

export default function Home() {
  return (
    <div className="home">
      {/* Loggan i övre högra hörnet av hela sidan */}
      <div className="icon-corner">
        <SmallIcon />
      </div>

      <div className="home-card">
        <h2>Welcome to</h2>
        <h1>
          Meetup <span>Z</span>
        </h1>
        <p>-The future of meetups</p>
        <img src={meetingImage} alt="Business meeting" />
      </div>

      <Navbar />
    </div>
  );
}
