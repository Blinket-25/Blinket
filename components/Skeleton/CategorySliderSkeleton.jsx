import {
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Stack,
} from "@chakra-ui/react";

export default function CategorySlider() {
  return (
    <>
      {Array(4)
        .fill({})
        .map((items, i) => (
          <Stack
            p={3}
            bg="#fff"
            borderRadius={8}
            key={`CategorySliderSkeleton${i}`}
          >
            <Skeleton height={{ base: "36px" }} borderRadius={180} />
            <Skeleton height={{ base: "2px" }} />
          </Stack>
        ))}
    </>
  );
}
