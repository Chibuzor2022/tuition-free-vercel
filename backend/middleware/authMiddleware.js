import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

// Middleware to protect private routes
const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Check for token in httpOnly cookie first
  if (req.cookies && req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  // Fallback: Check for token in Authorization header (for tools like Postman)
  else if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  // If no token found
  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // req.user = await User.findById(decoded.id).select("-password");
   req.user = await User.findById(decoded.userId || decoded._id).select("-password");
    
    next();

  } catch (error) {
    res.status(401);
    throw new Error("Not authorized, token failed");
  }
});

// const protect = async (req, res, next) => {
//   let token;

//   try {
//     token = req.cookies.token; // your httpOnly cookie

//     if (!token) {
//       return res.status(401).json({ message: "Not authorized, no token" });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     req.user = await User.findById(decoded.id).select("-password");
//     if (!req.user) {
//       return res.status(401).json({ message: "User not found" });
//     }

//     next();
//   } catch (error) {
//     console.error(error);
//     res.status(401).json({ message: "Not authorized, token failed" });
//   }
// };

// Middleware to allow only admin users
const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as an admin");
  }
};

export { protect, admin };

