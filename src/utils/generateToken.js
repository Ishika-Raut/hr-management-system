import jwt from "jsonwebtoken"

export const generateToken = (id, role) => {

    try 
    {
        const options = { expiresIn: "7d" };
        const token = jwt.sign({id, role}, process.env.JWT_SECRET, options)
        return token;
    } 
    catch (error) 
    {
        console.log("Token generation error!", error);
        next(error);
    }
}