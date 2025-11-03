import "./Meetups.css";
import { useState, useEffect } from "react";
import { FaInfoCircle } from "react-icons/fa"; // En passande ikon för "mer info"
import Navbar from "../components/navbar/Navbar.jsx";
import SmallIcon from "../components/general-components/SmallIcon.jsx";
import { getAllMeetups } from "../services/meetupService.js"; // <-- Importera datan!

export default function Meetups() {
  // State för datan
  const [meetups, setMeetups] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // State för filter-värden
  const [locationFilter, setLocationFilter] = useState(""); 
  const [dateFilter, setDateFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  // Hämta data när komponenten laddas
  useEffect(() => {
    const loadMeetups = async () => {
      try {
        const data = await getAllMeetups();
        setMeetups(data);
      } catch (error) {
        console.error("Failed to fetch meetups:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadMeetups();
  }, []); // Tom array = körs bara en gång

  

  const handleOpenDetails = (meetup) => {
    console.log("Opening details for:", meetup.title);
    // TODO: Öppna popup-modalen här och skicka med 'meetup'-objektet
    // t.ex. openMeetupModal(meetup);
  };


  return (
    <div className="meetups"> {/* Huvud-wrapper med sidans namn */}
      <div className="icon-corner">
        <SmallIcon />
      </div>

      {/* Centrala innehållet */}
      {isLoading ? (
        // Visar laddningsmeddelande PÅ SAMMA PLATS som innehållet
        <div className="meetups-content">
          <p style={{ color: "white" }}>Loading meetups...</p>
        </div>
      ) : (
        // Visar det faktiska innehållet när laddningen är klar
        <div className="meetups-content">

          {/* SÖK-SEKTION */}
          <div className="search-section">
            <input
              type="text"
              placeholder="Search by title..."
              className="search-input"
            />
            <div className="filter-controls">
              <select 
                name="location" 
                className="filter-select"
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
              >
                <option value="" disabled>Location</option>
                <option value="a-z">Location (A-Ö)</option>
              </select>
              
              <select 
                name="date" 
                className="filter-select" 
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
              >
                <option value="" disabled>Date</option>
                <option value="newest">Newest first</option>
                <option value="oldest">Oldest first</option>
              </select>
              
              <select 
                name="category" 
                className="filter-select" 
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                <option value="" disabled>Category</option>
                <option value="a-z">Category (A-Ö)</option>
              </select>
            </div>
          </div>
          
          {/* LIST-SEKTION */}
          <div className="meetups-section">
            <h2>UPCOMING MEETUPS</h2>
            <div className="meetups-box">
              {meetups.length > 0 ? (
                <ul>
                  {meetups.map((m) => (
                    <li key={m.id}>
                      <div className="meetup-details">
                        <span className="meetup-title">{m.title}</span>
                        <span className="meetup-date">{m.date}</span>
                      </div>
                      
                      <div className="meetup-actions">
                        <button
                          className="action-btn info-btn"
                          aria-label="Show details"
                          onClick={() => handleOpenDetails(m)}
                        >
                          <FaInfoCircle />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="no-meetups">No meetups found.</p>
              )}
            </div>
          </div>
        </div>
      )}

      <Navbar />
    </div>
  );
}