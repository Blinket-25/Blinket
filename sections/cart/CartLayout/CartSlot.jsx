import { useContextDataCart, useContextDataUser } from "@/hooks/useContextData";
import {
  Box,
  Text,
  Flex,
  HStack,
  Skeleton,
  SkeletonCircle,
  Spinner,
} from "@chakra-ui/react";
import { fetchSlots } from "@/endpoint";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import useContextFunctions from "@/hooks/useContextFunctions";

export default function CartSlot({ onClose, pushPath }) {
  const { distanceFromStore, STORE_CODE } = useContextDataUser();
  const { deliveryCharge, userSelectedAddress } = useContextDataCart();
  const [selectedId, setSelected] = useState();
  const {
    setUserSelectedSlot,
    setIsDeliveryNotAvilable,
    setDeliveryCharge,
    setMiniumAmountForFreeDelivery,
  } = useContextFunctions();

  const {
    data: slotsResponse,
    isError,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["slots", STORE_CODE, distanceFromStore, deliveryCharge],
    queryFn: (e) =>
      fetchSlots({ STORE_CODE: e.queryKey[1], distance: e.queryKey[2] }),
    enabled: distanceFromStore !== undefined && distanceFromStore !== null,
    refetchInterval: 5 * 60 * 1000,
  });

  useEffect(() => {
    if (slotsResponse && slotsResponse.deliveryCharge) {
      setDeliveryCharge(slotsResponse.deliveryCharge);
      setMiniumAmountForFreeDelivery(slotsResponse.miniumAmountForFreeDelivery);
    }

    console.log("chote paa --->", userSelectedAddress);

    if (slotsResponse && !slotsResponse?.deliveryNotAvilable) {
      setIsDeliveryNotAvilable({
        avilable: true,
        reason: slotsResponse?.deliveryNotAvilablereason,
      });
    } else {
      setIsDeliveryNotAvilable({
        avilable: false,
        reason: "",
      });
    }

    return () => {
      setUserSelectedSlot(null);
    };
  }, [slotsResponse]);

  // console.log("hey there ---->", distanceFromStore);
  // console.log("hey data from slots component ---->", slotsResponse);

  const setValue = (id) => {
    setUserSelectedSlot(id);
    setSelected(id);
  };

  if (!userSelectedAddress || !slotsResponse?.slotsData?.length) return;

  return (
    <>
      <Box
        p={4}
        bg={"#fff"}
        mb={4}
        boxShadow={"0 0 10px 0px #dbdbdb"}
        borderRadius={{ base: 0, sm: 8 }}
      >
        <HStack justifyContent={"space-between"}>
          <Text fontSize={16} fontWeight={"700"}>
            Delivery Slots
            <Text as={"span"} ml={2} fontSize={14}>
              ( {slotsResponse?.slotsFor} )
            </Text>
          </Text>
          {isFetching && (
            <HStack alignItems={"center"}>
              <Text fontWeight={"600"} fontSize={12}>
                Fetching
              </Text>
              <Spinner size={"xs"} />
            </HStack>
          )}
        </HStack>

        {isFetching || isLoading ? (
          <Box py={4}>
            <Skeleton height="12px" w={66} borderRadius={3} />
            <HStack mt={4}>
              <Skeleton height="32px" w={86} borderRadius={6} />
              <Skeleton height="32px" w={86} borderRadius={6} />
            </HStack>
            <Skeleton mt={6} height="12px" w={66} borderRadius={3} />
            <HStack mt={4}>
              <Skeleton height="32px" w={86} borderRadius={6} />
              <Skeleton height="32px" w={86} borderRadius={6} />
            </HStack>
          </Box>
        ) : (
          slotsResponse?.slotsData?.map((slot, i) => {
            return (
              <Box my={1}>
                <Text fontWeight={"500"} mt={3} fontSize={12}>
                  {slot.title}
                </Text>
                <HStack mt={2} flexWrap={"wrap"}>
                  {slot.slots.map((times, i) => {
                    const disabled = times.exceded && {
                      borderColor: "blackAlpha.400",
                      color: "blackAlpha.300",
                      cursor: "no-drop",
                    };

                    return (
                      <Flex
                        key={`slots${times.id}`}
                        p={2}
                        px={4}
                        direction={"column"}
                        fontSize={10}
                        borderRadius={6}
                        border={"1px solid"}
                        // borderColor={"secondaryColor.700"}
                        bg={selectedId === times.id ? "secondaryColor.100" : ""}
                        // color={"secondaryColor.900"}
                        borderColor={
                          selectedId === times.id
                            ? "secondaryColor.700"
                            : "blackAlpha.500"
                        }
                        // bg={"secondaryColor.100"}
                        color={
                          selectedId === times.id
                            ? "secondaryColor.900"
                            : "blackAlpha.700"
                        }
                        fontWeight={"700"}
                        w={"fit-content"}
                        cursor={"pointer"}
                        onClick={() => !times.exceded && setValue(times.id)}
                        {...disabled}
                      >
                        <Text>
                          {times.slot_time_start}
                          {times.start_time_postfix} - {times.slot_time_end}
                          {times.end_time_postfix}
                        </Text>
                        {/* <Text
                          fontWeight={"600"}
                          color={"blackAlpha.700"}
                          fontSize={10}
                        >
                          Delivery Fee
                        </Text> */}
                      </Flex>
                    );
                  })}
                  {/* <Flex
                  p={2}
                  px={4}
                  direction={"column"}
                  fontSize={10}
                  borderRadius={6}
                  border={"1px solid"}
                  borderColor={"blackAlpha.500"}
                  // bg={"secondaryColor.100"}
                  color={"blackAlpha.700"}
                  fontWeight={"700"}
                  w={"fit-content"}
                >
                  <Text>8AM - 9AM</Text>
                </Flex> */}
                </HStack>
              </Box>
            );
          })
        )}
      </Box>
    </>
  );
}
