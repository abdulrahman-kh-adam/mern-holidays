// redux/authSlice.ts
import { createSlice } from "@reduxjs/toolkit";

type AuthState = {
  isLoggedIn: boolean;
};

const initialState: AuthState = {
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthState: (state, action) => {
      state.isLoggedIn = action.payload;
    },
  },
});

export const { setAuthState } = authSlice.actions;
export default authSlice.reducer;
