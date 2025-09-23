// import express from 'express';
// import {
//   getScholarships,
//   getScholarshipById,
//   createScholarship,
//   updateScholarship,
//   deleteScholarship
// } from '../controllers/scholarshipController.js';
// import { protect, admin } from '../middleware/authMiddleware.js';

// const router = express.Router();

// // Public routes
// router.get('/', getScholarships);
// router.get('/:id', getScholarshipById);

// // Admin protected routes
// router.post('/', protect, admin, createScholarship);
// router.put('/:id', protect, admin, updateScholarship);
// router.delete('/:id', protect, admin, deleteScholarship);

// export default router;




import express from "express";
import {
  createScholarship,
  getScholarships,
  getScholarshipById,
  updateScholarship,
  deleteScholarship,
  searchScholarships
} from "../controllers/scholarshipController.js";
import { protect } from "../middleware/authMiddleware.js";
import { upload } from "../middleware/uploadMiddleware.js";

const router = express.Router();


// ✅ Create scholarship with image upload
router.post("/", protect, upload.single("image"), createScholarship);

// ✅ Get all scholarships
router.get("/", getScholarships);

// ✅ Search scholarships (MUST come before :id)
router.get("/search", searchScholarships);

// ✅ Get single scholarship
router.get("/:id", getScholarshipById);

// ✅ Update scholarship (with optional image upload)
router.put("/:id", protect, upload.single("image"), updateScholarship);

// ✅ Delete scholarship
router.delete("/:id", protect, deleteScholarship);


export default router;
