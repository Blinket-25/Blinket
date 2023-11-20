import React, { useState } from "react";
import { Box } from "@chakra-ui/react";
import SearchInput from "./SearchInput";
import SearchProduct from "./SearchProduct";
import SearchCategory from "./SearchCategory";

export default function SectionSearch() {
  const [debouncedValue, setDebouncedValue] = useState("");

  return (
    <>
      <Box position={"relative"} mt={6}>
        <SearchInput setDebouncedValue={setDebouncedValue} />
        <SearchCategory debouncedValue={debouncedValue} />
        <SearchProduct debouncedValue={debouncedValue} />
      </Box>
    </>
  );
}
