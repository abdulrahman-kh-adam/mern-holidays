import { Request, Response } from "express";
import multer from "multer";
import cloudinary from "cloudinary";
import Hotel, { HotelType } from "../models/hotel";

const storage = multer.memoryStorage();
export const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit to 5MB
});

async function uploadImages(imageFiles: Express.Multer.File[]) {
  const uploadPromises = imageFiles.map(async (file) => {
    const b64 = Buffer.from(file.buffer).toString("base64");
    let dataURI = `data:${file.mimetype};base64,${b64}`;
    const res = await cloudinary.v2.uploader.upload(dataURI);
    return res.secure_url;
  });

  const imagesURLs = await Promise.all(uploadPromises);
  return imagesURLs;
}

export const addNewHotel = async (req: Request, res: Response) => {
  try {
    const imageFiles = req.files as Express.Multer.File[];
    const newHotel: HotelType = req.body;

    const imagesURLs = await uploadImages(imageFiles);

    newHotel.images = imagesURLs;
    newHotel.lastUpdated = new Date();
    newHotel.userId = req.userId;

    const hotel = new Hotel(newHotel);
    await hotel.save();

    res.status(201).json({
      status: "success",
      message: "Hotel added successfully",
      data: hotel,
    });
  } catch (error) {
    console.error("Error uploading hotel images:", error);
    return res.status(500).json({ message: "Failed to upload hotel images" });
  }
};

export const getMyHotels = async (req: Request, res: Response) => {
  try {
    const hotels = await Hotel.find({ userId: req.userId });
    res.status(200).json(hotels);
  } catch (error) {
    console.error("Error fetching hotels:", error);
    return res.status(500).json({ message: "Failed to fetch hotels" });
  }
};

export const getHotelById = async (req: Request, res: Response) => {
  try {
    const hotelId = req.params.id.toString();
    const hotel = await Hotel.findById(hotelId);

    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }

    res.status(200).json(hotel);
  } catch (error) {
    console.error("Error fetching hotel by ID:", error);
    return res.status(500).json({ message: "Failed to fetch hotel" });
  }
};

export const editHotel = async (req: Request, res: Response) => {
  try {
    const updatedHotel: HotelType = req.body;
    updatedHotel.lastUpdated = new Date();

    const hotel = await Hotel.findByIdAndUpdate(
      {
        _id: req.params.id,
        userId: req.userId,
      },
      updatedHotel,
      { new: true }
    );

    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }

    const files = req.files as Express.Multer.File[];

    const imagesURLs = await uploadImages(files);

    hotel.images = [...imagesURLs, ...(updatedHotel.images || [])];

    await hotel.save();

    res.status(200).json({
      hotel,
    });
  } catch (error) {
    console.error("Error editing hotel:", error);
    return res.status(500).json({ message: "Failed to edit hotel" });
  }
};
