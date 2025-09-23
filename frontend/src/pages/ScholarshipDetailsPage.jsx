import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; 
// import axios from 'axios'; // Import axios for API requests
import ReactMarkdown from "react-markdown";
import api from '../api/axios';

function ScholarshipDetails() {
  const { id } = useParams(); // Extract the scholarship ID from the route
  
  // Component state for scholarship data, loading, errors, and quantity
  const [scholarship, setScholarship] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  

  // Fetch scholarship data when the component mounts or `id` changes
  useEffect(() => {
   
    const fetchScholarship = async () => {
  try {
    const response = await api.get(
      `${import.meta.env.VITE_API_URL}/scholarships/${id}`,
      { withCredentials: true } // ✅ needed for cookies
    );
    setScholarship(response.data);
  } catch (err) {
    setError(err.response?.data?.message || 'Failed to fetch scholarship data');
  } finally {
    setLoading(false);
  }
};
    // Call the fetch function

    fetchScholarship();
  }, [id]);
 

  // Show loading state
  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  // Show error state
  if (error) {
    return <div className="text-center mt-10 text-red-500">Error: {error}</div>;
  }

  // Handle case where scholarship is not found
  if (!scholarship) {
    return <div className="text-center mt-10">Scholarshipnot found.</div>;
  }

  // Main UI rendering

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      {/* Title */}
      <h1 className="text-3xl font-bold mb-4">{scholarship.name}</h1>
      <p className="text-gray-500 mb-2">
        <span className="font-semibold">Deadline:</span>{" "}
        {new Date(scholarship.deadline).toLocaleDateString()}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-6">
        <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm">
          {scholarship.level}
        </span>
        <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm">
          {scholarship.country}
        </span>
      </div>

      {/* Image */}
      {scholarship.images?.length > 0 && (
        <img
          src={scholarship.images[0]}
          alt={scholarship.name}
          className="rounded-lg shadow-md mb-6 w-full h-64 object-cover"
        />
      )}

      {/* Description */}
      {/* <p className="text-lg text-gray-700 mb-6">{scholarship.description}</p> */}
      <h1  className='text-shadow-blue-600 text-3xl mb-5'>Scholarship Details</h1>
       <ReactMarkdown>{scholarship.description}</ReactMarkdown>

      {/* Benefits */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Funding</h2>
        <ul className="list-disc pl-6 text-gray-700">
          {Array.isArray(scholarship.funding)
            ? scholarship.funding.map((b, idx) => <li key={idx}>{b}</li>)
            : <li>{scholarship.funding}</li>}
        </ul>
      </div>

      {/* Eligibility */}
      {/* <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Eligibility</h2>
        <ul className="list-disc pl-6 text-gray-700">
          {scholarship?.eligibility?.map((req, idx) => (
            <li key={idx}>{req}</li>
          ))}
        </ul>
      </div> */}

      {/* Apply Button */}
      <a
        href={scholarship.link}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
      >
        Apply Now
      </a>
    </div>
  );


  // return (
  //   <div className="max-w-4xl mx-auto p-6 flex flex-col">
  //     <div className="flex flex-col md:flex-row gap-6">

  //     <img
  //         src={scholarship.images?.[0] || scholarship.image} // Show first image if available
  //         alt={scholarship.name}
  //         className="w-full h-48 object-cover rounded-xl mb-4"
  //       />
  //       </div>
  //    <div>
  // <button className="bg-green-400 hover:bg-green-600 text-white text-2xl font-bold py-2 px-10 rounded-full shadow-md transition" >
  //           <a href="https://yz.tsinghua.edu.cn/en/Financial_Aid/Financial_Aid_System.htm" target='_blank'>
  //           Click Here to Apply            
  //           </a>
  //         </button>
  //    </div>
        
        
  //     </div>
   
  // );
}

export default ScholarshipDetails;


// import { useParams } from "react-router-dom";
// import { useGetScholarshipByIdQuery } from "../redux/scholarshipApi";

// const ScholarshipDetailsPage = () => {
//   const { id } = useParams();
//   const { data: scholarship, isLoading, error } = useGetScholarshipByIdQuery(id);

//   if (isLoading) return <p className="text-center">Loading...</p>;
//   if (error) return <p className="text-center text-red-500">Error loading scholarship</p>;

//   return (
//     <div className="max-w-4xl mx-auto px-6 py-10">
//       {/* Title */}
//       <h1 className="text-3xl font-bold mb-4">{scholarship.name}</h1>
//       <p className="text-gray-500 mb-2">
//         <span className="font-semibold">Deadline:</span>{" "}
//         {new Date(scholarship.deadline).toLocaleDateString()}
//       </p>

//       {/* Tags */}
//       <div className="flex flex-wrap gap-2 mb-6">
//         <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm">
//           {scholarship.level}
//         </span>
//         <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm">
//           {scholarship.country}
//         </span>
//       </div>

//       {/* Image */}
//       {scholarship.images?.length > 0 && (
//         <img
//           src={scholarship.images[0]}
//           alt={scholarship.name}
//           className="rounded-lg shadow-md mb-6 w-full h-64 object-cover"
//         />
//       )}

//       {/* Description */}
//       <p className="text-lg text-gray-700 mb-6">{scholarship.description}</p>

//       {/* Benefits */}
//       <div className="mb-6">
//         <h2 className="text-xl font-semibold mb-2">Funding</h2>
//         <ul className="list-disc pl-6 text-gray-700">
//           {Array.isArray(scholarship.funding)
//             ? scholarship.funding.map((b, idx) => <li key={idx}>{b}</li>)
//             : <li>{scholarship.funding}</li>}
//         </ul>
//       </div>

//       {/* Eligibility */}
//       <div className="mb-6">
//         <h2 className="text-xl font-semibold mb-2">Eligibility</h2>
//         <ul className="list-disc pl-6 text-gray-700">
//           {scholarship?.eligibility?.map((req, idx) => (
//             <li key={idx}>{req}</li>
//           ))}
//         </ul>
//       </div>

//       {/* Apply Button */}
//       <a
//         href={scholarship.link}
//         target="_blank"
//         rel="noopener noreferrer"
//         className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
//       >
//         Apply Now
//       </a>
//     </div>
//   );
// };

// export default ScholarshipDetailsPage;
