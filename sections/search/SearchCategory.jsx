import { ImageContainer } from "@/components/UI";
import { getCategorys } from "@/endpoint";
import { useContextDataUser } from "@/hooks/useContextData";
import { Box, Flex, SimpleGrid, Text } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

export default function SearchCategory({ debouncedValue }) {
  const { STORE_CODE } = useContextDataUser();
  const { push } = useRouter();

  const {
    data: categorys,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["categorys", STORE_CODE],
    queryFn: (e) => getCategorys({ STORE_CODE }),
  });

  const query = debouncedValue;

  const updatedList = categorys?.filter((item) => {
    return item.category_name.toLowerCase().indexOf(query.toLowerCase()) !== -1;
  });

  if (!updatedList?.length) return;

  return (
    <>
      <Box px={4}>
        <Text fontSize={16} fontWeight={"700"} py={4}>
          Categorys
        </Text>
        <Box>
          <SimpleGrid columns={{ base: 4, md: 6, lg: 6, xl: 8 }} gap={2}>
            {updatedList?.slice(0, 4).map((category, i) => {
              return (
                <Flex
                  key={category.category_name}
                  bg="themeColor.100"
                  direction={"column"}
                  borderRadius={20}
                  p={1}
                  onClick={() =>
                    push(
                      "/category/" +
                        category.category_name +
                        "/" +
                        category.master_category_id
                    )
                  }
                >
                  <Text
                    align={"center"}
                    color={"themeColor.1000"}
                    fontWeight={"800"}
                    fontSize={{ base: "1.2vmax", sm: 14, md: 16, lg: 24 }}
                    pt={2}
                    noOfLines={2}
                  >
                    {category.category_name}
                  </Text>
                  <ImageContainer src={category.category_image} />
                </Flex>
              );
            })}
          </SimpleGrid>
        </Box>
      </Box>
    </>
  );
}
