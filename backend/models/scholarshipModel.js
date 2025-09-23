import mongoose from "mongoose";

const scholarshipSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  country: { type: String, required: true },
  deadline: { type: Date, required: true },
  eligibility: { type: String, required: true },
  funding: { type: [String], required: true },
 level: { type: String, required: true },
  link: { type: String, required: true },
  images: {  type: [String],  default: [],

},
});

const Scholarship = mongoose.model("Scholarship", scholarshipSchema);
export default Scholarship;


