import { CategorySkeleton } from "@/components/Skeleton";
import { customImageLoader } from "@/components/UI/ImageContainer/ImageContainer";
import { IMAGE_CLOUD_API } from "@/constants";
import { Box, Flex, GridItem, Text } from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/router";

export default function CatSlider({
  subCategorys,
  parentId,
  parentName,
  subCatIsLoading,
}) {
  const { push } = useRouter();

  return (
    <>
      <GridItem
        position={"sticky"}
        top={12}
        left={0}
        height={"calc(100vh - 120px)"}
        overflow={"auto"}
        paddingBottom={2}
        pt={1}
      >
        <Box>
          <Flex
            py={{ base: 1, lg: 2 }}
            mb={2}
            // px={{ base: 1, lg: 4 }}
            alignItems={"center"}
            bg={"#fff"}
            borderLeftColor={"themeColor.700"}
            _hover={{
              bg: "themeColor.100",
            }}
            cursor={"pointer"}
            direction={{ base: "column", lg: "row" }}
          >
            <Flex
              h={12}
              w={"100%"}
              mr={3}
              borderRadius={10}
              bg={"themeColor.100"}
              alignItems={"center"}
              justifyContent={"center"}
            >
              <Text>All</Text>
            </Flex>
            <Text
              display={{ base: "block", lg: "none" }}
              fontWeight={"700"}
              fontSize={{ base: 8, lg: 14 }}
              ml={{ base: 0, lg: 2 }}
              color={"themeColor.800"}
              textAlign={{ base: "center", lg: "left" }}
            >
              All
            </Text>
          </Flex>
          {subCatIsLoading ? (
            <CategorySkeleton />
          ) : (
            subCategorys?.map((subCategory, i) => {
              return (
                <Flex
                  key={subCategory.category_name}
                  p={{ base: 1, lg: 2 }}
                  mb={2}
                  px={{ base: 1, lg: 4 }}
                  alignItems={"center"}
                  // bg={i === 1 ? "themeColor.100" : "#fff"}
                  // borderLeft={{
                  //   base: "none",
                  //   lg: i === 1 ? "4px solid" : "",
                  // }}
                  // borderLeftColor={"themeColor.700"}
                  _hover={{
                    bg: "themeColor.100",
                  }}
                  cursor={"pointer"}
                  direction={{ base: "column", lg: "row" }}
                >
                  <Flex
                    h={12}
                    position={"relative"}
                    p={2}
                    w={12}
                    // mr={3}
                    onClick={() =>
                      push(
                        "/subcategory/" +
                          parentName +
                          "/" +
                          parentId +
                          "/" +
                          subCategory.category_name +
                          "/" +
                          subCategory.master_category_id
                      )
                    }
                    borderRightRadius={10}
                    // bg={"themeColor.100"}
                    alignItems={"center"}
                    justifyContent={"center"}
                  >
                    <Image
                      loader={customImageLoader}
                      // borderRadius={"50%"}
                      // bg={i === 1 ? "#fff" : "themeColor.100"}
                      // maxH={12}
                      fill={true}
                      src={subCategory.category_image}
                      alt={subCategory.category_image}
                    />
                  </Flex>
                  <Text
                    fontWeight={"500"}
                    fontSize={{ base: 8, lg: 14 }}
                    ml={{ base: 0, lg: 2 }}
                    color={"themeColor.800"}
                    textAlign={{ base: "center", lg: "left" }}
                  >
                    {subCategory.category_name}
                  </Text>
                </Flex>
              );
            })
          )}
        </Box>
      </GridItem>
    </>
  );
}
