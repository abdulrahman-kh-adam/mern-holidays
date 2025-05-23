import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import * as apiClient from "../api-client";
import { useEffect } from "react";
import { RootState } from "../redux/Store";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { showToast } from "../redux/ToastSlice";

export type SignInFormData = {
  email: string;
  password: string;
};

const SignIn = () => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleNotify = (
    message: string,
    type: "success" | "error" | "info" | "warning"
  ) => {
    dispatch(showToast({ message, type }));
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<SignInFormData>();

  const mutation = useMutation(apiClient.signin, {
    onSuccess: async () => {
      handleNotify("Signed in successfully", "success");
      navigate("/");
    },
    onError: (error: Error) => {
      handleNotify(error.message, "error");
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  });

  return (
    <form className="flex flex-col gap-5" onSubmit={onSubmit}>
      <h2 className="text-3xl font-bold">Sign In</h2>

      <label className="text-gray-700 text-xl flex-1">
        Email
        <input
          className="border rounded w-full py-1 px-2 font-normal"
          type="email"
          {...register("email", {
            required: "This field is required",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "Please enter a valid email address",
            },
          })}
        />
        {errors.email && (
          <span className="text-red-500">{errors.email.message}</span>
        )}
      </label>
      <label className="text-gray-700 text-xl flex-1">
        Password
        <input
          className="border rounded w-full py-1 px-2 font-normal"
          type="password"
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters long",
            },
          })}
        />
        {errors.password && (
          <span className="text-red-500">{errors.password.message}</span>
        )}
      </label>
      <span className="flex items-center justify-between">
        <span className="text-sm">
          Not Registered? <Link to="/register">Click Here!</Link>
        </span>
        <button
          type="submit"
          className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl"
        >
          Login
        </button>
      </span>
    </form>
  );
};

export default SignIn;
