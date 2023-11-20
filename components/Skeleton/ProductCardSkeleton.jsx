import {
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Stack,
} from "@chakra-ui/react";

export default function ProductCardSkeleton({ n = 16 }) {
  return (
    <>
      {Array(n)
        .fill({})
        .map((items, i) => (
          <Stack p={4} bg="#fff" borderRadius={8} key={`productSkeleton${i}`}>
            <Skeleton height={{ base: "80px", md: "140px" }} />
            <Skeleton height={{ base: "10px", md: "20px" }} />
            <Skeleton height={{ base: "20px", md: "40px" }} />
          </Stack>
        ))}
    </>
  );
}
