import Employee from "../models/employeeModel.js";
import Leave from "../models/leaveModel.js";
import { AppError } from "../utils/apiError.js";
import { AppResponse } from "../utils/apiResponse.js";
import HTTP_STATUS from "../utils/httpStatusCodes.js";



export const applyLeave = async(req, res, next) => {

    try 
    {
        const { employeeId, leaveType, startDate, endDate, reason, leaveStatus } = req.body;
        console.log("leaveType = ", leaveType);
        if(!employeeId || !leaveType || !startDate || !endDate || !reason )
        {
            return AppError(res, "All fields are required!", HTTP_STATUS.BAD_REQUEST);
        }

        // findOne()
        //  - More flexible than findById.
        //  - Accepts a query object with any field(s) not just _id.
        //  - Returns the first document matching the query or null
        //  - Useful when you want complex conditions (e.g., { age: { $gt: 18 }, status: "active" }).
        
        // findById(_id)
        //  - fetch a document by its _id field
        //  - Accepts a single value (the _id) as a parameter.
        //  - Returns one document or null if not found.
        //  - Handles ObjectId casting automatically (if we pass string, Mongoose will convert it).
        const isEmployeeExist = await Employee.findById(employeeId);
        if(!isEmployeeExist)
        {
            return AppError(res, "Employee not exist!", HTTP_STATUS.NOT_FOUND);
        }

        // Mongoose automatically converts: 
        // ISO date strings: "2026-03-17T12:00:00Z"
        // Short ISO dates: "2026-03-17"

        // Convert string to date if date string is in a non-standard format "17/03/2026"
        // Mongoose won’t parse that automatically and throws error.
        const startDateObj = new Date(startDate);
        const endDateObj = new Date(endDate);

        const leave = await Leave.create({
            employee: employeeId,
            leaveType, 
            startDate: startDateObj, 
            endDate: endDateObj, 
            reason, 
            leaveStatus
        });

        return AppResponse(res, HTTP_STATUS.CREATED, true, "Leave applied successfully.", 
                    { 
                        employee: leave.employeeId,
                        leaveType: leave.leaveType,
                        startDate: leave.startDate ,
                        endDate: leave.endDate,
                        reason: leave.reason,
                        leaveStatus: leave.leaveStatus
                    });

    } 
    catch (error) 
    {
        console.log("Apply leave error", error);
        next(error);
    }
}


export const allLeaveRequests = async (req, res, next) => {

    try 
    {
        // Returns all documents in the collection - always returns an array
        // Equivalent to: Leave.find({}) 
        const leaves = await Leave.find();

        return AppResponse(res, HTTP_STATUS.OK, true, "All Leaves request fetched successfully.", 
        { 
            leaves
        });
    } 
    catch (error) 
    {
        console.log("Get all leave requests error", error);
        next(error);
    }
}



export const viewLeaveHistory = async (req, res, next) => {

    try 
    { 
        const employeeId = req.params.id;
        if(!employeeId)
        {
            return AppError(res, "Employee not exist!", HTTP_STATUS.NOT_FOUND);
        }

        //Mongoose automatically cast string to ObjectId 
        //Returns all documents where condition is matched
        const leaves = await Leave.find({employee: employeeId});

        if(leaves.length === 0)
        {
            return AppResponse(res, HTTP_STATUS.OK, true, "Employee does no have any leaves yet!", 
            { 
                leaves
            });
        }

        return AppResponse(res, HTTP_STATUS.OK, true, "All Leave requests for employee fetched successfully.", 
        { 
            leaves
        });
    } 
    catch (error) 
    {
        console.log("Get leave requests for employee error", error);
        next(error);
    }
}



export const approveLeave = async (req, res, next) => {

    try 
    { 
        const leaveId = req.params.id;

        //Mongoose automatically cast string to ObjectId 
        //Returns all documents where condition is matched
        const leave = await Leave.findByIdAndUpdate(
            leaveId,
            { leaveStatus: "approved" },
            { new: true }
        );

        if (!leave) {
            return AppError(res, "Leave does not exist!", HTTP_STATUS.NOT_FOUND);
        }

        return AppResponse(res, HTTP_STATUS.OK, true, "Leave approved successfully.", leave);
    } 
    catch (error) 
    {
        console.log("Approve leave request error", error);
        next(error);
    }
}



export const rejectLeave = async (req, res, next) => {

    try 
    { 
        const leaveId = req.params.id;
        //Mongoose automatically cast string to ObjectId 
        //Returns all documents where condition is matched
        const leave = await Leave.findByIdAndUpdate(
            leaveId,
            { leaveStatus: "rejected" },
            { new: true }
        );

        if (!leave) {
            return AppError(res, "Leave does not exist!", HTTP_STATUS.NOT_FOUND);
        }

        return AppResponse(res, HTTP_STATUS.OK, true, "Leave rejected successfully.", leave);
    } 
    catch (error) 
    {
        console.log("Reject leave request error", error);
        next(error);
    }
}
