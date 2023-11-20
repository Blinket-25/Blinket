import useContextFunctions from "@/hooks/useContextFunctions";
import { SectionSearch } from "@/sections";

export default function Search() {
  const { setTitle } = useContextFunctions();

  Search.title = "Search";
  setTitle("Search");

  return (
    <>
      <SectionSearch />
    </>
  );
}
