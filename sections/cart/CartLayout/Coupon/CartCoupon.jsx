import React, { useEffect, useRef } from "react";
import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Spinner,
  Text,
  useBoolean,
  useDisclosure,
} from "@chakra-ui/react";
import useContextData, {
  useContextDataCart,
  useContextDataUser,
} from "@/hooks/useContextData";
import { useQuery } from "@tanstack/react-query";
import { checkCoupons, getMetaData } from "@/endpoint";
import { RxCross2 } from "react-icons/rx";
import { RiCoupon3Fill } from "react-icons/ri";
import { AiOutlineCaretRight, AiOutlinePercentage } from "react-icons/ai";
import DrawerAndModalLayout from "@/layout/DrawerAndModal/DrawerAndModalLayout";
import CouponCards from "./CouponCards";
import useContextFunctions from "@/hooks/useContextFunctions";

const BACKGROUND = "#efefef";

export default function CartCoupon({}) {
  const { STORE_CODE } = useContextDataUser();

  const {
    data: meta,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["meta"],
    queryFn: () => getMetaData({ STORE_CODE: STORE_CODE }),
  });
  const {
    grandTotal,
    isCouponApplied,
    couponCode,
    couponDiscountedPrice,
    couponAppliedForPrice,
  } = useContextDataCart();
  const { setCouponDetails } = useContextFunctions();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const resetCoupon = () => {
    setCouponDetails({
      applied: false,
      couponCode: null,
      couponDiscountedPrice: null,
    });
  };

  useEffect(() => {
    console.log(
      "coupon ----------->>>",
      Number(grandTotal),
      "num 2 ---->",
      couponAppliedForPrice
    );
    if (Number(grandTotal) !== Number(couponAppliedForPrice)) {
      resetCoupon();
    }
  }, [grandTotal]);

  return (
    <>
      {isCouponApplied ? (
        <>
          <Flex
            mb={4}
            bg={"#fff"}
            className="Coupons"
            boxShadow={"0 0 10px 0px #dbdbdb"}
            borderRadius={{ base: 0, sm: 8 }}
            px={5}
            py={5}
            alignItems={"center"}
            justifyContent={"space-between"}
            // onClick={onOpen}
          >
            <Flex alignItems={"center"}>
              <AiOutlinePercentage size={26} color="#27b87b" />
              <Box>
                <Text color={"#00A300"} fontWeight={"700"} fontSize={12} ml={4}>
                  Code {couponCode} Applied
                </Text>
                <Text fontWeight={"700"} fontSize={10} ml={4}>
                  Flat ₹{couponDiscountedPrice} Off
                </Text>
              </Box>
            </Flex>
            <Box p={2} onClick={() => resetCoupon()}>
              <RxCross2 color="red" />
            </Box>
          </Flex>
        </>
      ) : (
        <>
          <Flex
            mb={4}
            bg={"#fff"}
            className="Coupons"
            boxShadow={"0 0 10px 0px #dbdbdb"}
            borderRadius={{ base: 0, sm: 8 }}
            px={5}
            py={5}
            alignItems={"center"}
            justifyContent={"space-between"}
            onClick={onOpen}
          >
            <Flex alignItems={"center"}>
              <RiCoupon3Fill size={26} color="#27b87b" />
              <Text fontWeight={"600"} fontSize={14} ml={4}>
                Avail Offers / Coupons
              </Text>
            </Flex>
            <AiOutlineCaretRight />
          </Flex>
        </>
      )}
      <CartCouponLayout
        isOpen={isOpen}
        onClose={onClose}
        onOpen={onOpen}
        coupons={meta?.coupons}
        grandTotal={grandTotal}
      />
    </>
  );
}

function CartCouponLayout({ isOpen, onClose, onOpen, coupons, grandTotal }) {
  const couponRef = useRef();

  return (
    <>
      <DrawerAndModalLayout isOpen={isOpen} onClose={onClose} bg={BACKGROUND}>
        <Box>
          <Box pb={2}>
            <Text fontSize={18} fontWeight={"700"} pb={1} align={"center"}>
              Apply Coupon
            </Text>
          </Box>
          <Box my={4}>
            <Flex alignItems={"center"} gap={4}>
              <FormControl
                // variant="floating"
                // pb={4}
                id="coupon"
                // isRequired
                // isInvalid
              >
                <Input
                  ref={couponRef}
                  background={"#fff"}
                  h={10}
                  fontSize={14}
                  fontWeight={"600"}
                  color={"#000"}
                  _focus={{
                    // borderColor: "#000",
                    // boxShadow: "none",
                    borderWidth: 1,
                  }}
                  placeholder="Enter you coupon"
                  autoComplete="off"
                  autoFocus="off"
                />
                {/* <FormLabel>Enter Coupon Code</FormLabel> */}
              </FormControl>
              <Text>APPLY</Text>
            </Flex>
            <Box mt={4}>
              <Text fontWeight={"700"} fontSize={16} mt={2}>
                Available Coupons
              </Text>
              <Box
                mt={2}
                height={"calc(100vh - 18rem)"}
                overflowX={"hidden"}
                overflowY={"auto"}
                sx={{
                  "::-webkit-scrollbar": {
                    display: "none",
                  },
                }}
              >
                {coupons?.map((coupon, i) => {
                  const isValid =
                    Number(coupon.minimum_order_amount) <= Number(grandTotal);
                  return (
                    <CouponCards
                      BACKGROUND={BACKGROUND}
                      coupon={coupon}
                      isValid={isValid}
                      key={`coupon-${coupon.coupon_id}`}
                      onClose={onClose}
                    />
                  );
                })}
              </Box>
            </Box>
          </Box>
        </Box>
      </DrawerAndModalLayout>
    </>
  );
}
