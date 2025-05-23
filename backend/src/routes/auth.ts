import express from "express";
import { check } from "express-validator";
import { login, logout, validateToken } from "../controllers/authController";
import verifyToken from "../middlewares/auth";

const router = express.Router();

router.post(
  "/login",
  [check("email", "Email is required").isEmail(), check("password", "Password is required").notEmpty()],
  login
);

router.post("/logout", logout);

router.get("/validate-token", verifyToken, validateToken);

export default router;
