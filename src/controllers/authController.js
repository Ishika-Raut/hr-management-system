import User from "../models/userModel.js";
import AppError from "../utils/apiError.js";
import AppResponse from "../utils/apiResponse.js";
import HTTP_STATUS from "../utils/httpStatusCodes.js";
import bcrypt from "bcryptjs"

export const register = async (req, res, next) => {

    try 
    {
        const { name, email, password } = req.body;

        if(name === null || email === null || password === null)
        {
            return next(AppError("All fields are required!", HTTP_STATUS.BAD_REQUEST, false));
        }

        const existingUser = await User.findOne({email});
        if(existingUser)
        {
            return next(AppError(`User already exists with ${email}`, HTTP_STATUS.CONFLICT, false));
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        let newUser = await User.create({
            name,
            email,
            password: hashedPassword
        });

        return AppResponse( res, HTTP_STATUS.CREATED, true, "User registered successfully", newUser );
    } 
    catch (error) 
    {
        console.log("User register error", error);
        next(error);
    }
}