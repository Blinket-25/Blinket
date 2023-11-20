import useContextData from "@/hooks/useContextData";
import useContextFunctions from "@/hooks/useContextFunctions";
// import LocationComponent from "@/components/currentLocation";
import {
  Box,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  Flex,
  useMediaQuery,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import AutomaticGetLocation from "@/components/CurrentLocation/AutomaticGetLocation";
import { useSession } from "next-auth/react";
import { FaLocationDot } from "react-icons/fa6";
import useGeocode from "@/hooks/useGoecode";

export function SelectAddressCore({ onClose, pushPath, toShow = false }) {
  const { status } = useSession();
  const { user } = useContextData();
  const {
    setUserInformation,
    setUserSelectedAddress,
    setDeliveryCharge,
    openLocationModal,
  } = useContextFunctions();
  const { getAddressFromCoords } = useGeocode();
  const { push } = useRouter();

  const selectSavedAddress = async ({
    latitude,
    longitude,
    addressId,
    distanceFromStore,
  }) => {
    const coords = {
      lat: latitude,
      lng: longitude,
    };
    const address = await getAddressFromCoords(coords);
    setUserInformation({
      latitude: latitude,
      longitude: longitude,
      shortAddress: address.shortAddress,
      longAddress: address.longAddress,
      selectedAddress: addressId,
      distanceFromStore,
    });
    setUserSelectedAddress(addressId);
    setDeliveryCharge("");
    pushPath ? push(pushPath) : onClose();
  };

  return (
    <>
      <Box my={4}>
        {/* <AutomaticGetLocation
          variant="currentLocation"
          onClose={onClose}
          type={pushPath && "push"}
        /> */}
        <Box>
          <Flex
            color={"secondaryColor.800"}
            cursor={"pointer"}
            alignItems={"center"}
            onClick={() => {
              onClose();
              openLocationModal();
            }}
          >
            {/* icon here for add address */}
            {toShow && (
              <Text ml={3} mb={5} fontWeight={"700"} fontSize={16}>
                Add new location
              </Text>
            )}
          </Flex>
        </Box>
        {status === "authenticated" && (
          <>
            <Box mt={0}>
              <Text fontSize={18} fontWeight={"700"}>
                Saved Location
              </Text>
            </Box>
            <Box height={"calc(100vh - 18rem)"} overflow={"scroll"}>
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
                          addressId: address.address_id,
                          distanceFromStore: address.distance_km,
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
    </>
  );
}

export function SelectAddressWrapper({ isOpen, onClose, onOpen, toShow }) {
  // const { isOpen: isLoginOpen, onOpen: onLoginOpen, onClose: onLoginClose } = useDisclosure();
  const [isNotSmallerScreen] = useMediaQuery("(min-width:1024px)");

  if (isNotSmallerScreen) {
    return (
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalBody py={10}>
            <SelectAddressCore onClose={onClose} toShow={toShow} />
          </ModalBody>
        </ModalContent>
      </Modal>
    );
  }

  return (
    <Drawer size={"sm"} placement={"bottom"} onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay />
      <DrawerContent borderTopRadius={20}>
        {/* <DrawerCloseButton /> */}
        <DrawerBody>
          <Box
            h={1}
            borderRadius={10}
            bg={"#cdcdcd"}
            width={"34%"}
            margin={"auto"}
            mb={6}
            mt={1}
          />
          <SelectAddressCore onClose={onClose} toShow={toShow} />
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}

export default function SelectAddress({ toShow }) {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { user } = useContextData();

  //   useMemo(() => {
  //     if (!user.latitude && !user.longitude) {
  //       openLocationModal();
  //     }
  //   }, [user.latitude, user.longitude]);

  return (
    <>
      <SelectAddressWrapper
        isOpen={isOpen}
        onClose={onClose}
        onOpen={onOpen}
        toShow={toShow}
      />

      <Box display={{ base: "flex", lg: "block" }} alignItems={"center"}>
        <Text
          w={"60%"}
          noOfLines={1}
          overflow={"hidden"}
          height={"1.2rem"}
          display={"-webkit-box"}
        >
          <Text as={"span"} fontWeight={"700"}>
            {user.shortAddress}
          </Text>
          , {user.longAddress}
        </Text>
        <Text
          w={"40%"}
          color={"secondaryColor.1000"}
          fontWeight={"600"}
          my={2}
          textTransform={"uppercase"}
          align={{ base: "right", lg: "left" }}
          onClick={onOpen}
          cursor={"pointer"}
        >
          Change Address
        </Text>
      </Box>
    </>
  );
}
