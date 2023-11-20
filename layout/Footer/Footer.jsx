import { WEBSITE_TITLE } from "@/constants";
import useContextData, { useContextDataCart } from "@/hooks/useContextData";
import { Badge, Box, Button, Flex, HStack, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { BiSearchAlt2, BiSolidCategoryAlt } from "react-icons/bi";
import { BsSearch } from "react-icons/bs";
import { HiHome } from "react-icons/hi";
import { PiShoppingCartSimpleLight } from "react-icons/pi";
import FooterCartButton from "./FooterCartButton";

const restrictedRoutes = ["/search", "/setLocation", "/cart"];
const SelectedColor = "themeColor.1000";
const UnSelectedColor = "blackAlpha.600";

export default function Footer({}) {
  const { push, pathname } = useRouter();
  // const { cart } = useContextData();
  if (restrictedRoutes.find((routes) => routes === pathname)) return;
  // const { cartItems } = useContextDataCart();

  console.log("pathname --->", pathname);

  // return (
  //   <Box
  //     zIndex={9}
  //     position={"fixed"}
  //     left={0}
  //     w={"100%"}
  //     bottom={0}
  //     py={3}
  //     px={6}
  //     bg="#fff"
  //     display={{ lg: "none" }}
  //     onClick={() => push("/cart")}
  //   >
  //     <Button variant={"base"} w={"100%"} borderRadius={10}>
  //       <Flex justifyContent={"space-between"} fontSize={16} w={"96%"}>
  //         <Text>
  //           {cart.cartItems.length} Items | ₹ {cart.grandTotal}
  //         </Text>
  //         <Text>View Cart</Text>
  //       </Flex>
  //     </Button>
  //   </Box>
  // );

  return (
    <Box
      zIndex={9}
      position={"fixed"}
      left={0}
      w={"100%"}
      bottom={0}
      pt={2}
      pb={3}
      px={8}
      bg="#fff"
      display={{ lg: "none" }}
      borderTop={"1px solid #e7e7e7"}
    >
      <HStack justifyContent={"space-between"}>
        <Flex
          direction={"column"}
          alignItems={"center"}
          color={pathname === "/" ? SelectedColor : UnSelectedColor}
          onClick={() => push("/")}
        >
          <HiHome size={22} />
          <Text fontSize={10} fontWeight={"600"} mt={1}>
            {WEBSITE_TITLE}
          </Text>
        </Flex>
        <Flex
          direction={"column"}
          alignItems={"center"}
          color={pathname === "/category" ? SelectedColor : UnSelectedColor}
          onClick={() => push("/category")}
        >
          <BiSolidCategoryAlt size={22} />
          <Text fontSize={10} fontWeight={"600"} mt={1}>
            Categories
          </Text>
        </Flex>
        <Flex
          direction={"column"}
          alignItems={"center"}
          color={pathname === "/search" ? SelectedColor : UnSelectedColor}
          onClick={() => push("/search")}
        >
          <BiSearchAlt2 size={22} />
          <Text fontSize={10} fontWeight={"600"} mt={1}>
            Search
          </Text>
        </Flex>
        <FooterCartButton pathname={pathname} push={push} />
      </HStack>
    </Box>
  );
}
