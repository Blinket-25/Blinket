import { getProductById } from "@/endpoint";
import ProductCard from "@/components/Cards/ProductCard";
import SimpleSlider from "@/components/Slider/Product";
import CategoryTitle from "@/components/Title/CategoryTitle";
import { AddToCartButton, ImageContainer } from "@/components/UI";
import { PRODUCT_IMAGE_CLOUD_API } from "@/constants";
import useContextFunctions from "@/hooks/useContextFunctions";
import { LayoutContainer } from "@/layout";
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Flex,
  Grid,
  GridItem,
  HStack,
  SimpleGrid,
  Skeleton,
  Stack,
  Text,
} from "@chakra-ui/react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import Head from "next/head";
import { useRouter } from "next/router";
import { SwiperSlide } from "swiper/react";

export default function ProductByID({}) {
  const { query } = useRouter();
  const { setTitle } = useContextFunctions();

  const PRODUCT_ID = query.productId && query?.productId;

  const {
    data: product,
    isError,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["product", PRODUCT_ID],
    queryFn: () => getProductById({ productId: PRODUCT_ID }),
    enabled: PRODUCT_ID !== undefined,
  });

  if (!isLoading) {
    product && setTitle(product[0].product_name);
  }

  if (isLoading)
    return (
      <>
        <Box p={5}>
          <Stack>
            <Skeleton height="360px" />
            <Skeleton height="40px" />
            <Skeleton height="20px" />
          </Stack>
          <Box py={8}>
            <Text fontSize={24}>Similar Products</Text>
            <HStack mt={4}>
              <Skeleton width={"100px"} height="140px" />
              <Skeleton width={"100px"} height="140px" />
              <Skeleton width={"100px"} height="140px" />
            </HStack>
          </Box>
        </Box>
      </>
    );

  return (
    <>
      <Head>
        <title>{product[0].product_name}</title>
      </Head>
      <Box mt={{ base: 0, lg: 16 }}>
        <Grid
          templateColumns={{ base: "repeat(1,1fr)", lg: "repeat(2, 1fr)" }}
          gap={0}
        >
          <GridItem>
            <Box
              p={2}
              justifyContent={"center"}
              opacity={!Number(product[0].status) ? "0.5" : "1"}
            >
              <ImageContainer height={360} src={product[0].product_image} />
              {/* <Image/> */}
            </Box>
          </GridItem>
          <GridItem colSpan={1}>
            <Box p={{ base: 4, lg: 10 }}>
              <Breadcrumb display={{ base: "none", lg: "block" }} fontSize={12}>
                <BreadcrumbItem>
                  <BreadcrumbLink href="#">Home</BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbItem>
                  <BreadcrumbLink href="#">Docs</BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbItem isCurrentPage>
                  <BreadcrumbLink href="#">Breadcrumb</BreadcrumbLink>
                </BreadcrumbItem>
              </Breadcrumb>
              <Text fontSize={{ base: 28, lg: 34 }} fontWeight={"700"}>
                {product[0].product_name}
              </Text>
              <Text fontSize={12}>
                {product[0].product_size} {product[0].product_unit}
              </Text>
              <Flex my={4} px={2} justifyContent={"space-between"}>
                <Flex alignItems={"center"} gap={2}>
                  <Text fontWeight={"600"} fontSize={20}>
                    ₹{product[0].sale_price}
                  </Text>
                  <Text textDecoration={"line-through"}>
                    ₹{product[0].price}
                  </Text>
                  {Number(product[0].discount_in_percent) ? (
                    <Text
                      color={"green.600"}
                      fontWeight={"700"}
                      background={"green.100"}
                      p={1}
                      px={2}
                      borderRadius={6}
                    >
                      {product[0].discount_in_percent}% off
                    </Text>
                  ) : null}
                </Flex>
                {/* Add To Cart Button */}
                {Number(product[0].status) ? (
                  <AddToCartButton
                    variant="base"
                    item={product[0]}
                    padding={8}
                  />
                ) : (
                  <>
                    <Text color={"red"} fontWeight={"700"} fontSize={14}>
                      Out of stock
                    </Text>
                  </>
                )}
                {/* Add To Cart Button */}
              </Flex>

              <Box height={"1px"} bg={"#d4d4d4"} mt={4} />
              <Box>
                <Accordion allowToggle>
                  <AccordionItem border={"none"} pt={2}>
                    <h2>
                      <AccordionButton>
                        <Box
                          as="span"
                          flex="1"
                          textAlign="left"
                          fontSize={14}
                          fontWeight={"600"}
                        >
                          About Product
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                      <Text fontWeight={"600"}>{product[0].deceptions}</Text>
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>
              </Box>
            </Box>
          </GridItem>
        </Grid>
        {/* <Box py={8} bg={{ base: "#efefef", lg: "none" }}>
          <CategoryTitle title={"Similar Products"} />
          <LayoutContainer mt={0}>
           <SimpleSlider>
              {Array(16)
                .fill({
                  name: "Product",
                  image:
                    "https://leeladharstores.com/image/cache/catalog/category/atta%20dal%20_%20grocery/refined%20and%20ghee/FORTUNE-SUNLITE-500x500.png",
                })
                .map((product, i) => {
                  return (
                    <SwiperSlide key={i} style={{ padding: "3px 0" }}>
                      <ProductCard
                        pId={i}
                        pName={product.name}
                        pImage={product.image}
                        border={"none"}
                        boxShadow={"0 1px 5px 0px #d3d3d3"}
                        item={product}
                      />
                    </SwiperSlide>
                  );
                })}
            </SimpleSlider> 
          </LayoutContainer>
        </Box> */}
      </Box>
    </>
  );
}
