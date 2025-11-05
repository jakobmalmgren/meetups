import "./PopupTextArea.css";
import { useState } from "react";
import { FaStar } from "react-icons/fa";
import PopupButtons from "./PopupButtons";
import { reviewAPi } from "../../api/reviewApi";
// ej klar .

function PopupTextArea({ meetupId }) {
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [infoText, setInfoText] = useState("");
  const [leavingReview, setLeavingReview] = useState("");

  const handleClick = (value) => {
    setRating(value);
    // onRate(value);
  };

  const fetchReview = async () => {
    const data = await reviewAPi(meetupId, rating, reviewText);
    console.log("DATA REVIEW,", data);
    if (data.error) {
      setInfoText(data.error);
      setLeavingReview("error");
      setRating(0); // nollställer stjärnorna
      setReviewText(""); // tömmer textarea

      return;
    }
    setInfoText("Kanon! Du har lämnat en review!");
    setLeavingReview("success");
    setRating(0); // nollställer stjärnorna
    setReviewText(""); // tömmer textarea
    setLeavingReview("");
  };
  return (
    <section className="review">
      <h4 className="review_title">Leave a review</h4>
      <textarea
        className="review_textarea"
        name="review"
        id=""
        value={reviewText}
        onChange={(e) => {
          return setReviewText(e.target.value);
        }}
        placeholder="skriv dina recensioner här"
      ></textarea>
      <p className={`review ${leavingReview}`}>{infoText}</p>

      <div>
        {[1, 2, 3, 4, 5].map((value) => (
          <FaStar
            key={value}
            size={30}
            color={value <= rating ? "#CF8C22" : "#ccc"}
            onClick={() => handleClick(value)}
            style={{ cursor: "pointer" }}
          />
        ))}
      </div>
      <PopupButtons onClick={fetchReview} color="#CF8C22">
        Send Review
      </PopupButtons>
    </section>
  );
}

export default PopupTextArea;
