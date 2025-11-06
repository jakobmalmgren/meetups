import "./Profile.css";
import { useState, useEffect } from "react";
import { FaUserCircle, FaCheck, FaTimes, FaInfoCircle } from "react-icons/fa";
import PopupLayout from "../components/popup-info-component/PopupLayout.jsx";
import Navbar from "../components/navbar/Navbar.jsx";
import SmallIcon from "../components/general-components/SmallIcon.jsx";
import ConfirmModal from "../components/general-components/ConfirmModal.jsx";
import { getProfileData, markMeetupAsDone } from "../api/profileApi.js";
import { unregisterMeetup } from "../api/unregisterMeetup.js";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [modalState, setModalState] = useState({
    isOpen: false,
    meetupId: null,
    meetupTitle: "",
  });

  const [infoModalOpen, setInfoModalOpen] = useState(false);
  const [selectedMeetupId, setSelectedMeetupId] = useState(null);

  // Hämta profildata när komponenten laddas
  useEffect(() => {
    const fetchProfile = async () => {
      setIsLoading(true);
      setError(null);
      const result = await getProfileData();

      if (result.success) {
        // Backend skickar datan i ett 'data'-objekt
        setUser(result.data);
      } else {
        setError(result.error || "Kunde inte ladda profilen.");
      }
      setIsLoading(false);
    };

    fetchProfile();
  }, []);

  // Handler för att öppna/stänga info-popup
  const handleInfoModal = (meetupId) => {
    setSelectedMeetupId(meetupId);
    setInfoModalOpen((prev) => !prev);
  };

  // Hanterar "Markera som klar"
  const handleMarkAsDone = async (meetupId) => {
    const result = await markMeetupAsDone(meetupId);
    if (result.success) {
      setUser(result.data);
    } else {
      alert(`Fel: ${result.error}`);
    }
  };

  // Öppnar "avboka"-modalen
  const openCancelModal = (meetup) => {
    setModalState({
      isOpen: true,
      meetupId: meetup._id,
      meetupTitle: meetup.title,
    });
  };

  const closeCancelModal = () => {
    setModalState({ isOpen: false, meetupId: null, meetupTitle: "" });
  };

  // Hanterar "Bekräfta avbokning"
  const handleConfirmCancel = async () => {
    if (!modalState.meetupId) return;

    const result = await unregisterMeetup(modalState.meetupId);

    if (result.success) {
      setUser((prevUser) => ({
        ...prevUser,
        registered: prevUser.registered.filter(
          (m) => m._id !== modalState.meetupId
        ),
      }));
      closeCancelModal();
    } else {
      alert(`Fel: ${result.error}`);
      closeCancelModal();
    }
  };

  if (isLoading) {
    return <p style={{ color: "white" }}>Loading profile...</p>;
  }

  // Visar felmeddelande
  if (error) {
    return <p style={{ color: "red" }}>Error: {error}</p>;
  }

  return (
    <div className="profile">
      <div className="icon-corner">
        <SmallIcon />
      </div>

      <div className="profile-content">
        {user?.image ? (
          <img src={user.image} alt="Profile" className="profile-img" />
        ) : (
          <FaUserCircle className="profile-icon" />
        )}

        <h1 className="profile-name">{user?.email}</h1>

        <div className="meetups-section">
          <h2>YOUR BOOKED MEETUPS</h2>
          <div className="meetups-box">
            {user?.registered?.length > 0 ? (
              <ul>
                {user.registered.map((m) => (
                  <li key={m._id}>
                    {" "}
                    {/* Använd _id från MongoDB som nyckel */}
                    <div className="meetup-details">
                      <span className="meetup-title">{m.title}</span>
                      <div className="meetup-sub-details">
                        <span className="meetup-date">
                          {new Date(m.date).toLocaleDateString("sv-SE")}
                        </span>
                        <span className="meetup-location">{m.location}</span>
                        <span className="meetup-category">{m.category}</span>
                      </div>
                    </div>
                    <div className="meetup-actions">
  
                      <button
                        className="action-btn info-btn"
                        aria-label="Show details"
                        onClick={() => handleInfoModal(m._id)}
                      >
                        <FaInfoCircle />
                      </button>

                      <button
                        className="action-btn done-btn"
                        aria-label="Mark as done"
                        onClick={() => handleMarkAsDone(m._id)}
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
            {user?.history?.length > 0 ? (
              <ul>
                {user.history.map((m) => (
                  <li key={m._id}>
                    
                    <div className="meetup-details">
                      <span className="meetup-title">{m.title}</span>
                      <div className="meetup-sub-details">
                        <span className="meetup-date">
                          {new Date(m.date).toLocaleDateString("sv-SE")}
                        </span>
                        <span className="meetup-location">{m.location}</span>
                        <span className="meetup-category">{m.category}</span>
                      </div>
                    </div>
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

      {infoModalOpen && (
        <section>
          <div
            className="blur-background"
            onClick={() => handleInfoModal(null)}
          ></div>
          <PopupLayout
            meetupId={selectedMeetupId}
            handleModal={() => handleInfoModal(null)}
          ></PopupLayout>
        </section>
      )}
    </div>
  );
}