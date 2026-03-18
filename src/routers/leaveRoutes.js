import express from "express";
import { authenticate, authorize } from "../middlewares/authMiddleware.js";
import { allLeaveRequests, applyLeave,  approveLeave,  rejectLeave,  viewLeaveHistory } from "../controllers/leaveController.js";


const leaveRouter = express.Router();

leaveRouter.use(authenticate);


leaveRouter.post("/apply-leave", authorize("employee"), applyLeave);
leaveRouter.get("/leaves", authorize("admin" , "hr"), allLeaveRequests);
leaveRouter.get("/leaves/:id", authorize("employee"), viewLeaveHistory);
leaveRouter.put("/leaves/:id/approve", authorize("admin" , "hr"), approveLeave);
leaveRouter.put("/leaves/:id/reject", authorize("admin" , "hr"), rejectLeave);

export default leaveRouter;