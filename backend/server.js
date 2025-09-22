
if (process.env.NODE_ENV !== "production") {
  import("dotenv/config");
}
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js"
import cors from "cors"
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";
import scholarshipRoutes from "./routes/scholarshipRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js"
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import path from "path"
import mongoose from "mongoose";

// Connect to DB
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser())

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));


// API routes
app.get("/api", (req, res) => {
  res.json({ message: "Hello from backend!" });
});

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));


// Serve frontend (for production)
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "../frontend/dist")));
app.get(/.*/,  (req, res) =>
  res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
);


// Routes
app.use("/api/scholarships", scholarshipRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/users", userRoutes);

// Error handling middleware
app.use(notFound);
app.use(errorHandler);



// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});


