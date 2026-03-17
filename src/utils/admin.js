import bcrypt from "bcryptjs";
import User from "../models/userModel.js";
import mongoose from "mongoose";

//one-time seed script - This avoids hardcoding credentials, runs only when you want it
//Run once per environment (local).
export const createAdmin = async () => {
  try 
  {
    await mongoose.connect(process.env.MONGO_URL);

    // Check if admin exists
    const existingAdmin = await User.findOne({ role: "admin", email: process.env.ADMIN_EMAIL });

    if (existingAdmin) 
    {
      // Do nothing if admin exists
      await mongoose.connection.close();
      return;
    }

    const password=process.env.ADMIN_PASSWORD;
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create super admin
    // create method creates and saves user automatically. - // automatically runs db validators
    await User.create({
      name: "Admin",
      email: process.env.ADMIN_EMAIL,
      password: hashedPassword,
      role: "admin", // Must match with schema enum
    });

    console.log("Admin created successfully.");
  } 
  catch (error) 
  {
    console.error("Error creating Admin:", error);
  }
  finally 
  {
    await mongoose.connection.close();
  }
};


/**
 * 
 * 
 * const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') return next();
  return res.status(403).json({ message: 'Access denied: Admins only' });
};

// Usage
router.get('/dashboard', protect, isAdmin, adminController.getStats);
 */