import express from "express";
import { createSuperAdmin } from "../utils/superAdmin.js";


const adminRouter = express.Router();

// create super admin
adminRouter.post("/super-admin", createSuperAdmin);

export default adminRouter;