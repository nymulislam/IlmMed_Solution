import { Helmet } from "react-helmet-async";
import { useLoaderData } from "react-router-dom";
import { TERipple } from "tw-elements-react";
import Payment from "../Payment/Payment";
import { useState } from "react";
import Swal from "sweetalert2";

const TestDetails = () => {
  const test = useLoaderData();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const calculateDateDifference = (currentDate, deadline) => {
    const currentDateObj = new Date(currentDate);
    const deadlineObj = new Date(deadline);
    const timeDifference = deadlineObj - currentDateObj;
    const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
    return Math.max(0, daysDifference);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleError = () => {
    Swal.fire({
      icon: "error",
      confirmButtonColor: "#2ecc70",
      title: "Test Slot Unavailable",
      text: "Sorry, the test slots are currently not available. Please choose another test or check back later.",
      footer:
        'If you have any questions, please contact our <a href="/allTestsPage">support team</a>.',
    });
  };

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <Helmet>
        <title>IlmMed Solution | Test Details</title>
      </Helmet>

      {/*  Daisy ui*/}
      <div className="card lg:card-side bg-base-100 shadow-xl">
        <figure>
          <img
            className="md:h-96 md:w-[1200px]"
            src={test?.testImage}
            alt="Test Image"
          />
        </figure>
        <span className="inline-block absolute top-7 left-0 whitespace-nowrap rounded-[0.27rem] bg-[#354a5f] px-[0.55em] pb-[0.30em] pt-[0.45em] text-center align-baseline text-[1.1em] font-bold leading-none text-[#d6f5e3]">
          ${test?.price}
        </span>
        <div className="card-body">
          <div className="flex items-center justify-between">
            <h2 className="card-title">{test?.name}</h2>
            <span className="badge badge-lg text-white font-medium pt-1 pb-1 bg-[#354a5f]">
              {test?.category}
            </span>
          </div>

          <div className="flex justify-between my-5">
            <h5 className="mb-2 text-lg font-medium leading-tight text-[#354a5f] dark:text-neutral-50">
              Test Slot: {test?.slot}
            </h5>
            <h5 className="text-[#354a5f] font-medium">
              Available Dates:{" "}
              <span className="badge badge-lg text-white font-medium pt-1 pb-1 bg-[#354a5f]">
                {calculateDateDifference(test?.currentDate, test?.deadline)}
              </span>
            </h5>
          </div>
          <p>{test?.description}</p>
          <div className="card-actions justify-end my-5">
            <TERipple rippleColor="light">
              {test?.slot > 0 ? (
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="inline-block rounded bg-gradient-to-r from-[#2ecc70] to-[#3398db] px-6 pb-2 pt-2.5 text-sm font-semibold uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                >
                  Book Now
                </button>
              ) : (
                <button
                  onClick={handleError}
                  className="inline-block rounded bg-gradient-to-r from-[#2ecc70] to-[#3398db] px-6 pb-2 pt-2.5 text-sm font-semibold uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                >
                  Book Now
                </button>
              )}
            </TERipple>
          </div>
        </div>
      </div>
      {isModalOpen && <Payment closeModal={closeModal} testDetails={test} />}
    </div>
  );
};

export default TestDetails;
