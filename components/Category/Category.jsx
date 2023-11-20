import { LayoutContainer } from "@/layout";
import { Box, Container, Flex, SimpleGrid, Text } from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { ImageContainer } from "../UI";
import { getCategorys } from "@/endpoint";
import { useQuery } from "@tanstack/react-query";
import { useContextDataUser } from "@/hooks/useContextData";
import { SingleBlockBoxSkeleton } from "../Skeleton";

export default function Category({ mt = 6 }) {
  const user = useContextDataUser();

  const {
    data: categorys,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["categorys", user.STORE_CODE],
    queryFn: (e) => getCategorys({ STORE_CODE: e.queryKey[1] }),
  });

  const { push } = useRouter();

  return (
    <>
      <LayoutContainer mt={mt}>
        <Box>
          <SimpleGrid columns={{ base: 4, md: 6, lg: 6, xl: 8 }} gap={2}>
            {isLoading ? (
              <>
                <SingleBlockBoxSkeleton height={100} n={8} />
              </>
            ) : (
              categorys?.map((category, i) => {
                return (
                  <Flex
                    key={i}
                    bg="themeColor.100"
                    direction={"column"}
                    borderRadius={20}
                    justifyContent={"space-evenly"}
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
                      fontSize={{ base: "1.2vmax", sm: 14, md: 16, lg: 16 }}
                      pt={2}
                      noOfLines={2}
                    >
                      {category.category_name}
                    </Text>
                    <ImageContainer src={category.category_image} />
                  </Flex>
                );
              })
            )}
          </SimpleGrid>
        </Box>
      </LayoutContainer>
    </>
  );
}
