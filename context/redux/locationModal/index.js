import { createSlice } from "@reduxjs/toolkit";

const LocationSlice = createSlice({
  name: "Location",
  initialState: {
    isOpen: false,
  },
  reducers: {
    toggleLocationModal: (state) => {
      state.isOpen = !state.isOpen;
    },
    openLocationModal: (state) => {
      state.isOpen = true;
    },
    closeLocationModal: (state) => {
      state.isOpen = false;
    },
  },
});

export const { closeLocationModal, openLocationModal, toggleLocationModal } =
  LocationSlice.actions;

export default LocationSlice.reducer;
