import express from "express";
import { addEmployee, deleteEmployee, getEmployee, getEmployees, getMyProfile, updateEmployee } from "../controllers/employeeController.js";
import { authenticate, authorize } from "../middlewares/authMiddleware.js";


const employeeRouter = express.Router();

employeeRouter.use(authenticate);


employeeRouter.post("/employee", authorize("admin"), addEmployee);
employeeRouter.get("/employees", authorize("admin"), getEmployees);
employeeRouter.get("/employee/:id", authorize("admin"), getEmployee);
employeeRouter.get("/employee/:id", authorize("employee"), getMyProfile);
employeeRouter.delete("/employee/:id", authorize("admin"), deleteEmployee);
employeeRouter.put("/employee/:id", authorize("admin"), updateEmployee);

export default employeeRouter;