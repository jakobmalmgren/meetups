import "./PopupLayout.css";
import PopupButtons from "./PopupButtons";
import { FaCircleXmark } from "react-icons/fa6";
import image from "../../assets/meet.png";
import PopupTextArea from "./PopupTextArea";
import { FaArrowCircleDown } from "react-icons/fa";
import { useState } from "react";

export default function PopupLayout() {
  const [open, setOpen] = useState(false);
  return (
    <div className="popup-layout">
      <FaCircleXmark className="x"></FaCircleXmark>
      <section className="popup-layout_img-wrapper">
        <img className="popup-layout_img" src={image} alt="" />
      </section>
      <section className="popup-layout_section-info">
        <h1 className="popup-layout_header">Event: alex event</h1>
        <p className="popup-layout_time">
          Tid & plats: Stockholm 24/5 kl 15.00
        </p>
        <p className="popup-layout_info">
          Info: Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Quibusdam, possimus repellendus iusto sint reiciendis reprehenderit
          esse, sequi odio voluptatum minus eum hic quaerat eius? Veritatis
          dolorum error eius sapiente dicta.
        </p>
        <p className="popup-layout_amount-space">Antal platser: 40</p>
        <p className="popup-layout_amout-signup">Antal anmälda: 10</p>
      </section>
      <section className="popup-layout_btns">
        <PopupButtons color=" #CF8C22">Book</PopupButtons>
        <PopupButtons onClick={() => setOpen((prev) => !prev)} color=" #CF8C22">
          Review
          <FaArrowCircleDown className="popup-layout_downIcon"></FaArrowCircleDown>
        </PopupButtons>
      </section>

      {open && <PopupTextArea />}
    </div>
  );
}
