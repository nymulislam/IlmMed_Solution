import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect } from "react";
import { TERipple } from "tw-elements-react";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_PK_PAYMENT);

const Payment = ({ closeModal, testDetails }) => {
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
          <h3 className="font-bold text-lg mb-5">
            Payment Method By <span>Stripe</span>
          </h3>
          <Elements stripe={stripePromise}>
            <CheckoutForm testDetails={testDetails}></CheckoutForm>
          </Elements>
          <div className="modal-action">
            <form method="dialog">
              <TERipple rippleColor="light">
                <button
                  className="inline-block rounded bg-gradient-to-r from-[#eb0505] to-[#fa0000] px-6 pb-2 pt-2.5 text-sm font-semibold uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                  onClick={closeModal}
                >
                  Close
                </button>
              </TERipple>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default Payment;
