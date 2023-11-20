import React from "react";
import {
  Box,
  Button,
  Flex,
  Image,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import SaveLocation from "@/components/CurrentLocation/SaveLocation/SaveLocation";
import CartProducts from "./CartProducts";
import CartMetaData from "./CartMetaData";
import CartHeader from "./CartHeader";
import { useContextDataCart } from "@/hooks/useContextData";
import { useRouter } from "next/router";
import { getSession, useSession } from "next-auth/react";
import { load } from "@cashfreepayments/cashfree-js";

export default function CartLayout({}) {
  const {
    isOpen: isOpenSaveL,
    onOpen: onOpenSaveL,
    onClose: onCloseSaveL,
  } = useDisclosure();

  const { cartItems } = useContextDataCart();
  const { push } = useRouter();
  const { data, status, update } = useSession();

  const makePayment = async () => {
    const cashfree = await load({
      mode: "sandbox", //or production
    });
    let checkoutOptions = {
      paymentSessionId:
        "session_B6sThMtStPjiZQ5iaMFg_Q5_xm0On1X-Uu4cICXu6SoFxL7disNGwM9fwYj6ZT7x21BriUsBPozDmda3UnabTP0GgLQ8B6wFjirS02kN30gW",
      returnUrl:
        "https://test.cashfree.com/pgappsdemos/v3success.php?myorder={navneet_25}",
    };
    cashfree.checkout(checkoutOptions).then(function (result) {
      if (result.error) {
        alert(result.error.message);
      }
      if (result.redirect) {
        console.log("Redirection");
      }
    });
  };

  console.log("hey navneet this is session data ----->", data, status);

  if (!cartItems.length)
    return (
      <>
        <Box py={6} bg={"#fff"} textAlign={"center"}>
          <Image
            height={{ base: "100%", sm: "22rem" }}
            display={"block"}
            margin={"auto"}
            src="/emptyCart.png"
          />
          <Box pt={10}>
            <Text fontSize={20} fontWeight={"700"}>
              Your cart is empty
            </Text>
            <Text fontSize={12} px={10} mt={2}>
              Looks like you haven't added any products yet.
            </Text>
          </Box>
          <Button variant={"outline"} mt={8} onClick={() => push("/")}>
            Browse
          </Button>
          <Button variant={"outline"} mt={8} onClick={() => makePayment()}>
            Pay
          </Button>
        </Box>
      </>
    );

  return (
    <>
      <Flex maxW={"64rem"} w={"100%"} margin={"auto"} pb={32}>
        <Box px={{ base: 0, sm: 4 }} w={"100%"}>
          <CartHeader />
          <Box display={{ base: "block", lg: "flex" }}>
            <CartProducts />
            <CartMetaData onOpenSaveL={onOpenSaveL} />
          </Box>
        </Box>
      </Flex>
      <SaveLocation isOpen={isOpenSaveL} onClose={onCloseSaveL} />
    </>
  );
}
