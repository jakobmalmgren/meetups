import "./Profile.css";
import { useState, useEffect } from "react";
import { FaUserCircle, FaCheck, FaTimes } from "react-icons/fa";
import Navbar from "../components/navbar/Navbar.jsx";
import SmallIcon from "../components/general-components/SmallIcon.jsx";
import ConfirmModal from "../components/general-components/ConfirmModal.jsx";
export default function Profile() {
  const [user, setUser] = useState(null);

  const [modalState, setModalState] = useState({
    isOpen: false,
    meetupId: null,
    meetupTitle: "",
  });

  useEffect(() => {
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
        { id: 10, title: "Next.js and Vite Integration Session", date: "2026-07-15" },
      ],
      history: [
         { id: 11, title: "Old AI Ethics Panel", date: "2025-01-20" }
      ],
    };

    setTimeout(() => setUser(mockUser), 500);
  }, []);


  const handleMarkAsDone = (meetupId) => {
    const meetupToMove = user.meetups.find((m) => m.id === meetupId);
    if (!meetupToMove) return;

    setUser((prevUser) => ({
      ...prevUser,
      meetups: prevUser.meetups.filter((m) => m.id !== meetupId),
      history: [meetupToMove, ...prevUser.history],
    }));
  };

  const openCancelModal = (meetup) => {
    setModalState({
      isOpen: true,
      meetupId: meetup.id,
      meetupTitle: meetup.title,
    });
  };

  const closeCancelModal = () => {
    setModalState({ isOpen: false, meetupId: null, meetupTitle: "" });
  };

  const handleConfirmCancel = () => {
    if (!modalState.meetupId) return;

    setUser((prevUser) => ({
      ...prevUser,
      meetups: prevUser.meetups.filter((m) => m.id !== modalState.meetupId),
    }));
    
    closeCancelModal();
  };


  if (!user) return <p style={{ color: "white" }}>Loading profile...</p>;

  return (
    <div className="profile">
      <div className="icon-corner">
        <SmallIcon />
      </div>

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
                    
                    <div className="meetup-details">
                      <span className="meetup-title">{m.title}</span>
                      <span className="meetup-date">{m.date}</span>
                    </div>
                    
                    <div className="meetup-actions">
                      <button
                        className="action-btn done-btn"
                        aria-label="Mark as done"
                        onClick={() => handleMarkAsDone(m.id)}
                      >
                        <FaCheck />
                      </button>
                      <button
                        className="action-btn cancel-btn"
                        aria-label="Cancel meetup"
                        onClick={() => openCancelModal(m)}
                      >
                        <FaTimes />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="no-meetups">No meetups booked yet.</p>
            )}
          </div>
        </div>
        
        <div className="meetups-section history-section">
          <h2>YOUR HISTORY</h2>
          <div className="meetups-box">
            {user.history.length > 0 ? (
              <ul>
                {user.history.map((m) => (
                  <li key={m.id}>
                  
                    <span className="meetup-title">{m.title}</span>
                    <span className="meetup-date">{m.date}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="no-meetups">No history yet.</p>
            )}
          </div>
        </div>

      </div>

      <Navbar />

      <ConfirmModal
        isOpen={modalState.isOpen}
        onClose={closeCancelModal}
        onConfirm={handleConfirmCancel}
        title={modalState.meetupTitle}
      />
    </div>
  );
}