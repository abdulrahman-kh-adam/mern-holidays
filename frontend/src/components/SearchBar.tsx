import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearchParams } from "../redux/SearchSlice";
import { MdTravelExplore } from "react-icons/md";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
    const destinationState = useSelector((state: any) => state.search.destination);
    const checkInState = useSelector((state: any) => state.search.checkIn);
    const checkOutState = useSelector((state: any) => state.search.checkOut);
    const adultCountState = useSelector((state: any) => state.search.adultCount);
    const childCountState = useSelector((state: any) => state.search.childCount);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [destination, setDestination] = React.useState(destinationState);
    const [checkIn, setCheckIn] = React.useState(checkInState);
    const [checkOut, setCheckOut] = React.useState(checkOutState);
    const [adultCount, setAdultCount] = React.useState(adultCountState);
    const [childCount, setChildCount] = React.useState(childCountState);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        dispatch(setSearchParams({ destination, checkIn, checkOut, adultCount, childCount }));
        navigate("/search");
    };

    const handleClear = () => {
        setDestination(destinationState);
        setCheckIn(checkInState);
        setCheckOut(checkOutState);
        setAdultCount(adultCountState);
        setChildCount(childCountState);
    };

    const minDate = new Date();
    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() + 1);

    return (
        <form
            onSubmit={handleSubmit}
            className="-mt-8 p-3 bg-orange-400 rounded shadow-md grid grid-cols-2 ld:grid-cols-3 2xl:grid-cols-5 items-center gap-4"
        >
            <div className="flex flex-row items-center flex-1 bg-white p-2">
                <MdTravelExplore size={25} className="mr-2" />
                <input
                    placeholder="Where Are You Going?"
                    className="text-md w-full focus:outline-none"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                />
            </div>

            <div className="flex bg-white px-2 py-1 gap-2">
                <label className="items-center flex">
                    Adults:
                    <input
                        className="w-full p-1 focus:outline-none font-bold"
                        type="number"
                        min={1}
                        max={20}
                        value={adultCount}
                        onChange={(e) => setAdultCount(parseInt(e.target.value))}
                    />
                </label>
                <label className="items-center flex">
                    Children:
                    <input
                        className="w-full p-1 focus:outline-none font-bold"
                        type="number"
                        min={0}
                        max={20}
                        value={childCount}
                        onChange={(e) => setChildCount(parseInt(e.target.value))}
                    />
                </label>
            </div>

            <div>
                <DatePicker
                    selected={checkIn}
                    onChange={(date) => setCheckIn(date as Date)}
                    selectsStart
                    startDate={checkIn}
                    endDate={checkOut}
                    minDate={minDate}
                    maxDate={maxDate}
                    placeholderText="Check In Date"
                    className="min-w-full bg-white p-2 focus:outline-none"
                    wrapperClassName="min-w-full"
                />
            </div>

            <div>
                <DatePicker
                    selected={checkOut}
                    onChange={(date) => setCheckOut(date as Date)}
                    selectsStart
                    startDate={checkIn}
                    endDate={checkOut}
                    minDate={minDate}
                    maxDate={maxDate}
                    placeholderText="Check Out Date"
                    className="min-w-full bg-white p-2 focus:outline-none"
                    wrapperClassName="min-w-full"
                />
            </div>

            <div className="flex gap-1">
                <button
                    type="submit"
                    className="w-2/3 bg-blue-600 text-white h-full p-2 font-bold text-xl hover:bg-blue-500"
                >
                    Search
                </button>
                <button
                    type="button"
                    className="w-1/3 bg-red-600 text-white h-full p-2 font-bold text-xl hover:bg-red-500"
                    onClick={handleClear}
                >
                    Clear
                </button>
            </div>
        </form>
    );
};

export default SearchBar;
