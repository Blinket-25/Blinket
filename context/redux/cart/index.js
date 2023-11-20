import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  addedItemsId: [],
  subTotal: 0,
  grandTotal: 0,
  userSelectedAddress: null,
  userSelectedSlot: null,
  isDeliveryNotAvilable: null,
  isDeliveryNotAvilableReason: null,
  deliveryCharge: null,
  miniumAmountForFreeDelivery: null,
  isCouponApplied: false,
  couponCode: null,
  couponID: null,
  couponDiscountedPrice: null,
  couponAppliedForPrice: null,
};

const CartSlice = createSlice({
  name: "Cart",
  initialState: initialState,
  reducers: {
    addToCart: (state, action) => {
      const itemInCart = state.cartItems.find(
        (o) => Number(o.id) === Number(action.payload.id)
      );
      if (!itemInCart) {
        state.cartItems.push({ ...action.payload, itemQuantity: 1 });
        state.grandTotal += Number(action.payload.sale_price);
        state.subTotal += Number(action.payload.price);
      } else {
        if (
          Number(itemInCart.itemQuantity) > Number(action.payload.itemQuantity)
        ) {
          state.grandTotal -= Number(itemInCart.sale_price);
          state.subTotal -= Number(itemInCart.price);
        } else {
          state.grandTotal += Number(itemInCart.sale_price);
          state.subTotal += Number(itemInCart.price);
        }
        itemInCart.itemQuantity = Number(action.payload.itemQuantity);
      }
    },
    removeItemFromCart: (state, action) => {
      const removeItem = state.cartItems.filter(
        (item) => Number(item.id) !== Number(action.payload.id)
      );
      state.subTotal -= Number(action.payload.price);
      state.grandTotal -= Number(action.payload.sale_price);
      state.cartItems = removeItem;
    },
    setUserSelectedAddress: (state, action) => {
      state.userSelectedAddress = action.payload;
    },
    setUserSelectedSlot: (state, action) => {
      state.userSelectedSlot = action.payload;
    },
    setIsDeliveryNotAvilable: (state, action) => {
      state.isDeliveryNotAvilable = action.payload.avilable;
      state.isDeliveryNotAvilableReason = action.payload.reason;
    },
    setCouponDetails: (state, action) => {
      state.isCouponApplied = action.payload.applied;
      state.couponCode = action.payload.couponCode;
      state.couponID = action.payload.couponID;
      state.couponDiscountedPrice = action.payload.couponDiscountedPrice;
      state.couponAppliedForPrice = action.payload.couponAppliedForPrice;
    },
    setDeliveryCharge: (state, action) => {
      state.deliveryCharge = action.payload;
    },
    setMiniumAmountForFreeDelivery: (state, action) => {
      state.miniumAmountForFreeDelivery = action.payload;
    },
    cartReset: () => initialState,
  },
});

export const {
  addToCart,
  removeItemFromCart,
  setUserSelectedAddress,
  setUserSelectedSlot,
  setIsDeliveryNotAvilable,
  setDeliveryCharge,
  setMiniumAmountForFreeDelivery,
  setCouponDetails,
  cartReset,
} = CartSlice.actions;

export default CartSlice.reducer;
