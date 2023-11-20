import { createSlice } from "@reduxjs/toolkit";

const UserInformationSlice = createSlice({
  name: "User",
  initialState: {
    name: null,
    email: null,
    phone: null,
    latitude: null,
    longitude: null,
    shortAddress: null,
    longAddress: null,
    savedAddresses: [],
    selectedAddress: null,
    STORE_CODE: null,
    distanceFromStore: null,
  },
  reducers: {
    setUserInformation: (state, action) => {
      if (action.payload.name) state.name = action.payload.name;
      if (action.payload.email) state.email = action.payload.email;
      if (action.payload.phone) state.phone = action.payload.phone;
      if (action.payload.latitude) state.latitude = action.payload.latitude;
      if (action.payload.STORE_CODE)
        state.STORE_CODE = action.payload.STORE_CODE;
      if (
        action.payload.selectedAddress === null ||
        action.payload.selectedAddress
      )
        state.selectedAddress = action.payload.selectedAddress;
      if (action.payload.longitude) state.longitude = action.payload.longitude;
      if (action.payload.savedAddresses)
        state.savedAddresses = action.payload.savedAddresses;
      if (action.payload.shortAddress)
        state.shortAddress = action.payload.shortAddress;
      if (action.payload.longAddress)
        state.longAddress = action.payload.longAddress;
      if (
        action.payload.distanceFromStore === null ||
        action.payload.distanceFromStore
      )
        state.distanceFromStore = action.payload.distanceFromStore;
    },
    resetUser: (state) => {
      state.name = null;
      state.email = null;
      state.phone = null;
      state.selectedAddress = null;
      state.savedAddresses = [];
      state.distanceFromStore = null;
    },
    resetDistance: (state) => {
      state.distanceFromStore = null;
      state.selectedAddress = null;
    },
  },
});

export const { setUserInformation, resetUser, resetDistance } =
  UserInformationSlice.actions;

export default UserInformationSlice.reducer;
