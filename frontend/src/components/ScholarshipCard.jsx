// src/components/ScholarshipCard.jsx
import { Link } from "react-router-dom";
import { urlFor } from "../sanityClient";

const ScholarshipCard = ({ scholarship }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-4">
      {scholarship.image && (
        <img
          src={urlFor(scholarship.image).width(400).url()}
          alt={scholarship.name}
          className="rounded-lg mb-4 object-cover h-40 w-full"
        />
      )}
      <h2 className="text-lg font-bold">{scholarship.name}</h2>
      <p className="text-gray-600">Country: {scholarship.country}</p>
      <p className="text-gray-600">Level: {scholarship.level}</p>

      <Link
        to={`/scholarships/${scholarship.slug.current}`}
        className="mt-3 inline-block text-blue-600 hover:underline"
      >
        View Details →
      </Link>
    </div>
  );
};

export default ScholarshipCard;










// import React from "react";
// import { Link } from "react-router-dom";

// const ScholarshipCard= ({ scholarship }) => {

//     return (
//     <div className="mt-2 p-4 m-5 border rounded-2xl shadow hover:shadow-lg transition flex flex-col">
//       {/* Link to scholarship details page */}
//       <Link to={`/scholarship/${scholarship._id}`}>
//         <img
//           src={scholarship.images?.[0] || scholarship.image} // Show first image if available
//           alt={scholarship.name}
//           className="w-full h-48 object-cover rounded-xl mb-4"
//         />
//         <h2 className="text-lg font-semibold truncate">{scholarship.name}</h2>
//         <h2 className="text-lg font-semibold truncate">{scholarship.country}</h2>
//       </Link>

//          <Link to={`/scholarship/${scholarship._id}`}>
//           <button   className="cursor-pointer mt-auto px-4 py-2 rounded text-black" >       
//         Check Details
//          </button>
//          </Link>
         
//     </div>
//   );
// };

// export default ScholarshipCard;
