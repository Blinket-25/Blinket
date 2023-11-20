import { useMediaQuery } from "@chakra-ui/react";
import {
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
} from "@chakra-ui/react";

export default function DrawerAndModalLayout({
  isOpen,
  onClose,
  children,
  bg,
  pt,
}) {
  const [isNotSmallerScreen] = useMediaQuery("(min-width:1024px)");

  if (isNotSmallerScreen) {
    return (
      <Modal isOpen={isOpen} onClose={onClose} size={"lg"} isCentered>
        <ModalOverlay />
        <ModalContent pt={pt ? pt : 4} background={bg && bg}>
          {/* <ModalCloseButton /> */}
          <ModalBody>{children}</ModalBody>
        </ModalContent>
      </Modal>
    );
  }

  return (
    <Drawer placement={"bottom"} onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay />
      <DrawerContent borderTopRadius={26} background={bg && bg}>
        <DrawerBody>
          <Box
            h={1}
            borderRadius={10}
            bg={"#cdcdcd"}
            width={"34%"}
            margin={"auto"}
            mb={4}
            mt={1}
            onClick={onClose}
          />
          {children}
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}
