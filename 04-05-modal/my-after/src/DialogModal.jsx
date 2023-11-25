import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export default function DialogModal({ isOpen, onClose, children }) {
  const dialogRef = useRef(null);
  // console.log(
  //   "🚀 ~ file: DialogModal.jsx:6 ~ DialogModal ~ dialogRef:",
  //   dialogRef
  // );

  useEffect(() => {
    const dialog = dialogRef.current;
    console.log("🚀 ~ file: DialogModal.jsx:9 ~ useEffect ~ dialog:", dialog);

    if (dialog == null) return;

    if (isOpen) {
      dialog.showModal();
    } else {
      dialog.close();
    }
  }, [isOpen]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog == null) return;

    dialog.addEventListener("close", onClose);

    return () => {
      dialog.removeEventListener("close", onClose);
    };
  }, [onClose]);

  return createPortal(
    <dialog ref={dialogRef}>{children}</dialog>,
    document.querySelector("#modal-container")
  );
}
// TODO: play with this to understand dialog and the useEffects logic
