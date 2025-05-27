import mongoose from "mongoose";

export type HotelType = {
  _id: string;
  userId: string | undefined;
  name: string;
  city: string;
  country: string;
  description: string;
  type: string;
  adultCount: number;
  childrenCount: number;
  facilities: string[];
  pricePerNight: number;
  starRating: number;
  images: string[];
  lastUpdated: Date;
};

const HotelSchema = new mongoose.Schema<HotelType>({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
  description: { type: String, required: true },
  type: { type: String, required: true },
  adultCount: { type: Number, required: true },
  childrenCount: { type: Number, required: true },
  facilities: { type: [String], required: true },
  pricePerNight: { type: Number, required: true },
  starRating: { type: Number, required: true, min: 1, max: 5 },
  images: [{ type: String, required: true }],
  lastUpdated: { type: Date, default: Date.now },
});

const Hotel = mongoose.model<HotelType>("Hotel", HotelSchema);
export default Hotel;
