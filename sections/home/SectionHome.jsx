import DealsOfTheDay from "./DealsOfTheDay";
import HomeCategory from "./Category";
import HomeMainSlider, {
  HomeSecondorySlider,
  ProductWithSpecialCategorys,
} from "./Slider";
import { Box } from "@chakra-ui/react";
import { useContextDataUser } from "@/hooks/useContextData";
import { getExtrasForHome } from "@/endpoint";
import { useQuery } from "@tanstack/react-query";
import HomeDeal from "./Deal/Deal";

export default function HomeIndex() {
  const user = useContextDataUser();

  const {
    data: data,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["homeExtras", user.STORE_CODE],
    queryFn: (e) => getExtrasForHome({ STORE_CODE: e.queryKey[1] }),
  });

  return (
    <>
      <Box pt={{ base: 0, lg: 10 }}>
        <HomeMainSlider />
        <HomeDeal
          data={data?.dealOfTheDay}
          isLoading={isLoading}
          title={"Deal Of The Day"}
        />
        <HomeCategory />
        <ProductWithSpecialCategorys
          data={data?.dealOfTheDay}
          isLoading={isLoading}
          title={"Deal Of The Day"}
        />
        {/* <DealsOfTheDay /> */}
        <HomeSecondorySlider />
        <ProductWithSpecialCategorys
          data={data?.recomendedForYou}
          isLoading={isLoading}
          title={"Recomended For You"}
        />
      </Box>
    </>
  );
}
