import {
  Button,
  Box,
  Text,
  HStack,
  useRadio,
  useRadioGroup,
  FormControl,
  Input,
  FormLabel,
  useBoolean,
} from "@chakra-ui/react";
import DrawerAndModalLayout from "@/layout/DrawerAndModal/DrawerAndModalLayout";
import { useEffect, useRef, useState } from "react";
import { saveUserAddress } from "@/endpoint";
import { useSession } from "next-auth/react";
import useContextFunctions from "@/hooks/useContextFunctions";
import { useContextDataUser } from "@/hooks/useContextData";

export default function SaveLocation({
  isOpen,
  onClose,
  dataEdit,
  type = "add",
}) {
  const user = useContextDataUser();
  const { data: session } = useSession();
  const { setUserSelectedAddress, setUserInformation } = useContextFunctions();

  // console.log("data ---> edit wala ---->", dataEdit);
  // console.log("type ---->", type === "add");

  const [data, setData] = useState({
    lat: type === "add" ? user?.latitude : dataEdit?.latitude,
    lng: type === "add" ? user?.longitude : dataEdit?.longitude,
    address: type === "add" ? user?.longAddress : dataEdit?.longAddress,
    userId: session?.user?.uid,
    name: type === "add" ? "" : dataEdit?.name,
    completeAddress: type === "add" ? "" : dataEdit?.completeAddress,
    houseNo: type === "add" ? "" : dataEdit?.houseNo,
    landmark: type === "add" ? "" : dataEdit?.landmark,
    phone: type === "add" ? "" : dataEdit?.phone,
    pincode: type === "add" ? "" : dataEdit?.pincode,
    addressId: type === "add" ? "" : dataEdit?.addressId,
  });

  const [isLoading, setLoading] = useBoolean();

  // console.log("data ---> edit wala ---->", dataEdit);
  // console.log("data ---->", data);

  const nameRef = useRef();
  const completeAddressRef = useRef();
  const houseNoRef = useRef();
  const landmarkRef = useRef();
  const phoneRef = useRef();
  const pincodeRef = useRef();

  useEffect(() => {
    dataEdit &&
      type !== "add" &&
      setData({
        lat: dataEdit?.latitude,
        lng: dataEdit?.longitude,
        address: dataEdit?.longAddress,
        userId: session?.user?.uid,
        name: dataEdit?.name,
        completeAddress: dataEdit?.completeAddress,
        houseNo: dataEdit?.houseNo,
        landmark: dataEdit?.landmark,
        phone: dataEdit?.phone,
        pincode: dataEdit?.pincode,
        addressId: dataEdit?.addressId,
        address_type: dataEdit?.address_type,
      });
  }, [dataEdit, type]);

  const saveThisAddress = async () => {
    // console.log("save address function working...!!");
    setLoading.on();

    if (!session.user.uid) {
      setLoading.off();
      return;
    }

    const addressData = {
      ...data,
      name: nameRef.current.value,
      userId: session.user.uid,
      STORE_CODE: user?.STORE_CODE,
      completeAddress: completeAddressRef.current.value,
      houseNo: houseNoRef.current.value,
      landmark: landmarkRef.current.value,
      phone: phoneRef.current.value,
      pincode: pincodeRef.current.value,
      opration: type !== "add" ? "UPDATE" : "ADD",
    };

    setData((data) => {
      return {
        ...data,
        name: nameRef.current.value,
        userId: session.user.uid,
        completeAddress: completeAddressRef.current.value,
        houseNo: houseNoRef.current.value,
        landmark: landmarkRef.current.value,
        phone: phoneRef.current.value,
        pincode: pincodeRef.current.value,
      };
    });

    try {
      const response = await saveUserAddress(addressData);
      console.log("data ---->", response);
      setUserInformation({
        selectedAddress: response.data,
        savedAddresses: response.address,
        distanceFromStore: response.distance,
      });
      setUserSelectedAddress(response.data);
      onClose();
      // setLoading.off();
    } catch (err) {
      console.log("error ---->", err);
    } finally {
      setLoading.off();
    }
  };

  return (
    <>
      <DrawerAndModalLayout isOpen={isOpen} onClose={onClose}>
        <Box>
          <Box borderBottom={"1px solid"} borderColor={"blackAlpha.300"} pb={2}>
            <Text fontSize={20} fontWeight={"700"} pb={1}>
              Enter Complete Address
            </Text>
          </Box>
          <Box pt={3} pb={2} maxH={"calc(100vh - 36vh)"} overflow={"scroll"}>
            <Text fontSize={10} color={"blackAlpha.600"} fontWeight={"600"}>
              Save address as*
            </Text>
            <HStack>
              <AddressType setInfo={setData} dv={data?.address_type} />
            </HStack>
            <Box pt={5}>
              <FormControl
                variant="floating"
                pb={4}
                id="name"
                // isRequired
                // isInvalid
              >
                <Input
                  ref={nameRef}
                  h={10}
                  fontSize={14}
                  fontWeight={"600"}
                  color={"#000"}
                  _focus={{
                    borderColor: "#000",
                    boxShadow: "none",
                    borderWidth: 2,
                  }}
                  placeholder=" "
                  autoComplete="off"
                  defaultValue={data.name}
                />
                <FormLabel>Name</FormLabel>
                {/* <FormHelperText>Keep it very short and sweet!</FormHelperText>
                <FormErrorMessage>Your First name is invalid</FormErrorMessage> */}
              </FormControl>
              <FormControl
                variant="floating"
                pb={4}
                id="complete-address"
                // isRequired
                // isInvalid
              >
                <Input
                  ref={completeAddressRef}
                  h={10}
                  fontSize={14}
                  fontWeight={"600"}
                  color={"#000"}
                  _focus={{
                    borderColor: "#000",
                    boxShadow: "none",
                    borderWidth: 2,
                  }}
                  placeholder=" "
                  autoComplete="off"
                  defaultValue={data.completeAddress}
                />
                <FormLabel>Complete Address</FormLabel>
                {/* <FormHelperText>Keep it very short and sweet!</FormHelperText>
                <FormErrorMessage>Your First name is invalid</FormErrorMessage> */}
              </FormControl>
              <FormControl variant="floating" pb={4} id="phone">
                <Input
                  ref={phoneRef}
                  h={10}
                  fontSize={14}
                  fontWeight={"600"}
                  color={"#000"}
                  _focus={{
                    borderColor: "#000",
                    boxShadow: "none",
                    borderWidth: 2,
                  }}
                  placeholder=" "
                  autoComplete="off"
                  defaultValue={data.phone}
                  maxLength={10}
                  type="tel"
                />
                <FormLabel>Phone Number</FormLabel>
              </FormControl>
              <FormControl
                variant="floating"
                pb={4}
                id="house-no"
                // isRequired
                // isInvalid
              >
                <Input
                  ref={houseNoRef}
                  h={10}
                  fontSize={14}
                  fontWeight={"600"}
                  color={"#000"}
                  _focus={{
                    borderColor: "#000",
                    boxShadow: "none",
                    borderWidth: 2,
                  }}
                  placeholder=" "
                  autoComplete="off"
                  defaultValue={data.houseNo}
                />
                <FormLabel>House/Flat Number</FormLabel>
                {/* <FormHelperText>Keep it very short and sweet!</FormHelperText>
                <FormErrorMessage>Your First name is invalid</FormErrorMessage> */}
              </FormControl>
              <FormControl variant="floating" pb={4} id="landmark">
                <Input
                  ref={landmarkRef}
                  h={10}
                  fontSize={14}
                  fontWeight={"600"}
                  color={"#000"}
                  _focus={{
                    borderColor: "#000",
                    boxShadow: "none",
                    borderWidth: 2,
                  }}
                  placeholder=" "
                  autoComplete="off"
                  defaultValue={data.landmark}
                />
                <FormLabel>Landmark</FormLabel>
              </FormControl>

              <FormControl variant="floating" id="pincode">
                <Input
                  ref={pincodeRef}
                  h={10}
                  fontSize={14}
                  fontWeight={"600"}
                  color={"#000"}
                  _focus={{
                    borderColor: "#000",
                    boxShadow: "none",
                    borderWidth: 2,
                  }}
                  placeholder=" "
                  autoComplete="off"
                  defaultValue={data.pincode}
                />
                <FormLabel>Pincode</FormLabel>
              </FormControl>
            </Box>
          </Box>
          <Box borderTop={"1px solid"} borderColor={"blackAlpha.200"} pb={2}>
            <Box w={{ base: "100%", lg: "100%" }}>
              <Button
                variant={"base"}
                mt={3}
                w="100%"
                textTransform={"uppercase"}
                fontSize={12}
                fontWeight={"700"}
                onClick={saveThisAddress}
                isLoading={isLoading}
              >
                Save Address
              </Button>
            </Box>
          </Box>
        </Box>
      </DrawerAndModalLayout>
    </>
  );
}

function RadioCard(props) {
  const { getInputProps, getRadioProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getRadioProps();

  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        borderWidth="2px"
        borderRadius="md"
        boxShadow="md"
        _checked={{
          bg: "secondaryColor.100",
          color: "#000",
          borderColor: "secondaryColor.800",
        }}
        px={4}
        py={1}
        fontWeight={"700"}
        fontSize={12}
      >
        {props.children}
      </Box>
    </Box>
  );
}

function AddressType({ setInfo, dv }) {
  const options = ["Home", "Work", "Office", "Other"];

  const { getRootProps, getRadioProps, value } = useRadioGroup({
    name: "addressType",
    defaultValue: dv ? dv : "Home",
  });

  console.log("address type ------------->", dv);

  const group = getRootProps();

  useEffect(() => {
    setInfo((rest) => {
      return { ...rest, addressType: value };
    });
  }, [value]);

  return (
    <HStack {...group} mt={2}>
      {options.map((value) => {
        const radio = getRadioProps({ value });
        return (
          <RadioCard key={value} {...radio}>
            {value}
          </RadioCard>
        );
      })}
    </HStack>
  );
}
