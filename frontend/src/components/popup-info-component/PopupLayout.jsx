import "./PopupLayout.css";
import PopupButtons from "./PopupButtons";
import { FaCircleXmark } from "react-icons/fa6";
import PopupTextArea from "./PopupTextArea";
import { FaArrowCircleDown } from "react-icons/fa";
import { useState, useEffect } from "react";
import Carousel from "./Carousel";
import { specificMeetupWithId } from "../../api/specificMeetupWithId";
import { registerMeetup } from "../../api/registerMeetup";

export default function PopupLayout({ meetupId, handleModal }) {
  const [specificMeetup, setSpecificMeetup] = useState(null);
  const [open, setOpen] = useState(false);
  const [bookingText, setBookingText] = useState("");
  const [bookingStatus, setBookingStatus] = useState("");
  //ny
  const [refreshReviews, setRefreshReviews] = useState(0);

  //ny
  const fetchSpecMeetup = async () => {
    try {
      const data = await specificMeetupWithId(meetupId);
      setSpecificMeetup(data);
      console.log("hejfrånpopuplayout: ", specificMeetup);
    } catch (err) {
      console.error("Failed to fetch specific meetup:", err);
    }
  };
  useEffect(() => {
    if (!meetupId) return;

    fetchSpecMeetup();
  }, [meetupId]);

  const handleReviewAdded = () => {
    // Öka värdet – triggar en re-render
    setRefreshReviews((prev) => prev + 1);
    // Hämta om meetup-info (så du även får uppdaterad review-lista i Layout om du vill visa där)
    fetchSpecMeetup();
  };

  // useEffect(() => {
  //   if (!meetupId) return;
  //   const fetchSpecMeetup = async () => {
  //     try {
  //       const data = await specificMeetupWithId(meetupId);
  //       setSpecificMeetup(data);
  //       console.log("hejfrånpopuplayout: ", specificMeetup);
  //     } catch (err) {
  //       console.error("Failed to fetch specific meetup:", err);
  //     }
  //   };
  //   fetchSpecMeetup();
  // }, [meetupId]);

  const handleRegisterMeetup = async () => {
    try {
      const data = await registerMeetup(meetupId);
      if (data.success !== true) {
        setBookingText(data.message);
        setBookingStatus("error");
        return;
      }
      setBookingText(data.message);
      setBookingStatus("success");
      const latestData = await specificMeetupWithId(meetupId);
      console.log("LATEST", latestData);

      // setSpecificMeetup(latestData);
      setSpecificMeetup({ ...latestData });
      // setSpecificMeetup((prev) => ({
      //   ...prev,
      //   availableSpots: prev.availableSpots - 1,
      // }));
    } catch (err) {
      console.log(err);
    }
  };

  // ett api för reviews me! finns de inga reviews.visa ej några reviews..

  return (
    <div className="popup-layout">
      <FaCircleXmark className="x" onClick={handleModal} />

      {!specificMeetup ? (
        <p>Loading meetup data...</p>
      ) : (
        <>
          <section className="popup-layout_section-info">
            <h1 className="popup-layout_header">{`Event: ${specificMeetup.title}`}</h1>
            <p className="popup-layout_time">
              {`Tid & plats: ${specificMeetup.date}`}
            </p>
            <p className="popup-layout_info">
              {`Description: ${specificMeetup.description}`}
            </p>
            <p className="popup-layout_amount-space">{`Antal platser totalt: ${specificMeetup.capacity}`}</p>
            <p className="popup-layout_amout-signup">{`Antal tillgängliga platser kvar: ${specificMeetup.availableSpots}`}</p>
          </section>

          <section className="popup-layout_carousel">
            <Carousel meetupId={meetupId} refresh={refreshReviews} />
          </section>

          <section className="popup-layout_btns">
            <PopupButtons onClick={handleRegisterMeetup} color="#CF8C22">
              Book
            </PopupButtons>
            <p className={`popup-layout_info-text ${bookingStatus}`}>
              {bookingText}
            </p>
            <PopupButtons
              onClick={() => setOpen((prev) => !prev)}
              color="#CF8C22"
            >
              Review
              <FaArrowCircleDown className="popup-layout_downIcon" />
            </PopupButtons>
          </section>

          {open && (
            <PopupTextArea
              meetupId={meetupId}
              handleReviewAdded={handleReviewAdded}
            />
          )}
        </>
      )}
    </div>
  );
}
