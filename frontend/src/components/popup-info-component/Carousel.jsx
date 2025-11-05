import "./Carousel.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useState } from "react";
import { specificMeetupWithId } from "../../api/specificMeetupWithId";

function Carousel({ meetupId }) {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    if (!meetupId) return;

    const fetchReviewsForMeetup = async () => {
      try {
        const data = await specificMeetupWithId(meetupId);
        console.log("DATA", data.reviews);
        if (data && Array.isArray(data.reviews)) {
          setReviews(data.reviews);
        }
      } catch (err) {
        console.error("Failed to fetch reviews:", err);
      }
    };

    fetchReviewsForMeetup();
  }, [meetupId]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <Slider {...settings}>
      {reviews.length > 0 ? (
        reviews.map((review, index) => (
          <div key={index}>
            <h4 className="carousel-header">{`Review: ${review.meetup.title}`}</h4>
            <p className="carousel-review">{review.text}</p>
            <p className="carousel-user">User: {review.review}</p>
            <p className="carousel-rating">Rating: {review.rating}</p>
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
