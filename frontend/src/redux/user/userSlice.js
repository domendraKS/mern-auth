import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  loading: false,
  error: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    singInStart: (state) => {
      state.loading = true;
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = true;
      state.error = true;
    },
    singInFailure: (state, action) => {
      state.loading = true;
      state.error = action.payload;
    },
  },
});

export const { singInStart, signInSuccess, singInFailure } = userSlice.actions;

export default userSlice.reducer;
