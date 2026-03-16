import express from "express";
import { login, register } from "../controllers/authController.js";
import { authenticate, authorize } from "../middlewares/authMiddleware.js";
import errorHandler from "../middlewares/globalErrorHandler.js";

const authRouter = express.Router();

authRouter.post("/register", authenticate, authorize("admin"), register, errorHandler);
authRouter.post("/login", login);

export default authRouter;
