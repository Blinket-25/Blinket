import useContextFunctions from "@/hooks/useContextFunctions";
import { SectionCart } from "@/sections";

Cart.title = "Cart";
export default function Cart() {
  const { setTitle } = useContextFunctions();

  setTitle("Cart");

  return (
    <>
      <SectionCart />
    </>
  );
}
