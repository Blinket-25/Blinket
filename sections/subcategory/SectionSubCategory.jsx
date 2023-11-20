import { fetchSubCategoryProducts } from "@/endpoint";
import { Box, Grid } from "@chakra-ui/react";
import { useInfiniteQuery } from "@tanstack/react-query";
import SubCatProducts from "./SubCatProducts";
import SubCatSlider from "./SubCatSlider";
import { useContextDataUser } from "@/hooks/useContextData";

export default function SectionSubCategory({
  subCategorys,
  parentId,
  parentName,
  subCategoryId,
  subCatIsLoading,
}) {
  const { STORE_CODE } = useContextDataUser();

  const LIMIT = 10;

  const {
    isLoading,
    isError,
    error,
    data,
    fetchNextPage,
    isFetching,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery(
    ["subcategoryProduct", subCategoryId],
    ({ pageParam = 0 }) =>
      fetchSubCategoryProducts({
        pageParam,
        limit: LIMIT,
        subCategoryId,
        STORE_CODE,
      }),
    {
      enabled: parentId !== undefined,
      getNextPageParam: (lastPage, pages) => {
        return pages.length * LIMIT < lastPage.info.totalItems // Here I'm assuming you have access to the total number of pages
          ? lastPage.info.page + LIMIT
          : undefined;
      },
    }
  );

  return (
    <>
      <Box mt={{ base: 0, lg: 0 }}>
        <Grid templateColumns="repeat(6, 1fr)" gap={0}>
          <SubCatSlider
            parentId={parentId}
            parentName={parentName}
            subCategoryId={subCategoryId}
            subCategorys={subCategorys}
            subCatIsLoading={subCatIsLoading}
            key={"subCatSlider"}
          />
          <SubCatProducts
            data={data}
            isFetchingNextPage={isFetchingNextPage}
            isLoading={isLoading}
            fetchNextPage={fetchNextPage}
            hasNextPage={hasNextPage}
            key={"subCatProducts"}
          />
        </Grid>
      </Box>
    </>
  );
}
