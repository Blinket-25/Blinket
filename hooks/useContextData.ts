import { useSelector } from "react-redux";
import { CartDetails, ContextDataProps, UserInformation } from "./interface";

export default function useContextData() {
  const data = useSelector(
    (state): ContextDataProps => state as ContextDataProps
  );
  return data;
}

export function useContextDataUser() {
  const data = useSelector(
    (state): UserInformation => state["user"] as UserInformation
  );
  return data;
}

export function useContextDataCart() {
  const data = useSelector(
    (state): CartDetails => state["cart"] as CartDetails
  );
  return data;
}
