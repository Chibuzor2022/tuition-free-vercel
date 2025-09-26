// import React, { useEffect, useState } from "react";
// import { client } from "../sanityClient";
// import ScholarshipCard from "../components/ScholarshipCard";
// import HeroSection from "../components/HeroSection";

// const Home = () => {
//   const [scholarships, setScholarships] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const scholarshipsPerPage = 6; // adjust number per page

//   useEffect(() => {
//     client
//       .fetch(`*[_type == "scholarship"]{
//         _id,
//         name,
//         country,
//         level,
//         funding,
//         slug,
//         image
//       }`)
//       .then((data) => setScholarships(data));
//   }, []);

//   // Pagination logic
//   const indexOfLast = currentPage * scholarshipsPerPage;
//   const indexOfFirst = indexOfLast - scholarshipsPerPage;
//   const currentScholarships = scholarships.slice(indexOfFirst, indexOfLast);
//   const totalPages = Math.ceil(scholarships.length / scholarshipsPerPage);

//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//   };

//   return (
//     <>
//       <HeroSection />

//       <h1 className="text-2xl font-bold text-center mt-6">Scholarships</h1>

//       <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//         {currentScholarships.map((s) => (
//           <ScholarshipCard key={s._id} scholarship={s} />
//         ))}
//       </div>

//       {/* Pagination Controls */}
//       <div className="flex justify-center mt-6 space-x-2">
//         {Array.from({ length: totalPages }, (_, i) => (
//           <button
//             key={i + 1}
//             onClick={() => handlePageChange(i + 1)}
//             className={`px-3 py-1 mb-5 border rounded ${
//               currentPage === i + 1
//                 ? "bg-blue-500 text-white"
//                 : "bg-white text-blue-500"
//             }`}
//           >
//             {i + 1}
//           </button>
//         ))}
//       </div>
//     </>
//   );
// };

// export default Home;
import React, { useEffect, useState } from "react";
import { client } from "../sanityClient";
import ScholarshipCard from "../components/ScholarshipCard";
import HeroSection from "../components/HeroSection";

const Home = () => {
  const [scholarships, setScholarships] = useState([]);
  const [filteredScholarships, setFilteredScholarships] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const scholarshipsPerPage = 6;

  useEffect(() => {
    client
      .fetch(`*[_type == "scholarship"]{
        _id,
        name,
        country,
        level,
        funding,
        slug,
        image
      }`)
      .then((data) => {
        setScholarships(data);
        setFilteredScholarships(data); // default filtered = all
      });
  }, []);

  // Pagination logic
  const indexOfLast = currentPage * scholarshipsPerPage;
  const indexOfFirst = indexOfLast - scholarshipsPerPage;
  const currentScholarships = filteredScholarships.slice(indexOfFirst, indexOfLast);

  return (
    <>
      <HeroSection
        scholarships={scholarships}
        setFiltered={setFilteredScholarships}
        setCurrentPage={setCurrentPage}
      />

      <h1 className="text-3xl font-bold text-center my-6">Scholarships</h1>
      <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {currentScholarships.map((s) => (
          <ScholarshipCard key={s._id} scholarship={s} />
        ))}
      </div>

      <div className="flex justify-center mt-6 gap-3">
        {Array.from({ length: Math.ceil(filteredScholarships.length / scholarshipsPerPage) }).map(
          (_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentPage(idx + 1)}
              className={`px-4 py-2 rounded ${
                currentPage === idx + 1 ? "bg-yellow-300 text-black" : "bg-gray-200 text-black"
              }`}
            >
              {idx + 1}
            </button>
          )
        )}
      </div>
    </>
  );
};

export default Home;
