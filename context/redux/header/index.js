import { createSlice } from "@reduxjs/toolkit";

const HeaderSlice = createSlice({
  name: "Header",
  initialState: {
    meta: {
      title: "",
      description: "",
      logo: "",
    },
  },
  reducers: {
    setTitle: (state, action) => {
      state.meta.title = action.payload;
    },
    setDescription: (state, action) => {
      state.meta.description = action.payload;
    },
    setLogo: (state, action) => {
      state.meta.logo = action.payload;
    },
  },
});

export const { setDescription, setLogo, setTitle } = HeaderSlice.actions;

export default HeaderSlice.reducer;
