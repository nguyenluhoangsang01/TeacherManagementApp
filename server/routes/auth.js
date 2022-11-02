import express from "express";
import {
  forgotPasswordController,
  loginController,
  registerController,
} from "../controllers/auth.js";

const router = express.Router();

// @route POST /api/auth/register
// @desc Register a user
// @access Private
router.post("/register", registerController);

// @route POST /api/auth/login
// @desc Login a user
// @access Public
router.post("/login", loginController);

// @route PUT /api/auth/forgot-password
// @desc Update a user's password
// @access Public
router.put("/forgot-password", forgotPasswordController);

export default router;
