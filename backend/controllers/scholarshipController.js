
import asyncHandler from "express-async-handler";
import Scholarship from "../models/scholarshipModel.js"

// @desc    Fetch all scholarships
// @route   GET /api/scholarships
// @access  Public
const getScholarships = asyncHandler(async (req, res) => {
  const pageSize = Number(req.query.pageSize) || 8;
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {};

  const count = await Scholarship.countDocuments({ ...keyword });
  const scholarships = await Scholarship.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({
   scholarships,
    page,
    pages: Math.ceil(count / pageSize),
  });
});


// @desc    Search Scholarships
// @route   GET /api/search
// @access  Public
const 	searchScholarships = asyncHandler(async (req, res) => {
  const keyword = req.query.keyword
    ? {
        $or: [
          { name: { $regex: req.query.keyword, $options: "i" } },
          { description: { $regex: req.query.keyword, $options: "i" } },
          { country: { $regex: req.query.keyword, $options: "i" } },
          { level: { $regex: req.query.keyword, $options: "i" } },
        ],
      }
    : {};

  const scholarships = await Scholarship.find({ ...keyword });
  res.json(scholarships);
});

// @desc    Fetch single scholarship by ID
// @route   GET /api/scholarships/:id
// @access  Public
const getScholarshipById = asyncHandler(async (req, res) => {
	const scholarship = await Scholarship.findById(req.params.id);

	if (scholarship) {
		res.json(scholarship);
	} else {
		res.status(404);
		throw new Error("Scholarship not found");
	}
});

// @desc    Delete a scholarship
// @route   DELETE /api/scholarships/:id
// @access  Private/Admin
const deleteScholarship = asyncHandler(async (req, res) => {
	const scholarship = await Scholarship.findById(req.params.id);

	if (scholarship) {
		await Scholarship.deleteOne({ _id: scholarship._id });
		res.status(200).json({ message: "Scholarship deleted" });
	} else {
		res.status(404);
		throw new Error("Scholarship not found");
	}
});

// @desc    Create a scholarship
// @route   POST /api/scholarships
// @access  Private/Admin
// const createScholarship = asyncHandler(async (req, res) => {
// 	const scholarship = new Scholarship({
//   name: "Sample name",
//   description: "Sample desc",
//   country: "Sample country",
//   deadline: new Date("2025-12-31"),   // ✅ valid Date
//   funding: ["Sample benefit 1", "Sample benefit 2"], // ✅ array of strings
//   eligibility: "Sample eligibility",
//   level: "Sample level",
//   link: "https://example.com",
//   images: [],
//   user: req.user._id,
// });

// 	const createdScholarship = await scholarship.save();
// 	res.status(201).json(createdScholarship);
// });


 const createScholarship = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const { name, description, country, deadline, eligibility, funding, level, link } = req.body;

    const scholarship = new Scholarship({
      name,
      description,
      country,
      deadline,
      eligibility,
      funding,
      level,
      link,
      createdBy: req.user._id, // safe now
    });

    const createdScholarship = await scholarship.save();
    res.status(201).json(createdScholarship);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error creating scholarship" });
  }
};

// @desc    Update a scholarship
// @route   PUT /api/scholarships/:id
// @access  Private/Admin
const updateScholarship = asyncHandler(async (req, res) => {
  console.log(" Incoming req.body:", req.body); 
  const {
    	name,
		  description,
    	country,
      deadline,
		  funding,
		  eligibility,
	    level,
		  link,
		  images,
	  } = req.body;

  const scholarship= await Scholarship.findById(req.params.id);

  if (!scholarship) {
    res.status(404);
    throw new Error("Scholarship not found");
  }

  // Update only if values are provided
  if (name) scholarship.name = name;
  if (description) scholarship.description = description;
  if (country) scholarship.country = country;
  if (deadline) scholarship.deadline = deadline;
  if (funding) scholarship.funding = funding;
  if (eligibility) scholarship.eligibility = eligibility;
  if (level) scholarship.level = level;
  if (link) scholarship.link = link;
  if (images && images.length > 0) scholarship.images = images;
  

  const updatedScholarship = await scholarship.save();
  res.json(updatedScholarship);
});

export {
	getScholarships,
	searchScholarships,
	getScholarshipById,
	deleteScholarship,
	createScholarship,
	updateScholarship,
};
