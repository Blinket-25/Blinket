import {
  closeLocationModal,
  openLocationModal,
  toggleLocationModal,
} from "@/context/redux/locationModal";
import {
  resetDistance,
  resetUser,
  setUserInformation,
} from "@/context/redux/user";
import { useDispatch } from "react-redux";
import { UserInformation } from "./interface";
import {
  closeLoginModal,
  openLoginModal,
  toggleLoginModal,
} from "@/context/redux/LoginModal";
import {
  addToCart,
  cartReset,
  removeItemFromCart,
  setCouponDetails,
  setDeliveryCharge,
  setIsDeliveryNotAvilable,
  setMiniumAmountForFreeDelivery,
  setUserSelectedAddress,
  setUserSelectedSlot,
} from "@/context/redux/cart";
import { setDescription, setLogo, setTitle } from "@/context/redux/header";

export default function useContextFunctions() {
  const dispatch = useDispatch();

  return {
    toggleLocationModal: () => dispatch(toggleLocationModal()),
    openLocationModal: () => dispatch(openLocationModal()),
    closeLocationModal: () => dispatch(closeLocationModal()),
    toggleLoginModal: () => dispatch(toggleLoginModal()),
    openLoginModal: () => dispatch(openLoginModal()),
    closeLoginModal: () => dispatch(closeLoginModal()),
    setUserInformation: (payload: UserInformation) =>
      dispatch(setUserInformation(payload)),
    addToCart: (item: {}) => dispatch(addToCart(item)),
    removeItemFromCart: (item: {}) => dispatch(removeItemFromCart(item)),
    setTitle: (e: string) => dispatch(setTitle(e)),
    setLogo: (e: string) => dispatch(setLogo(e)),
    setDescription: (e: string) => dispatch(setDescription(e)),
    setUserSelectedAddress: (e: string) => dispatch(setUserSelectedAddress(e)),
    setUserSelectedSlot: (e: string) => dispatch(setUserSelectedSlot(e)),
    setDeliveryCharge: (e: string) => dispatch(setDeliveryCharge(e)),
    setMiniumAmountForFreeDelivery: (e: string) =>
      dispatch(setMiniumAmountForFreeDelivery(e)),
    setIsDeliveryNotAvilable: (e: {
      avilable: string | boolean;
      reason: string;
    }) => dispatch(setIsDeliveryNotAvilable(e)),
    setCouponDetails: (e: {
      applied: boolean;
      couponCode: string;
      couponID: string | number;
      couponDiscountedPrice: string | number;
      couponAppliedForPrice: string | number;
    }) => dispatch(setCouponDetails(e)),
    resetUser: () => dispatch(resetUser()),
    cartReset: () => dispatch(cartReset()),
    resetDistance: () => dispatch(resetDistance()),
  };
}
