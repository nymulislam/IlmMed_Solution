import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper/modules";
import { useEffect, useState } from "react";
import "@smastrom/react-rating/style.css";
import { FaQuoteLeft } from "react-icons/fa";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";

const Recommendation = () => {
  const [reviews, setReviews] = useState([]);
  const axiosPublic = useAxiosPublic();
  useEffect(() => {
    axiosPublic.get('/recommendations')
      .then((res) => setReviews(res.data))
      .catch((error) => {
        console.error('Error fetching recommendations:', error);
      });
  }, [axiosPublic]);
  
  return (
    <section className="my-40 max-w-5xl mx-auto">
      <div className="max-w-sm md:max-w-2xl mx-auto mb-14 mt-40">
        <h2 className="divider text-2xl md:text-3xl font-semibold text-[#354a5f] text-center">
        Recommended for You
        </h2>
      </div>
      <Swiper
        cssMode={true}
        navigation={true}
        pagination={true}
        mousewheel={true}
        keyboard={true}
        modules={[Navigation, Pagination, Mousewheel, Keyboard]}
        className="mySwiper mt-5"
      >
        {reviews.map((review) => (
          <SwiperSlide key={review._id}>
            <div className="flex flex-col items-center text-center">
              <div className="mb-5">
                
              </div>
              <FaQuoteLeft className="w-10 h-10 md:w-16 md:h-16 text-[#354a5f]" />
              <p className="px-10 md:px-52 py-5 md:text-xl text-[#354a5f]">{review?.recommendation}</p>
              <h2 className="text-2xl md:text-3xl font-semibold text-[#3398db] mb-10">
                {review?.category}
              </h2>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Recommendation;
