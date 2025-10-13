


// ScholarshipDetailsPage.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { client } from "../sanityClient";
import { PortableText } from "@portabletext/react";

const ScholarshipDetailsPage = () => {
  const { slug } = useParams();
  const [scholarship, setScholarship] = useState(null);

  useEffect(() => {
    if (!slug) return;

    client
      .fetch(
        `*[_type == "scholarship" && slug.current == $slug][0]{
          name,
          description,
          country,
          deadline,
          eligibility,
          funding,
          level,
          link
        }`,
        { slug }
      )
      .then((data) => setScholarship(data))
      .catch((err) => console.error("Sanity fetch error:", err));
  }, [slug]);

  if (!scholarship) {
    return <p className="p-6 text-gray-500">Loading scholarship details...</p>;
  }

  return (
    // <div className="p-6 max-w-3xl mx-auto">
      <div className="bg-white rounded-xl shadow-md p-4 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{scholarship.name}</h1>
      
      <p className="text-gray-700  mb-2"><span className="font-bold">Country:</span> {scholarship.country}</p>
      <p className="text-gray-700 mb-2">
        <span className="font-bold">Deadline:</span> {new Date(scholarship.deadline).toDateString()}
      </p>
      <p className="text-gray-700 mb-2"><span className="font-bold">Level:</span> {scholarship.level}</p>
      <p className="text-gray-700 mb-2"><span className="font-bold">Funding:</span> {scholarship.funding?.join(", ")}</p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Eligibility</h2>
      <p className="text-gray-800">{scholarship.eligibility}</p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Description</h2>
      <PortableText value={scholarship.description} />

      <div className="mt-6">
        <a
          href={scholarship.link}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-4 rounded-lg hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition shadow-md disabled:opacity-50"
        >
          Apply Now
        </a>
      </div>
    </div>
  );
};

export default ScholarshipDetailsPage;


// // src/pages/ScholarshipDetailsPage.jsx
// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { client, urlFor } from "../sanityClient";
// import { PortableText } from "@portabletext/react";

// const ScholarshipDetailsPage = () => {
//   const { slug } = useParams();
//   const [scholarship, setScholarship] = useState(null);

//   useEffect(() => {
//     client
//       .fetch(
//         `*[_type == "scholarship" && slug.current == $slug][0]{
//           name,
//           description,
//           country,
//           deadline,
//           eligibility,
//           funding,
//           level,
//           link,
//           image
//         }`,
//         { slug }
//       )
//       .then((data) => setScholarship(data));
//   }, [slug]);

//   if (!scholarship) return <p>Loading...</p>;

//   return (
//     <div className="max-w-3xl mx-auto p-6">
//       {scholarship.image && (
//         <img
//           src={urlFor(scholarship.image).width(800).url()}
//           alt={scholarship.name}
//           className="rounded-lg mb-6"
//         />
//       )}
//       <h1 className="text-3xl font-bold mb-4">{scholarship.name}</h1>
//       <p><strong>Country:</strong> {scholarship.country}</p>
//       <p><strong>Deadline:</strong> {scholarship.deadline ? new Date(scholarship.deadline).toLocaleDateString() : "N/A"}</p>
//       <p><strong>Level:</strong> {scholarship.level}</p>
//       <p><strong>Funding:</strong> {scholarship.funding?.join(", ")}</p>
//       <p><strong>Eligibility:</strong> {scholarship.eligibility}</p>

//       <div className="prose mt-4">
//         <PortableText value={scholarship.description} />
//       </div>

//       <a
//         href={scholarship.link}
//         target="_blank"
//         rel="noreferrer"
//         className="mt-6 inline-block bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
//       >
//         Apply on University Website
//       </a>
//     </div>
//   );
// };

// export default ScholarshipDetailsPage;




// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom'; 
// // import axios from 'axios'; // Import axios for API requests
// import ReactMarkdown from "react-markdown";
// import api from '../api/axios';

// function ScholarshipDetails() {
//   const { id } = useParams(); // Extract the scholarship ID from the route
  
//   // Component state for scholarship data, loading, errors, and quantity
//   const [scholarship, setScholarship] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
  

//   // Fetch scholarship data when the component mounts or `id` changes
//   useEffect(() => {
   
//     const fetchScholarship = async () => {
//   try {
//     const response = await api.get(
//       `${import.meta.env.VITE_API_URL}/scholarships/${id}`,
//       { withCredentials: true } // ✅ needed for cookies
//     );
//     setScholarship(response.data);
//   } catch (err) {
//     setError(err.response?.data?.message || 'Failed to fetch scholarship data');
//   } finally {
//     setLoading(false);
//   }
// };
//     // Call the fetch function

