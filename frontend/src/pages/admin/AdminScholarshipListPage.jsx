
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Pagination from "../../components/Pagination";
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import {
  useGetScholarshipsQuery,
  useCreateScholarshipMutation,
  useDeleteScholarshipMutation,
} from '../../redux/scholarshipApi';

const AdminScholarshipListpPage = () => {
  // State for pagination
  const [page, setPage] = useState(1);
  
  // Fetch scholarships with pagination
  const { 
    data, 
    isLoading, 
    error, 
    isError, 
    refetch 
  } = useGetScholarshipsQuery({ pageNumber: page });

  // Create & Delete scholarship mutations
  const [createScholarship, { isLoading: loadingCreate }] = useCreateScholarshipMutation();
  const [deleteScholarship, { isLoading: loadingDelete }] = useDeleteScholarshipMutation();

  // Extract scholarships array safely
  const scholarships = data?.scholarships || [];
  const totalPages = data?.pages || 1;
  const currentPage = data?.page || 1;

  // Show error toast on error
  useEffect(() => {
    if (isError && error) {
      toast.error(error?.data?.message || 'Error fetching scholarships');
    }
  }, [isError, error]);

  // Handle create scholarship
  const handleCreate = async () => {
    if (window.confirm('Are you sure you want to create a new scholarship?')) {
      try {
        const response = await createScholarship().unwrap();
        if (response && response._id) {
          toast.success('scholarship created');
          refetch(); // Refresh list
        } else {
          toast.error('Invalid response from server');
        }
      } catch (err) {
        toast.error(err?.data?.message || 'Failed to create scholarship');
      }
    }
  };

  // Handle delete scholarship
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this scholarship?')) {
      try {
        await deleteScholarship(id).unwrap();
        toast.success('Scholarship deleted');
        refetch(); // Refresh list
      } catch (err) {
        toast.error(err?.data?.message || 'Failed to delete scholarship');
      }
    }
  };

  // Handle page change
  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <>
      <div className="p-6 mt-14">
        {/* Header and create button */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Scholarshps</h1>
          <button
            onClick={handleCreate}
            className="flex items-center bg-green-500 text-white font-semibold px-4 py-2 rounded hover:bg-green-600"
            disabled={loadingCreate}
          >
            <FaPlus className="mr-2" /> 
            {loadingCreate ? 'Creating...' : 'Create Scholarshp'}
          </button>
        </div>

        {/* Loading & error states */}
        {isLoading || loadingCreate || loadingDelete ? (
          <div className="text-center text-gray-600">Loading...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-3 px-4 text-left">ID</th>
                  <th className="py-3 px-4 text-left">Image</th>
                  <th className="py-3 px-4 text-left">Name</th>
                  {/* <th className="py-3 px-4 text-left">Description</th> */}
                  <th className="py-3 px-4 text-left">Country</th>
                  <th className="py-3 px-4 text-left">Deadline</th>
                  <th className="py-3 px-4 text-left">Funding</th>
                  <th className="py-3 px-4 text-left">Eligibility</th>
                  <th className="py-3 px-4 text-left">Level</th>
                  <th className="py-3 px-4 text-left">Link</th>
                  <th className="py-3 px-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {scholarships.map((scholarship) => (
                  <tr key={scholarship._id} className="border-t hover:bg-gray-50">
                    <td className="py-2 px-4 text-sm">{scholarship._id}</td>
                    <td className="py-2 px-4 text-sm">
                      {scholarship.images && scholarship.images.length > 0 ? (
                        <img
                          src={scholarship.images[0]}
                          alt="scholarship"
                          className="w-12 h-12 object-cover rounded"
                        />
                      ) : (
                        <span className="text-gray-400 italic">No Image</span>
                      )}
                    </td>
                    <td className="py-2 px-4">{scholarship.name}</td>
                    {/* <td className="py-2 px-4">{scholarship.description}</td> */}
                    <td className="py-2 px-4">{scholarship.country}</td>
                    <td className="py-2 px-4">{scholarship.deadline}</td>
                    <td className="py-2 px-4">{scholarship.funding}</td>
                    <td className="py-2 px-4">{scholarship.eligibility}</td>
                    <td className="py-2 px-4">{scholarship.level}</td>
                    <td className="py-2 px-4">{scholarship.link}</td>
                    <td className="py-2 px-4 flex space-x-2">
                      <Link
                        to={`/admin/scholarship/${scholarship._id}/edit`}
                        className="text-green-600 hover:text-green-800"
                      >
                        <FaEdit />
                      </Link>
                      <button
                        onClick={() => handleDelete(scholarship._id)}
                        className="text-red-600 hover:text-red-800"
                        disabled={loadingDelete}
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      
      {/* Pagination - Only show if there are multiple pages */}
      {totalPages > 1 && (
        <div className="px-6 pb-6">
          <Pagination
            page={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </>
  );
};

export default AdminScholarshipListpPage ;