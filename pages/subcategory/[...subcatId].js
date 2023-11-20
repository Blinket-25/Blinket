import { getSubcategorysById } from "@/endpoint";
import { useContextDataUser } from "@/hooks/useContextData";
import useContextFunctions from "@/hooks/useContextFunctions";
import { SectionSubCategory } from "@/sections";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function SubCategoryByID() {
  const { query } = useRouter();
  const { setTitle } = useContextFunctions();
  const { STORE_CODE } = useContextDataUser();

  const SUB_CATEGORY_ID = query.subcatId && query?.subcatId[3];
  const SUB_CATEGORY_NAME = query.subcatId && query?.subcatId[2];
  const PARENT_ID = query.subcatId && query?.subcatId[1];
  const PARENT_NAME = query.subcatId && query?.subcatId[0];

  useEffect(() => {
    SubCategoryByID.title = SUB_CATEGORY_NAME;
    setTitle(SUB_CATEGORY_NAME);
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
      {/* <SectionCategory subCategorys={subCategorys} parentId={SUB_CATEGORY_ID} /> */}
      <SectionSubCategory
        subCategoryId={SUB_CATEGORY_ID}
        parentId={PARENT_ID}
        subCategorys={subCategorys}
        parentName={PARENT_NAME}
        key={SUB_CATEGORY_ID}
        subCatIsLoading={isLoading}
      />
    </>
  );
}
