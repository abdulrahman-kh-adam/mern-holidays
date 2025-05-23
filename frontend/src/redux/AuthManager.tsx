// In App.tsx, Layout.tsx, or a top-level component
import { useEffect } from "react";
import { useQuery } from "react-query";
import { setAuthState } from "./AuthSlice";
import * as apiClient from "../api-client";
import { useDispatch } from "react-redux";

const AuthManager = () => {
  const dispatch = useDispatch();

  const { isError, isSuccess } = useQuery("validateToken", apiClient.validateToken, { retry: false });

  useEffect(() => {
    if (isSuccess) {
      dispatch(setAuthState(true));
    }
    if (isError) {
      dispatch(setAuthState(false));
    }
  });

  return null; // this just runs on load
};

export default AuthManager;
