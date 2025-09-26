
import React, { useState, useMemo } from "react";

const HeroSection = ({ scholarships = [], setFiltered, setCurrentPage }) => {
  const [search, setSearch] = useState("");
  const [country, setCountry] = useState("");
  const [level, setLevel] = useState("");

  const countries = useMemo(() => {
    const setCountries = new Set(
      scholarships.map((s) => s.country.trim().toLowerCase())
    );
    return Array.from(setCountries)
      .map((c) => c.charAt(0).toUpperCase() + c.slice(1))
      .sort();
  }, [scholarships]);

  const levelsMap = useMemo(() => {
    const map = {};
    scholarships.forEach((s) => {
      const lvl = s.level.trim().toLowerCase();
      if (lvl.includes("undergraduate")) map["Undergraduate"] = "undergraduate";
      else if (lvl.includes("master")) map["Master's/PhD"] = "master";
      else if (lvl.includes("phd")) map["Master's/PhD"] = "phd";
    });
    return map;
  }, [scholarships]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!setFiltered) return;

    const filtered = scholarships.filter((scholarship) => {
      const matchesSearch = search
        ? scholarship.name.toLowerCase().includes(search.trim().toLowerCase())
        : true;

      const matchesCountry = country
        ? scholarship.country.trim().toLowerCase() === country.toLowerCase()
        : true;

      const matchesLevel =
        level === ""
          ? true
          : level === "Master's/PhD"
          ? /master|phd/i.test(scholarship.level)
          : scholarship.level.trim().toLowerCase() === level.toLowerCase();

      return matchesSearch && matchesCountry && matchesLevel;
    });

    setFiltered(filtered);
    setCurrentPage(1);
  };

  const handleReset = () => {
    setSearch("");
    setCountry("");
    setLevel("");
    if (setFiltered) setFiltered(scholarships);
    setCurrentPage(1);
  };

  return (
    <section className="relative bg-indigo-600 text-white px-4 text-center py-16 lg:py-20 lg:min-h-screen flex items-center justify-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-6">
          <span className="text-yellow-300 text-3xl sm:text-5xl lg:text-7xl font-bold">
            Welcome to Tuition-free World
          </span>
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-8 leading-tight">
          Find Your <span className="text-yellow-300">Dream Scholarship</span>
        </h1>

        <form
          onSubmit={handleSubmit}
          className="mt-5 flex flex-col sm:flex-row justify-center gap-2 bg-white p-3 rounded-2xl max-w-2xl mx-auto"
        >
          <select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="px-3 py-2 rounded text-black w-full sm:w-auto"
          >
            <option value="">All Countries</option>
            {countries.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          <select
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            className="px-3 py-2 rounded text-black w-full sm:w-auto"
          >
            <option value="">All Levels</option>
            {Object.keys(levelsMap).map((lvl) => (
              <option key={lvl} value={lvl}>
                {lvl}
              </option>
            ))}
          </select>

          <button
            type="submit"
            className="bg-yellow-300 text-black px-4 py-2 rounded font-bold w-full sm:w-auto"
          >
            Filter
          </button>

          <button
            type="button"
            onClick={handleReset}
            className="bg-gray-300 text-black px-4 py-2 rounded font-bold w-full sm:w-auto"
          >
            Reset
          </button>
        </form>
      </div>
    </section>
  );
};

export default HeroSection;



// import React, { useState, useMemo } from "react";

// const HeroSection = ({ scholarships = [], setFiltered, setCurrentPage }) => {
//   const [search, setSearch] = useState("");
//   const [country, setCountry] = useState("");
//   const [level, setLevel] = useState("");

//   // Normalize countries and levels for dropdowns
//   const countries = useMemo(() => {
//     const setCountries = new Set(
//       scholarships.map((s) => s.country.trim().toLowerCase())
//     );
//     return Array.from(setCountries)
//       .map((c) => c.charAt(0).toUpperCase() + c.slice(1))
//       .sort();
//   }, [scholarships]);

