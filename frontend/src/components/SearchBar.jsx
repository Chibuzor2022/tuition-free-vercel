// import React from 'react'
// import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useSearchScholarshipsQuery } from '../redux/scholarshipApi';

// const SearchBar = () => {
//   const [keyword, setKeyword] = useState('');
//   const [debouncedKeyword, setDebouncedKeyword] = useState('');
//   const navigate = useNavigate();

//   // Fetch scholarships based on debounced keyword
//   const { 
//     data: scholarships = [], 
//     isLoading, 
//     isError 
//   } = useSearchScholarshipsQuery(debouncedKeyword, {
//     skip: debouncedKeyword.trim().length < 2, // Skip query if less than 2 characters
//   });

//   // Debounce input to limit API requests
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setDebouncedKeyword(keyword);
//     }, 500); // Wait 500ms before setting debounced keyword

//     return () => clearTimeout(timer); // Clear timer on cleanup
//   }, [keyword]);

//   // Navigate to search results page on submit
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (keyword.trim()) {
//       navigate(`/search/${keyword}`);
//     }
//   };

//   // Navigate to selected scholarship detail page
//   const handleScholarshipSelect = (scholarshipId) => {
//     navigate(`/scholarship/${scholarshipId}`);
//     setKeyword(''); // Clear search input
//   };

//   return (
//     <div className="relative w-full max-w-md">
//       <form onSubmit={handleSubmit}>
//         <div className="relative">
//           <input
//             type="text"
//             value={keyword}
//             onChange={(e) => setKeyword(e.target.value)} // Update input value
//             placeholder="Search for Scholarships..."
//             className="w-full px-4 py-2 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             disabled={isLoading} // Disable input while loading
//           />
//           <button
//             type="submit"
//             className="absolute right-2 top-1/2 transform -translate-y-1/2"
//             disabled={isLoading} // Disable button while loading
//           >
//             {isLoading ? (
//               // Spinner while loading
//               <svg
//                 className="animate-spin h-5 w-5 text-black"
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 24 24"
//               >
//                 <circle
//                   className="opacity-25"
//                   cx="12"
//                   cy="12"
//                   r="10"
//                   stroke="currentColor"
//                   strokeWidth="4"
//                 ></circle>
//                 <path
//                   className="opacity-75"
//                   fill="currentColor"
//                   d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                 ></path>
//               </svg>
//             ) : (
//               // Search icon
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-5 w-5 text-gray-500"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
//                 />
//               </svg>
//             )}
//           </button>
//         </div>
//       </form>

//       {/* Search results dropdown */}
//       {keyword && !isLoading && (
//         <div className="p-5 absolute z-10 my-3 w-full bg-black border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
//           {isError ? (
//             <div className="p-3 text-red-500">Error loading results</div>
//           ) : scholarships.length > 0 ? (
//             // Display scholarship suggestions
//             scholarships.map((scholarship) => (
//               <div
//                 key={scholarship._id}
//                 className="cursor-pointer"
//                 onClick={() => handleScholarshipSelect(scholarship._id)}
//               >
//                 <div className="font-medium">{scholarship.name}</div>
//                 <div className="pb-3 text-sm text-white">${scholarship.country}</div>
//               </div>
//             ))
//           ) : (
//             <div className="p-3 text-gray-500">No scholarships found</div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }

// export default SearchBar


import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSearchScholarshipsQuery } from "../redux/scholarshipApi";
import Loader from "./Loader";

const SearchBar = () => {
  const [keyword, setKeyword] = useState("");
  const [debouncedKeyword, setDebouncedKeyword] = useState("");
  const navigate = useNavigate();

  // Debounce input (wait 500ms after typing stops)
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedKeyword(keyword);
    }, 500);
    return () => clearTimeout(handler);
  }, [keyword]);

  // Fetch scholarships from API
  const { data, isLoading, isError } = useSearchScholarshipsQuery(
    debouncedKeyword,
    {
      skip: debouncedKeyword.trim().length < 2, // only search if >= 2 chars
    }
  );

  // Normalize scholarships (handle both array and { scholarships: [] })
  const scholarships = Array.isArray(data)
    ? data
    : data?.scholarships ?? [];

  const handleSearchClick = (scholarshipId) => {
    setKeyword("");
    navigate(`/scholarship/${scholarshipId}`);
  };

  return (
    <div className="relative flex items-center w-full max-w-lg mx-auto">
      <input
        type="text"
        placeholder="Search scholarships..."
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        className="w-full p-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        // don’t disable so user can keep typing
      />

      {/* Loader inside input */}
      {isLoading && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          <Loader small />
        </div>
      )}

      {/* Dropdown results */}
      {debouncedKeyword && !isLoading && (
        <div className="absolute top-full mt-2 w-full bg-gray-900 shadow-lg rounded-lg z-10">
          {isError ? (
            <div className="p-2 text-red-500">Error fetching scholarships</div>
          ) : scholarships.length > 0 ? (
            scholarships.map((scholarship) => (
              <div
                key={scholarship._id}
                onClick={() => handleSearchClick(scholarship._id)}
                className="flex justify-between items-center px-4 py-2 cursor-pointer hover:bg-gray-800"
              >
                <div>
                  <div className="font-medium text-white">
                    {scholarship.title}
                  </div>
                  <div className="text-sm text-gray-400">
                    {scholarship.country}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-2 text-gray-400">No scholarships found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
