import User from "../models/userModel.js";
import {AppError} from "../utils/apiError.js";
import {AppResponse} from "../utils/apiResponse.js";
import { generateToken } from "../utils/generateToken.js";
import HTTP_STATUS from "../utils/httpStatusCodes.js";
import bcrypt from "bcryptjs"

export const register = async (req, res, next) => {

    try 
    {
        const { name, email, password } = req.body;
        if(name === null || email === null || password === null)
        {
            return AppError("All fields are required!", HTTP_STATUS.BAD_REQUEST);
        }

        const existingUser = await User.findOne({email});
        if(existingUser)
        {
            return AppError(`User already exist with ${email}`, HTTP_STATUS.CONFLICT);
        }

        // using salt- A salt is a random string that is unique to each user.
        // It's combined with the password before hashing to ensure that 
        // even if two users have the same password, their hashes will be different.
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        // create() method 
        //  - internally creates instance for document
        //  - automatically runs db validators
        //  - internally calls save() to save data in db
        let newUser = await User.create({
            name,
            email,
            password: hashedPassword
        });

        return AppResponse(res, HTTP_STATUS.CREATED, true, "User registered successfully.",
            {
                name: newUser.name,
                email: newUser.email,
                role: newUser.role           
            } );
    } 
    catch (error) 
    {
        console.log("User register error!", error);
        next(error);
    }
}


export const login = async(req, res, next) => {

    try 
    {
        const { email, password } = req.body;
        if(email === null || password === null)
        {
            return AppError("All fields are required!", HTTP_STATUS.BAD_REQUEST);
        }

        const user = await User.findOne({email});
        if(!user)
        {
            return AppError(`User does not exist with ${email}`, HTTP_STATUS.CONFLICT);
        }

        const matchedPassword = await bcrypt.compare(password, user.password)
        if(!matchedPassword)
        {
             return AppError(`Invalid Password!`, HTTP_STATUS.UNAUTHORIZED);
        }

        const token = generateToken(user._id, user.role);

        return AppResponse(res, HTTP_STATUS.OK, true, "User logged in successfully.", 
            { 
                name: user.name,
                email: user.email,
            } , 
            { token });
    } 
    catch (error) 
    {
        console.log("User login error", error);
        next(error);
    }
}


/*
save() Method - const user = new User(req.body);  - First modifying data data then save karna hai 
                await user.save();

Pehle document ka instance banate ho
Phir .save() call karte ho
Validators automatically run hote hain
Middleware (pre/post save) bhi run hota hai


*/




export const getUsers = async (req, res) => {

  try 
  {
    const users = await User.find().select("-password");

    return AppResponse(res, HTTP_STATUS.OK, true, "Users fetched successfully.", 
        { 
            users
        } 
    );
  } 
  catch (error) 
  {
    console.log("Users fetch error", error);
    next(error);
  }

};