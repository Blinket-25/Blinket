import useContextData, { useContextDataUser } from "@/hooks/useContextData";
import useContextFunctions from "@/hooks/useContextFunctions";
// import LocationComponent from "@/components/currentLocation";
import { Box, Text, Flex, useDisclosure } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { FaLocationDot } from "react-icons/fa6";
import SaveLocation from "@/components/CurrentLocation/SaveLocation/SaveLocation";
import { useEffect, useState } from "react";

AddressPage.title = "Addresses";
export default function AddressPage() {
  const { status } = useSession();
  const { savedAddresses } = useContextDataUser();
  const {
    isOpen: isOpenSaveL,
    onOpen: onOpenSaveL,
    onClose: onCloseSaveL,
  } = useDisclosure();
  const { setTitle } = useContextFunctions();

  const [selectedAddress, setAddress] = useState();

  useEffect(() => {
    selectedAddress && onOpenSaveL();
    setTitle("Addresses");
  }, [selectedAddress]);

  return (
    <>
      <Box px={4}>
        <SaveLocation
          isOpen={isOpenSaveL}
          onClose={onCloseSaveL}
          dataEdit={selectedAddress}
          type="edit"
        />
        {status === "authenticated" && (
          <>
            <Box height={"calc(100vh - 18rem)"} overflow={"scroll"}>
              {savedAddresses.map((address, i) => {
                return (
                  <>
                    <Flex
                      key={address.address}
                      alignItems={"center"}
                      my={2}
                      py={2}
                      gap={4}
                      onClick={() => {
                        setAddress({
                          latitude: address.latitude,
                          longitude: address.longitude,
                          addressId: address.address_id,
                          longAddress: address.address,
                          name: address.name,
                          completeAddress: address.base_address,
                          houseNo: address.user_house_no,
                          landmark: address.landmark,
                          phone: address.phone,
                          address_type: address.address_type,
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
