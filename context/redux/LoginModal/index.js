import { createSlice } from "@reduxjs/toolkit";

const LoginModalSlice = createSlice({
  name: "LoginModal",
  initialState: {
    isOpen: false,
  },
  reducers: {
    toggleLoginModal: (state) => {
      state.isOpen = !state.isOpen;
    },
    openLoginModal: (state) => {
      state.isOpen = true;
    },
    closeLoginModal: (state) => {
      state.isOpen = false;
    },
  },
});

export const { closeLoginModal, openLoginModal, toggleLoginModal } =
  LoginModalSlice.actions;

export default LoginModalSlice.reducer;
