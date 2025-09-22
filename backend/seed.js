import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import User from "./models/userModel.js";
import connectDB from "./config/db.js";

dotenv.config();
connectDB();

const seedAdmin = async () => {
  try {
    const adminExists = await User.findOne({ email: "admin@example.com" });
    if (adminExists) {
      console.log("Admin already exists");
      process.exit();
    }

    const password = await bcrypt.hash("ekude123456", 10);

    const admin = await User.create({
      name: "Admin",
      email: "admin@example.com",
      password,
      isAdmin: true,
    });

    console.log("Admin created:", admin.email);
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedAdmin();
