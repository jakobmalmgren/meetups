import "./Meetups.css";
import { useState, useEffect, useMemo } from "react"; 
import { FaInfoCircle } from "react-icons/fa";
import Navbar from "../components/navbar/Navbar.jsx";
import SmallIcon from "../components/general-components/SmallIcon.jsx";
import { getAllMeetups } from "../services/meetupService.js";

export default function Meetups() {
  const [meetups, setMeetups] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // State för filter-värden
  const [searchQuery, setSearchQuery] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

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
  }, []);

  
  const filteredMeetups = useMemo(() => {
    let processedMeetups = [...meetups];

    // 1. Filtrera på söktitel
    if (searchQuery) {
      processedMeetups = processedMeetups.filter((m) =>
        m.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // 2. Sortera på datum
    if (dateFilter === "newest") {
      processedMeetups.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (dateFilter === "oldest") {
      processedMeetups.sort((a, b) => new Date(a.date) - new Date(b.date));
    }

    // 3. Sortera på plats (A-Ö)
    if (locationFilter === "a-z") {
      processedMeetups.sort((a, b) => a.location.localeCompare(b.location));
    }
    
    // 4. Sortera på kategori (A-Ö)
    if (categoryFilter === "a-z") {
      processedMeetups.sort((a, b) => a.category.localeCompare(b.category));
    }

    return processedMeetups;
  }, [meetups, searchQuery, locationFilter, dateFilter, categoryFilter]);


  const handleOpenDetails = (meetup) => {
    console.log("Opening details for:", meetup.title);
  };


  return (
    <div className="meetups">
      <div className="icon-corner">
        <SmallIcon />
      </div>

      {isLoading ? (
        <div className="meetups-content">
          <p style={{ color: "white" }}>Loading meetups...</p>
        </div>
      ) : (
        <div className="meetups-content">
          <div className="meetups-header">
            <h1>Find Your Next Event</h1>
            <p>Explore, filter, and join our community meetups.</p>
          </div>

          <div className="search-section">

            {/* Koppla sökfältet till state */}
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
          
          <div className="meetups-section">
            <h2>UPCOMING MEETUPS</h2>
            <div className="meetups-box">
          
              {filteredMeetups.length > 0 ? (
                <ul>
                  {filteredMeetups.map((m) => (
                    <li key={m.id}>
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
                          onClick={() => handleOpenDetails(m)}
                        >
                          <FaInfoCircle />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="no-meetups">No meetups found matching your criteria.</p>
              )}
            </div>
          </div>
        </div>
      )}

      <Navbar />
    </div>
  );
}