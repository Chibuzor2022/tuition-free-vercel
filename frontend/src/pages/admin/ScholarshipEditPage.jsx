

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  useGetScholarshipByIdQuery,
  useUpdateScholarshipMutation,
} from '../../redux/scholarshipApi';
import ImageUploader from '../../components/ImageUploader'; // Component for handling image uploads

const ScholarshipEditPage = () => {
  const { id: scholarshipId } = useParams(); // Extract scholarship ID from URL
  const navigate = useNavigate();

  // Local state for form fields
  const [images, setImages] = useState([]);
  const [name, setName] = useState('');
  const [country, setCountry] = useState('');
  const [deadline, setDeadline] = useState('');
  const [eligibility, setEligibility] = useState('');
  const [level, setLevel] = useState('');
  const [funding, setFunding] = useState([]);
  const [description, setDescription] = useState('');
  const [link, setLink] = useState('');

  // Fetch scholarship details by ID
  const {
    data: scholarship,
    isLoading,
    error,
  } = useGetScholarshipByIdQuery(scholarshipId);

  // Mutation hook for updating scholarship
  const [updateScholarship, { isLoading: loadingUpdate }] =
    useUpdateScholarshipMutation();

  // Handle form submission
  const submitHandler = async (e) => {
    e.preventDefault();

    // Log scholarship data for debugging
    console.log("📤 Sending Scholarship Data:", {
      id: scholarshipId,
      images,
      name,
      country,
      deadline,
      eligibility,
      level,
      funding,
      link,
      description,
      
    });

    try {
      // Send update request to server
      await updateScholarship({
      id: scholarshipId,
      images,
      name,
      country,
      deadline,
      eligibility,
      level,
      funding,
      link,
      description,
      }).unwrap();

      toast.success('Scholarship updated');
      navigate('/admin/scholarships');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  // Populate form fields when scholarship is loaded
  useEffect(() => {
    if (scholarship) {
      setImages(scholarship.images || []);
      setName(scholarship.name);
      setCountry(scholarship.country);
      setDeadline(scholarship.deadline);
      setFunding(scholarship.funding);
      setLevel(scholarship.level);
      setEligibility(scholarship.eligibility);
      setLink(scholarship.link);
      setDescription(scholarship.description);
    }
  }, [scholarship]);

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-md mt-6">
      <h1 className="text-2xl font-bold mb-4">Edit Scholarship</h1>

      {isLoading ? (
        <div className="text-center text-gray-600">Loading...</div>
      ) : error ? (
        <div className="text-center text-red-600">Failed to load Scholarship</div>
      ) : (
        <form onSubmit={submitHandler} className="space-y-4">
           {/* Images */}
          <div>
            <label className="block text-sm font-medium">Images</label>
            <ImageUploader images={images} setImages={setImages} />
          </div>

          {/* Scholarship Name */}
          <div>
            <label className="block text-sm font-medium">Name</label>
            <input
              type="text"
              className="w-full mt-1 p-2 border border-gray-300 rounded"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/*Country */}
          <div>
            <label className="block text-sm font-medium">Country</label>
            <input
              type="text"
              className="w-full mt-1 p-2 border border-gray-300 rounded"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
            />
          </div>
          {/* Deadline */}
          <div>
            <label className="block text-sm font-medium">Deadline</label>
            <input
              type="text"
              className="w-full mt-1 p-2 border border-gray-300 rounded"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              required
            />
          </div>

          {/*Eligibility */}
          <div>
            <label className="block text-sm font-medium">Eligibility</label>
            <input
              type="text"
              className="w-full mt-1 p-2 border border-gray-300 rounded"
              value={eligibility}
              onChange={(e) => setEligibility(e.target.value)}
              required
            />
          </div>

          {/* Level */}
          <div>
            <label className="block text-sm font-medium">Level</label>
            <input
              type="text"
              className="w-full mt-1 p-2 border border-gray-300 rounded"
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              required
            />
          </div>

           {/* funding */}
          <div>
            <label className="block text-sm font-medium">Funding</label>
            <input
              type="text"
              className="w-full mt-1 p-2 border border-gray-300 rounded"
              value={funding}
              onChange={(e) => setFunding(e.target.value)}
              required
            />
          </div>

              {/* link */}
          <div>
            <label className="block text-sm font-medium">Link</label>
            <input
              type="text"
              className="w-full mt-1 p-2 border border-gray-300 rounded"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium">Description</label>
            <textarea
              className="w-full mt-1 p-2 border border-gray-300 rounded"
              rows="4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loadingUpdate}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {loadingUpdate ? 'Updating...' : 'Update Scholarship'}
          </button>
        </form>
      )}
    </div>
  );
};

