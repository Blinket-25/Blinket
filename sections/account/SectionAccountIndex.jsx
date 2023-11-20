import { Box, Button, Flex, HStack, Text } from "@chakra-ui/react";
import { FiPhoneCall } from "react-icons/fi";
import { GoPackage } from "react-icons/go";
import {
  AiOutlineRight,
  AiOutlineStar,
  AiOutlinePoweroff,
  AiOutlineUser,
} from "react-icons/ai";
import { BsShare } from "react-icons/bs";
import { IoMailUnreadOutline } from "react-icons/io5";
import { BsFillJournalBookmarkFill, BsPatchExclamation } from "react-icons/bs";
import useContextFunctions from "@/hooks/useContextFunctions";
import { useContextDataUser } from "@/hooks/useContextData";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";
import { COMPANY_CONTACT_1, COMPANY_EMAIL } from "@/constants";

export default function SectionAccountIndex() {
  const { openLoginModal, resetUser } = useContextFunctions();
  //   const { phone } = useContextDataUser();
  const { push } = useRouter();
  const { data } = useSession();

  const logOut = () => {
    resetUser();
    signOut();
  };

  console.log("user data for session ---->", data);

  return (
    <Box bg="#fff" px={5} pb={8}>
      <Box my={2}>
        <Text fontSize={20} fontWeight="600" color={"blackAlpha.900"}>
          My account
        </Text>
        <Text fontSize={14} mt={2}>
          {data?.user?.phoneNumber}
        </Text>
      </Box>
      {!data && (
        <Box mb={4}>
          <Button
            variant={"outline"}
            colorScheme="green"
            borderWidth={2}
            width={"100%"}
            onClick={openLoginModal}
          >
            Login
          </Button>
        </Box>
      )}
      <Box my={5} py={4} px={10} bg={"#e1eaef"} borderRadius={6}>
        <HStack justifyContent={"space-between"}>
          <Box as="a" href={`tel:+91${COMPANY_CONTACT_1}`}>
            <Flex
              direction={"column"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <FiPhoneCall size={20} />
              <Text mt={1} fontSize={12} fontWeight={"600"}>
                Call Us
              </Text>
            </Flex>
          </Box>
          <Box as="a" href={`mailto:${COMPANY_EMAIL}`}>
            <Flex
              direction={"column"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <IoMailUnreadOutline size={22} />
              <Text mt={1} fontSize={12} fontWeight={"600"}>
                Support
              </Text>
            </Flex>
          </Box>
          <Flex
            direction={"column"}
            justifyContent={"center"}
            alignItems={"center"}
            onClick={() => window?.Android?.shairApp()}
          >
            <BsShare size={20} />
            <Text mt={1} fontSize={12} fontWeight={"600"}>
              Share
            </Text>
          </Flex>
        </HStack>
      </Box>
      <Box
      //   opacity={data.UserID ? "1" : "0.5"}
      //   pointerEvents={data.UserID ? "unset" : "none"}
      >
        <Text color="grey" my={4}>
          YOUR INFORMATION
        </Text>
        {/* <Box mb={5}>
          <HStack
            justifyContent={"space-between"}
            alignItems="center"
          >
            <Box display={"flex"} alignItems="center">
              <Box
                borderRadius={"50%"}
                bg="#e0e0e0"
                p={1}
                display={"flex"}
                mr={3}
              >
                <AiOutlineUser size={18} />
              </Box>
              <Text fontWeight={"500"}>Your Profile</Text>
            </Box>
            <Box>
              <AiOutlineRight />
            </Box>
          </HStack>
        </Box> */}
        <Box mb={5}>
          <HStack
            onClick={() => (data ? push("/account/orders") : openLoginModal())}
            justifyContent={"space-between"}
            alignItems="center"
          >
            <Box display={"flex"} alignItems="center">
              <Box
                borderRadius={"50%"}
                bg="#e0e0e0"
                p={1}
                display={"flex"}
                mr={3}
              >
                <GoPackage size={18} />
              </Box>
              <Text fontWeight={"500"}>Your orders</Text>
            </Box>
            <Box>
              <AiOutlineRight />
            </Box>
          </HStack>
        </Box>
        <Box mb={5}>
          <HStack
            onClick={() => (data ? push("/account/address") : openLoginModal())}
            justifyContent={"space-between"}
            alignItems="center"
          >
            <Box display={"flex"} alignItems="center">
              <Box
                borderRadius={"50%"}
                bg="#e0e0e0"
                p={1}
                display={"flex"}
                mr={3}
              >
                <BsFillJournalBookmarkFill size={18} />
              </Box>
              <Text fontWeight={"500"}>Address Book</Text>
            </Box>
            <Box>
              <AiOutlineRight />
            </Box>
          </HStack>
        </Box>
        {data ? (
          <Box mb={5}>
            <HStack
              onClick={logOut}
              justifyContent={"space-between"}
              alignItems="center"
            >
              <Box display={"flex"} alignItems="center">
                <Box
                  borderRadius={"50%"}
                  bg="#e0e0e0"
                  p={1}
                  display={"flex"}
                  mr={3}
                >
                  <AiOutlinePoweroff size={18} />
                </Box>
                <Text fontWeight={"500"}>Log out</Text>
              </Box>
              <Box>
                <AiOutlineRight />
              </Box>
            </HStack>
          </Box>
        ) : null}
      </Box>
      <Box>
        <Text color="grey" my={4}>
          OTHER INFORMATION
        </Text>
        <Box mb={5}>
          <HStack
            //   onClick={() => navigate("/about")}
            justifyContent={"space-between"}
            alignItems="center"
          >
            <Box display={"flex"} alignItems="center">
              <Box
                borderRadius={"50%"}
                bg="#e0e0e0"
                p={1}
                display={"flex"}
                mr={3}
              >
                <BsPatchExclamation size={18} />
              </Box>
              <Text fontWeight={"500"}>About us</Text>
            </Box>
            <Box>
              <AiOutlineRight />
            </Box>
          </HStack>
        </Box>
        <Box mb={5}>
          {/* <Link href="https://g.page/r/CaODRoxra1JWEBM/review" isExternal> */}
          <HStack
            justifyContent={"space-between"}
            alignItems="center"
            //   onClick={() => window.Android?.rateUsOnPlayStore()}
          >
            <Box display={"flex"} alignItems="center">
              <Box
                borderRadius={"50%"}
                bg="#e0e0e0"
                p={1}
                display={"flex"}
                mr={3}
              >
                <AiOutlineStar size={18} />
              </Box>
              <Text fontWeight={"500"}>Rate us on Play Store</Text>
            </Box>
            <Box>
              <AiOutlineRight />
            </Box>
          </HStack>
          {/* </Link> */}
        </Box>
      </Box>
      <Box mt={6} mb={10}>
        <Text
          fontWeight={"900"}
          fontSize={30}
          fontFamily="unset !important"
          color={"#b5b5b5"}
          textAlign="center"
        >
          SuperG.in
        </Text>
        <Text fontSize={10} color={"#b5b5b5"} textAlign="center">
          Made with ❤️ by Skyably IT Solution
        </Text>
      </Box>
    </Box>
  );
}
