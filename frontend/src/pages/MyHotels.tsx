import { useQuery } from "react-query";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import * as apiClient from "../api-client";
import { showToast } from "../redux/ToastSlice";
import { BsBuilding, BsMap } from "react-icons/bs";
import { BiHotel, BiMoney, BiStar } from "react-icons/bi";

const MyHotels = () => {
  const dispatch = useDispatch();

  const notify = (message: string, type: "success" | "error") => {
    dispatch(showToast({ message, type }));
  };

  const { data: hotelData } = useQuery("fetchMyHotels", apiClient.getMyHotels, {
    onError: (error: Error) => {
      notify(error.message || "Failed to fetch hotels", "error");
    },
  });

  if (!hotelData) {
    return <span>No Hotels Found!</span>;
  }

  return (
    <div className="space-y-5">
      <span className="flex justify-between">
        <h1 className="text-3xl font-bold">My Hotels</h1>
        <Link
          to="/add-hotel"
          className="flex bg-blue-600 text-white text-xl font-bold p-2 hover:bg-blue-500"
        >
          Add Hotel
        </Link>
      </span>
      <div className="grid grid-cols-1 gap-8">
        {hotelData.map((hotel) => (
          <div
            className="flex flex-col justify-between border border-slate-300 rounded-lg p-8 gap-5"
            key={hotel._id}
          >
            <h2 className="text-2xl font-bold">{hotel.name}</h2>
            <div className="whitespace-pre-line">{hotel.description}</div>
            <div className="grid grid-cols-5 gap-2">
              <div className="border border-slate-300 rounded-sm p-3 flex items-center gap-1">
                <BsMap />
                {hotel.city}, {hotel.country}
              </div>
              <div className="border border-slate-300 rounded-sm p-3 flex items-center gap-1">
                <BsBuilding />
                {hotel.type}
              </div>
              <div className="border border-slate-300 rounded-sm p-3 flex items-center gap-1">
                <BiMoney />${hotel.pricePerNight} per night
              </div>
              <div className="border border-slate-300 rounded-sm p-3 flex items-center gap-1">
                <BiHotel />
                {hotel.adultCount} adults, {hotel.childrenCount} children
              </div>
              <div className="border border-slate-300 rounded-sm p-3 flex items-center gap-1">
                <BiStar />
                {hotel.starRating} stars
              </div>
            </div>
            <span className="flex justify-end">
              <Link
                to={`/edit-hotel/${hotel._id}`}
                className="flex bg-blue-600 text-white text-xl font-bold p-2 hover:bg-blue-500"
              >
                View Details
              </Link>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyHotels;
