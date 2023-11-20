import { getExtrasForHome } from "@/endpoint";
import { SliderProductWrapper } from "@/components";
import ProductCard from "@/components/Cards/ProductCard";
import CategoryTitle from "@/components/Title/CategoryTitle";
import { LayoutContainer } from "@/layout";
import { Box } from "@chakra-ui/react";
import { SwiperSlide } from "swiper/react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useContextDataUser } from "@/hooks/useContextData";

export default function DealsOfTheDay({}) {
  const user = useContextDataUser();

  const {
    data: data,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["homeExtras", user.STORE_CODE],
    queryFn: (e) => getExtrasForHome({ STORE_CODE: e.queryKey[1] }),
  });

  return (
    <>
      <Box my={8}>
        <CategoryTitle title={"Deals Of The Day"} />
        <LayoutContainer>
          <SliderProductWrapper>
            {data?.dealOfTheDay?.map((product, i) => {
              return (
                <SwiperSlide key={i}>
                  <ProductCard
                    pId={i}
                    pName={product.product_name}
                    pImage={product.product_image}
                    pPrice={product.price}
                    item={product}
                  />
                </SwiperSlide>
              );
            })}
          </SliderProductWrapper>
        </LayoutContainer>
      </Box>
    </>
  );
}
