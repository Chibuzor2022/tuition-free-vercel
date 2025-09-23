import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import Scholarship from "./models/scholarshipModel.js"; // adjust path if needed
import User from "./models/userModel.js"; // adjust path if needed

dotenv.config();

// Arrays to generate random scholarships
const scholarshipNames = [
  "Global Excellence", "Tech Innovators", "Masters Leadership", "Future Leaders", 
  "Bright Minds", "NextGen Scholars", "Academic Achievers", "International Scholars",
  "STEM Pioneers", "World Scholars", "Global Talent", "Innovation Award", "Young Leaders",
  "Excellence in Research", "Future Scientists", "Creative Minds", "Leadership Award",
  "Global Ambassadors", "Academic Merit", "Visionary Scholars"
];

const countries = ["USA", "UK", "Canada", "Australia", "Germany", "France", "Netherlands", "Sweden"];
const levels = ["Undergraduate", "Postgraduate", "PhD"];

const generateRandomDate = () => {
  const start = new Date();
  const end = new Date();
  end.setFullYear(end.getFullYear() + 1);
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

// Generate 50 scholarships
const scholarships = Array.from({ length: 50 }).map((_, i) => ({
  name: `${scholarshipNames[i % scholarshipNames.length]} Scholarship ${i + 1}`,
  description: "This is a dummy description for testing scholarships.",
  country: countries[i % countries.length],
  deadline: generateRandomDate(),
  eligibility: "Open to all eligible students.",
  funding: ["Tuition", "Accommodation", "Living expenses"],
  level: levels[i % levels.length],
  link: "https://example.com/scholarship",
}));

// Admin user
const adminUser = {
  name: "Admin User",
  email: "admin@example.com",
  password: bcrypt.hashSync("Admin@123", 10), // hashed password
  isAdmin: true,
};

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");

    // Clear existing data
    await Scholarship.deleteMany();
    await User.deleteMany();

    // Insert data
    await Scholarship.insertMany(scholarships);
    await User.create(adminUser);

    console.log("Database seeded with 50 scholarships and admin user!");
    console.log("Admin credentials:");
    console.log("Email: admin@example.com");
    console.log("Password: Admin@123");

    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedDB();
