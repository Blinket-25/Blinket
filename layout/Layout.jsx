import { Box, Container } from "@chakra-ui/react";

import { useRouter } from "next/router";
// import Header from "./Header";
import { Footer } from "./Footer";
import Header from "./Header/Header";

export default function LayoutContainer({ children, mt = 6 }) {
  return (
    <Box p={{ base: 3, lg: 0 }} mt={mt}>
      {children}
    </Box>
  );
}

export function Layout({ children }) {
  const { pathname } = useRouter();
  return (
    <>
      <Header />
      <Box
        bg={pathname === "/cart" ? "#efefef" : "#fff"}
        pt={{
          base: pathname === "/" ? 36 : pathname === "/setLocation" ? 0 : 12,
          lg: 20,
        }}
        pb={{
          base: pathname === "/cart" ? 0 : 16,
          lg: 20,
        }}
      >
        <Box
          width={{ base: "100%", lg: "85%" }}
          position={"relative"}
          margin={"auto"}
        >
          {children}
        </Box>
      </Box>
      <Footer />
    </>
  );
}
