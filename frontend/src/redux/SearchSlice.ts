import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SearchState {
    destination: string;
    checkIn: Date;
    checkOut: Date;
    adultCount: number;
    childCount: number;
    hotelId: string;
}

const initialState: SearchState = {
    destination: "",
    checkIn: new Date(sessionStorage.getItem("checkIn") || ""),
    checkOut: new Date(sessionStorage.getItem("checkOut") || ""),
    adultCount: parseInt(sessionStorage.getItem("adultCount") || "1"),
    childCount: parseInt(sessionStorage.getItem("childCount") || "0"),
    hotelId: "",
};

const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {
        setSearchParams: (state, action: PayloadAction<Partial<SearchState>>) => {
            const { destination, checkIn, checkOut, adultCount, childCount, hotelId } = action.payload;
            if (destination !== undefined) state.destination = destination;
            if (checkIn !== undefined) {
                state.checkIn = checkIn;
                sessionStorage.setItem("checkIn", checkIn.toISOString());
            }
            if (checkOut !== undefined) {
                state.checkOut = checkOut;
                sessionStorage.setItem("checkOut", checkOut.toISOString());
            }
            if (adultCount !== undefined) {
                state.adultCount = adultCount;
                sessionStorage.setItem("adultCount", adultCount.toString());
            }
            if (childCount !== undefined) {
                state.childCount = childCount;
                sessionStorage.setItem("childCount", childCount.toString());
            }
            if (hotelId !== undefined) state.hotelId = hotelId;
        },
    },
});

export const { setSearchParams } = searchSlice.actions;
export default searchSlice.reducer;
