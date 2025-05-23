import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ToastType = "success" | "error" | "info" | "warning";

interface ToastState {
  show: boolean;
  message: string;
  type: ToastType;
}

const initialState: ToastState = {
  show: false,
  message: "",
  type: "info",
};

const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    showToast: (state, action: PayloadAction<{ message: string; type?: ToastType }>) => {
      state.show = true;
      state.message = action.payload.message;
      state.type = action.payload.type || "info";
    },
    hideToast: (state) => {
      state.show = false;
      state.message = "";
    },
  },
});

export const { showToast, hideToast } = toastSlice.actions;
export default toastSlice.reducer;
