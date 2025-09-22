
import { useEffect, useState } from "react";
import axios from "axios";
import ScholarshipCard from "../components/ScholarshipCard";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import Pagination from "../components/Pagination";
import HeroSection from "../components/HeroSection";

const Home = () => {
  const [scholarships, setScholarships] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchScholarship = async (currentPage) => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/scholarships?pageNumber=${currentPage}`
      );
      setScholarships(data.scholarships);
      setTotalPages(data.pages);
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchScholarship(page);
  }, [page]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <>
      <HeroSection />
      <div className="px-4 py-6 max-w-7xl mx-auto">
<h1 className="text-3xl font-bold mb-6 flex items-center justify-center gap-2 underline underline-offset-4 decoration-yellow-300 decoration-4">
 Scholarship List
</h1>

        {loading ? (
          <Loader />
        ) : error ? (
          <ErrorMessage message={error} />
        ) : (
          <>
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {scholarships?.map((scholarship) => (
                <ScholarshipCard key={scholarship._id} scholarship={scholarship} />
              ))}
            </div>

            {/* ✅ Pagination component */}
            <Pagination
              page={page}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </div>
    </>
  );
};

export default Home;
