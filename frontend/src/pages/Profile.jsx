import "./Profile.css";
import { FaUserCircle } from "react-icons/fa"; // fallback-ikon
import Navbar from "../components/navbar/Navbar.jsx";

// tillfällig mock-data (ersätts senare med backend-data)
const user = {
  name: "Jane Doe",
  image: "", 
  meetups: [
    { id: 1, title: "Frontend Developers Meetup", date: "2025-11-05" },
    { id: 2, title: "React CI/CD Workshop", date: "2025-12-10" },
  ],
};

export default function Profile() {
  return (
    <div className="profile">
      <div className="profile-card">
        {user.image ? (
          <img src={user.image} alt="Profile" className="profile-img" />
        ) : (
          <FaUserCircle className="profile-icon" />
        )}

        <h1 className="profile-name">{user.name}</h1>

        <div className="meetups-section">
          <h2>Your Meetups</h2>
          {user.meetups.length > 0 ? (
            <ul>
              {user.meetups.map((m) => (
                <li key={m.id}>
                  <span className="meetup-title">{m.title}</span>
                  <span className="meetup-date">{m.date}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="no-meetups">No meetups booked yet.</p>
          )}
        </div>
      </div>

      <Navbar />
    </div>
  );
}
