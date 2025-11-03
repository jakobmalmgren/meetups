import "./Carousel.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Carousel() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <Slider {...settings}>
      <div>
        <h4 className="carousel-header">Review:</h4>
        <p className="carousel-review">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quod
          necessitatibus recusandae nam quis aliquid impedit optio libero omnis
        </p>
        <p className="carousel-user">User: Kalle</p>
      </div>
      <div>
        <h4 className="carousel-header">Review:</h4>
        <p className="carousel-review">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quod
          necessitatibus recusandae nam quis aliquid impedit optio libero omnis
        </p>
        <p className="carousel-user">User: Kalle</p>
      </div>
    </Slider>
  );
}

export default Carousel;
