import { SliderProductWrapper } from "@/components";
import ProductCard from "@/components/Cards/ProductCard";
import { CategorySkeleton, ProductCardSkeleton } from "@/components/Skeleton";
import CategoryTitle from "@/components/Title/CategoryTitle";
import { LayoutContainer } from "@/layout";
import { Box } from "@chakra-ui/react";
import { SwiperSlide } from "swiper/react";

export default function ProductWithSpecialCategorys({
  title,
  isLoading,
  data,
}) {
  return (
    <>
      <Box my={8}>
        <CategoryTitle title={title} />
        <LayoutContainer mt={2}>
          <SliderProductWrapper>
            {isLoading ? (
              <>
                <SwiperSlide>
                  <ProductCardSkeleton n={1} />
                </SwiperSlide>
                <SwiperSlide>
                  <ProductCardSkeleton n={1} />
                </SwiperSlide>
                <SwiperSlide>
                  <ProductCardSkeleton n={1} />
                </SwiperSlide>
                <SwiperSlide>
                  <ProductCardSkeleton n={1} />
                </SwiperSlide>
              </>
            ) : (
              data?.map((product, i) => {
                return (
                  <SwiperSlide key={i}>
                    <ProductCard
                      pId={product.id}
                      pName={product.product_name}
                      pImage={product.product_image}
                      pPrice={product.price}
                      item={product}
                    />
                  </SwiperSlide>
                );
              })
            )}
          </SliderProductWrapper>
        </LayoutContainer>
      </Box>
    </>
  );
}
