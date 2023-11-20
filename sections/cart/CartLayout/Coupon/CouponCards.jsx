import {
  Box,
  Flex,
  Spinner,
  Text,
  useBoolean,
  useToast,
} from "@chakra-ui/react";
import { useContextDataCart, useContextDataUser } from "@/hooks/useContextData";
import { checkCoupons } from "@/endpoint";
import useContextFunctions from "@/hooks/useContextFunctions";

export default function CouponCards({ isValid, coupon, BACKGROUND, onClose }) {
  const { grandTotal, subTotal } = useContextDataCart();
  const { STORE_CODE, phone } = useContextDataUser();
  const { setCouponDetails } = useContextFunctions();
  const [isLoading, setLoading] = useBoolean();
  const toast = useToast();

  const applyCoupon = async ({ coupon }) => {
    setLoading.on();
    const data = await checkCoupons({
      STORE_CODE,
      coupon,
      grandTotal,
      subTotal,
      userPhone: phone,
    });

    console.log("resingnition ----->>>>>>>", data);

    if (!data.error) {
      setCouponDetails({
        applied: true,
        couponCode: data.coupon,
        couponID: data.couponId,
        couponDiscountedPrice: data.coupon_discount_price,
        couponAppliedForPrice: data.grandTotal,
      });
      toast({
        title: "Coupon Applied !!",
        description: `You saved ${data.coupon_discount_price}.`,
        status: "success",
        duration: 4000,
        isClosable: true,
      });
      onClose();
    } else if (data.error) {
      toast({
        title: "Sorry..!!",
        description: `${data.errorMsg}`,
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }

    setLoading.off();
  };

  return (
    <>
      <Box className="coupons" mt={4} background={"#fff"} borderRadius={10}>
        <Box
          // h={10}
          paddingX={3}
          paddingY={2}
          paddingBottom={0}
          borderRadius={6}
          border={"1px solid"}
          borderColor={"blackAlpha.200"}
          // boxShadow={"0 0 4px 0 lightgrey"}
          borderBottom={"none"}
        >
          <Flex justifyContent={"space-between"}>
            <Box>
              <Box
                //   paddingY={1}
                borderRadius={6}
                paddingX={2}
                paddingY={1}
                background={"themeColor.100"}
                border={"2px dotted"}
                borderColor={"themeColor.800"}
                fontSize={12}
                fontWeight={"800"}
                color={"themeColor.1000"}
                w={"fit-content"}
              >
                <Text>{coupon.coupon_code}</Text>
              </Box>
              <Box mt={1}>
                <Text fontWeight={"700"} fontSize={12}>
                  {coupon.coupon_title}
                </Text>
              </Box>
            </Box>
            <Box>
              {isLoading ? (
                <Box p={2}>
                  <Spinner color="secondaryColor.1000" size={"sm"} />
                </Box>
              ) : (
                <Text
                  fontWeight={"700"}
                  fontSize={14}
                  color={isValid ? "secondaryColor.1000" : "blackAlpha.500"}
                  cursor={isValid ? "pointer" : "no-drop"}
                  onClick={
                    isValid
                      ? () =>
                          applyCoupon({
                            coupon: coupon.coupon_code,
                          })
                      : () => {}
                  }
                >
                  APPLY
                </Text>
              )}
            </Box>
          </Flex>

          <Flex justifyContent={"space-between"}>
            <Box
              borderRadius={100}
              bg={BACKGROUND}
              // borderRight={"2px solid"}
              h={4}
              w={4}
              position={"relative"}
              bottom={-2}
              right={5}
            />
            <Box
              borderRadius={100}
              bg={BACKGROUND}
              // borderLeft={"2px solid"}
              h={4}
              w={4}
              position={"relative"}
              bottom={-2}
              left={5}
            />
          </Flex>
        </Box>
        <Box
          // h={24}
          p={4}
          borderRadius={6}
          border={"1px solid"}
          borderColor={"blackAlpha.200"}
          // boxShadow={"0 0 10px 0 lightgrey"}
        >
          <Box>
            {!isValid && (
              <Text
                fontWeight={"600"}
                fontSize={10}
                color={"secondaryColor.1000"}
              >
                Add Items worth ₹
                {Number(
                  Number(coupon.minimum_order_amount) - Number(grandTotal)
                ).toLocaleString("en-IN")}{" "}
                to qualify for this deal.
              </Text>
            )}
            <Box mt={isValid ? 0 : 2}>
              <Text fontWeight={"600"} fontSize={10} color={"blackAlpha.700"}>
                Get {coupon.coupon_type === "amount" ? "₹" : "%"}
                {Number(coupon.coupon_discount)} Off on order above ₹
                {Number(coupon.minimum_order_amount).toLocaleString("en-IN")}.
              </Text>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}
