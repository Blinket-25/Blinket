import useContextFunctions from "@/hooks/useContextFunctions";
import SectionAccountIndex from "@/sections/account/SectionAccountIndex";
import { useEffect } from "react";

export default function AccountPage() {
  const { setTitle } = useContextFunctions();

  useEffect(() => {
    AccountPage.title = "Account";
    setTitle("Account");
  }, []);

  return <SectionAccountIndex />;
}
