import { ManualLocation } from "@/components/CurrentLocation/ManualLocation";
import useContextFunctions from "@/hooks/useContextFunctions";

export default function SetLocation() {
  const { setTitle } = useContextFunctions();

  SetLocation.title = "Your Location";
  setTitle("Your Location");

  return (
    <>
      <ManualLocation />
    </>
  );
}
