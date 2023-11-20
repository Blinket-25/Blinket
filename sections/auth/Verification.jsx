import { verifyOtp } from "@/endpoint";
import useContextFunctions from "@/hooks/useContextFunctions";
import {
  Flex,
  HStack,
  Heading,
  PinInput,
  PinInputField,
  Stack,
  Text,
  useBoolean,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { signIn } from "next-auth/react";
import { useState } from "react";

export default function Verification({ verificationCodeFromServer }) {
  const { setUserInformation, closeLoginModal } = useContextFunctions();
  const [userOtp, setUserOtp] = useState("");
  const [isLoading, setLoading] = useBoolean();
  const [isInvalid, setValid] = useBoolean();
  const toast = useToast();

  const verfyOtp = async () => {
    console.log(
      "OTP =======>",
      verificationCodeFromServer.otp,
      "otp ----->",
      userOtp
    );
    setLoading.on();
    if (Number(verificationCodeFromServer.otp) === Number(userOtp)) {
      const response = await verifyOtp({
        otp: userOtp,
        phoneNumber: verificationCodeFromServer.phoneNumber,
      });

      const user = response.info;

      const url = await signIn("credentials", {
        uid: user.id,
        displayName: user.name,
        email: user.email,
        phoneNumber: user.mobile,
        photoURL: user.provider_pic,
        redirect: false,
      });

      console.log("sign in prob hain kya...??", url, user);

      url &&
        setUserInformation({
          savedAddresses: response.address,
          email: user.email,
          name: user.name,
          phone: user.mobile,
          selectedAddress: null,
        });
      closeLoginModal();
      setLoading.off();
    } else {
      setUserOtp("");
      setValid.on();
      toast({
        title: `Invalid OTP`,
        status: "error",
        isClosable: true,
      });
      setTimeout(() => {
        setValid.off();
      }, 2000);
      setLoading.off();
    }
  };

  return (
    <Flex bg={useColorModeValue("gray.50", "gray.800")}>
      <Stack
        spacing={4}
        w={"full"}
        maxW={"md"}
        bg={useColorModeValue("white", "gray.700")}
        rounded={"xl"}
        p={6}
        pt={4}
        pb={12}
      >
        <Heading
          textAlign={"center"}
          lineHeight={1.1}
          fontSize={{ base: "md", md: 14 }}
          fontWeight={"500"}
        >
          Verify Your Phone
        </Heading>
        {/* <Text textAlign={"center"}>
          Your otp is {verificationCodeFromServer.otp}
        </Text> */}
        <Flex justifyContent={"center"}>
          <HStack>
            <PinInput
              onChange={(e) => setUserOtp(e)}
              value={userOtp}
              isInvalid={isInvalid}
              // onComplete={verfyOtp}
              otp
            >
              <PinInputField />
              <PinInputField />
              <PinInputField />
              <PinInputField />
            </PinInput>
          </HStack>
        </Flex>
        {isInvalid && (
          <Text textAlign={"center"} color={"red"}>
            Invalid OTP
          </Text>
        )}
        <Stack spacing={10}>
          <Button
            variant={"base"}
            my={2}
            w={"80%"}
            margin={"auto"}
            isDisabled={false}
            onClick={verfyOtp}
            isLoading={isLoading}
          >
            Confirm
          </Button>
        </Stack>
      </Stack>
    </Flex>
  );
}
