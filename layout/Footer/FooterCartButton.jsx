import { useContextDataCart } from "@/hooks/useContextData";
import { Badge, Box, Flex, Text } from "@chakra-ui/react";
import { PiShoppingCartSimpleLight } from "react-icons/pi";

const SelectedColor = "themeColor.1000";
const UnSelectedColor = "blackAlpha.600";

export default function FooterCartButton({ pathname, push }) {
  const { cartItems } = useContextDataCart();

  // console.log(
  //   "---------------- FooterCartButton  -------------->",
  //   cartItems.length
  // );

  return (
    <Flex
      direction={"column"}
      alignItems={"center"}
      color={pathname === "/cart" ? SelectedColor : UnSelectedColor}
      onClick={() => push("/cart")}
      position={"relative"}
    >
      <Box>
        <Badge
          position={"absolute"}
          top={"-5px"}
          right={"1px"}
          color={"secondaryColor.1000"}
          bg={"#fff"}
          borderRadius={"50%"}
          fontSize={12}
          fontWeight={"700"}
          p={0}
        >
          {cartItems.length}
        </Badge>
      </Box>
      <PiShoppingCartSimpleLight size={22} />
      <Text fontSize={10} fontWeight={"600"} mt={1}>
        Cart
      </Text>
    </Flex>
  );
}
