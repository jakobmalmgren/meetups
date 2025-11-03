import "./PopupTextArea.css";
import { useState } from "react";
import { FaStar } from "react-icons/fa";
import PopupButtons from "./PopupButtons";
// ej klar måste pilla me de lite..

function PopupTextArea() {
  const [rating, setRating] = useState(0);
  const handleClick = (value) => {
    setRating(value);
    // onRate(value);
  };
  return (
    <section className="review">
      <h4 className="review_title">Leave a review</h4>
      <textarea className="review_textarea" name="review" id=""></textarea>
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
      <PopupButtons color="#CF8C22">Send Review</PopupButtons>
    </section>
  );
}

export default PopupTextArea;
