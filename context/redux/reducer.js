const { combineReducers } = require("@reduxjs/toolkit");
import LoginModal from "./LoginModal";
import locationReducer from "./locationModal";
import userInformationReducer from "./user";
import cartReducer from "./cart";
import headerReducer from "./header";
// import metaReducer from "./meta";

export const reducers = combineReducers({
  locationModal: locationReducer,
  loginModal: LoginModal,
  user: userInformationReducer,
  cart: cartReducer,
  header: headerReducer,
  // meta: metaReducer,
});
