import { RegisterFormData } from "./pages/Register";
import { SignInFormData } from "./pages/SignIn";
import { HotelType, HotelTypeResponse } from "../../backend/src/models/hotel";

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

export type SearchParams = {
    destination?: string;
    checkIn?: string;
    checkOut?: string;
    adultCount?: string;
    childCount?: string;
    page?: string;
    facilities?: string[];
    types?: string[];
    stars?: string[];
    maxPrice?: string;
    sortOption?: string;
};

export const searchHotels = async (params: SearchParams): Promise<HotelTypeResponse> => {
    const query = new URLSearchParams();
    query.append("destination", params.destination || "");
    query.append("checkIn", params.checkIn || "");
    query.append("checkOut", params.checkOut || "");
    query.append("adultCount", params.adultCount || "");
    query.append("childCount", params.childCount || "");
    query.append("page", params.page || "");
    query.append("maxPrice", params.maxPrice || "");
    query.append("sortOption", params.sortOption || "");

    params.facilities?.forEach((facility) => {
        query.append("facilities", facility);
    });

    params.types?.forEach((type) => {
        query.append("types", type);
    });

    params.stars?.forEach((star) => {
        query.append("stars", star);
    });

    const response = await fetch(`${API_BASE_URL}/hotels/search?${query.toString()}`, {
        credentials: "include",
    });

    if (!response.ok) {
        throw new Error("Error searching hotels");
    }

    return response.json();
};

export const fetchHotelById = async (hotelId: string): Promise<HotelType> => {
    const response = await fetch(`${API_BASE_URL}/hotels/${hotelId}`, {
        credentials: "include",
    });
    if (!response.ok) {
        throw new Error("Error fetching hotel by ID");
    }
    return response.json();
};

export const fetchHotels = async () => {
    const response = await fetch(`${API_BASE_URL}/hotels`, {
        credentials: "include",
    });
    if (!response.ok) {
        throw new Error("Error fetching hotels");
    }
    const resData = await response.json();
    return resData.data;
};
