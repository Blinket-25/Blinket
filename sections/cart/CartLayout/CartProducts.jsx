import React from "react";
import { Box, Flex, HStack, Text } from "@chakra-ui/react";
import Image from "next/image";
import { AddToCartButton, ImageContainer } from "@/components/UI";
import { useContextDataCart } from "@/hooks/useContextData";

export default function CartProducts({}) {
  const cart = useContextDataCart();

  return (
    <>
      <Box
        className="LeftSection"
        borderRadius={{ base: 0, sm: 8 }}
        height={"fit-content"}
        boxShadow={"0 0 10px 0px #dbdbdb"}
        px={4}
        bg={"#fff"}
        w={{ base: "100%", sm: "90%", md: "70%", lg: "60%" }}
        margin={{ base: "auto", lg: "0" }}
      >
        {cart.cartItems.map((item) => (
          <HStack
            key={item.id}
            py={{ base: 2, sm: 5 }}
            borderBottom={"1px solid #efefef"}
          >
            <Box
              className="ProductImage"
              height={"4.5rem"}
              width={"4.5rem"}
              position={"relative"}
            >
              <ImageContainer src={item.image} height={"inherit"} />
              {/* <Image
                src={item.image}
                fill={true}
                style={{
                  objectFit: "contain",
                }}
              /> */}
            </Box>
            <Flex className="Details" flexDirection={"column"} w={"70%"}>
              <Box>
                <Text fontWeight={"600"} fontSize={{ base: 10, lg: 16 }}>
                  {item.name}
                </Text>
                <Text>{item.weightInGrms} g</Text>
              </Box>
              <Flex mt={2} gap={2} alignItems={"center"}>
                <Text fontWeight={"600"} fontSize={16}>
                  ₹{item.sale_price}
                </Text>
                {Number(item.price) - Number(item.sale_price) ? (
                  <Text
                    textDecoration={"line-through"}
                    fontWeight={"500"}
                    color={"secondaryColor.800"}
                    fontSize={12}
                  >
                    ₹{item.price}
                  </Text>
                ) : null}
              </Flex>
            </Flex>
            <AddToCartButton pId={item.id} item={item} key={item.id} />
          </HStack>
        ))}
      </Box>
    </>
  );
}
