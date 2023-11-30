import { useEffect } from "react";

const Payment = ({ closeModal }) => {
  
  useEffect(() => {
    const modal = document.getElementById("my_modal_5");

    const handleKeyDown = (event) => {
      // Prevent modal close on Esc key
      if (event.key === "Escape") {
        event.preventDefault();
      }
    };

    modal.showModal();
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      modal.close();
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeModal]);

  return (
    <div>
      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">
            Press ESC key or click the button below to close
          </p>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn" onClick={closeModal}>
                Close
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default Payment;
