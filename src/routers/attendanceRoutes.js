import express from "express";
import { authenticate, authorize } from "../middlewares/authMiddleware.js";
import { checkIn, checkOut, viewAttendance } from "../controllers/attendanceController.js";


const attendanceRouter = express.Router();

attendanceRouter.use(authenticate);


attendanceRouter.post("/check-in", authorize("employee"), checkIn);
attendanceRouter.post("/check-out", authorize("employee"), checkOut);
attendanceRouter.get("/attendance", authorize("admin", "hr"), viewAttendance);

export default attendanceRouter;