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

import { createApi } from '@reduxjs/toolkit/query/react';
import axiosBaseQuery from '../utils/axiosBaseQuery';

export const apiSlice = createApi({
  // Use custom axios base query for handling requests (with support for credentials, headers, etc.)
  baseQuery: axiosBaseQuery({ baseUrl: import.meta.env.VITE_API_URL }),

  // Define tag types used for cache invalidation and re-fetching
  tagTypes: ['Scholarships'],

  // Endpoints will be injected in other slices using apiSlice.injectEndpoints()
  endpoints: () => ({}),
});
