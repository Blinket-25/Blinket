import React from "react";
import { Box, Button, Flex, SimpleGrid, Text } from "@chakra-ui/react";
import { useContextDataUser } from "@/hooks/useContextData";
import SelectAddress from "./SelectAddress";
import { FaLocationDot } from "react-icons/fa6";
import CartFinalOrderButton from "./CartFinalOrderButton";

export default function CartFooter({ onOpenSaveL, onOpen }) {
  const user = useContextDataUser();

  return (
    <>
      {user.selectedAddress ? (
        <Box>
          <SelectAddress toShow={true} />
          <Box height={"1px"} bg={"#d8d8d8"} />
          <CartFinalOrderButton />
        </Box>
      ) : (
        <>
          <Flex pb={4} pt={1} gap={3} alignItems={"center"}>
            <Box color={"themeColor.900"}>
              <FaLocationDot size={24} />
            </Box>
            <Box>
              <Text fontSize={16} fontWeight={"700"} color={"blackAlpha.900"}>
                You seem to be at a new location!
              </Text>
              <Text fontSize={10} fontWeight={"600"} color={"blackAlpha.700"}>
                {user.longAddress}
              </Text>
            </Box>
          </Flex>
          <SimpleGrid columns={2} gap={2} pb={1}>
            <Button
              variant={"outline"}
              textTransform={"uppercase"}
              fontSize={12}
              fontWeight={"600"}
              borderColor={"secondaryColor.700"}
              onClick={onOpenSaveL}
            >
              Save this address
            </Button>
            <Button
              variant={"base"}
              textTransform={"uppercase"}
              fontSize={12}
              fontWeight={"600"}
              onClick={onOpen}
            >
              Select Address
            </Button>
          </SimpleGrid>
        </>
      )}
    </>
  );
}
