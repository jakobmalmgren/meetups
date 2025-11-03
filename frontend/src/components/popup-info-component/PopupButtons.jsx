import "./PopupButtons.css";
function PopupButtons({ children, color, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{ backgroundColor: color }}
      className="popup-btn"
    >
      {children}
    </button>
  );
}

export default PopupButtons;
