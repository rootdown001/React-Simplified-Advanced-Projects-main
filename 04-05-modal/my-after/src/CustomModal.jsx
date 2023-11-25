import { useEffect } from "react";
import { createPortal } from "react-dom";

export default function CustomModal({ children, isCustomOpen, onClose }) {
  useEffect(() => {
    function handler(e) {
      if (e.key === "Escape") onClose();
    }

    document.addEventListener("keydown", handler);

    return () => {
      document.removeEventListener("keydown", handler);
    };
  }, [onClose]);

  return createPortal(
    <div className={`modal-overlay ${isCustomOpen ? "show" : ""}`}>
      <div className="modal">{children}</div>
    </div>,
    document.querySelector("#modal-container")
  );
}