//     fetchScholarship();
//   }, [id]);
 

//   // Show loading state
//   if (loading) {
//     return <div className="text-center mt-10">Loading...</div>;
//   }

//   // Show error state
//   if (error) {
//     return <div className="text-center mt-10 text-red-500">Error: {error}</div>;
//   }

//   // Handle case where scholarship is not found
//   if (!scholarship) {
//     return <div className="text-center mt-10">Scholarshipnot found.</div>;
//   }

//   // Main UI rendering

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
//       {/* <p className="text-lg text-gray-700 mb-6">{scholarship.description}</p> */}
//       <h1  className='text-shadow-blue-600 text-3xl mb-5'>Scholarship Details</h1>
//        <ReactMarkdown>{scholarship.description}</ReactMarkdown>

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
//       {/* <div className="mb-6">
//         <h2 className="text-xl font-semibold mb-2">Eligibility</h2>
//         <ul className="list-disc pl-6 text-gray-700">
//           {scholarship?.eligibility?.map((req, idx) => (
//             <li key={idx}>{req}</li>
//           ))}
//         </ul>
//       </div> */}

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


//   // return (
//   //   <div className="max-w-4xl mx-auto p-6 flex flex-col">
//   //     <div className="flex flex-col md:flex-row gap-6">

//   //     <img
//   //         src={scholarship.images?.[0] || scholarship.image} // Show first image if available
//   //         alt={scholarship.name}
//   //         className="w-full h-48 object-cover rounded-xl mb-4"
//   //       />
//   //       </div>
//   //    <div>
//   // <button className="bg-green-400 hover:bg-green-600 text-white text-2xl font-bold py-2 px-10 rounded-full shadow-md transition" >
//   //           <a href="https://yz.tsinghua.edu.cn/en/Financial_Aid/Financial_Aid_System.htm" target='_blank'>
//   //           Click Here to Apply            
//   //           </a>
//   //         </button>
//   //    </div>
        
        
//   //     </div>
   
//   // );
// }

// export default ScholarshipDetails;


// // import { useParams } from "react-router-dom";
// // import { useGetScholarshipByIdQuery } from "../redux/scholarshipApi";

// // const ScholarshipDetailsPage = () => {
// //   const { id } = useParams();
// //   const { data: scholarship, isLoading, error } = useGetScholarshipByIdQuery(id);

// //   if (isLoading) return <p className="text-center">Loading...</p>;
// //   if (error) return <p className="text-center text-red-500">Error loading scholarship</p>;

// //   return (
// //     <div className="max-w-4xl mx-auto px-6 py-10">
// //       {/* Title */}
// //       <h1 className="text-3xl font-bold mb-4">{scholarship.name}</h1>
// //       <p className="text-gray-500 mb-2">
// //         <span className="font-semibold">Deadline:</span>{" "}
// //         {new Date(scholarship.deadline).toLocaleDateString()}
// //       </p>

// //       {/* Tags */}
// //       <div className="flex flex-wrap gap-2 mb-6">
// //         <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm">
// //           {scholarship.level}
// //         </span>
// //         <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm">
// //           {scholarship.country}
// //         </span>
// //       </div>

// //       {/* Image */}
// //       {scholarship.images?.length > 0 && (
// //         <img
// //           src={scholarship.images[0]}
// //           alt={scholarship.name}
// //           className="rounded-lg shadow-md mb-6 w-full h-64 object-cover"
// //         />
// //       )}

// //       {/* Description */}
// //       <p className="text-lg text-gray-700 mb-6">{scholarship.description}</p>

// //       {/* Benefits */}
// //       <div className="mb-6">
// //         <h2 className="text-xl font-semibold mb-2">Funding</h2>
// //         <ul className="list-disc pl-6 text-gray-700">
// //           {Array.isArray(scholarship.funding)
// //             ? scholarship.funding.map((b, idx) => <li key={idx}>{b}</li>)
// //             : <li>{scholarship.funding}</li>}
// //         </ul>
// //       </div>

// //       {/* Eligibility */}
// //       <div className="mb-6">
// //         <h2 className="text-xl font-semibold mb-2">Eligibility</h2>
// //         <ul className="list-disc pl-6 text-gray-700">
// //           {scholarship?.eligibility?.map((req, idx) => (
// //             <li key={idx}>{req}</li>
// //           ))}
// //         </ul>
// //       </div>

// //       {/* Apply Button */}
// //       <a
// //         href={scholarship.link}
// //         target="_blank"
// //         rel="noopener noreferrer"
// //         className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
// //       >
// //         Apply Now
// //       </a>
// //     </div>
// //   );
// // };

// // export default ScholarshipDetailsPage;
