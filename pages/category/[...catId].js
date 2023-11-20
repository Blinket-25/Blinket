import { getSubcategorysById } from "@/endpoint";
import { useContextDataUser } from "@/hooks/useContextData";
import useContextFunctions from "@/hooks/useContextFunctions";
import SectionCategory from "@/sections/category/SectionCategory";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function CategoryByID() {
  const { query } = useRouter();
  const { setTitle } = useContextFunctions();
  const { STORE_CODE } = useContextDataUser();

  const PARENT_ID = query.catId && query?.catId[1];
  const PARENT_NAME = query.catId && query?.catId[0];

  useEffect(() => {
    CategoryByID.title = PARENT_NAME;
    setTitle(PARENT_NAME);
  }, []);

  const {
    data: subCategorys,
    isError,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["subCategorys", PARENT_ID],
    queryFn: () => getSubcategorysById({ parentId: PARENT_ID, STORE_CODE }),
    enabled: PARENT_ID !== undefined,
  });

  return (
    <>
      <SectionCategory
        subCategorys={subCategorys}
        parentId={PARENT_ID}
        parentName={PARENT_NAME}
        subCatIsLoading={isLoading}
      />
    </>
  );
}
