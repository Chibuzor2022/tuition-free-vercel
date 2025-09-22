// src/store/store.js
import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./authApi";
import authReducer from "./authSlice";
import { scholarshipApi } from "./scholarshipApi.js";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [scholarshipApi.reducerPath]: scholarshipApi.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(scholarshipApi.middleware),
});
