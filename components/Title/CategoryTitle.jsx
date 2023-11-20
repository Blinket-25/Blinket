import { Text } from "@chakra-ui/react";

export default function CategoryTitle({ title }) {
  return (
    <>
      <Text
        fontSize={{ base: 18, lg: 24 }}
        mx={{ base: 3, lg: 0 }}
        fontWeight={"700"}
      >
        {title}
      </Text>
    </>
  );
}
