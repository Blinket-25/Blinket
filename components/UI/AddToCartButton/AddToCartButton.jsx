import React, { useEffect } from "react";
import {
  Box,
  Button,
  Flex,
  HStack,
  Input,
  useNumberInput,
} from "@chakra-ui/react";
import { HiMinus, HiPlus } from "react-icons/hi";
import { MdDelete } from "react-icons/md";
import useContextData from "@/hooks/useContextData";
import useContextFunctions from "@/hooks/useContextFunctions";

export default function AddToCartButton({
  // added = false,
  pId: productId,
  item,
  max,
  min = 1,
  variant = "cardOutline",
  setValue = () => {},
  padding,
  baseHeight = 8,
}) {
  const pId = productId ? productId : item.id;
  const { cart } = useContextData();
  const { addToCart, removeItemFromCart } = useContextFunctions();
  const itemAdded = cart.cartItems.find((o) => o.id == pId);
  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
    useNumberInput({
      step: 1,
      defaultValue: itemAdded ? itemAdded.itemQuantity : 1,
      min: min,
      max: Number(item.stock_quantity),
      // precision: 0,
    });

  const inc = getIncrementButtonProps();
  const dec = getDecrementButtonProps();
  const input = getInputProps();

  const newItemObject = {
    image: item.product_image,
    price: item.price,
    sale_price: item.sale_price,
    name: item.product_name,
    weightInGrms: item.product_size,
    stock_quantity: Number(item.stock_quantity),
  };

  useEffect(() => {
    itemAdded &&
      Number(itemAdded.itemQuantity) !== Number(input.value) &&
      addToCart({ id: pId, itemQuantity: input.value });
    setValue(input.value);
  }, [input.value]);

  if (!itemAdded)
    return (
      <Button
        variant={variant}
        onClick={() => addToCart({ ...newItemObject, id: pId })}
        borderColor={"secondaryColor.800"}
        // color={"secondaryColor.900"}
        px={padding && padding}
        h={baseHeight}
      >
        Add
      </Button>
    );

  return (
    <HStack
      key={pId}
      borderRadius={8}
      color={"#fff"}
      backgroundColor={"secondaryColor.900"}
      height={8}
      width={"fit-content"}
      gap={0}
    >
      {dec.disabled ? (
        <Button
          height={8}
          background={"inherit !important"}
          minWidth={"unset"}
          borderRadius={0}
          color={"#fff"}
          borderTopLeftRadius={8}
          borderBottomLeftRadius={8}
          onClick={() =>
            removeItemFromCart({
              id: pId,
              sale_price: item.sale_price,
              price: item.price,
            })
          }
          padding={1}
        >
          <MdDelete />
        </Button>
      ) : (
        <Button
          {...dec}
          height={8}
          background={"inherit !important"}
          minWidth={"unset"}
          borderRadius={0}
          borderTopLeftRadius={8}
          color={"#fff"}
          borderBottomLeftRadius={8}
          padding={1}
        >
          <HiMinus />
        </Button>
      )}
      <Input
        {...input}
        borderRadius={0}
        height={8}
        marginStart={"0 !important"}
        border="none"
        fontSize={12}
        fontWeight="700"
        textAlign="center"
        outline={"none"}
        width={"2.4rem"}
        p={0}
        _hover={{ outline: "unset" }}
        _focusVisible={{ border: "unset" }}
        readOnly
      />
      <Button
        {...inc}
        height={8}
        background={"inherit !important"}
        borderRadius={0}
        borderTopRightRadius={8}
        borderBottomRightRadius={8}
        minWidth={"unset"}
        color={"#fff"}
        padding={1}
        margin={"0 !important"}
        // isDisabled={true}
        // onClick={() => console.log("taklif")}
      >
        <HiPlus />
      </Button>
    </HStack>
  );
}
