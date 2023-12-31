import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

import { FreeMode, Pagination } from "swiper/modules";
import { TERipple } from "tw-elements-react";
import useAuth from "../../../Hooks/useAuth";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import Button from "../../../Components/Button/Button";

const Featured = () => {
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const { user } = useAuth();

  const { data: featured = [] } = useQuery({
    queryKey: ["featured"],
    queryFn: async () => {
      const res = await axiosPublic.get("/allBookings");
      return res.data;
    },
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
    <div className="my-20">
      <div className="max-w-sm md:max-w-2xl mx-auto mt-40 mb-20">
        <h2 className="divider text-2xl md:text-3xl font-semibold text-[#354a5f] text-center">
          Explore Our Top Picks
        </h2>
      </div>
      <div>
        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          freeMode={true}
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          pagination={{
            clickable: true,
          }}
          modules={[FreeMode, Pagination]}
          className="mySwiper md:max-w-6xl max-w-sm mx-auto h-[520px] my-12"
        >
          {featured.map((test) => (
            <SwiperSlide key={test._id}>
              <div
                key={test._id}
                className="block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700"
              >
                <TERipple rippleColor="light">
                  <div className="relative overflow-hidden bg-cover bg-no-repeat rounded-lg">
                    <img
                      className="p-5 h-64 rounded-3xl "
                      src={test?.testImage}
                      alt="Test Image"
                    />
                    <span className="inline-block absolute left-5 top-8 whitespace-nowrap rounded-[0.27rem] bg-[#354a5f] px-[0.55em] pb-[0.30em] pt-[0.45em] text-center align-baseline text-[1.1em] font-bold leading-none text-[#d6f5e3]">
                      ${test?.price}
                    </span>
                    <a href="#!">
                      <div className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-[hsla(0,0%,98%,0.15)] bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100"></div>
                    </a>
                  </div>
                </TERipple>
                <div className="p-6">
                  <div className="flex justify-between items-center">
                    <h5 className="mb-2 text-lg font-semibold leading-tight text-[#354a5f] dark:text-neutral-50">
                      {test?.name.length > 17
                        ? `${test?.name.substring(0, 17)}...`
                        : `${test?.name}`}
                    </h5>
                    <span className="badge text-white font-medium pt-1 pb-1 bg-[#354a5f]">
                      {test?.category}
                    </span>
                  </div>
                  <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200 mt-3">
                    {test?.description.length > 60
                      ? `${test?.description.substring(0, 60)}...`
                      : test?.description}
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
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Featured;
