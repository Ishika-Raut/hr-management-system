import Employee from "../models/employeeModel.js";
import User from "../models/userModel.js";
import { AppError } from "../utils/apiError.js";
import { AppResponse } from "../utils/apiResponse.js";
import HTTP_STATUS from "../utils/httpStatusCodes.js";

export const addEmployee = async (req, res, next) => {

    try 
    {
        const { userId, department, position, joiningDate } = req.body;
        console.log(req.body.userId);
        console.log(req.body.department);
        if(!department || !position || !joiningDate)
        {
            return AppError(res, "All fields are required!", HTTP_STATUS.BAD_REQUEST);
        }

        const user = await User.findOne({_id: userId});
        console.log("user = ", user);
        
        if(!user)
        {
            return AppError(res, `User not found`, HTTP_STATUS.BAD_REQUEST);
        }

        const employee = await Employee.create({
            user: userId,
            department,
            position,
            joiningDate
        });

        await User.findByIdAndUpdate(userId, { role: "employee" });

        return AppResponse(res, HTTP_STATUS.CREATED, true, "Employee created successfully.", 
            { 
                name: user.name,
                email: user.email,
                role: user.role ,
                department: employee.department,
                position: employee.position,
                joiningDate: employee.joiningDate
            });
    } 
    catch (error)
    {
        console.log("Add employee error", error);
        next(error);
    }
}



export const getEmployees = async (req, res, next) => {

    try 
    {
        const employees = await Employee.find().populate("user", "name email");

        return AppResponse(res, HTTP_STATUS.OK, true, "Employees fetched successfully.", 
        { 
            employees
        });
    } 
    catch (error)
    {
        console.log("Get employees error", error);
        next(error);
    }
}



export const getEmployee = async (req, res, next) => {

    try 
    {
        const employeeId = req.params.id;
        console.log("Empolyee id = ", employeeId);

        const employee = await Employee.findById(employeeId).populate("user", "name email");
        console.log("Empolyee = ", employee);
        if(!employee)
        {
            return AppError(res, `Employee not found`, HTTP_STATUS.BAD_REQUEST);
        }

         return AppResponse(res, HTTP_STATUS.OK, true, "Employee fetched successfully.", 
            { 
               employee
            });
    } 
    catch (error)
    {
        console.log("Get employees error", error);
        next(error);
    }
}



export const deleteEmployee = async (req, res, next) => {

    try 
    {
        const employeeId = req.params.id;
        console.log("Employee id = ", employeeId);

         // Delete the post
        await Employee.findByIdAndDelete(employeeId);

         return AppResponse(res, HTTP_STATUS.OK, true, "Employee deleted successfully." );
    } 
    catch (error)
    {
        console.log("Delete employee error", error);
        next(error);
    }
}



export const getMyProfile = async (req, res, next) => {

    try 
    {
        const employeeId = req.params.id;
        console.log("Empolyee id = ", employeeId);

        const employee = await Employee.findById(employeeId).populate("user", "name email");
        console.log("Empolyee = ", employee);
        if(!employee)
        {
            return AppError(res, `Employee not found`, HTTP_STATUS.BAD_REQUEST);
        }

         return AppResponse(res, HTTP_STATUS.OK, true, "Employee profile fetched successfully.", 
            { 
               employee
            });
    } 
    catch (error)
    {
        console.log("Get my profile error", error);
        next(error);
    }
}



export const updateEmployee = async (req, res, next) => {

    try 
    {
        const employeeId = req.params.id;
        console.log("Employee id = ", employeeId);

        const { department, position, joiningDate } = req.body;
        if(!department || !position || !joiningDate)
        {
            return AppError(res, "All fields are required!", HTTP_STATUS.BAD_REQUEST);
        }
        
        // new: true - returns new updated document
        // unlike create() ans save(), findByIdAndUpdate() not run db validationations automatically
        // we have to run it - runValidators: true
        const updatedEmployee = await Employee.findByIdAndUpdate(employeeId,
            { department, position, joiningDate },
            { new: true, runValidators: true });
            console.log("Empolyee = ", updatedEmployee);
        if(!updatedEmployee)
        {
            return AppError(res, `Employee not found`, HTTP_STATUS.BAD_REQUEST);
        }

        return AppResponse(res, HTTP_STATUS.OK, true, "Employee updated successfully.", 
            { 
                department: updatedEmployee.department,
                position: updatedEmployee.position,
                joiningDate: updatedEmployee.joiningDate
            });
    } 
    catch (error)
    {
        console.log("Update employee error", error);
        next(error);
    }
}
