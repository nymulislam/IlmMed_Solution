import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper/modules";
import { useEffect, useState } from "react";
import "@smastrom/react-rating/style.css";
import { FaQuoteLeft } from "react-icons/fa";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { Rating } from "@smastrom/react-rating";

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
    <section className="my-20 max-w-5xl mx-auto">
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
                <Rating
                  style={{ maxWidth: 180 }}
                  value={review?.rating}
                  readOnly
                />
              </div>
              <FaQuoteLeft className="w-20 h-24" />
              <p className="px-32 text-lg">{review?.recommendation}</p>
              <h2 className="text-3xl font-medium text-yellow-600 mb-10">
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
