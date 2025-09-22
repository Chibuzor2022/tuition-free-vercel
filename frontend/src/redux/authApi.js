// // src/redux/authApi.js
// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// export const authApi = createApi({
//   reducerPath: "authApi",
//   baseQuery: fetchBaseQuery({
//     baseUrl: "http://localhost:5000/api/auth", // backend auth routes
//     credentials: "include", // if using cookies
//   }),
//   endpoints: (builder) => ({
//     login: builder.mutation({
//       query: (credentials) => ({
//         url: "/login",
//         method: "POST",
//         body: credentials,
//       }),
//     }),
//       getProfile: builder.query({
//       query: () => "/profile",
//     }),
//   }),
// });

// export const {
//   useLoginMutation,
//   useGetProfileQuery,
// } = authApi;
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/auth",
    credentials: "include", // VERY IMPORTANT for cookies
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        body: credentials,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation } = authApi;
