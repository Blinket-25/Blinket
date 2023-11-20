interface LocationModal {
  isOpen: boolean;
}

interface LoginModal {
  isOpen: boolean;
}

export interface UserInformation {
  name: string;
  email: string;
  phone: string;
  latitude: number;
  longitude: number;
  shortAddress: string;
  longAddress: string;
  savedAddresses: [];
  selectedAddress: string | number;
  STORE_CODE: string;
  distanceFromStore: number | string;
}

export interface ContextDataProps {
  locationModal: LocationModal;
  loginModal: LoginModal;
  user: UserInformation;
  cart: CartDetails;
  header: Header;
}

export interface FromLatLng {
  lat: number;
  lng: number;
}

export interface FromAddress {
  address: string;
}

export interface CartDetails {
  cartItems: [];
  subTotal: Number;
  grandTotal: Number;
  setUserSelectedAddress: Number | String;
  userSelectedSlot: string | number;
  userSelectedAddress: string | number;
  isDeliveryNotAvilable: string | boolean;
  isDeliveryNotAvilableReason: string;
  deliveryCharge: string | number;
  miniumAmountForFreeDelivery: string | number;
  isCouponApplied: boolean;
  couponCode: string;
  couponID: string | number;
  couponDiscountedPrice: string | number;
  couponAppliedForPrice: string | number;
}

export interface Header {
  meta: {
    title: string;
    description: string;
    logo: string;
  };
}
