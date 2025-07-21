import express from "express";
import { getAllHotels, getHotelById, searchHotels } from "../controllers/hotelController";

const router = express.Router();

router.get("/search", searchHotels);
router.get("/:id", getHotelById);
router.get("/", getAllHotels);

export default router;
