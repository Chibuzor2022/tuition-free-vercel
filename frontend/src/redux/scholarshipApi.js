// frontend/src/redux/scholarshipApi.js
import { apiSlice } from "./apiSlice";

export const scholarshipApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    // ✅ Fetch all scholarships with optional pagination
    getScholarships: builder.query({
      query: (arg = {}) => {
        const { pageNumber = 1 } = arg;
        return {
          url: `/scholarships`,
          method: "GET",
          params: { pageNumber },
        };
      },
      providesTags: ['Scholarship'],
    }),

    // ✅ Search scholarships by keyword
    searchScholarships: builder.query({
      query: (keyword) => ({
        url: "/scholarships/search",
        method: "GET",
        params: { keyword },
      }),
      providesTags: (result, error, keyword) => [
        { type: "Scholarship", keyword },
      ],
    }),

    // ✅ Fetch single scholarship details
    getScholarshipById: builder.query({
      query: (id) => ({
        url: `/scholarships/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "Scholarship", id }],
    }),

  
    // Create a new scholarship (Admin only)
    
    createScholarship: builder.mutation({
      
      query: (newScholarship) => ({
        url: "/scholarships",
        method: "POST",
        // body: newScholarship,
        body: newScholarship,
        credentials: "include",
      }),
      invalidatesTags: ["Scholarship"],
      
    }),

      

    // ✅ Update a scholarship
   updateScholarship: builder.mutation({
  query: ({ id, ...scholarshipData }) => ({
    url: `/scholarships/${id}`,
    method: "PUT",
   data: scholarshipData, 
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  }),
  invalidatesTags: ["Scholarship"],
}),

      // ✅ Delete a scholarship (Admin only)
    deleteScholarship: builder.mutation({
      query: (id) => ({
        url: `/scholarships/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["Scholarship"],
    }),
    //  Delete an order (Admin only)
   
     }),
});

export const {
  useGetScholarshipsQuery,
  useSearchScholarshipsQuery,
  useGetScholarshipByIdQuery,
  useCreateScholarshipMutation,
  useUpdateScholarshipMutation,
  useDeleteScholarshipMutation,
 } = scholarshipApi;
