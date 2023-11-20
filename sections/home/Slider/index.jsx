import React from "react";
import { SwiperSlide } from "swiper/react";

import "swiper/css";
import { Image } from "@chakra-ui/react";
import { SliderBannerWrapper } from "@/components";
import { useContextDataUser } from "@/hooks/useContextData";
import { useQuery } from "@tanstack/react-query";
import { fetchBanner } from "@/endpoint";

export default function HomeMainSlider() {
  const { STORE_CODE } = useContextDataUser();

  const {
    data: banners,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["banner", STORE_CODE],
    queryFn: (e) => fetchBanner({ STORE_CODE: e.queryKey[1] }),
  });

  return (
    <>
      <SliderBannerWrapper loop={true}>
        {banners?.map((banner, i) => {
          return (
            <SwiperSlide key={banner.image}>
              <Image borderRadius={8} src={banner.image} />
            </SwiperSlide>
          );
        })}
        {banners?.map((banner, i) => {
          return (
            <SwiperSlide key={banner.image}>
              <Image borderRadius={8} src={banner.image} />
            </SwiperSlide>
          );
        })}
        {banners?.map((banner, i) => {
          return (
            <SwiperSlide key={banner.image}>
              <Image borderRadius={8} src={banner.image} />
            </SwiperSlide>
          );
        })}
      </SliderBannerWrapper>
    </>
  );
}
export function HomeSecondorySlider() {
  return (
    <>
      <SliderBannerWrapper>
        <SwiperSlide>
          <Image
            borderRadius={8}
            src="https://cdn.zeptonow.com/production///tr:w-954,ar-954-270,pr-true,f-webp,q-80/inventory/banner/166de36e-f8b4-46c8-9d00-75c3e1a19070-Clean.-Fresh.-Protected.-_MultiThin.png"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            borderRadius={8}
            src="https://cdn.zeptonow.com/production///tr:w-954,ar-954-270,pr-true,f-webp,q-80/inventory/banner/166de36e-f8b4-46c8-9d00-75c3e1a19070-Clean.-Fresh.-Protected.-_MultiThin.png"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            borderRadius={8}
            src="https://cdn.zeptonow.com/production///tr:w-954,ar-954-270,pr-true,f-webp,q-80/inventory/banner/166de36e-f8b4-46c8-9d00-75c3e1a19070-Clean.-Fresh.-Protected.-_MultiThin.png"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            borderRadius={8}
            src="https://cdn.zeptonow.com/production///tr:w-954,ar-954-270,pr-true,f-webp,q-80/inventory/banner/166de36e-f8b4-46c8-9d00-75c3e1a19070-Clean.-Fresh.-Protected.-_MultiThin.png"
          />
        </SwiperSlide>
      </SliderBannerWrapper>
    </>
  );
}

export { default as ProductWithSpecialCategorys } from "./ProductWithSpecialCategorys";
