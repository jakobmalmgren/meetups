import "./Home.css";
import meetingImage from "../assets/meet.png";

export default function Home() {
  return (
    <div className="home">
      <div className="home-card">
        <h2>Welcome to</h2>
        <h1>Meetup <span>Z</span></h1>
        <p>The future of meetups</p>
        <img src={meetingImage} alt="Business meeting" />
      </div>
    </div>
  );
}
