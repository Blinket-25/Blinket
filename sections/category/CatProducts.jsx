import ProductCard from "@/components/Cards/ProductCard/ProductCard";
import { PRODUCT_IMAGE_CLOUD_API } from "@/constants";
import { Box, GridItem, SimpleGrid, Text } from "@chakra-ui/react";
import { InView } from "react-intersection-observer";
import { ProductCardSkeleton } from "@/components/Skeleton";

export default function CatProducts({
  isLoading,
  data,
  isFetchingNextPage,
  hasNextPage,
  fetchNextPage,
  parentName,
}) {
  return (
    <>
      <GridItem colSpan={5} borderLeft={"1px solid #efefef"}>
        <Box>
          <Box py={6} px={8} display={{ base: "none", lg: "block" }}>
            <Text fontSize={24} fontWeight={"500"}>
              {parentName} (266)
            </Text>
          </Box>
          <Box background={{ base: "#efefef", lg: "none" }} p={1}>
            <SimpleGrid columns={{ base: 2, md: 3, lg: 4, xl: 5 }} gap={2}>
              {isLoading ? (
                <>
                  <ProductCardSkeleton />
                </>
              ) : (
                data?.pages?.map((page) =>
                  page?.results?.map((product, i) => {
                    return (
                      <ProductCard
                        key={i}
                        pName={product.product_name}
                        pImage={product.product_image}
                        pId={product.id}
                        border={{ base: "unset", lg: "1px solid #dadada" }}
                        item={product}
                        height={"inherit"}
                      />
                    );
                  })
                )
              )}
              {isFetchingNextPage ? (
                <ProductCardSkeleton />
              ) : (
                <InView onChange={(e) => e && hasNextPage && fetchNextPage()}>
                  {({ ref }) => (
                    <>
                      <div ref={ref}>
                        <Box py={0} />
                      </div>
                    </>
                  )}
                </InView>
              )}
            </SimpleGrid>
          </Box>
        </Box>
      </GridItem>
    </>
  );
}
