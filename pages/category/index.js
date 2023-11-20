// import Category from "@/components/";

import { Category } from "@/components";
import useContextFunctions from "@/hooks/useContextFunctions";

export default function CategoryPage() {
  const { setTitle } = useContextFunctions();

  setTitle("Categorys");

  return (
    <>
      <Category mt={0} />
    </>
  );
}

CategoryPage.title = "Categorys";
