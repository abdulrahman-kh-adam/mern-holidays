import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import * as apiClient from "../api-client";
import React from "react";
import { HotelTypeResponse } from "../../../backend/src/models/hotel";
import SearchResultsCard from "../components/SearchResultCard";
import Pagination from "../components/Pagination";
import StarRatingFilter from "../components/StarRatingFilter";
import HotelTypesFilter from "../components/HotelTypesFilter";
import FacilitiesFilter from "../components/FacilitiesFilter";
import PriceFilter from "../components/PriceFilter";

const Search = () => {
    const search = useSelector((state: any) => state.search);
    const [page, setPage] = React.useState<number>(1);
    const [selectedStars, setSelectedStars] = React.useState<string[]>([]);
    const [selectedHotelTypes, setSelectedHotelTypes] = React.useState<string[]>([]);
    const [selectedFacilities, setSelectedFacilities] = React.useState<string[]>([]);
    const [selectedPrice, setSelectedPrice] = React.useState<number | undefined>(undefined);
    const [sortOption, setSortOption] = React.useState<string>("");

    const searchParams = {
        destination: search.destination,
        checkIn: search.checkIn.toString(),
        checkOut: search.checkOut.toString(),
        adultCount: search.adultCount.toString(),
        childCount: search.childCount.toString(),
        page: page.toString(),
        stars: selectedStars,
        types: selectedHotelTypes,
        facilities: selectedFacilities,
        maxPrice: selectedPrice?.toString(),
        sortOption,
    };

    const { data: hotelData } = useQuery<HotelTypeResponse>(["searchHotels", searchParams], () =>
        apiClient.searchHotels(searchParams)
    );

    const handleStarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const starRating = event.target.value;
        setSelectedStars((prev) =>
            event.target.checked ? [...prev, starRating] : prev.filter((star) => star !== starRating)
        );
    };

    const handleHotelTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const hotelType = event.target.value;
        setSelectedHotelTypes((prev) =>
            event.target.checked ? [...prev, hotelType] : prev.filter((type) => type !== hotelType)
        );
    };

    const handleFacilityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const facility = event.target.value;
        setSelectedFacilities((prev) =>
            event.target.checked ? [...prev, facility] : prev.filter((f) => f !== facility)
        );
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
            <div className="rounded-lg border border-slate-300 p-5 h-fit sticky top-10">
                <div className="space-y-5">
                    <h3 className="text-lg font-semibold border-b border-slate-300 pb-5">Filter By:</h3>
                    <StarRatingFilter selectedStars={selectedStars} onChange={handleStarChange} />
                    <HotelTypesFilter
                        selectedHotelTypes={selectedHotelTypes}
                        onChange={handleHotelTypeChange}
                    />
                    <FacilitiesFilter
                        selectedFacilities={selectedFacilities}
                        onChange={handleFacilityChange}
                    />
                    <PriceFilter
                        selectedPrice={selectedPrice}
                        onChange={(value?: number) => setSelectedPrice(value)}
                    />
                </div>
            </div>
            <div className="flex flex-col gap-5">
                <div className="flex justify-between items-center">
                    <span className="text-xl font-bold">
                        {hotelData?.pagination.total} Hotels Found
                        {search.destination && ` in ${search.destination}`}
                    </span>
                    {/* TODO: Sort Options */}
                    <select
                        value={sortOption}
                        onChange={(event) => setSortOption(event.target.value)}
                        className="p-2 border rounded-md"
                    >
                        <option value="">Sort By</option>
                        <option value="starRating">Star Rating</option>
                        <option value="pricePerNightAsc">Price Per Night (low to high)</option>
                        <option value="pricePerNightDesc">Price Per Night (high to low)</option>
                    </select>
                </div>
                {hotelData?.data.map((hotel) => (
                    <SearchResultsCard key={hotel._id} hotel={hotel} />
                ))}
                <div>
                    <Pagination
                        page={hotelData?.pagination.page || 1}
                        pages={hotelData?.pagination.pages || 1}
                        onPageChange={(page) => setPage(page)}
                    />
                </div>
            </div>
        </div>
    );
};

export default Search;
