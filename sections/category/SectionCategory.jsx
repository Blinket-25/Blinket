import { fetchCategoryProducts } from "@/endpoint";
import ProductCard from "@/components/Cards/ProductCard/ProductCard";
import { IMAGE_CLOUD_API, PRODUCT_IMAGE_CLOUD_API } from "@/constants";
import {
  Box,
  Flex,
  Grid,
  GridItem,
  Image,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { InView } from "react-intersection-observer";
import { useRouter } from "next/router";
import CatProducts from "./CatProducts";
import CatSlider from "./CatSlider";
import useContextData from "@/hooks/useContextData";

export default function SectionCategory({
  subCategorys,
  parentId,
  parentName,
  subCatIsLoading,
}) {
  const { user } = useContextData();

  const LIMIT = 10;

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
    ["categoryProduct", parentId],
    ({ pageParam = 0 }) =>
      fetchCategoryProducts({
        pageParam,
        limit: LIMIT,
        parentId,
        STORE_CODE: user.STORE_CODE,
      }),
    {
      enabled: parentId !== undefined,
      getNextPageParam: (lastPage, pages) => {
        return pages.length * LIMIT < lastPage.info.totalItems
          ? lastPage.info.page + LIMIT
          : undefined;
      },
    }
  );

  return (
    <>
      <Box mt={{ base: 0, lg: 0 }}>
        <Grid templateColumns="repeat(6, 1fr)" gap={0}>
          <CatSlider
            parentId={parentId}
            parentName={parentName}
            subCategorys={subCategorys}
            subCatIsLoading={subCatIsLoading}
            key={"catSlider"}
          />
          <CatProducts
            data={data}
            fetchNextPage={fetchNextPage}
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
            isLoading={isLoading}
            parentName={parentName}
            key={"catProducts"}
          />
        </Grid>
      </Box>
    </>
  );
}
