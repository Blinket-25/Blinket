import {
  Button,
  Box,
  Flex,
  Text,
  useBoolean,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import GetCurrentLocation from "@/hooks/getCurrentLocation";
import useContextFunctions from "@/hooks/useContextFunctions";
import useGeocode from "@/hooks/useGoecode";
import { MdOutlineGpsFixed } from "react-icons/md";
import { useRouter } from "next/router";

export default function AutomaticGetLocation({
  variant = "button",
  type = "close",
  onClose,
  onBack = false,
}) {
  const { push, back } = useRouter();
  const { setUserInformation, closeLocationModal } = useContextFunctions();
  const { getAddressFromCoords } = useGeocode();
  const [isClicked, setClicked] = useBoolean();
  const toast = useToast();

  const setCurrentLocation = (position) => {
    setClicked.on();
    getAddress(position.coords);
  };

  const locationError = (error) => {
    // setClicked.on();
    console.log("hey there ----->", error);
    toast({
      title: `${error.message}`,
      description: "Go to your settings and allow the location",
      status: "error",
      isClosable: true,
      duration: 3000,
    });
  };

  const getAddress = async (coord) => {
    const coords = {
      lat: coord.latitude,
      lng: coord.longitude,
    };
    const address = await getAddressFromCoords(coords);
    setUserInformation({
      selectedAddress: null,
      distanceFromStore: null,
      shortAddress: address.shortAddress,
      longAddress: address.longAddress,
      latitude: coords.lat,
      longitude: coords.lng,
      STORE_CODE: "STORE0001",
    });
    if (type === "close") {
      closeLocationModal();
      onClose && onClose();
    } else {
      onBack ? back() : push("/");
    }
    setClicked.off();
  };

  if (variant === "button")
    return (
      <>
        <Box mb={6}>
          <Button
            variant={"base"}
            w={"100%"}
            py={4}
            fontWeight={"700"}
            onClick={() => {
              GetCurrentLocation(setCurrentLocation, locationError);
            }}
            isLoading={isClicked}
          >
            Use Current Location
          </Button>
        </Box>
      </>
    );

  return (
    <>
      <Box>
        <Flex
          color={"secondaryColor.800"}
          cursor={"pointer"}
          alignItems={"center"}
          onClick={() => GetCurrentLocation(setCurrentLocation, locationError)}
        >
          <MdOutlineGpsFixed size={18} />
          <Text ml={3} fontWeight={"700"} fontSize={16}>
            Current Location
          </Text>
          {isClicked && <Spinner size={"sm"} ml={4} />}
        </Flex>
      </Box>
    </>
  );
}
