import { Box, HStack, Text, VStack } from "@chakra-ui/react";
import { useContextDataUser } from "@/hooks/useContextData";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { fetchOrders } from "@/endpoint";
import OrdersHistorySkeleton from "@/components/Skeleton/OrdersHistorySkeleton";

export default function SectionOrdersHistory() {
  const { phone } = useContextDataUser();

  const {
    data: orders,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["orders", phone],
    queryFn: (e) => fetchOrders({ phone: e.queryKey[1] }),
  });

  console.log("hey orders ----->", orders);

  if (isLoading)
    return (
      <>
        <Box py={1}>
          <OrdersHistorySkeleton height={28} />
        </Box>
      </>
    );

  return (
    <VStack bg="#efefef">
      {orders.map((order, i) => {
        return (
          <Box w="100%">
            <Link
              href={{
                pathname: `/order/${order.order_id}`,
              }}
            >
              <Box
                bg="#fff"
                py={4}
                px={4}
                boxShadow={"0 2px 10px 0 #efefef"}
                cursor={"pointer"}
              >
                <VStack gap={4}>
                  <HStack gap={10} justifyContent={"space-between"} w={"100%"}>
                    <Text
                      fontSize={16}
                      fontWeight={"600"}
                      color={"blackAlpha.900"}
                      noOfLines={2}
                    >
                      {order.orderItems.slice(0, 4).map((items, i) => {
                        return <>{items.product_full_name} </>;
                      })}
                    </Text>
                    <Box>
                      <Text fontWeight={"700"} fontSize={14}>
                        ₹{order.total_payment}
                      </Text>
                    </Box>
                  </HStack>
                  <HStack gap={0} justifyContent={"space-between"} w={"100%"}>
                    <Box
                      //   mt={4}
                      fontWeight={"700"}
                      fontSize={12}
                      color={"blackAlpha.600"}
                    >
                      <Text>Order #{order.order_id}</Text>
                      <Text>
                        {order.date} at {order.time}
                      </Text>
                    </Box>
                    <OrderStatusButton order_status={order.order_status} />
                  </HStack>
                </VStack>
              </Box>
            </Link>
          </Box>
        );
      })}

      {/* <Box
        bg="#fff"
        py={4}
        px={4}
        boxShadow={"0 2px 10px 0 #efefef"}
        cursor={"pointer"}
      >
        <VStack gap={4}>
          <HStack gap={10} justifyContent={"space-between"}>
            <Text
              fontSize={16}
              fontWeight={"600"}
              color={"blackAlpha.900"}
              noOfLines={2}
            >
              Colin Glass and Surface Cleaner Liquid Spray Regular, Bertolli
              Extra Light Olive Oil (Bottle)
            </Text>
            <Box>
              <Text fontWeight={"700"} fontSize={14}>
                ₹1554
              </Text>
            </Box>
          </HStack>
          <HStack gap={10} justifyContent={"space-between"} w={"100%"}>
            <Box
              //   mt={4}
              fontWeight={"700"}
              fontSize={12}
              color={"blackAlpha.600"}
            >
              <Text>Order #1234684464684</Text>
              <Text>13/05/2023 at 09:54pm</Text>
            </Box>
            <Box
              px={2}
              py={1}
              bg={"#2c91ea45"}
              color={"#00007b"}
              borderRadius={5}
              fontWeight={"600"}
              fontSize={12}
            >
              Out For Delivery
            </Box>
          </HStack>
        </VStack>
      </Box>
      <Box
        bg="#fff"
        py={4}
        px={4}
        boxShadow={"0 2px 10px 0 #efefef"}
        cursor={"pointer"}
      >
        <VStack gap={4}>
          <HStack gap={10} justifyContent={"space-between"}>
            <Text
              fontSize={16}
              fontWeight={"600"}
              color={"blackAlpha.900"}
              noOfLines={2}
            >
              Colin Glass and Surface Cleaner Liquid Spray Regular, Bertolli
              Extra Light Olive Oil (Bottle)
            </Text>
            <Box>
              <Text fontWeight={"700"} fontSize={14}>
                ₹1554
              </Text>
            </Box>
          </HStack>
          <HStack gap={10} justifyContent={"space-between"} w={"100%"}>
            <Box
              //   mt={4}
              fontWeight={"700"}
              fontSize={12}
              color={"blackAlpha.600"}
            >
              <Text>Order #1234684464684</Text>
              <Text>13/05/2023 at 09:54pm</Text>
            </Box>
            <Box
              px={2}
              py={1}
              bg={"#e2d24a61"}
              color={"#806100"}
              borderRadius={5}
              fontWeight={"600"}
              fontSize={12}
            >
              Dispatching
            </Box>
          </HStack>
        </VStack>
      </Box>
      <Box
        bg="#fff"
        py={4}
        px={4}
        boxShadow={"0 2px 10px 0 #efefef"}
        cursor={"pointer"}
      >
        <VStack gap={4}>
          <HStack gap={10} justifyContent={"space-between"}>
            <Text
              fontSize={16}
              fontWeight={"600"}
              color={"blackAlpha.900"}
              noOfLines={2}
            >
              Colin Glass and Surface Cleaner Liquid Spray Regular, Bertolli
              Extra Light Olive Oil (Bottle)
            </Text>
            <Box>
              <Text fontWeight={"700"} fontSize={14}>
                ₹1554
              </Text>
            </Box>
          </HStack>
          <HStack gap={10} justifyContent={"space-between"} w={"100%"}>
            <Box
              //   mt={4}
              fontWeight={"700"}
              fontSize={12}
              color={"blackAlpha.600"}
            >
              <Text>Order #1234684464684</Text>
              <Text>13/05/2023 at 09:54pm</Text>
            </Box>
            <Box
              px={2}
              py={1}
              bg={"#4ae26761"}
              color={"green"}
              borderRadius={5}
              fontWeight={"600"}
              fontSize={12}
            >
              Delivered
            </Box>
          </HStack>
        </VStack>
      </Box> */}
    </VStack>
  );
}

export const OrderStatusButton = ({ order_status }) => {
  const BG =
    (order_status === "Canceled") | (order_status === "Replaced")
      ? "#ea2c2c45"
      : order_status === "Delivered"
      ? "#4ae26761"
      : "#e2d24a61";

  const COLOR =
    (order_status === "Canceled") | (order_status === "Replaced")
      ? "#7b0000"
      : order_status === "Delivered"
      ? "green"
      : "#806100";

  return (
    <Box
      px={2}
      py={1}
      bg={BG}
      color={COLOR}
      borderRadius={5}
      fontWeight={"600"}
      fontSize={12}
    >
      {order_status}
    </Box>
  );
};
