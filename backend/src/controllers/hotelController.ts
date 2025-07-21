import { Request, Response } from "express";
import multer from "multer";
import cloudinary from "cloudinary";
import Hotel, { HotelType, HotelTypeResponse } from "../models/hotel";

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

export const searchHotels = async (req: Request, res: Response) => {
    try {
        const query = constructSearchQuery(req.query);

        let sortOptions = {};
        switch (req.query.sortOption) {
            case "starRating":
                sortOptions = { starRating: -1 };
                break;
            case "pricePerNightAsc":
                sortOptions = { pricePerNight: 1 };
                break;
            case "pricePerNightDesc":
                sortOptions = { pricePerNight: -1 };
                break;
        }

        const pageSize = 5;
        const pageNumber = parseInt(req.query.page ? req.query.page.toString() : "1");
        const skip = (pageNumber - 1) * pageSize;

        const hotels = await Hotel.find(query).sort(sortOptions).skip(skip).limit(pageSize);

        const total = await Hotel.countDocuments(query);

        const response: HotelTypeResponse = {
            data: hotels,
            pagination: {
                total,
                page: pageNumber,
                pages: Math.ceil(total / pageSize),
            },
        };

        res.json(response);
    } catch (error) {
        console.log("error", error);
        res.status(500).json({ message: "Something went wrong" });
    }
};

export const getAllHotels = async (req: Request, res: Response) => {
    try {
        const pageSize = 5;
        const pageNumber = parseInt(req.query.page ? req.query.page.toString() : "1");
        const skip = (pageNumber - 1) * pageSize;

        const hotels = await Hotel.find().skip(skip).limit(pageSize);
        const total = await Hotel.countDocuments();

        const response: HotelTypeResponse = {
            data: hotels,
            pagination: {
                total,
                page: pageNumber,
                pages: Math.ceil(total / pageSize),
            },
        };

        res.json(response);
    } catch (error) {
        console.error("Error fetching all hotels:", error);
        res.status(500).json({ message: "Failed to fetch hotels" });
    }
};

const constructSearchQuery = (queryParams: any) => {
    let constructedQuery: any = {};

    if (queryParams.destination) {
        constructedQuery.$or = [
            { city: new RegExp(queryParams.destination, "i") },
            { country: new RegExp(queryParams.destination, "i") },
        ];
    }

    if (queryParams.adultCount) {
        constructedQuery.adultCount = {
            $gte: parseInt(queryParams.adultCount),
        };
    }

    if (queryParams.childCount) {
        constructedQuery.childrenCount = {
            $gte: parseInt(queryParams.childCount),
        };
    }

    if (queryParams.facilities) {
        constructedQuery.facilities = {
            $all: Array.isArray(queryParams.facilities) ? queryParams.facilities : [queryParams.facilities],
        };
    }

    if (queryParams.types) {
        constructedQuery.type = {
            $in: Array.isArray(queryParams.types) ? queryParams.types : [queryParams.types],
        };
    }

    if (queryParams.stars) {
        const starRatings = Array.isArray(queryParams.stars)
            ? queryParams.stars.map((star: string) => parseInt(star))
            : parseInt(queryParams.stars);

        constructedQuery.starRating = { $in: starRatings };
    }

    if (queryParams.maxPrice) {
        constructedQuery.pricePerNight = {
            $lte: parseInt(queryParams.maxPrice).toString(),
        };
    }

    return constructedQuery;
};
