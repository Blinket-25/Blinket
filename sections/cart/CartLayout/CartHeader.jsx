import React from "react";
import { Text } from "@chakra-ui/react";
import useContextData from "@/hooks/useContextData";

export default function CartHeader({}) {
  const { cart } = useContextData();

  return (
    <>
      <Text
        my={8}
        fontSize={20}
        fontWeight={"600"}
        display={{ base: "none", lg: "block" }}
      >
        Cart ({cart.cartItems.length} Items)
      </Text>
    </>
  );
}
