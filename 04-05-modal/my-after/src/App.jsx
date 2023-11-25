import { useState } from "react";
import CustomModal from "./CustomModal";
import DialogModal from "./DialogModal";

function App() {
  const [isCustomOpen, setIsCustomOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  function handleCustom() {
    console.log("in custom");
    setIsCustomOpen(true);
  }

  function handleDialog() {
    console.log("in dialog");
    setIsDialogOpen(true);
  }

  function onCustomClose() {
    setIsCustomOpen(false);
  }

  function onDialogClose() {
    setIsDialogOpen(false);
  }

  return (
    <>
      <button onClick={handleCustom} data-custom-open>
        Show Custom Modal
      </button>
      <br />
      <button onClick={handleDialog}>Show Dialog Modal</button>

      <CustomModal isCustomOpen={isCustomOpen} onClose={onCustomClose}>
        <p>
          This is a <strong>CUSTOM</strong> modal
        </p>
        <button onClick={onCustomClose}>Close</button>
      </CustomModal>
      <DialogModal isOpen={isDialogOpen} onClose={onDialogClose}>
        <p>
          This is a <strong>DIALOG</strong> modal
        </p>
        <button onClick={onDialogClose}>Close</button>
      </DialogModal>
    </>
  );
}

export default App;
