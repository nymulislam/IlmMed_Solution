import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { TERipple } from "tw-elements-react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useEffect, useState } from "react";
import useAuth from "../../../Hooks/useAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const CheckoutForm = ({ testDetails }) => {
  const [clientSecret, setClientSecret] = useState("");
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [processingPayment, setProcessingPayment] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const { price } = testDetails;
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {

    const adjustedPrice = discount > 0 ? (price - (price * discount) / 100) : price;
    axiosSecure.post("/testPayment", { price: adjustedPrice }).then((res) => {
      console.log(res.data.clientSecret);
      setClientSecret(res.data.clientSecret);
    });
  }, [axiosSecure, price, discount]);

  const handleCouponChange = (e) => {
    setCoupon(e.target.value);
  };

  const applyCoupon = () => {
    const couponRate = parseInt(coupon.slice(-2));
    if (!isNaN(couponRate)) {
      const newDiscount = Math.min(couponRate, 100);
      setDiscount(newDiscount);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);

    if (card === null) {
      return;
    }

    setProcessingPayment(true);


    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("Error creating payment method", error);
    } else {
      console.log("payment method created", paymentMethod);
    }

    try {
      const { paymentIntent, error: confirmError } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: card,
            billing_details: {
              email: user?.email || "anonymous",
              name: user.displayName || "anonymous",
            },
          },

        });
      if (confirmError) {
        console.log("Error confirming payment:", confirmError);
      } else {
        console.log("Payment confirmed:", paymentIntent);
        if (paymentIntent.status === "succeeded") {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Payment Successful",
            showConfirmButton: false,
            timer: 2000,
          });
          navigate("/");
        }
      }
    } catch (e) {
      console.error("Exception during payment confirmation", e);
    } finally {
      setProcessingPayment(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />

        <div
          className="flex items-center justify-evenly mt-10
        "
        >
          <input
            type="text"
            value={coupon}
            onChange={handleCouponChange}
            placeholder="Enter Coupon"
            className="input-sm py-[1.2rem] input input-bordered input-accent max-w-xs"
          />
          <TERipple rippleColor="light">
            <button
              type="button"
              onClick={applyCoupon}
              className="rounded bg-gradient-to-r from-[#2ecc70] to-[#3398db] px-6 pb-2 pt-2.5 text-sm font-semibold uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
            >
              Apply Coupon
            </button>
          </TERipple>
        </div>
        <div className="mt-10">
          <strong className="text-lg">Total Amount:</strong>{" "}
          <span className="badge text-lg bg-[#354a5f] text-[#edf1f2] py-3">
            ${Number(((100 - discount) / 100) * price).toFixed(2)}
          </span>
        </div>
        <TERipple rippleColor="light">
          <button
            type="submit"
            disabled={!stripe || !clientSecret || processingPayment}
            className="mt-8 inline-block rounded bg-gradient-to-r from-[#2ecc70] to-[#3398db] px-6 pb-2 pt-2.5 text-sm font-semibold uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
          >
            {processingPayment ? "Processing..." : "Pay"}
          </button>
        </TERipple>
      </form>
    </div>
  );
};

export default CheckoutForm;
