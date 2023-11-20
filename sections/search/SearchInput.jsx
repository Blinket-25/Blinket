import React, { useEffect, useState } from "react";
import { Flex, Input } from "@chakra-ui/react";

export default function SearchInput({ setDebouncedValue }) {
  const [userPrompt, setPrompt] = useState("");

  // EFFECT: Debounce Input Value
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(userPrompt);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [userPrompt]);

  return (
    <>
      <Flex
        bg={"#fff"}
        p={2}
        position={"sticky"}
        top={10}
        zIndex={999}
        alignItems={"center"}
        w={"100%"}
        justifyContent={"center"}
        gap={4}
      >
        <Input
          type="text"
          placeholder="Search Product"
          bg="#efefef"
          h={10}
          fontSize={12}
          w={"92%"}
          onChange={(e) => setPrompt(e.target.value)}
        />
      </Flex>
    </>
  );
}
