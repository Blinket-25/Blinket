import {
  Flex,
  FormControl,
  Heading,
  InputGroup,
  InputLeftElement,
  Stack,
  Text,
  useBoolean,
  useColorModeValue,
} from "@chakra-ui/react";
import { Box, Input, Button } from "@chakra-ui/react";
import { BsPhone } from "react-icons/bs";
import { useState } from "react";
import Verification from "./Verification";
import { requestOtp } from "@/endpoint";
import DrawerAndModalLayout from "@/layout/DrawerAndModal/DrawerAndModalLayout";
import { useContextDataUser } from "@/hooks/useContextData";
import { PLATFORM_NAME } from "@/constants";

export default function Login({ isLoginOpen, onLoginClose }) {
  return (
    <DrawerAndModalLayout isOpen={isLoginOpen} onClose={onLoginClose}>
      <LoginCore />
    </DrawerAndModalLayout>
  );
}

export function LoginCore() {
  const [verificationCodeFromServer, setVerificationCodeFromServer] =
    useState();

  if (verificationCodeFromServer) {
    return (
      <>
        <Text
          color={"green"}
          cursor={"pointer"}
          onClick={() => setVerificationCodeFromServer()}
        >
          Back
        </Text>
        <Text align={"center"} fontSize={32} fontWeight={"300"} mb={5}>
          Enter your OTP
        </Text>
        <Verification verificationCodeFromServer={verificationCodeFromServer} />
      </>
    );
  }

  return (
    <>
      <Text align={"center"} fontSize={32} fontWeight={"300"} mb={5}>
        Phone Number Varification
      </Text>
      <PhoneInput
        setVerificationCodeFromServer={setVerificationCodeFromServer}
      />
    </>
  );
}

const PhoneInput = ({ setVerificationCodeFromServer }) => {
  const [inputPhone, setPhone] = useState("");
  const [isLoading, setLoading] = useBoolean();

  const { STORE_CODE } = useContextDataUser();

  const sendVerificationCodeToPhone = async () => {
    setLoading.on();

    const response = await requestOtp({
      phoneNumber: inputPhone,
      STORE_CODE,
      platform: PLATFORM_NAME,
    });
    console.log("otp ---->", response.otp);
    // const opt = await new Promise((resolve) =>
    //   setTimeout(resolve, 2000, Math.floor(Math.random() * 9000 + 1000))
    // );
    setVerificationCodeFromServer({
      otp: response.otp,
      phoneNumber: inputPhone,
    });
    setLoading.off();
  };
  return (
    <>
      <Flex bg={useColorModeValue("gray.50", "gray.800")}>
        <Stack
          spacing={4}
          w={"full"}
          maxW={"md"}
          bg={useColorModeValue("white", "gray.700")}
          rounded={"xl"}
          // boxShadow={'lg'}
          px={[0, 6]}
          pt={4}
          pb={12}
        >
          <Heading
            textAlign={"center"}
            lineHeight={1.1}
            fontSize={{ base: "sm", md: 14 }}
            fontWeight={"500"}
          >
            Enter your phone number to Login/Sign up
          </Heading>
          <FormControl px={10} id="phone" isRequired>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<BsPhone color="gray.300" />}
              />
              <Input
                type="tel"
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone number"
              />
            </InputGroup>
          </FormControl>
          <Stack spacing={10}>
            <Button
              variant={"base"}
              my={2}
              w={"80%"}
              margin={"auto"}
              isDisabled={inputPhone.length === 10 ? false : true}
              onClick={sendVerificationCodeToPhone}
              isLoading={isLoading}
            >
              Next
            </Button>
          </Stack>
          <Box textAlign={"center"} fontSize={10}>
            <Text color={"#888888"}>By continuing, you agree to our</Text>
            <Flex justifyContent={"center"} gap={4} mt={1} color={"green.500"}>
              <Text>Terms of service</Text>
              <Text>Private policy</Text>
            </Flex>
          </Box>
        </Stack>
      </Flex>
    </>
  );
};
