
import { useState } from "react";
import ScholarshipCard from "../components/ScholarshipCard";
import Loader from "../components/Loader";
import Pagination from "../components/Pagination";
import ErrorMessage from "../components/ErrorMessage";
import { useGetScholarshipsQuery } from "../redux/scholarshipApi";

const ScholarshipListPage = () => {

  const [page, setPage] = useState(1);
  const { data, isLoading, error } = useGetScholarshipsQuery({ pageNumber: page });

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <div className="px-4 py-6 max-w-7xl mx-auto">
      {/* <h1 className="text-3xl font-bold mb-6">Scholarship List</h1> */}
      <h1 className="">Scholarship List</h1>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <ErrorMessage message={error?.data?.message || error.message} />
      ) : (
        <>
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {data?.scholarships?.map((scholarship) => (
              <ScholarshipCard key={scholarship._id} scholarship={scholarship} />
            ))}
          </div>

          <Pagination
            page={data.page}
            totalPages={data.pages}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
};




export default ScholarshipListPage;


// import { useEffect, useState } from "react";
// import api from "../api/axios";

// const ScholarshipsPage = () => {
//   const [scholarships, setScholarships] = useState([]);

//   useEffect(() => {
//     const fetchScholarships = async () => {
//       try {
//         const { data } = await api.get("/scholarships");
//         setScholarships(data);
//       } catch (error) {
//         console.error("Error fetching scholarships:", error);
//       }
//     };

//     fetchScholarships();
//   }, []);

//   return (
//     <div>
//       <h1>Available Scholarships</h1>
//       <ul>
//         {scholarships.map((sch) => (
//           <li key={sch._id}>
//             <h3>{sch.name}</h3>
//             <p>{sch.country}</p>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default ScholarshipsPage;
