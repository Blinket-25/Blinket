import React from "react";
import { Swiper } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Navigation } from "swiper";

export default function ProductSliderWrapper({
  children,
  initialLength = 7.2,
}) {
  return (
    <>
      <Swiper
        slidesPerView={initialLength}
        spaceBetween={20}
        pagination={{
          clickable: true,
        }}
        style={{
          paddingLeft: "1rem",
        }}
        // navigation={true}
        breakpoints={{
          "@0.00": {
            slidesPerView: 2.4,
            spaceBetween: 10,
            freeMode: true,
            navigation: false,
            // centeredSlides: true,
          },
          "@0.60": {
            slidesPerView: 3,
            freeMode: true,
            navigation: false,
          },
          "@0.75": {
            slidesPerView: 4,
            freeMode: true,
            navigation: false,
          },
          "@1.00": {
            slidesPerView: 5,
            navigation: true,
          },
          "@1.20": {
            slidesPerView: 6,
            navigation: true,
          },
          "@1.50": {
            slidesPerView: 7.2,
            navigation: true,
          },
        }}
        modules={[Navigation]}
        className="mySwiper"
        touchStartPreventDefault={false}
      >
        {children}
      </Swiper>
    </>
  );
}
