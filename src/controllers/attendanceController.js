// employee check-in
//  - check duplicate attendance, if not 
//  - set checkin time
//  - mark its attendance as "present" and store checkin time
     

import Attendance from "../models/attendanceModel.js";
import { AppError } from "../utils/apiError.js";
import { AppResponse } from "../utils/apiResponse.js";
import HTTP_STATUS from "../utils/httpStatusCodes.js";

export const checkIn = async (req, res, next) => {

    try 
    {
        //employee id is extracted from token ( coming from auth middleware)
        const employeeId = req.user.id;  
        console.log("employeeId = ", employeeId);

        const startDay = new Date();
        startDay.setHours(0, 0, 0, 0);

        const endDay = new Date();
        endDay.setHours(23, 59, 59, 59);

        const isCheckedIn = await Attendance.findOne({
            employee: employeeId,
            date: {$gte: startDay, $lte: endDay}
        });
        if(isCheckedIn)
        {
            return AppError(res, `Already checked in !!`, HTTP_STATUS.CONFLICT);
        }

        const now = new Date();

        const attendance = await Attendance.create({
            employee: employeeId,
            checkInTime: now,
            status: "present" 
        });

        return AppResponse(res, HTTP_STATUS.OK, true, "Checked in successfully", attendance);
    }
    catch (error)
    {
        console.log("Checkin error", error);
        next(error);
    }
}


// employee check-out
//  - find today's attendance
//  - check employee if checked-in, if not then store status as "absent"
//  - set checkout time
//  - calculate working hrs in mins and mark attendance as "present"/ "half-day"

export const checkOut = async (req, res, next) => {

    try 
    {
        //employee id is extracted from token ( coming from auth middleware)
        const employeeId = req.user.id;  
        console.log("employeeId = ", employeeId);

        const startDay = new Date();
        startDay.setHours(0, 0, 0, 0);

        const endDay = new Date();
        endDay.setHours(23, 59, 59, 59);

        const todayAttendance = await Attendance.findOne({
            employee: employeeId,
            date: {$gte: startDay, $lte: endDay}
        });

        if(!todayAttendance)
        {
            const attendance = await Attendance.create({
                employee: employeeId,
                date: now,
                status: "absent" 
            });

            return AppResponse(res, HTTP_STATUS.OK, true, "Checked in successfully", attendance);
        }

        if(todayAttendance.checkOutTime)
        {
            return AppError(res, `Already checked out !!`, HTTP_STATUS.CONFLICT);
        }

        const now = new Date();

        todayAttendance.checkOutTime = now;

        const difference = todayAttendance.checkOutTime - todayAttendance.checkInTime;
        const hours = difference / (1000 * 60 * 60)
        todayAttendance.workingHours = hours;

        if (hours < 4) {
            todayAttendance.status = "half-day";
        } else {
            todayAttendance.status = "present";
        }

        await todayAttendance.save();

        return AppResponse(res, HTTP_STATUS.OK, true, "Checked out successfully", todayAttendance);
    } 
    catch (error) 
    {
        console.log("Checkout error", error);
        next(error);
    }
}



export const viewAttendance = async (req, res, next) => {

    try 
    {
        const attendance = await Attendance.find();

        return AppResponse(res, HTTP_STATUS.OK, true, "Attendance fetched successfully.", 
        { 
            attendance
        });
    } 
    catch (error)
    {
        console.log("Get attendance error", error);
        next(error);
    }
} 



