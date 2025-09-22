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
