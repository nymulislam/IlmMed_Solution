import { Autoplay, EffectCreative } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import img1 from "../../assets/login/login1.png";
import img2 from "../../assets/login/login2.png";
import img3 from "../../assets/login/login3.png";



import "swiper/css";
import "swiper/css/effect-creative";

const SmallSlider = () => {
  return (
    <div>
      <Swiper
        grabCursor={true}
        effect={"creative"}
        autoplay={{
          delay: 4500,
          disableOnInteraction: false,
        }}
        creativeEffect={{
          prev: {
            shadow: true,
            translate: ["-20%", 0, -1],
          },
          next: {
            translate: ["100%", 0, 0],
          },
        }}
        modules={[EffectCreative, Autoplay]}
        className="mySwiper3 w-80 md:w-96 rounded-xl absolute lg:right-36 top-5 lg:top-28 bg-[#2ecc70]"
      >
        <SwiperSlide>
          <img src={img1} alt="Image 1" />
          <div className="text-center pt-5">
            <h3 className="text-white text-2xl md:text-3xl font-semibold">
              Simplifying Healthcare
            </h3>
            <p className="text-base md:text-lg mt-3 text-[#333] font-medium">
              Effortlessly manage appointments, records, and administrative
              tasks with our cutting-edge web application.
            </p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <img src={img2} alt="Image 2" />
          <div className="text-center pt-5 bg-[#2ecc70]">
            <h3 className="text-white text-2xl md:text-3xl font-semibold">
              Efficiency Redefined
            </h3>
            <p className="text-base md:text-lg mt-3 text-[#333] font-medium">
              Revolutionize your medical operations - Ensure a smooth and
              effective healthcare management process.
            </p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <img src={img3} alt="Image 3" />
          <div className="text-center pt-5 bg-[#2ecc70]">
            <h3 className="text-white text-2xl md:text-3xl font-semibold">
              Optimize Your Healthcare Management
            </h3>
            <p className="text-base md:text-lg mt-3 text-[#333] font-medium">
              Discover Your All-in-One Platform for Streamlined Medical
              Operations.
            </p>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default SmallSlider;
