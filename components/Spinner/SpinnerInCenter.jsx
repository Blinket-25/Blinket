import { Flex, Spinner } from "@chakra-ui/react";

export default function SpinnerInCenter() {
  return (
    <>
      <Flex
        h={"50%"}
        w={"100%"}
        justifyContent={"center"}
        className="items-center justify-center"
      >
        <Spinner />
      </Flex>
    </>
  );
}
