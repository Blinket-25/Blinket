import { Skeleton, Stack } from "@chakra-ui/react";

export default function OrdersHistorySkeleton({ n = 5, height = 80 }) {
  return (
    <>
      {Array(n)
        .fill({})
        .map((items, i) => (
          <Stack mb={5}>
            <Skeleton height={height} />
          </Stack>
        ))}
    </>
  );
}
