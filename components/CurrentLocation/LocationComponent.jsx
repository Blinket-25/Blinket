import {
  Button,
  Text,
  Box,
  Image,
  useDisclosure,
  useMediaQuery,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalHeader,
  Flex,
} from "@chakra-ui/react";
import useContextFunctions from "@/hooks/useContextFunctions";
import { ManualLocation } from "./ManualLocation";
import { useRouter } from "next/router";
import { BiChevronLeft } from "react-icons/bi";
import AutomaticGetLocation from "./AutomaticGetLocation";

export default function LocationComponent() {
  // const { user } = useContextData();
  const { closeLocationModal } = useContextFunctions();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isNotSmallerScreen] = useMediaQuery("(min-width:1024px)");
  const { push } = useRouter();

  return (
    <>
      <Box>
        <Box textAlign={"center"}>
          <Image
            margin={"auto"}
            src="https://cdn3d.iconscout.com/3d/premium/thumb/location-not-found-5581208-4669828.png"
            height={40}
          />
          <Text mb={4} fontWeight={"700"} fontSize={20}>
            Welcome to SuperG
          </Text>
          <Text mb={6} px={10}>
            Please provide your delivery location to see products at nearby
            store
          </Text>
        </Box>
        <Box gap={10}>
          {/* get location automatic */}
          <AutomaticGetLocation />
          {/* get location automatic */}

          {/* get location manual */}
          <Box mb={6}>
            <Button
              variant={"outline"}
              w={"100%"}
              py={6}
              fontWeight={"700"}
              onClick={
                isNotSmallerScreen
                  ? () => onOpen()
                  : () => {
                      push("/setLocation");
                      closeLocationModal();
                    }
              }
            >
              Set Your Location Manaully
            </Button>
          </Box>
          {/* get location manual */}
        </Box>
      </Box>

      <Modal
        onClose={onClose}
        // onClose={user.latitude ? toggleLocationModal() : () => {}}
        isOpen={isOpen}
        size={"xl"}
        isCentered
      >
        <ModalOverlay />
        <ModalContent borderRadius={14}>
          <ModalHeader
            className="shadow-lg"
            py={2}
            px={2}
            fontSize={16}
            align="center"
          >
            <Flex alignItems={"center"}>
              <BiChevronLeft
                size={32}
                cursor={"pointer"}
                onClick={() => setSelectedAddress("")}
              />
              <Text w={"88%"} align={"center"}>
                Your Location
              </Text>
            </Flex>
          </ModalHeader>
          <ModalBody p={0} borderRadius={20}>
            <ManualLocation onClose={onClose} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
