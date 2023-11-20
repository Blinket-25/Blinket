import { AddToCartButton, ImageContainer } from "@/components/UI";
import useContextFunctions from "@/hooks/useContextFunctions";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/router";

export default function ProductCard({
  height,
  borderRadius = 8,
  pId,
  pName,
  pImage,
  border,
  boxShadow,
  item,
}) {
  const { push } = useRouter();

  return (
    <>
      <Flex
        direction={"column"}
        justifyContent={"space-between"}
        p={4}
        border={border ? border : "1px solid #dadada"}
        borderRadius={borderRadius}
        height={height ? height : { base: "16rem", lg: "20rem" }}
        boxShadow={boxShadow ? boxShadow : "none"}
        bg="#fff"
        cursor={"pointer"}
        position={"relative"}
      >
        {Number(item.discount_in_percent) ? (
          <Box
            position={"absolute"}
            zIndex={9}
            color={"white"}
            bg={"secondaryColor.1000"}
            px={3}
            py={"3px"}
            fontWeight={"600"}
            // py={1}
            borderRadius={"0px 8px 0px 8px"}
            right={0}
            top={0}
          >
            <Text>
              {item.discount_in_percent}
              <Text as={"span"} fontSize={12}>
                %
              </Text>
            </Text>
          </Box>
        ) : null}
        {/* <Box
          as={motion.div}
          whileHover={{ scale: 1.2 }}
          height={"100%"}
          position={"relative"}
        >
          <Image
            position={"absolute"}
            fill={true}
            // height={"100%"}
            // width={"100%"}
            objectFit={"contain"}
            src={pImage}
          />
        </Box> */}
        <Box
          onClick={() => push("/product/" + pId)}
          opacity={!Number(item.status) ? "0.5" : "1"}
        >
          <ImageContainer src={pImage} />
        </Box>

        <Box flex={1} mt={1}>
          <Text
            noOfLines={2}
            color={"#000"}
            fontWeight={"500"}
            fontSize={{ base: 12, lg: 16 }}
            onClick={() => push("/product/" + pId)}
          >
            {pName}
          </Text>
          <Text
            color={"#888888"}
            fontWeight={"600"}
            fontSize={10}
            noOfLines={2}
            mt={1}
          >
            {item.product_size} {item.product_unit}
          </Text>
        </Box>
        <Flex justifyContent={"space-between"} alignItems={"center"}>
          <Flex alignItems={"center"} gap={2}>
            {/* {true ? ( */}
            {Number(item.price) - Number(item.sale_price) ? (
              <Text
                textDecoration={"line-through"}
                fontSize={{ base: 10, lg: 12 }}
                lineHeight={"4px"}
              >
                ₹{item.price}
              </Text>
            ) : null}
            <Text fontWeight={"600"} fontSize={{ base: 15, lg: 18 }}>
              <Text as={"span"} fontSize={13} mr={"1px"}>
                ₹
              </Text>
              {item.sale_price}
            </Text>
          </Flex>
        </Flex>
        <Box mt={1}>
          {Number(item.status) ? (
            <AddToCartButton pId={pId} item={item} key={pId} />
          ) : (
            <Text color={"red"} fontWeight={"700"} textAlign={"center"} py={1}>
              Out of stock
            </Text>
          )}
        </Box>
      </Flex>
    </>
  );
}