//   // Group levels: e.g., "Master's/PhD" includes Master's and PhD
//   const levelsMap = useMemo(() => {
//     const map = {};
//     scholarships.forEach((s) => {
//       const lvl = s.level.trim().toLowerCase();
//       if (lvl.includes("undergraduate")) map["Undergraduate"] = "undergraduate";
//       else if (lvl.includes("master")) map["Master's/PhD"] = "master";
//       else if (lvl.includes("phd")) map["Master's/PhD"] = "phd";
//     });
//     return map;
//   }, [scholarships]);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!setFiltered) return;

//     const filtered = scholarships.filter((scholarship) => {
//       const matchesSearch = search
//         ? scholarship.name.toLowerCase().includes(search.trim().toLowerCase())
//         : true;

//       const matchesCountry = country
//         ? scholarship.country.trim().toLowerCase() === country.toLowerCase()
//         : true;

//       const matchesLevel =
//         level === ""
//           ? true
//           : level === "Master's/PhD"
//           ? /master|phd/i.test(scholarship.level)
//           : scholarship.level.trim().toLowerCase() === level.toLowerCase();

//       return matchesSearch && matchesCountry && matchesLevel;
//     });

//     setFiltered(filtered);
//     setCurrentPage(1);
//   };

//   const handleReset = () => {
//     setSearch("");
//     setCountry("");
//     setLevel("");
//     if (setFiltered) setFiltered(scholarships);
//     setCurrentPage(1);
//   };

//   return (
//     <section className="relative bg-indigo-600 text-white px-4 text-center py-20 lg:py-0 lg:min-h-screen flex items-center justify-center">
//       <div className="max-w-7xl mx-auto px-6 lg:px-8 py-23 text-center">
//         <div className="mb-9">
//           <span className="text-yellow-300 text-7xl">
//             Welcome to Tuition-free World
//           </span>
//         </div>
//         <h1 className="text-9xl sm:text-5xl font-extrabold m-7">
//           Find Your <span className="text-yellow-300">Dream Scholarship</span>
//         </h1>

//         <form
//           onSubmit={handleSubmit}
//           className="mt-5 flex flex-col sm:flex-row justify-center gap-2 bg-white p-2 rounded-2xl max-w-2xl mx-auto"
//         >
//              <select
//             value={country}
//             onChange={(e) => setCountry(e.target.value)}
//             className="px-4 py-2 rounded text-black"
//           >
//             <option value="">All Countries</option>
//             {countries.map((c) => (
//               <option key={c} value={c}>
//                 {c}
//               </option>
//             ))}
//           </select>

//           <select
//             value={level}
//             onChange={(e) => setLevel(e.target.value)}
//             className="px-4 py-2 rounded text-black"
//           >
//             <option value="">All Levels</option>
//             {Object.keys(levelsMap).map((lvl) => (
//               <option key={lvl} value={lvl}>
//                 {lvl}
//               </option>
//             ))}
//           </select>

//           <button
//             type="submit"
//             className="bg-yellow-300 text-black px-4 py-1 rounded font-bold"
//           >
//             Filter
//           </button>

//           <button
//             type="button"
//             onClick={handleReset}
//             className="bg-gray-300 text-black px-4 py-1 rounded font-bold"
//           >
//             Reset
//           </button>
//         </form>
//       </div>
//     </section>
//   );
// };

// export default HeroSection;






// import React from 'react'

// const HeroSection = () => {
//   return (
//     <>

 
// <section className="relative bg-indigo-600 text-white px-4  text-center py-20 lg:py-0 lg:min-h-screen flex items-center justify-center">
  
//   <div className="max-w-7xl mx-auto px-6 lg:px-8 py-23 text-center">
//     <div className='mb-9'>
//     <span className='text-yellow-300 text-7xl'>Welcome to Tuition-free World</span>
//   </div>
//     <h1 className="text-9xl sm:text-5xl font-extrabold m-7">
//       Find Your <span className="text-yellow-300">Dream Scholarship</span>
//     </h1>
  
//   </div>
// </section> 


//     </>
//   )
// }

// export default HeroSection