import React from "react";
import {
  Box,
  Button,
  Divider,
  Flex,
  Skeleton,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useContextDataCart } from "@/hooks/useContextData";
import { SelectAddressWrapper } from "./SelectAddress";
import { useSession } from "next-auth/react";
import useContextFunctions from "@/hooks/useContextFunctions";
import CartCoupon from "./Coupon/CartCoupon";
import CartSlot from "./CartSlot";
import CartFooter from "./CartFooter";
import { BiCommentError } from "react-icons/bi";

export default function CartMetaData({ onOpenSaveL }) {
  const { openLoginModal } = useContextFunctions();
  const { data: session } = useSession();
  const { isOpen, onClose, onOpen } = useDisclosure();

  console.log("cart meta data");

  return (
    <>
      <Box
        className="RightSection"
        height={"fit-content"}
        position={"sticky"}
        top={"16%"}
        pl={{ base: 0, lg: 4 }}
        // w={"40%"}
        // w={{ base: "80%", lg: "40%" }}
        w={{ base: "100%", sm: "90%", md: "70%", lg: "40%" }}
        ml={0}
        marginX={"auto"}
        mt={[4, 4, 4, 0]}
      >
        <CartSlot />
        <CartCoupon />
        <CartPriceFunction />
        <Box
          mt={4}
          bg={"#fff"}
          className="Footer"
          boxShadow={"0 0 10px 0px #dbdbdb"}
          borderRadius={{ base: 0, lg: 8 }}
          px={4}
          py={{ base: 2, lg: 5 }}
          position={{ base: "fixed", lg: "unset" }}
          bottom={0}
          left={0}
          w={"100%"}
        >
          <SelectAddressWrapper
            isOpen={isOpen}
            onClose={onClose}
            onOpen={onOpen}
            toShow={true}
          />
          {session ? (
            <CartFooter
              onOpen={onOpen}
              onOpenSaveL={onOpenSaveL}
              key={"cartFooter"}
            />
          ) : (
            <Box>
              <Box w={{ base: "100%", lg: "100%" }}>
                <Button
                  variant={"base"}
                  my={2}
                  w="100%"
                  textTransform={"uppercase"}
                  fontSize={12}
                  fontWeight={"700"}
                  onClick={openLoginModal}
                >
                  Login
                </Button>
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
}

const CartPriceFunction = () => {
  const {
    subTotal,
    grandTotal,
    deliveryCharge,
    miniumAmountForFreeDelivery,
    couponDiscountedPrice,
    isCouponApplied,
    couponCode,
  } = useContextDataCart();

  const FREE_DELIVERY =
    Number(miniumAmountForFreeDelivery) < Number(grandTotal);

  const PAY1 = FREE_DELIVERY
    ? Number(grandTotal)
    : Number(grandTotal) + Number(deliveryCharge);

  const NET_PAY =
    isCouponApplied && couponDiscountedPrice
      ? PAY1 - Number(couponDiscountedPrice)
      : PAY1;

  return (
    <Box
      px={5}
      py={6}
      boxShadow={"0 0 10px 0px #dbdbdb"}
      borderRadius={{ base: 0, sm: 8 }}
      bg={"#fff"}
    >
      <Flex alignItems={"center"} justifyContent={"space-between"}>
        <Text fontWeight={"600"} fontSize={12}>
          Sub Total
        </Text>
        <Flex gap={2}>
          <Text color={"ActiveBorder"} fontWeight={"600"}>
            <Box as="span" fontSize={10} fontWeight={"500"}>
              ₹
            </Box>{" "}
            {subTotal}
          </Text>
        </Flex>
      </Flex>
      {isCouponApplied && (
        <Flex mt={1} alignItems={"center"} justifyContent={"space-between"}>
          <Text fontWeight={"600"} fontSize={12} color={"#00A300"}>
            Discount ({couponCode})
          </Text>
          <Flex gap={2}>
            <Text color={"green.400"} fontWeight={"600"} fontSize={12}>
              <Box as="span" fontSize={10} fontWeight={"500"}>
                -₹
              </Box>{" "}
              {couponDiscountedPrice}
            </Text>
          </Flex>
        </Flex>
      )}
      <Flex alignItems={"center"} justifyContent={"space-between"}>
        <Text
          // fontWeight={"600"}
          fontSize={12}
          color={"InactiveCaptionText"}
        >
          Your Savings
        </Text>
        <Flex gap={2}>
          <Text color={"green.400"} fontWeight={"600"} fontSize={12}>
            <Box as="span" fontSize={10} fontWeight={"500"}>
              - ₹
            </Box>{" "}
            {Number(subTotal) - Number(grandTotal)}
          </Text>
        </Flex>
      </Flex>
      <Box>
        <Flex alignItems={"center"} justifyContent={"space-between"}>
          <Text
            // fontWeight={"600"}
            fontSize={12}
            color={"InactiveCaptionText"}
          >
            Delivery Changers
          </Text>
          <Flex gap={2}>
            {FREE_DELIVERY && (
              <Text color={"InactiveCaptionText"} fontSize={12}>
                <Box as="span" fontSize={10} fontWeight={"500"}>
                  ₹
                </Box>
                <Text as={"span"} textDecoration={"line-through"}>
                  {deliveryCharge}
                </Text>
              </Text>
            )}
            {deliveryCharge ? (
              <Text color={"green.400"} fontWeight={"600"} fontSize={12}>
                {!FREE_DELIVERY && <Box as="span" fontSize={10} fontWeight={"500"}>
                  + ₹
                </Box>}
                {FREE_DELIVERY ? "FREE" : deliveryCharge}
              </Text>
            ) : (
              <Box mt={0}>
                <Skeleton w={10} h={4} />
              </Box>
            )}
          </Flex>
        </Flex>
        {!FREE_DELIVERY && (
          <>
            <Flex fontSize={10} alignItems={"center"} color={"green.500"}>
              <BiCommentError />{" "}
              <Text ml={1}>
                Shop more for ₹
                {Number(miniumAmountForFreeDelivery) - Number(grandTotal)} more
                to get free delivery
              </Text>
            </Flex>
          </>
        )}
      </Box>
      <Divider my={2} />
      <Flex alignItems={"center"} justifyContent={"space-between"}>
        <Text
          fontWeight={"600"}
          fontSize={14}
          // color={"InactiveCaptionText"}
        >
          To Pay
        </Text>
        <Flex gap={2}>
          <Text color={"black"} fontSize={16} fontWeight={"600"}>
            <Box as="span" fontSize={13}>
              ₹
            </Box>{" "}
            {NET_PAY}
          </Text>
        </Flex>
      </Flex>
    </Box>
  );
};
