// import { createSlice } from "@reduxjs/toolkit";

// const MetaSlice = createSlice({
//   name: "Cart",
//   initialState: {
//     cartItems: [],
//     addedItemsId: [],
//     subTotal: 0,
//     grandTotal: 0,
//     userSelectedAddress: null,
//   },
//   reducers: {
//     addToCart: (state, action) => {
//       const itemInCart = state.cartItems.find(
//         (o) => Number(o.id) === Number(action.payload.id)
//       );
//       if (!itemInCart) {
//         state.cartItems.push({ ...action.payload, itemQuantity: 1 });
//         state.grandTotal += Number(action.payload.price);
//       } else {
//         Number(itemInCart.itemQuantity) > Number(action.payload.itemQuantity)
//           ? (state.grandTotal -= Number(itemInCart.price))
//           : (state.grandTotal += Number(itemInCart.price));
//         itemInCart.itemQuantity = Number(action.payload.itemQuantity);
//       }
//     },
//     removeItemFromCart: (state, action) => {
//       const removeItem = state.cartItems.filter(
//         (item) => Number(item.id) !== Number(action.payload.id)
//       );
//       state.grandTotal -= Number(action.payload.price);
//       state.cartItems = removeItem;
//     },
//     setUserSelectedAddress: (state, action) => {
//       state.userSelectedAddress = action.payload;
//     },
//   },
// });

// export const { addToCart, removeItemFromCart, setUserSelectedAddress } =
//   MetaSlice.actions;

// export default MetaSlice.reducer;
