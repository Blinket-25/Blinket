import { SpinnerInCenter } from "@/components";
import {
  Box,
  Text,
  Input,
  InputGroup,
  InputLeftElement,
  Flex,
} from "@chakra-ui/react";
import { BsSearch } from "react-icons/bs";
import { FaLocationDot } from "react-icons/fa6";
import { HiLocationMarker } from "react-icons/hi";
import AutomaticGetLocation from "../AutomaticGetLocation";
import { useSession } from "next-auth/react";
import useContextData from "@/hooks/useContextData";
import { useRouter } from "next/router";
import { SelectAddressCore } from "@/sections/cart/CartLayout/SelectAddress";

export function SearchLocationByInput({
  isLoading,
  isPlacePredictionsLoading,
  getPlacePredictions,
  placePredictions,
  setSelectedAddress,
}) {
  // const { status } = useSession();
  // const { user } = useContextData();

  return (
    <>
      <Box p={{ base: 5 }} pt={{ base: 16, lg: 5 }}>
        {isLoading ? (
          <SpinnerInCenter />
        ) : (
          <>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<BsSearch color="gray.300" />}
              />
              <Input
                placeholder="Search your address"
                fontSize={12}
                bg={"#efefef"}
                onChange={(evt) => {
                  getPlacePredictions({ input: evt.target.value });
                }}
                loading={isPlacePredictionsLoading}
              />
            </InputGroup>
            <Box h={{ base: "100%", lg: "36vh" }} overflow={"scroll"} mt={2}>
              <Box my={4}>
                <AutomaticGetLocation variant="currentLocation" onBack={true} type={'redirect'} />
                {status === "authenticated" && !placePredictions.length && (
                  <>
                    <Box mt={6}>
                      <Text fontSize={18} fontWeight={"700"}>
                        Saved Location
                      </Text>
                    </Box>
                    <Box>
                      {user.savedAddresses.map((address, i) => {
                        return (
                          <>
                            <Flex
                              alignItems={"center"}
                              my={2}
                              py={2}
                              gap={4}
                              onClick={() => {
                                selectSavedAddress({
                                  latitude: address.latitude,
                                  longitude: address.longitude,
                                });
                              }}
                              cursor={"pointer"}
                            >
                              <Box>
                                <FaLocationDot size={20} />
                              </Box>
                              <Box>
                                <Text fontSize={16} fontWeight={"600"}>
                                  {address.address_type}
                                </Text>
                                <Text>
                                  {address.base_address}, {address.address},{" "}
                                  {address.city}
                                </Text>
                              </Box>
                            </Flex>
                          </>
                        );
                      })}
                    </Box>
                  </>
                )}
              </Box>
              {!placePredictions.length && !isPlacePredictionsLoading && (
                <SelectAddressCore pushPath={"/"} />
              )}
              {isPlacePredictionsLoading ? (
                <SpinnerInCenter />
              ) : (
                placePredictions.map((addressList, i) => {
                  const { structured_formatting: address, description } =
                    addressList;

                  // console.log("address --->", description);
                  return (
                    <Flex
                      mt={2}
                      gap={4}
                      px={4}
                      py={2}
                      alignItems={"center"}
                      borderRadius={10}
                      cursor={"pointer"}
                      _hover={{
                        bg: "#efefef",
                      }}
                      onClick={() => {
                        setSelectedAddress(description);
                      }}
                    >
                      <Box color="themeColor.1000">
                        <HiLocationMarker size={20} />
                      </Box>
                      <Box>
                        <Text fontWeight={"700"} fontSize={16}>
                          {address.main_text}
                        </Text>
                        <Text>{address.secondary_text}</Text>
                      </Box>
                    </Flex>
                  );
                })
              )}
            </Box>
          </>
        )}
      </Box>
    </>
  );
}
