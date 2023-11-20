import { SliderProductWrapper } from "@/components";
import ProductCard from "@/components/Cards/ProductCard";
import { CategorySkeleton, ProductCardSkeleton } from "@/components/Skeleton";
import CategoryTitle from "@/components/Title/CategoryTitle";
import { LayoutContainer } from "@/layout";
import { Box, Flex, Text } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { SwiperSlide } from "swiper/react";

export default function HomeDeal({ title, isLoading, data }) {
  const Ref = useRef(null);

  // The state for our timer
  const [timer, setTimer] = useState("00:00:00");

  const getTimeRemaining = (e) => {
    const total = Date.parse(e) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / 1000 / 60 / 60) % 24);
    return {
      total,
      hours,
      minutes,
      seconds,
    };
  };

  const startTimer = (e) => {
    let { total, hours, minutes, seconds } = getTimeRemaining(e);
    if (total >= 0) {
      // update the timer
      // check if less than 10 then we need to
      // add '0' at the beginning of the variable
      setTimer(
        (hours > 9 ? hours : "0" + hours) +
          ":" +
          (minutes > 9 ? minutes : "0" + minutes) +
          ":" +
          (seconds > 9 ? seconds : "0" + seconds)
      );
    }
  };

  const clearTimer = (e) => {
    // If you adjust it you should also need to
    // adjust the Endtime formula we are about
    // to code next
    setTimer("00:10:50");

    // If you try to remove this line the
    // updating of timer Variable will be
    // after 1000ms or 1sec
    if (Ref.current) clearInterval(Ref.current);
    const id = setInterval(() => {
      startTimer(e);
    }, 1000);
    Ref.current = id;
  };

  const getDeadTime = () => {
    let deadline = new Date();

    // This is where you need to adjust if
    // you entend to add more time
    deadline.setSeconds(deadline.getSeconds() + 1000);
    return deadline;
  };

  // We can use useEffect so that when the component
  // mount the timer will start as soon as possible

  // We put empty array to act as componentDid
  // mount only
  useEffect(() => {
    clearTimer(getDeadTime());
  }, []);

  // Another way to call the clearTimer() to start
  // the countdown is via action event from the
  // button first we create function to be called
  // by the button
  const onClickReset = () => {
    clearTimer(getDeadTime());
  };

  return (
    <>
      <Box my={8}>
        <Flex alignItems={"center"} mb={4} justifyContent={"center"}>
          {/* <CategoryTitle title={title} /> */}
          <Flex
            direction={"column"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Flex alignItems={"center"} justifyContent={"center"}>
              <Box fontSize={50} mr={4}>
                ✨
              </Box>
              <Text fontWeight={"700"} fontSize={32}>
                {title}
              </Text>
              <Box fontSize={44} ml={2}>
                🧨
              </Box>
            </Flex>
            <Flex fontSize={50} fontWeight={"700"} color={"darkred"}>
              <Text>{timer}</Text>
              {/* <Text>12</Text> */}
              {/* <Text>:</Text>
            <Text>58</Text> */}
            </Flex>
          </Flex>
        </Flex>
        <LayoutContainer mt={2}>
          <SliderProductWrapper initialLength={5.4}>
            {isLoading ? (
              <>
                <SwiperSlide>
                  <ProductCardSkeleton n={1} />
                </SwiperSlide>
                <SwiperSlide>
                  <ProductCardSkeleton n={1} />
                </SwiperSlide>
                <SwiperSlide>
                  <ProductCardSkeleton n={1} />
                </SwiperSlide>
                <SwiperSlide>
                  <ProductCardSkeleton n={1} />
                </SwiperSlide>
              </>
            ) : (
              data?.map((product, i) => {
                return (
                  <SwiperSlide key={i}>
                    <ProductCard
                      pId={product.id}
                      pName={product.product_name}
                      pImage={product.product_image}
                      pPrice={product.price}
                      item={product}
                    />
                  </SwiperSlide>
                );
              })
            )}
          </SliderProductWrapper>
        </LayoutContainer>
      </Box>
    </>
  );
}
