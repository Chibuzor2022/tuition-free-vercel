// import axios from 'axios';

// const axiosBaseQuery =
//   ({ baseUrl = '' } = {}) =>
//   async ({ url, method, data, params }) => {
//     try {
//       // Send cookies with every request for httpOnly auth
//       const result = await axios({
//         url: baseUrl + url,
//         method,
//         data,
//         params,
//         withCredentials: true, // this ensures cookies are sent
//         headers: {
//           'Content-Type': 'application/json',
//           // Removed Authorization header for cookie-based JWT auth
//         },
//       });

//       return { data: result.data };
//     } catch (err) {
//       return {
//         error: {
//           status: err.response?.status || 500,
//           data: err.response?.data || { message: err.message },
//         },
//       };
//     }
//   };

// export default axiosBaseQuery;


import axios from "axios";

const axiosBaseQuery =
  ({ baseUrl = "" } = {}) =>
  async ({ url, method, data, params }) => {
    try {
      // Build safe URL (no double slashes)
      const fullUrl = `${baseUrl.replace(/\/$/, "")}/${url.replace(/^\//, "")}`;

      const result = await axios({
        url: fullUrl,
        method,
        data,
        params,
        withCredentials: true, // ensures cookies are sent
        headers: {
          "Content-Type": "application/json",
        },
        timeout: 10000, // 10s timeout
      });

      return { data: result.data };
    } catch (err) {
      if (import.meta.env.DEV) {
        console.error("API Error:", err.response || err.message);
      }

      return {
        error: {
          status: err.response?.status || 500,
          data: err.response?.data || { message: err.message },
        },
      };
    }
  };

export default axiosBaseQuery;
