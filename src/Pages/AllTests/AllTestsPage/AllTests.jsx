import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { TERipple } from "tw-elements-react";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { DatePicker } from "react-widgets/cjs";
import "react-widgets/styles.css";
import React from "react";
import useAuth from "../../../Hooks/useAuth";
import { toast } from "sonner";

const AllTestsPage = () => {
  const axiosPublic = useAxiosPublic();
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const { user } = useAuth();
  const navigate = useNavigate();

  const { data: allTests = [] } = useQuery({
    queryKey: ["allTests"],
    queryFn: async () => {
      const res = await axiosPublic.get("/allTests");
      return res.data;
    },
  });

  const calculateDateDifference = (currentDate, deadline) => {
    const currentDateObj = new Date(currentDate);
    const deadlineObj = new Date(deadline);
    const timeDifference = deadlineObj - currentDateObj;
    const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
    return Math.max(0, daysDifference);
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const futureTests = allTests.filter((test) => {
    const testDate = new Date(test.deadline);
    return testDate >= today;
  });

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
  };

  const filteredTests = futureTests.filter((test) => {
    const testDate = new Date(test.deadline);
    return testDate >= selectedDate;
  });

  const handleDetailsClick = (testId) => {
    if (!user) {
      toast.error("Please log in to view test details", {
        position: "top-right",
      });

      return navigate("/login");
    } else {
      navigate(`/testDetails/${testId}`);
    }
  };

  return (
    <div className="my-10 shadow-lg max-w-6xl mx-auto py-10 rounded-md">
      <Helmet>
        <title>IlmMed Solution | All Tests</title>
      </Helmet>

      {/* search feature */}
      <div className="max-w-sm mx-auto mb-5">
        <h2 className="font-semibold text-[#354a5f]">Search By Date:</h2>
        <DatePicker
          min={new Date()}
          value={selectedDate}
          onChange={handleDateChange}
        />
        ;
      </div>

      {/* test cards */}
      <div className="grid grid-cols-2 gap-10 max-w-5xl mx-auto">
        {filteredTests.map((test) => (
          <div
            key={test._id}
            className="block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700"
          >
            <TERipple rippleColor="light">
              <div className="relative overflow-hidden bg-cover bg-no-repeat h-80">
                <img
                  className="rounded-t-lg"
                  src={test?.testImage}
                  alt="Test Image"
                />
                <span className="inline-block absolute top-7 right-7 whitespace-nowrap rounded-[0.27rem] bg-[#354a5f] px-[0.55em] pb-[0.30em] pt-[0.45em] text-center align-baseline text-[1.1em] font-bold leading-none text-[#d6f5e3]">
                  ${test?.price}
                </span>
                <a href="#!">
                  <div className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-[hsla(0,0%,98%,0.15)] bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100"></div>
                </a>
              </div>
            </TERipple>
            <div className="p-6">
              <div className="flex justify-between items-center">
                <h5 className="mb-2 text-xl font-semibold leading-tight text-[#354a5f] dark:text-neutral-50">
                  {test?.name}
                </h5>
                <span className="badge badge-lg text-white font-medium pt-1 pb-1 bg-[#354a5f]">
                  {test?.category}
                </span>
              </div>
              <div className="flex justify-between mt-3">
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
              <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200 mt-3">
                {test?.description}
              </p>
              <TERipple rippleColor="light">
                <button
                  type="button"
                  onClick={() => handleDetailsClick(test._id)}
                  className="inline-block rounded bg-gradient-to-r from-[#2ecc70] to-[#3398db] px-6 pb-2 pt-2.5 text-sm font-semibold uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                >
                  Details
                </button>
              </TERipple>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllTestsPage;
