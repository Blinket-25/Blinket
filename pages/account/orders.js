import useContextFunctions from "@/hooks/useContextFunctions";
import SectionOrdersHistory from "@/sections/account/SectionOrderHistory";
import { useEffect } from "react";

OrdersPage.title = "Orders";
export default function OrdersPage() {
  const { setTitle } = useContextFunctions();

  useEffect(() => {
    setTitle("Orders");
  }, []);

  return <SectionOrdersHistory />;
}
