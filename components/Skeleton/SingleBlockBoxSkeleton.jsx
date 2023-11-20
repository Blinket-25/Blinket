import { Skeleton } from "@chakra-ui/react";

export default function SingleBlockBoxSkeleton({ n = 16, height = 80 }) {
  return (
    <>
      {Array(n)
        .fill({})
        .map((items, i) => (
          //   <Stack p={4} bg="#fff" borderRadius={8} key={`productSkeleton${i}`}>
          <Skeleton
            key={"singleBlockBoxSkeleton-" + i}
            height={{ base: height, md: height + 40 }}
          />
          //   </Stack>
        ))}
    </>
  );
}
