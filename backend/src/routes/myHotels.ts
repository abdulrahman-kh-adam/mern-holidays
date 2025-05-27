import {
  addNewHotel,
  upload,
  getMyHotels,
  getHotelById,
  editHotel,
} from "../controllers/hotelController";
import express from "express";
import verifyToken from "../middlewares/auth";

const router = express.Router();

router.post("/", verifyToken, upload.array("images", 6), addNewHotel);

router.get("/", verifyToken, getMyHotels);

router
  .get("/:id", verifyToken, getHotelById)
  .put("/:id", verifyToken, upload.array("images", 6), editHotel);

export default router;
