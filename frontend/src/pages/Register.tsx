import { useMutation } from "react-query";
import { useForm } from "react-hook-form";
import * as apiClient from "../api-client";
import { useNavigate } from "react-router-dom";
import { showToast } from "../redux/ToastSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/Store";
import { useEffect } from "react";

export type RegisterFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Register = () => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleNotify = (
    message: string,
    type: "success" | "error" | "info" | "warning"
  ) => {
    dispatch(showToast({ message, type }));
  };

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>();

  const mutation = useMutation(apiClient.register, {
    onSuccess: () => {
      handleNotify("Account created successfully", "success");
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
      <h2 className="text-3xl font-bold">Create an Account</h2>
      <div className="flex flex-col md:flex-row gap-5">
        <label className="text-gray-700 text-xl flex-1">
          First Name
          <input
            className="border rounded w-full py-1 px-2 font-normal"
            type="text"
            {...register("firstName", {
              required: "This field is required",
              minLength: {
                value: 2,
                message: "First name must be at least 2 characters long",
              },
            })}
          />
          {errors.firstName && (
            <span className="text-red-500">{errors.firstName.message}</span>
          )}
        </label>
        <label className="text-gray-700 text-xl flex-1">
          Last Name
          <input
            className="border rounded w-full py-1 px-2 font-normal"
            type="text"
            {...register("lastName", {
              required: "This field is required",
              minLength: {
                value: 2,
                message: "Last name must be at least 2 characters long",
              },
            })}
          />
          {errors.lastName && (
            <span className="text-red-500">{errors.lastName.message}</span>
          )}
        </label>
      </div>
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
      <label className="text-gray-700 text-xl flex-1">
        Confirm Password
        <input
          className="border rounded w-full py-1 px-2 font-normal"
          type="password"
          {...register("confirmPassword", {
            validate: (value) => {
              if (!value) {
                return "Please confirm your password";
              } else if (value !== watch("password")) {
                return "Passwords do not match";
              }
            },
          })}
        />
        {errors.confirmPassword && (
          <span className="text-red-500">{errors.confirmPassword.message}</span>
        )}
      </label>
      <span>
        <button
          type="submit"
          className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl"
        >
          Create Account
        </button>
      </span>
    </form>
  );
};

export default Register;
