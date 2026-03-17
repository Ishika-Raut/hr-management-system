import { AppError } from "../utils/apiError.js";
import HTTP_STATUS from "../utils/httpStatusCodes.js";
import jwt from "jsonwebtoken";

export const authenticate =(req, res, next) => {

    try 
    {
        console.log("authorization = ", req.headers.authorization);
        //Extract header from req
        const authHeader =  req.headers.authorization;

        //check if authHeader is undefined or empty 
        //check if authHeader follows/uses Bearer scheme
        if(!authHeader || !authHeader.startsWith("Bearer "))
        {
            return  AppError(res, "Unauthorized user!", HTTP_STATUS.UNAUTHORIZED);
        }

        //Authorization: "Bearer qhedhbfjh@#%$dsnsd354" --> "Bearer Token"
        //split string by space and convert it into array 
        //[1] means extracting 2nd element from array --> which is Token
        let token = authHeader.split(" ")[1];
        console.log("Token = ", token);

        if(!token)
        {
            return AppError(res, "Token not found!", HTTP_STATUS.UNAUTHORIZED);
        }

        const decode = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decode;

        next();
    } 
    catch (error) 
    {
        console.log("Authenicate middleware error!", error);
        next(error)
    }
}



export const authorize = (...roles) => {

    return(req, res, next) => {
        //user role is extracted from token (coming from authenticate middleware)
        const role = req.user.role;  

        if(!roles.includes(role))
        {
            return AppError(res, "Access denied!", HTTP_STATUS.FORBIDDEN)    ;
        }
        next();
    };
}