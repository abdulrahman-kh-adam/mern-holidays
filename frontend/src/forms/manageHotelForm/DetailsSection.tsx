import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

const DetailsSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold mb-3">Add Hotel</h1>

      {/* HOTEL NAME FIELD */}
      <label className="text-gray-700 text-xl flex-1">
        Name
        <input
          className="border rounded w-full py-1 px-2 font-normal"
          type="text"
          {...register("name", {
            required: "This field is required",
          })}
        />
        {errors.name && (
          <span className="text-red-500">{errors.name.message}</span>
        )}
      </label>

      {/* HOTEL CITY AND COUNTRY FIELDS */}
      <div className="flex gap-4">
        {/* HOTEL CITY */}
        <label className="text-gray-700 text-xl flex-1">
          City
          <input
            className="border rounded w-full py-1 px-2 font-normal"
            type="text"
            {...register("city", {
              required: "This field is required",
            })}
          />
          {errors.city && (
            <span className="text-red-500">{errors.city.message}</span>
          )}
        </label>

        {/* HOTEL COUNTRY */}
        <label className="text-gray-700 text-xl flex-1">
          Country
          <input
            className="border rounded w-full py-1 px-2 font-normal"
            type="text"
            {...register("country", {
              required: "This field is required",
            })}
          />
          {errors.country && (
            <span className="text-red-500">{errors.country.message}</span>
          )}
        </label>
      </div>

      {/* HOTEL DESCRIPTION FIELD */}
      <label className="text-gray-700 text-xl flex-1">
        Description
        <textarea
          rows={10}
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("description", {
            required: "This field is required",
          })}
        ></textarea>
        {errors.description && (
          <span className="text-red-500">{errors.description.message}</span>
        )}
      </label>

      {/* HOTEL PRICE PER NIGHT FIELD */}
      <label className="text-gray-700 text-xl max-w-[50%]">
        Price Per Night
        <input
          type="number"
          min={1}
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("pricePerNight", {
            required: "This field is required",
          })}
        />
        {errors.pricePerNight && (
          <span className="text-red-500">{errors.pricePerNight.message}</span>
        )}
      </label>

      {/* HOTEL PRICE RATING FIELD */}
      <label className="text-gray-700 text-xl max-w-[50%]">
        Star Rating
        <select
          {...register("starRating", {
            required: "This field is required",
          })}
          className="border rounded w-full p-2 text-gray-700 font-normal"
        >
          <option value="" className="text-sm font-bold">
            Select a rating
          </option>
          {[1, 2, 3, 4, 5].map((rating) => {
            return (
              <option value={rating} key={rating}>
                {rating}
              </option>
            );
          })}
        </select>
        {errors.starRating && (
          <span className="text-red-500">{errors.starRating.message}</span>
        )}
      </label>
    </div>
  );
};

export default DetailsSection;
