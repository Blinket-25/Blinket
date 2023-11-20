import React from "react";
import { Swiper } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import { Navigation } from "swiper";

export default function SliderBannerWrapper({ children, loop = false }) {
  return (
    <>
      <Swiper
        slidesPerView={2.6}
        spaceBetween={20}
        pagination={{
          clickable: true,
        }}
        loop={loop}
        freeMode={true}
        navigation={true}
        breakpoints={{
          "@0.00": {
            slidesPerView: 1.4,
            centeredSlides: true,
            loop: true,
          },
          "@0.75": {
            slidesPerView: 2,
          },
          "@1.00": {
            slidesPerView: 3,
          },
          "@1.50": {
            slidesPerView: 2.6,
          },
        }}
        modules={[Navigation]}
        className="mySwiper"
      >
        {children}
      </Swiper>
    </>
  );
}
