import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { TERipple } from "tw-elements-react";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { DatePicker } from "react-widgets/cjs";
import "react-widgets/styles.css";
import React, { useState } from "react";
import useAuth from "../../../Hooks/useAuth";
import { toast } from "sonner";
import Loading from "../../../Components/Loading/Loading";
import Button from "../../../Components/Button/Button";

const ITEMS_PER_PAGE = 2;

const AllTestsPage = () => {
  const axiosPublic = useAxiosPublic();
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [currentPage, setCurrentPage] = useState(1);
  const { user } = useAuth();
  const navigate = useNavigate();

  const { data: allTests = [], isFetching } = useQuery({
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
    setCurrentPage(1);
  };

  const filteredTests = futureTests
    .filter((test) => {
      const testDate = new Date(test.deadline);
      return testDate >= selectedDate;
    })

    .slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

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

  const totalPages = Math.ceil(futureTests.length / ITEMS_PER_PAGE);

  return (
    <div className="my-10 max-w-6xl mx-auto py-10 rounded-md">
      {isFetching && <Loading />}
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
      </div>

      {/* test cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-sm md:max-w-2xl lg:max-w-5xl mx-auto h-[1200px] lg:h-[550px] mt-10">
        {filteredTests.map((test) => (
          <div
            key={test._id}
            className="block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700"
          >
            <TERipple rippleColor="light">
              <div className="relative overflow-hidden h-80">
                <img
                  className="p-5 rounded-3xl"
                  src={test?.testImage}
                  alt="Test Image"
                />
                <span className="inline-block absolute top-9 left-5 whitespace-nowrap rounded-[0.27rem] bg-[#354a5f] px-[0.55em] pb-[0.30em] pt-[0.45em] text-center align-baseline text-[1.1em] font-bold leading-none text-[#d6f5e3]">
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
                <Button
                  type="button"
                  className="px-4 py-2 pt-2.5 bg-gradient-to-r from-[#2ecc70] to-[#3398db] text-sm font-semibold text-white"
                  onClick={() => handleDetailsClick(test._id)}
                >
                  Details
                </Button>
              </TERipple>
            </div>
          </div>
        ))}
      </div>
      {/* Pagination buttons */}
      <div className="join grid grid-cols-2 max-w-xs md:max-w-md mx-auto mt-32 md:mt-16">
        <button
          className="join-item btn btn-outline"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous page
        </button>
        <button
          className="join-item btn btn-outline"
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AllTestsPage;