export default ScholarshipEditPage;









// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import {
//   useGetScholarshipByIdQuery,
//   useUpdateScholarshipMutation,
// } from "../../redux/scholarshipApi";

// const ScholarshipEditPage = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   // Fetch existing scholarship
//   const { data: scholarship, isLoading, isError } = useGetScholarshipByIdQuery(id);

//   // Mutation
//   const [updateScholarship, { isLoading: isUpdating }] =
//     useUpdateScholarshipMutation();

//   // Local state for form fields
//   const [formData, setFormData] = useState({
//     name: "",
//     description: "",
//     deadline: "",
//     amount: "",
//     image: "",
//   });

//   // Populate form when scholarship data is loaded
//   useEffect(() => {
//     if (scholarship) {
//       setFormData({
//         name: scholarship.name || "",
//         description: scholarship.description || "",
//         deadline: scholarship.deadline?.substring(0, 10) || "", // format YYYY-MM-DD
//         amount: scholarship.amount || "",
//         image: scholarship.image || "",
//       });
//     }
//   }, [scholarship]);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await updateScholarship({ id, ...formData }).unwrap();
//       navigate("/admin/scholarship"); // redirect back to list
//     } catch (error) {
//       console.error("Update failed", error);
//     }
//   };

//   if (isLoading) return <p>Loading scholarship...</p>;
//   if (isError) return <p>Error loading scholarship.</p>;

//   return (
//     <div className="max-w-2xl mx-auto p-6 bg-white shadow rounded">
//       <h1 className="text-2xl font-bold mb-6">Edit Scholarship</h1>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label className="block font-medium">Name</label>
//           <input
//             type="text"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             className="w-full border p-2 rounded"
//             required
//           />
//         </div>

//         <div>
//           <label className="block font-medium">Description</label>
//           <textarea
//             name="description"
//             value={formData.description}
//             onChange={handleChange}
//             className="w-full border p-2 rounded"
//             rows="4"
//             required
//           />
//         </div>

//         <div>
//           <label className="block font-medium">Deadline</label>
//           <input
//             type="date"
//             name="deadline"
//             value={formData.deadline}
//             onChange={handleChange}
//             className="w-full border p-2 rounded"
//             required
//           />
//         </div>

//         <div>
//           <label className="block font-medium">Amount ($)</label>
//           <input
//             type="number"
//             name="amount"
//             value={formData.amount}
//             onChange={handleChange}
//             className="w-full border p-2 rounded"
//             required
//           />
//         </div>

//         <div>
//           <label className="block font-medium">Image URL</label>
//           <input
//             type="text"
//             name="image"
//             value={formData.image}
//             onChange={handleChange}
//             className="w-full border p-2 rounded"
//           />
//           {formData.image && (
//             <img
//               src={formData.image}
//               alt="Scholarship"
//               className="mt-2 w-32 h-32 object-cover rounded"
//             />
//           )}
//         </div>

//         <button
//           type="submit"
//           className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
//           disabled={isUpdating}
//         >
//           {isUpdating ? "Updating..." : "Update Scholarship"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default ScholarshipEditPage;
// // 