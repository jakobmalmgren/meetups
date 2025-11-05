import "./Meetups.css";
import { useState, useEffect, useCallback } from "react";
import { FaInfoCircle } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar/Navbar.jsx";
import SmallIcon from "../components/general-components/SmallIcon.jsx";
import PopupLayout from "../components/popup-info-component/PopupLayout.jsx";
import { getMeetups } from "../api/meetupsApi.js";

export default function Meetups() {
  // const navigate = useNavigate();

  // Data states
  const [meetups, setMeetups] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [meetupId, setMeetupId] = useState("");

  // Popup states
  // const [selectedMeetupId, setSelectedMeetupId] = useState(null);
  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  // Kontrollera inloggningsstatus vid första laddning
  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   setIsLoggedIn(!!token);
  // }, []);

  // Funktion som översätter filter-states till backend-anrop
  const loadMeetups = useCallback(async () => {
    setIsLoading(true);
    try {
      const params = {};

      if (searchQuery) {
        params.title = searchQuery;
      }

      if (dateFilter) {
        params.sortBy = "date";
        params.order = dateFilter === "newest" ? "desc" : "asc";
      } else if (locationFilter) {
        params.sortBy = "location";
        params.order = "asc";
      } else if (categoryFilter) {
        params.sortBy = "category";
        params.order = "asc";
      }

      const data = await getMeetups(params);

      const formattedData = data.map((m) => ({
        ...m,
        date: new Date(m.date).toLocaleString("sv-SE", {
          dateStyle: "short",
          timeStyle: "short",
        }),
      }));
      setMeetups(formattedData);
    } catch (error) {
      console.error("Failed to fetch meetups:", error);
      setMeetups([]);
    } finally {
      setIsLoading(false);
    }
  }, [searchQuery, locationFilter, dateFilter, categoryFilter]);

  useEffect(() => {
    loadMeetups();
  }, [loadMeetups]);

  // Inloggnings-check för att se detaljer
  // const handleOpenDetails = (meetupId) => {
  //   if (!isLoggedIn) {
  //     alert("Du måste vara inloggad för att se detaljerad information.");
  //   } else {
  //     setSelectedMeetupId(meetupId);
  //   }
  // };

  // const closePopup = () => {
  //   setSelectedMeetupId(null);
  // };
  const handleModal = (id) => {
    setMeetupId(id);
    setOpenModal((prev) => {
      return !prev;
    });
  };

  return (
    <div className="meetups">
      <div className="icon-corner">
        <SmallIcon />
      </div>

      <div className="meetups-content">
        <div className="meetups-header">
          <h1>Find Your Next Event</h1>
          <p>Explore, filter, and join our community meetups.</p>
        </div>

        <div className="search-section">
          <input
            type="text"
            placeholder="Search by title..."
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <div className="filter-controls">
            <select
              name="location"
              className="filter-select"
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
            >
              <option value="" disabled>
                Location
              </option>
              <option value="a-z">Location (A-Ö)</option>
            </select>

            <select
              name="date"
              className="filter-select"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
            >
              <option value="" disabled>
                Date
              </option>
              <option value="newest">Newest first</option>
              <option value="oldest">Oldest first</option>
            </select>

            <select
              name="category"
              className="filter-select"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="" disabled>
                Category
              </option>
              <option value="a-z">Category (A-Ö)</option>
            </select>
          </div>
        </div>

        {isLoading ? (
          <p style={{ color: "white", marginTop: "2rem" }}>
            Loading meetups...
          </p>
        ) : (
          <div className="meetups-section">
            <h2>UPCOMING MEETUPS</h2>
            <div className="meetups-box">
              {meetups.length > 0 ? (
                <ul>
                  {meetups.map((m) => (
                    <li key={m._id}>
                      <div className="meetup-details">
                        <span className="meetup-title">{m.title}</span>
                        <div className="meetup-sub-details">
                          <span className="meetup-date">{m.date}</span>
                          <span className="meetup-location">{m.location}</span>
                          <span className="meetup-category">{m.category}</span>
                        </div>
                      </div>
                      <div className="meetup-actions">
                        <button
                          className="action-btn info-btn"
                          aria-label="Show details"
                          onClick={() => {
                            handleModal(m._id);
                          }}
                        >
                          <FaInfoCircle />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="no-meetups">
                  No meetups found matching your criteria.
                </p>
              )}
            </div>
          </div>
        )}
      </div>

      <Navbar />

      {openModal && (
        <section>
          <div className="blur-background" onClick={handleModal}></div>
          <PopupLayout
            meetupId={meetupId}
            handleModal={handleModal}
          ></PopupLayout>
        </section>
      )}
    </div>
  );
}
