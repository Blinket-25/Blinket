import React from "react";
import { Box } from "@chakra-ui/react";
import CartLayout from "./CartLayout/CartLayout";

export default function SectionCart({}) {
  return (
    <>
      <Box
        bg={"#efefef"}
        margin={"auto"}
        pt={{ base: 2, lg: 0 }}
        // position={"fixed"}
        // left={0}
        // top={0}
        width={"100%"}
      >
        <CartLayout />
      </Box>
    </>
  );
}
