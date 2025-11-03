import "./ConfirmModal.css";

export default function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
}) {
  // Om modalen inte är öppen, rendera ingenting
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      {/* 'modal-content' är själva rutan. 
        Vi stoppar propageringen så att ett klick inuti rutan inte stänger den.
      */}
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <p className="modal-text">
          Are you sure you want to cancel "{title}"?
        </p>
        <div className="modal-actions">
          <button className="modal-btn modal-btn-back" onClick={onClose}>
            Back
          </button>
          <button className="modal-btn modal-btn-confirm" onClick={onConfirm}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}