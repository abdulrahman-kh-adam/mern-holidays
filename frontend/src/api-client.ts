import { RegisterFormData } from "./pages/Register";
import { SignInFormData } from "./pages/SignIn";
import { HotelType } from "../../backend/src/models/hotel";

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

export const addMyHotel = async (formData: FormData) => {
  const response = await fetch(`${API_BASE_URL}/my-hotels`, {
    method: "POST",
    credentials: "include",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Error adding hotel");
  }

  return response.json();
};

export const getMyHotels = async (): Promise<HotelType[]> => {
  const response = await fetch(`${API_BASE_URL}/my-hotels`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Error fetching hotels");
  }

  return response.json();
};

export const getMyHotelById = async (hotelId: string): Promise<HotelType> => {
  const response = await fetch(`${API_BASE_URL}/my-hotels/${hotelId}`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Error fetching hotel by ID");
  }

  return response.json();
};

export const updateMyHotelById = async (formData: FormData): Promise<HotelType> => {
  const response = await fetch(`${API_BASE_URL}/my-hotels/${formData.get("hotelId")}`, {
    method: "PUT",
    body: formData,
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Error updating hotel");
  }

  return response.json();
};
