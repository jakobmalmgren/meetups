import "./Carousel.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useState } from "react";
import { specificMeetupWithId } from "../../api/specificMeetupWithId";

function Carousel({ meetupId, refresh }) {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    if (!meetupId) return;

    const fetchReviewsForMeetup = async () => {
      try {
        const data = await specificMeetupWithId(meetupId);
        console.log("DATAreviiiiiiiie", data.reviews);
        if (data && Array.isArray(data.reviews)) {
          setReviews(data.reviews);
        }
      } catch (err) {
        console.error("Failed to fetch reviews:", err);
      }
    };

    fetchReviewsForMeetup();
  }, [meetupId, refresh]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <Slider {...settings} className="carousel-slider">
      {reviews.length > 0 ? (
        reviews.map((review, index) => (
          <div key={index} className="carousel-wrapper">
            <h4 className="carousel-header">{`Title: ${review.meetup.title}`}</h4>
            <p className="carousel-user">{`User: ${review.user}`} </p>
            <p className="carousel-review">{`Review: ${review.review}`} </p>
            <p className="carousel-rating">{`Rating: ${review.rating}`} </p>
          </div>
        ))
      ) : (
        <div>
          <p className="carousel-review">No reviews yet for this meetup.</p>
        </div>
      )}
    </Slider>
  );
}

export default Carousel;
