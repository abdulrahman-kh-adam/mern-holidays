import { RegisterFormData } from "./pages/Register";
import { SignInFormData } from "./pages/SignIn";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const register = async (formData: RegisterFormData) => {
  const response = await fetch(`${API_BASE_URL}/users/register`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
  const resBody = await response.json();
  if (!response.ok) {
    throw new Error(resBody.message);
  }
};

export const signin = async (formData: SignInFormData) => {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
  const resBody = await response.json();
  if (!response.ok) {
    throw new Error("Error signing in");
  }
  return resBody;
};

export const signout = async () => {
  const response = await fetch(`${API_BASE_URL}/auth/logout`, {
    method: "POST",
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Error signing out");
  }
};

export const validateToken = async () => {
  const response = await fetch(`${API_BASE_URL}/auth/validate-token`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Token validation failed");
  }

  return response.json();
};
