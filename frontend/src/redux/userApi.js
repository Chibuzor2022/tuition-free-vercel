import { apiSlice } from "./apiSlice"; // your base apiSlice with fetchBaseQuery

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/users/login",
        method: "POST",
        body: credentials,
      }),
    }),
    register: builder.mutation({
      query: (userData) => ({
        url: "/users/register",
        method: "POST",
        body: userData,
      }),
    }),
    getProfile: builder.query({
      query: () => "/users/profile",
      providesTags: ["User"],
    }),
    // Admin-only: get all users
    getUsers: builder.query({
      query: () => "/users",
      providesTags: ["User"],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
} = userApi;
