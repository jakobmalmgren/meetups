import "./Profile.css";
import { useState, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import Navbar from "../components/navbar/Navbar.jsx";

export default function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // --- MOCK-DATA just nu ---
    const mockUser = {
      email: "jane.doe@example.com",
      image: "",
      meetups: [
      { id: 1, title: "Frontend Developers Meetup", date: "2025-11-05" },
      { id: 2, title: "React CI/CD Workshop", date: "2025-12-10" },
      { id: 3, title: "JavaScript Community Night", date: "2026-01-14" },
      { id: 4, title: "Docker Deep Dive", date: "2026-02-08" },
      { id: 5, title: "Node.js API Masterclass", date: "2026-03-02" },
      { id: 6, title: "GitHub Actions for Beginners", date: "2026-03-28" },
      { id: 7, title: "Modern CSS & Tailwind Workshop", date: "2026-04-11" },
      { id: 8, title: "Fullstack Networking Night", date: "2026-05-09" },
      { id: 9, title: "TypeScript Fundamentals Bootcamp", date: "2026-06-20" },
      { id: 10, title: "Next.js and Vite Integration Session", date: "2026-07-15" }
      ],
    };

    // simulera backend
    setTimeout(() => setUser(mockUser), 500);

    /* 
    // --- När backend finns ---
    fetch("http://localhost:5000/api/profile", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then(res => res.json())
      .then(data => setUser(data))
      .catch(err => console.error("Failed to load profile:", err));
    */
  }, []);

  if (!user) return <p style={{ color: "white" }}>Loading profile...</p>;

  return (
    <div className="profile">
      <div className="profile-content">
        {user.image ? (
          <img src={user.image} alt="Profile" className="profile-img" />
        ) : (
          <FaUserCircle className="profile-icon" />
        )}

        <h1 className="profile-name">{user.email}</h1>

        <div className="meetups-section">
          <h2>YOUR BOOKED MEETUPS</h2>
          <div className="meetups-box">
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
      </div>

      <Navbar />
    </div>
  );
}
