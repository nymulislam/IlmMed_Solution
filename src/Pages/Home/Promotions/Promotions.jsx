import { Swiper, SwiperSlide } from "swiper/react";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

import "swiper/css";
import "swiper/css/pagination";

import { Mousewheel, Pagination } from "swiper/modules";

const Promotions = () => {
  const axiosPublic = useAxiosPublic();

  const { data: promotions = [] } = useQuery({
    queryKey: ["promotions"],
    queryFn: async () => {
      const res = await axiosPublic.get("/promotions");
      return res.data;
    },
  });
  return (
    <div className="shadow-lg">
      <div className="max-w-sm md:max-w-2xl mx-auto mb-20 mt-40">
        <h2 className="divider text-2xl md:text-3xl font-semibold text-[#354a5f] text-center">
          Health Checkup Specials
        </h2>
      </div>
      <div>
        <Swiper
          direction={"vertical"}
          slidesPerView={1}
          spaceBetween={30}
          mousewheel={true}
          pagination={{
            clickable: true,
          }}
          modules={[Mousewheel, Pagination]}
          className="mySwiper h-[60vh] bg-[#354a5f]"
        >
          {promotions.map((promotion) => (
            <SwiperSlide key={promotion?._id}>
              <div className="text-center py-32">
                <h1 className="text-2xl md:text-4xl text-[#d6f5e3] font-semibold">
                  {promotion?.title}
                </h1>
                <p className="md:text-xl px-6 md:px-60 py-2 md:py-8 text-[#d6f5e3] font-medium md:font-semibold">
                  {promotion?.description}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Promotions;
