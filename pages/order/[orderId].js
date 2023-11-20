import { fetchOrderByOrderNumber } from "@/endpoint";
import useContextFunctions from "@/hooks/useContextFunctions";
import { Box, Divider, Flex, HStack, Skeleton, Text } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Image from "next/image";
import { useContextDataUser } from "@/hooks/useContextData";
import { OrderStatusButton } from "@/sections/account/SectionOrderHistory";

export default function OrderById() {
  const { query } = useRouter();
  const { setTitle } = useContextFunctions();
  const { phone } = useContextDataUser();

  const ORDER_ID = query.orderId && query?.orderId;
  // const DATA = JSON.parse(query.data);

  const {
    data: orderDetails,
    isError,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["orderByNumber", ORDER_ID],
    queryFn: () =>
      fetchOrderByOrderNumber({ orderNumber: ORDER_ID, phone: phone }),
    enabled: ORDER_ID !== undefined,
    // enabled: false,
  });

  console.log("query --->", orderDetails);

  useEffect(() => {
    setTitle("Order Details");
  }, []);

  //   if (true)
  //     return (
  //       <>
  //         <Box p={5}>
  //           <Stack>
  //             <Skeleton height="80px" />
  //             <Skeleton height="80px" />
  //             <Skeleton height="80px" />
  //             <Box my={2} borderTop={"1px solid #efefef"} />
  //             <Skeleton height="140px" />
  //           </Stack>
  //         </Box>
  //       </>
  //     );

  if (isLoading)
    return (
      <>
        <Box p={6}>
          <Box>
            <Skeleton mb={4} h={4} w={20} />
            <Skeleton mb={4} h={4} w={32} />
            <Skeleton mb={4} h={4} w={52} />
            <Skeleton mb={4} h={4} w={64} />
          </Box>
          <Divider />
          <Flex gap={4} my={2} p={2}>
            <Skeleton mb={4} h={20} w={20} />
            <Box py={2}>
              <Skeleton mb={4} h={4} w={32} />
              <Skeleton mb={4} h={4} w={32} />
            </Box>
          </Flex>
          <Flex gap={4} my={2} p={2}>
            <Skeleton mb={4} h={20} w={20} />
            <Box py={2}>
              <Skeleton mb={4} h={4} w={32} />
              <Skeleton mb={4} h={4} w={32} />
            </Box>
          </Flex>
          <Flex gap={4} my={2} p={2}>
            <Skeleton mb={4} h={20} w={20} />
            <Box py={2}>
              <Skeleton mb={4} h={4} w={32} />
              <Skeleton mb={4} h={4} w={32} />
            </Box>
          </Flex>
          <Divider />
          <Box>
            <Skeleton mb={4} h={4} w={"100%"} />
            <Skeleton mb={4} h={4} w={"100%"} />
            <Skeleton mb={4} h={4} w={"100%"} />
          </Box>
        </Box>
      </>
    );

  return (
    <>
      <Head>
        <title>Order Details</title>
      </Head>
      <Box>
        <Flex p={5} justifyContent={"space-between"} alignItems={"center"}>
          <Box color={"#958e9a"}>
            <Text fontWeight={"600"} fontSize={{ base: "3.6vw", lg: 28 }}>
              ORDER ID: {orderDetails?.info?.order_id}
            </Text>
            <Text fontSize={12}>
              {" "}
              {orderDetails?.info?.date} at {orderDetails?.info?.time}
            </Text>
          </Box>
          <Box>
            <OrderStatusButton
              order_status={orderDetails?.info?.order_status}
            />
          </Box>
        </Flex>
        <Divider />
        <Box py={2} px={5}>
          <Flex>
            <Box w={"50%"}>
              <Flex gap={1} alignItems={"center"}>
                <Text color={"#958e9a"} fontSize={{ base: 12, lg: 28 }}>
                  Name :
                </Text>
                <Text
                  textTransform={"capitalize"}
                  fontWeight={"600"}
                  fontSize={"11px"}
                  marginTop={"2px"}
                >
                  {" "}
                  {orderDetails?.addressInfo?.name}
                </Text>
              </Flex>
              <Flex gap={1} mt={1} alignItems={"center"}>
                <Text color={"#958e9a"} fontSize={{ base: 12, lg: 28 }}>
                  Phone :
                </Text>
                <Text
                  textTransform={"capitalize"}
                  fontWeight={"600"}
                  fontSize={"11px"}
                  marginTop={"2px"}
                >
                  {" "}
                  {orderDetails?.addressInfo?.phone}
                </Text>
              </Flex>
              <Flex gap={1} mt={1} alignItems={"center"}>
                <Text color={"#958e9a"} fontSize={{ base: 12, lg: 28 }}>
                  Landmark :
                </Text>
                <Text
                  textTransform={"capitalize"}
                  fontWeight={"600"}
                  fontSize={"11px"}
                  marginTop={"2px"}
                >
                  {" "}
                  {orderDetails?.addressInfo?.landmark}
                </Text>
              </Flex>
            </Box>
            <Box w={"50%"}>
              <Flex gap={1} alignItems={"center"}>
                <Text color={"#958e9a"} fontSize={{ base: 12, lg: 28 }}>
                  Slot Timing :
                </Text>
                <Text
                  textTransform={"capitalize"}
                  fontWeight={"600"}
                  fontSize={"11px"}
                  marginTop={"2px"}
                >
                  {" "}
                  <Text>
                    {orderDetails?.slotInfo?.slot_time_start}
                    {orderDetails?.slotInfo?.start_time_postfix} -{" "}
                    {orderDetails?.slotInfo?.slot_time_end}
                    {orderDetails?.slotInfo?.end_time_postfix}
                  </Text>
                </Text>
              </Flex>
              <Flex gap={1} mt={1} alignItems={"center"}>
                <Text color={"#958e9a"} fontSize={{ base: 12, lg: 28 }}>
                  Slot Name :
                </Text>
                <Text
                  textTransform={"capitalize"}
                  fontWeight={"600"}
                  fontSize={"11px"}
                  marginTop={"2px"}
                >
                  {" "}
                  {orderDetails?.slotInfo?.slot_name}
                </Text>
              </Flex>
            </Box>
          </Flex>
          <Flex gap={1} mt={1}>
            <Text color={"#958e9a"} fontSize={{ base: 12, lg: 28 }}>
              Address
            </Text>
            <Text
              textTransform={"capitalize"}
              fontWeight={"600"}
              fontSize={"11px"}
              marginTop={"2px"}
            >
              {" "}
              {orderDetails?.addressInfo?.base_address},{" "}
              {orderDetails?.addressInfo?.destination_addresses}
            </Text>
          </Flex>
        </Box>

        <Divider />
        <Box>
          {orderDetails?.orderItems?.map((order, i) => {
            return (
              <Flex
                px={5}
                py={1}
                gap={2}
                alignItems={"center"}
                borderBottom={"1px solid #efefef"}
                justifyContent={"space-between"}
              >
                <Flex alignItems={"center"} gap={3} w={"100%"}>
                  <Box
                    className="ProductImage"
                    height={"5rem"}
                    width={"5rem"}
                    position={"relative"}
                    w={"25%"}
                  >
                    <Image
                      src={order.product_img}
                      alt={order.product_img}
                      fill={true}
                      style={{
                        objectFit: "contain",
                      }}
                    />
                  </Box>
                  <Box w={"75%"}>
                    <Text fontWeight={"600"} fontSize={14} noOfLines={2}>
                      {order.product_full_name}
                    </Text>
                    <HStack fontSize={12} color={"#958e9a"} gap={4}>
                      {/* <Text>500 ml</Text> */}
                      <Text>Qty: {order.quantity}</Text>
                    </HStack>
                  </Box>
                </Flex>

                <Box>
                  <Text fontWeight={"600"} fontSize={16}>
                    ₹{order.sale_price}
                  </Text>
                  {Number(order.price) - Number(order.sale_price) ? (
                    <Text
                      textDecoration={"line-through"}
                      fontSize={{ base: 10, lg: 12 }}
                      lineHeight={"4px"}
                    >
                      ₹{order.price}
                    </Text>
                  ) : null}
                </Box>
              </Flex>
            );
          })}
        </Box>
        <Box
          px={5}
          py={6}
          borderTop={"2px solid #efefef"}
          borderRadius={{ base: 0, sm: 8 }}
          bg={"#fff"}
        >
          <Flex alignItems={"center"} justifyContent={"space-between"}>
            <Text fontWeight={"600"} fontSize={14}>
              Sub Total
            </Text>
            <Flex gap={2}>
              {/* <Text
                color={"InactiveCaptionText"}
                textDecoration={"line-through"}
              >
                ₹355{" "}
              </Text> */}
              <Text color={"ActiveBorder"} fontWeight={"600"}>
                ₹{orderDetails?.info?.sub_total}
              </Text>
            </Flex>
          </Flex>
          <Flex alignItems={"center"} justifyContent={"space-between"}>
            <Text
              // fontWeight={"600"}
              fontSize={12}
              color={"InactiveCaptionText"}
            >
              Your savings
            </Text>
            <Flex gap={2}>
              <Text color={"green.400"} fontWeight={"600"}>
                ₹{" "}
                {Number(orderDetails?.info?.sub_total) -
                  Number(orderDetails?.info?.grand_total)}
              </Text>
            </Flex>
          </Flex>

          <Flex alignItems={"center"} justifyContent={"space-between"}>
            <Text
              // fontWeight={"600"}
              fontSize={12}
              color={"InactiveCaptionText"}
            >
              Delivery Changers
            </Text>
            <Flex gap={2}>
              <Text color={"green.400"} fontWeight={"600"}>
                ₹ {orderDetails?.info?.delivery_charge}
              </Text>
            </Flex>
          </Flex>
          <Flex alignItems={"center"} mt={2} justifyContent={"space-between"}>
            <Text
              fontWeight={"600"}
              fontSize={14}
              // color={"InactiveCaptionText"}
            >
              To Pay
            </Text>
            <Flex gap={2}>
              <Text color={"black"} fontSize={16} fontWeight={"600"}>
                ₹{orderDetails?.info?.total_payment}
              </Text>
            </Flex>
          </Flex>
        </Box>
      </Box>
    </>
  );
}
