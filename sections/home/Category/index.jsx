import { Category } from "@/components";
import CategoryTitle from "@/components/Title/CategoryTitle";
// import CategoryTitle from "@/components/Title/CategoryTitle";
// import LayoutContainer from "@/layout";
import { Box } from "@chakra-ui/react";

export default function HomeCategory({}) {
  return (
    <>
      <Box mt={8}>
        <CategoryTitle title={"Explore By Categories"} />
        <Category />
      </Box>
    </>
  );
}
