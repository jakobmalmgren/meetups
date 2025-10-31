import "./PopupLayout.css";
import { FaCircleXmark } from "react-icons/fa6";
import image from "../../assets/meet.png";
export default function PopupLayout() {
  return (
    <div className="popup-layout">
      <FaCircleXmark className="x"></FaCircleXmark>
      <section className="popup-layout_img-wrapper">
        <img className="popup-layout_img" src={image} alt="" />
      </section>
      <section className="popup-layout_section-info">
        <h1>Event: alex event</h1>
        <p>tid & plats: Stockhiolm 24/5 kl 15.00</p>
        <p>
          info: Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Quibusdam, possimus repellendus iusto sint reiciendis reprehenderit
          esse, sequi odio voluptatum minus eum hic quaerat eius? Veritatis
          dolorum error eius sapiente dicta.
        </p>
        <p>antal platser: 40</p>
        <p>antal anmälda: 10</p>
      </section>
      <section className="popup-layout_btns">
        <button></button>
        <button></button>
      </section>
    </div>
  );
}
