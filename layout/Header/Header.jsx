import { useEffect } from "react";
import {
  Box,
  Flex,
  Button,
  Stack,
  Text,
  Input,
  InputGroup,
  InputLeftElement,
  Skeleton,
  Image,
} from "@chakra-ui/react";

import { BiUserCircle } from "react-icons/bi";
import { GiShoppingBag } from "react-icons/gi";
import { AiOutlineSearch } from "react-icons/ai";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import HeaderLocation from "./HeaderLocation";
import useContextData from "@/hooks/useContextData";
import useContextFunctions from "@/hooks/useContextFunctions";
import { Login } from "@/sections/auth";
import { useQuery } from "@tanstack/react-query";
import { fetchUser } from "@/endpoint";
import {
  NEXTAUTH_SECRET,
  NEXTAUTH_URL,
  WEBSITE_LOGO_LINK,
  WEBSITE_LOGO_NAME,
} from "@/constants";

const WhereToHomeRoute = ["/subcategory/[...subcatId]", "/category/[...catId]"];

export default function Header() {
  const { data } = useSession();
  const { pathname, back, push } = useRouter();
  const { user, loginModal, cart, header } = useContextData();
  const {
    openLoginModal,
    closeLoginModal,
    openLocationModal,
    setUserInformation,
  } = useContextFunctions();

  const {
    data: userDetails,
    isError,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["userDetails"],
    queryFn: () => fetchUser({ phoneNumber: data?.user?.phoneNumber }),
    enabled: data?.user?.phoneNumber !== undefined,
    onSuccess: (data) => {
      const user = data.info;
      // console.log("Get data!");
      // console.log(data);
      setUserInformation({
        savedAddresses: data.address,
        email: user.email,
        name: user.name,
        phone: user.mobile,
      });
    },
  });

  const { cartItems } = cart;

  useEffect(() => {
    !user.latitude || (!user.STORE_CODE && openLocationModal());
  }, [user]);

  return (
    <>
      <Login
        isLoginOpen={loginModal.isOpen}
        onLoginOpen={openLoginModal}
        onLoginClose={closeLoginModal}
      />
      <Box
        bg={{ base: "#fff", lg: "themeColor.1000" }}
        color={{ base: "#000", lg: "#fff" }}
        px={{ base: 3, lg: 16 }}
        py={2}
        position={{ base: "fixed", lg: "fixed" }}
        top={0}
        left={0}
        width={"100%"}
        zIndex={99}
        maxH={{ base: "unset", lg: "80px" }}
        boxShadow={"0 1px 5px 0 #cecece"}
      >
        <Flex
          display={{ base: "none", lg: "flex" }}
          h={16}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Flex alignItems={"center"}>
            <Flex alignItems={"center"} px={4}>
              {/* <Text fontSize={26} fontWeight="700" onClick={() => push("/")}>
                {WEBSITE_LOGO_NAME}
              </Text> */}
              <Image src={WEBSITE_LOGO_LINK} height={28} />
            </Flex>
            <Box w={1} opacity={0.8} bg="#000" h={7} />
            {pathname !== "/search" && <HeaderLocation />}
          </Flex>

          <Box flex={"1 1 0%"} px={5}>
            {pathname !== "/search" ? (
              <Input
                placeholder="Search for over 5000 products"
                bg="#fff"
                p={6}
                type={"text"}
                color={"#000"}
                w="100%"
                onClick={() => pathname !== "/search" && push("/search")}
              />
            ) : null}
          </Box>

          <Flex alignItems={"center"}>
            <Stack direction={"row"} alignItems={"center"} spacing={7}>
              {pathname !== "/search" && data && (
                <Text
                  color={"#000"}
                  fontSize={16}
                  fontWeight={"600"}
                  onClick={signOut}
                >
                  Logout
                </Text>
              )}
              {pathname !== "/search" && !data && (
                <Text
                  color={"#000"}
                  fontSize={16}
                  fontWeight={"600"}
                  onClick={openLoginModal}
                >
                  Login
                </Text>
              )}
              <Box>
                <Button
                  variant={"base"}
                  gap={2}
                  p={6}
                  px={10}
                  onClick={() => push("/cart")}
                  fontWeight={"400"}
                >
                  <GiShoppingBag size={24} /> My Cart | {cartItems.length}
                </Button>
              </Box>
            </Stack>
          </Flex>
        </Flex>
        <Box
          mb={pathname === "/" ? 0 : 0}
          display={{ base: "block", lg: "none" }}
          position={"sticky"}
          top={0}
        >
          {pathname === "/" ? (
            <Box>
              <Flex
                alignItems={"center"}
                justifyContent={"space-between"}
                gap={16}
              >
                <Box>
                  <Text fontWeight={"600"} fontSize={10}>
                    DELIVERED BY
                  </Text>
                  <Text fontSize={20} fontWeight={"700"}>
                    Today, 6PM
                  </Text>
                  <Text
                    fontSize={10}
                    noOfLines={1}
                    onClick={() => push("/setLocation")}
                  >
                    {user.longAddress}
                  </Text>
                </Box>
                <Box onClick={() => push("/account")}>
                  <BiUserCircle size={30} />
                </Box>
              </Flex>

              <Box mt={2}>
                <InputGroup>
                  <InputLeftElement
                    h={8}
                    pointerEvents="none"
                    children={<AiOutlineSearch color="gray.500" />}
                  />
                  <Input
                    type="text"
                    readOnly
                    placeholder="Search Product"
                    bg="#efefef"
                    h={8}
                    fontSize={12}
                    onClick={() => push("/search")}
                  />
                </InputGroup>
              </Box>
            </Box>
          ) : (
            <Flex
              py={1}
              px={1}
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <Flex alignItems={"center"}>
                <HiOutlineArrowLeft
                  onClick={
                    WhereToHomeRoute.find((routes) => routes === pathname)
                      ? () => push("/")
                      : () => back()
                  }
                  size={20}
                />
                <Skeleton
                  height="20px"
                  w={"14rem"}
                  ml={3}
                  isLoaded={header.meta.title !== ""}
                >
                  <Text
                    fontWeight={"700"}
                    noOfLines={1}
                    ml={3}
                    textTransform={"uppercase"}
                  >
                    {header.meta.title}
                  </Text>
                </Skeleton>
              </Flex>
            </Flex>
          )}
        </Box>
      </Box>
    </>
  );
}
