import { configureStore } from "@reduxjs/toolkit";
import toastReducer from "./ToastSlice";
import authReducer from "./AuthSlice";

export const store = configureStore({
  reducer: {
    toast: toastReducer,
    auth: authReducer,
  },
});

// Types for state and dispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
