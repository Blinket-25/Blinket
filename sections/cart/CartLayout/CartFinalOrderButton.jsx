import React from "react";
import {
  Box,
  Button,
  Divider,
  Flex,
  HStack,
  Radio,
  RadioGroup,
  Stack,
  Text,
  useBoolean,
  useDisclosure,
} from "@chakra-ui/react";
import { useContextDataCart, useContextDataUser } from "@/hooks/useContextData";
import { useState } from "react";
import { useEffect } from "react";
import { BiSolidError } from "react-icons/bi";
import { PLATFORM_NAME } from "@/constants";
import { placeOrder } from "@/endpoint";
import useContextFunctions from "@/hooks/useContextFunctions";
import { useRouter } from "next/router";
import DrawerAndModalLayout from "@/layout/DrawerAndModal/DrawerAndModalLayout";

export default function CartFinalOrderButton({ error }) {
  const {
    userSelectedAddress,
    userSelectedSlot,
    grandTotal,
    isDeliveryNotAvilable,
    isDeliveryNotAvilableReason,
    deliveryCharge,
    miniumAmountForFreeDelivery,
    isCouponApplied,
    couponDiscountedPrice,
    cartItems,
  } = useContextDataCart();
  const data = useContextDataCart();
  const user = useContextDataUser();
  const [isValid, setIsValid] = useState({
    isValid: false,
    reason: "",
  });
  const [isLoading, setLoading] = useBoolean();
  const { cartReset, resetDistance } = useContextFunctions();
  const { push } = useRouter();
  const { isOpen, onClose, onOpen } = useDisclosure();

  const checkConditions = () => {
    if (!userSelectedAddress) {
      setIsValid({
        isValid: false,
        reason: "Select Your Address First",
      });
    } else if (!userSelectedSlot) {
      setIsValid({
        isValid: false,
        reason: "Select your delivery slot",
      });
    } else {
      setIsValid({
        isValid: true,
        reason: "",
      });
    }
  };

  useEffect(() => {
    checkConditions();
  }, [userSelectedAddress, userSelectedSlot]);

  const FREE_DELIVERY =
    Number(miniumAmountForFreeDelivery) < Number(grandTotal);

  const PAY1 = FREE_DELIVERY
    ? Number(grandTotal)
    : Number(grandTotal) + Number(deliveryCharge);

  const NET_PAY =
    isCouponApplied && couponDiscountedPrice
      ? PAY1 - Number(couponDiscountedPrice)
      : PAY1;

  const cartFinalData = {
    ...data,
    ...user,
    FREE_DELIVERY,
    NET_PAY,
    PLATFORM_NAME,
    cartLength: cartItems.length,
  };

  const placeOrderFunction = async (paymentMethod) => {
    const data = {
      STORE_CODE: user.STORE_CODE,
      dataOrder: { ...cartFinalData, PAYMENT_METHOD: paymentMethod },
    };

    console.log(data);

    setLoading.on();

    const res = await placeOrder(data);

    console.log("res from api from new order made ------->>>>", res);

    resetDistance();
    cartReset();
    push(`/order/${res.orderNumber}`);

    setLoading.off();
  };

  return (
    <>
      <CartPlaceOrderButton
        isOpen={isOpen}
        onClose={onClose}
        isLoading={isLoading}
        placeOrderFunction={placeOrderFunction}
      />
      <Flex pt={2} alignItems={"center"} justifyContent={"center"}>
        {isDeliveryNotAvilable ? (
          <Flex p={2} alignItems={"center"} gap={2} px={4}>
            <BiSolidError color="red" size={20} />
            <Text fontWeight={"600"} fontSize={12}>
              {isDeliveryNotAvilableReason}
            </Text>
          </Flex>
        ) : (
          <>
            <Box w={"24%"} display={{ lg: "none" }}>
              <Text fontWeight={"600"} fontSize={18} align={"center"}>
                ₹{NET_PAY}
              </Text>
            </Box>
            <Box w={{ base: "76%", lg: "100%" }}>
              <Button
                variant={"base"}
                mt={0}
                w="100%"
                textTransform={"uppercase"}
                fontSize={12}
                isDisabled={!isValid.isValid}
                onClick={onOpen}
                isLoading={isLoading}
              >
                {isValid.isValid ? "Continue to payment" : isValid.reason}
              </Button>
            </Box>
          </>
        )}
      </Flex>
    </>
  );
}

export function CartPlaceOrderButton({
  isOpen,
  onClose,
  placeOrderFunction,
  isLoading,
}) {
  const [value, setValue] = useState("COD");

  return (
    <DrawerAndModalLayout isOpen={isOpen} onClose={onClose}>
      {/* <RadioGroup onChange={setValue} value={value}> */}
      <RadioGroup py={5} onChange={setValue} value={value}>
        <Stack direction={"column"}>
          <Radio value="COD" defaultChecked>
            <Text fontSize={13} fontWeight={"600"} ml={1}>
              Cash on delivery
            </Text>
          </Radio>
          <Divider />
          <Radio value="ONLINE">
            <Text fontSize={13} fontWeight={"600"} ml={1}>
              Online Payment
            </Text>
          </Radio>
        </Stack>
      </RadioGroup>
      <Button
        variant={"base"}
        mt={0}
        mb={3}
        w="100%"
        textTransform={"uppercase"}
        fontSize={12}
        // isDisabled={!isValid.isValid}
        onClick={() => placeOrderFunction(value)}
        isLoading={isLoading}
      >
        Place Order
      </Button>
    </DrawerAndModalLayout>
  );
}
