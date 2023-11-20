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
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  Flex,
  useMediaQuery,
  DrawerCloseButton,
} from "@chakra-ui/react";
import { AiFillCaretDown } from "react-icons/ai";
import { useMemo } from "react";
import { LocationComponent } from "@/components";
import { useRouter } from "next/router";

export function CurrentLocationModal({}) {
  // const { isOpen: isLoginOpen, onOpen: onLoginOpen, onClose: onLoginClose } = useDisclosure();
  const { locationModal, user } = useContextData();
  const { openLocationModal, toggleLocationModal } = useContextFunctions();
  const [isNotSmallerScreen] = useMediaQuery("(min-width:1024px)");
  const { pathname } = useRouter();

  if (isNotSmallerScreen) {
    return (
      <Modal
        onClose={
          user.latitude
            ? () => {
                toggleLocationModal();
              }
            : () => {
                console.log("Please select your delivery address.");
              }
        }
        isOpen={locationModal.isOpen}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalBody py={10}>
            <LocationComponent />
          </ModalBody>
        </ModalContent>
      </Modal>
    );
  }

  return (
    <Drawer
      placement={"bottom"}
      onClose={
        user.latitude
          ? () => {
              toggleLocationModal();
            }
          : () => {
              console.log("Please select your delivery address.");
            }
      }
      isOpen={pathname === "/setLocation" ? false : locationModal.isOpen}
    >
      <DrawerOverlay />
      <DrawerContent borderTopRadius={20}>
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
          <LocationComponent />
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}

export default function HeaderLocation({}) {
  const { user } = useContextData();
  const { openLocationModal } = useContextFunctions();

  useMemo(() => {
    if (!user.latitude && !user.longitude) {
      openLocationModal();
    }
  }, [user.latitude, user.longitude]);

  return (
    <>
      <CurrentLocationModal />
      <Box px={6} color={"#000"}>
        <Text fontWeight={"800"} fontSize={20}>
          Delivery by Tommorow
        </Text>
        <Flex
          alignItems="center"
          maxW={"15rem"}
          onClick={openLocationModal}
          cursor={"pointer"}
        >
          <Text
            fontWeight={"400"}
            fontSize={16}
            display={"flex"}
            alignItems={"center"}
            gap={2}
            noOfLines={1}
            flex={1}
          >
            {user.longAddress ? user.longAddress : "Fething..."}
          </Text>
          <AiFillCaretDown size={16} />
        </Flex>
      </Box>
    </>
  );
}
