import React, { useState } from "react";
import { Box, Flex, SimpleGrid, Text } from "@chakra-ui/react";
import { ProductCardSkeleton } from "@/components/Skeleton";
import ProductCard from "@/components/Cards/ProductCard";
import { InView } from "react-intersection-observer";
import { searchProducts } from "@/endpoint";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useContextDataUser } from "@/hooks/useContextData";
import { BsSearch } from "react-icons/bs";

export default function SearchProduct({ debouncedValue }) {
  const LIMIT = 10;
  const { STORE_CODE } = useContextDataUser();

  const MIN_LENGTH_DEBOUNCE = 2;

  const {
    isLoading,
    isError,
    error,
    isSuccess,
    data,
    fetchNextPage,
    isFetching,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery(
    ["search", debouncedValue],
    ({ pageParam = 0, queryKey }) =>
      searchProducts({
        offset: pageParam,
        limit: LIMIT,
        prompt: queryKey[1],
        totalItems: data?.pages[0]?.info?.totalItems,
        STORE_CODE,
      }),
    // (props) => fetchthis(props),
    {
      enabled: debouncedValue.length > MIN_LENGTH_DEBOUNCE,
      getNextPageParam: (lastPage, offset) => {
        return offset.length * LIMIT < lastPage.info.totalItems
          ? lastPage.info.offset + LIMIT
          : undefined;
      },
    }
  );

  //   console.log("hey search --->", data)

  return (
    <>
      <Box px={4}>
        {!(debouncedValue.length > MIN_LENGTH_DEBOUNCE) ? (
          <></>
        ) : (
          <>
            <Text fontSize={16} fontWeight={"700"} py={4}>
              Showing results for {`"${debouncedValue}"`}
            </Text>
            {data?.pages[0]?.info.totalItems || isLoading ? (
              <>
                <SimpleGrid columns={{ base: 2, md: 3, lg: 4, xl: 7 }} gap={2}>
                  {isLoading ? (
                    <>
                      <ProductCardSkeleton />
                    </>
                  ) : (
                    data?.pages?.map((page) =>
                      page?.searched_products?.map((product, i) => {
                        return (
                          <ProductCard
                            key={i}
                            pName={product.product_name}
                            pImage={product.product_image}
                            pId={product.id}
                            border={"1px solid #dadada"}
                            item={product}
                          />
                        );
                      })
                    )
                  )}
                  {isFetchingNextPage ? (
                    <ProductCardSkeleton />
                  ) : (
                    <InView
                      onChange={(e) => e && hasNextPage && fetchNextPage()}
                    >
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
                {!hasNextPage && (
                  <Text fontWeight={"600"} textAlign={"center"} mt={4}>
                    That's all pal..!!
                  </Text>
                )}
              </>
            ) : (
              <Box textAlign={"center"}>
                <Flex my={4} mt={10} justifyContent={"center"}>
                  <BsSearch size={60} />
                </Flex>
                <Text fontWeight={"700"} fontSize={18} pt={2}>
                  Sorry! No matching results found
                </Text>
                <Text fontWeight={"600"} mt={4}>
                  Try a different keyword maybe?
                </Text>
              </Box>
            )}
          </>
        )}
      </Box>
    </>
  );
}
