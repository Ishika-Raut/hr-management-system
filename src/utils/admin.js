import bcrypt from "bcryptjs";
import User from "../models/userModel.js";
import mongoose from "mongoose";

export const createSuperAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);

    const adminEmail = "admin@yopmail.com";

    // Check if super admin exists
    const existingAdmin = await User.findOne({ role: "admin" });

    if (existingAdmin) {
      // Do nothing if super admin exists
      return;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash("admin", 10);

    // Create super admin
    await User.create({
      name: "Admin",
      email: adminEmail,
      password: hashedPassword,
      role: "admin", // Must match your schema enum
    });

    console.log("Amin created successfully!");
  } catch (error) {
    console.error("Error creating Admin:", error);
  }
};