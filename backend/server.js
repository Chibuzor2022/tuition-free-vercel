
import express from "express";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import scholarshipRoutes from "./routes/scholarshipRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import path, { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";

// Setup dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());

// Allowed origins for CORS
const allowedOrigins = [
  "http://localhost:5173", // local frontend
  "https://your-frontend.vercel.app", // deployed frontend
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// API routes
app.get("/api", (req, res) => {
  res.json({ message: "Hello from backend!" });
});

app.use("/api/scholarships", scholarshipRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/users", userRoutes);

// MongoDB connection (extra safety, though already in connectDB)
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Serve frontend in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  // Catch-all for React Router (must come after API routes & static files)
  app.get(/.*/, (req, res) =>
    res.sendFile(path.resolve(__dirname, "../frontend/dist/index.html"))
  );
}

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

 export default app; // ✅ required for Vercel





// import express from "express";
// import mongoose from "mongoose";
// import dotenv from "dotenv";
// import scholarshipRoutes from "./routes/scholarshipRoutes.js";
// import cors from "cors";

// dotenv.config();
// const app = express();

// app.use(express.json());

// // ✅ CORS setup (auto switch between localhost & Vercel)
// const allowedOrigins = [
//   "http://localhost:5173",
//   "https://tuition-free-world.vercel.app",
// ];

// app.use(
//   cors({
//     origin: (origin, callback) => {
//       // allow requests with no origin (like Postman or server-to-server)
//       if (!origin) return callback(null, true);

//       if (allowedOrigins.includes(origin)) {
//         callback(null, true);
//       } else {
//         callback(new Error(`Not allowed by CORS: ${origin}`));
//       }
//     },
//     credentials: true,
//   })
// );

// // Routes
// app.use("/api/scholarships", scholarshipRoutes);

// // Health check
// app.get("/api", (req, res) => {
//   res.send("API is running...");
// });

// // // Start server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`🚀 Server running on port ${PORT}`);
// });

// // MongoDB connection
// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => console.log("✅ MongoDB connected"))
//   .catch((err) => console.error("❌ MongoDB connection error:", err));

// export default app; // ✅ required for Vercel






// backend/server.js
// import express from "express";
// import dotenv from "dotenv";
// import mongoose from "mongoose";
// import cors from "cors";
// import bcrypt from "bcryptjs";
// import Scholarship from "./models/scholarshipModel.js";
// import User from "./models/userModel.js";

// dotenv.config();

// const app = express();
// app.use(cors({ origin: "http://localhost:5173", credentials: true })); // adjust frontend port
// app.use(express.json());

// // --- MongoDB Connection ---
// const connectDB = async () => {
//   try {
//     const conn = await mongoose.connect(process.env.MONGO_URI);
//     console.log(`MongoDB Connected: ${conn.connection.host}`);
//   } catch (error) {
//     console.error(`Error: ${error.message}`);
//     process.exit(1);
//   }
// };
// connectDB();

// // --- Auth Routes ---
// app.post("/api/auth/login", async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const user = await User.findOne({ email });
//     if (user && bcrypt.compareSync(password, user.password)) {
//       res.json({
//         _id: user._id,
//         name: user.name,
//         email: user.email,
//         isAdmin: user.isAdmin,
//       });
//     } else {
//       res.status(401).json({ message: "Invalid email or password" });
//     }
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// // --- Scholarship Routes ---
// app.get("/api/scholarships", async (req, res) => {
//   const pageSize = 10;
//   const page = Number(req.query.pageNumber) || 1;

//   const count = await Scholarship.countDocuments();
//   const scholarships = await Scholarship.find()
//     .limit(pageSize)
//     .skip(pageSize * (page - 1));

//   res.json({ scholarships, page, pages: Math.ceil(count / pageSize) });
// });

// app.post("/api/scholarships", async (req, res) => {
//   const { name, description, country, deadline, eligibility, funding, level } =
//     req.body;
//   try {
//     const scholarship = new Scholarship({
//       name,
//       description,
//       country,
//       deadline,
//       eligibility,
//       funding,
//       level,
//     });
//     const created = await scholarship.save();
//     res.status(201).json(created);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// // --- Start server ---
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`🚀 Server running on port ${PORT}`);
// });
