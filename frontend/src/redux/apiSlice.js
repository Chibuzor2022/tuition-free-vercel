import { createApi } from '@reduxjs/toolkit/query/react';
import axiosBaseQuery from '../utils/axiosBaseQuery';

export const apiSlice = createApi({
  baseQuery: axiosBaseQuery({ baseUrl: import.meta.env.VITE_API_URL }),
  tagTypes: ['Scholarships'],
  endpoints: (builder) => ({
    getScholarships: builder.query({
      query: (page = 1) => ({ url: `scholarships?pageNumber=${page}`, method: 'GET' }),
      providesTags: ['Scholarships'],
    }),
    getScholarshipById: builder.query({
      query: (id) => ({ url: `scholarships/${id}`, method: 'GET' }),
    }),
    createScholarship: builder.mutation({
      query: (scholarship) => ({ url: 'scholarships', method: 'POST', data: scholarship }),
      invalidatesTags: ['Scholarships'],
    }),
    updateScholarship: builder.mutation({
      query: ({ id, ...data }) => ({ url: `scholarships/${id}`, method: 'PUT', data }),
      invalidatesTags: ['Scholarships'],
    }),
    deleteScholarship: builder.mutation({
      query: (id) => ({ url: `scholarships/${id}`, method: 'DELETE' }),
      invalidatesTags: ['Scholarships'],
    }),
  }),
});

export const {
  useGetScholarshipsQuery,
  useGetScholarshipByIdQuery,
  useCreateScholarshipMutation,
  useUpdateScholarshipMutation,
  useDeleteScholarshipMutation,
} = apiSlice;



// // src/redux/apiSlice.js
// import { createApi } from '@reduxjs/toolkit/query/react';
// import axiosBaseQuery from '../utils/axiosBaseQuery';

// // Log the base URL for debugging
// console.log("API Base URL:", import.meta.env.VITE_API_URL);

// export const apiSlice = createApi({
//   reducerPath: 'api',
//   baseQuery: axiosBaseQuery({ baseUrl: import.meta.env.VITE_API_URL }),
//   tagTypes: ['Scholarships'],
//   endpoints: (builder) => ({
//     getScholarships: builder.query({
//       query: (pageNumber = 1) => ({
//         url: `/scholarships?pageNumber=${pageNumber}`,
//         method: 'GET',
//       }),
//       providesTags: ['Scholarships'],
//     }),
//     getScholarshipById: builder.query({
//       query: (id) => ({
//         url: `/scholarships/${id}`,
//         method: 'GET',
//       }),
//       providesTags: ['Scholarships'],
//     }),
//   }),
// });

// // Export hooks for usage in components
// export const { useGetScholarshipsQuery, useGetScholarshipByIdQuery } = apiSlice;










// // frontend/src/redux/apiSlice.js
// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// // // Base API setup
// export const apiSlice = createApi({
//   reducerPath: "api",
//   baseQuery: fetchBaseQuery({
//     baseUrl: "http://localhost:5000/api", // backend base URL
//     credentials: "include", // ✅ send cookies with requests
//     prepareHeaders: (headers, { getState }) => {
//       const token = getState().auth.userInfo?.token; // ✅ get JWT from Redux state
//       if (token) {
//         headers.set("Authorization", `Bearer ${token}`);
//       }
//       return headers;
//     },
//   }),
//   tagTypes: ["Scholarship"],
//   endpoints: () => ({}),
// });

// import { createApi } from '@reduxjs/toolkit/query/react';
// import axiosBaseQuery from '../utils/axiosBaseQuery';

// console.log("API Base URL:", import.meta.env.VITE_API_URL);
// export const apiSlice = createApi({
//   // Use custom axios base query for handling requests (with support for credentials, headers, etc.)
//   baseQuery: axiosBaseQuery({ baseUrl: import.meta.env.VITE_API_URL }),

  


//   // Define tag types used for cache invalidation and re-fetching
//   tagTypes: ['Scholarships'],

//   // Endpoints will be injected in other slices using apiSlice.injectEndpoints()
//   endpoints: () => ({}),
// });
