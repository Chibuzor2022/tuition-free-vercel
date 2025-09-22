
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
  "https://tuition-free-world.onrender.com", // deployed frontend
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





// // import "dotenv/config";
// import express from "express";
// import connectDB from "./config/db.js";
// import userRoutes from "./routes/userRoutes.js"
// import cors from "cors"
// import cookieParser from "cookie-parser";
// import authRoutes from "./routes/authRoutes.js";
// import scholarshipRoutes from "./routes/scholarshipRoutes.js";
// import uploadRoutes from "./routes/uploadRoutes.js"
// import { notFound, errorHandler } from './middleware/errorMiddleware.js';
// import path from "path"
// import mongoose from "mongoose";
// import { fileURLToPath } from "url";


// import { dirname, resolve } from 'path';

// ;

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);


// // Connect to DB
// connectDB();

// const app = express();

// // Middleware
// app.use(express.json());
// app.use(cookieParser())

// const allowedOrigins = [
//   'http://localhost:5173',
//   'https://tuition-free-world.onrender.com/',
// ];

// app.use(cors({
//   origin: function (origin, callback) {
//     if (!origin || allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
//   credentials: true,
// }));
 

// // API routes
// app.get("/api", (req, res) => {
//   res.json({ message: "Hello from backend!" });
// });

// // MongoDB connection
// mongoose.connect(process.env.MONGO_URI)
//   .then(() => console.log("MongoDB Connected"))
//   .catch(err => console.log(err));


// // Serve frontend (for production)
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "../frontend/dist")));

//   app.get(/.*/, (req, res) =>
//     res.sendFile(path.resolve(__dirname, "../frontend/dist/index.html"))
//   );
// }


// // Routes
// app.use("/api/scholarships", scholarshipRoutes);
// app.use("/api/auth", authRoutes);
// app.use("/api/upload", uploadRoutes);
// app.use("/api/users", userRoutes);

// // Error handling middleware
// app.use(notFound);
// app.use(errorHandler);



// // Start server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`🚀 Server running on port ${PORT}`);
// });


