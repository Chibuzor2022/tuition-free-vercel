// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { useLoginMutation } from "../redux/authApi";
// import { setCredentials } from "../redux/authSlice";

// const LoginPage = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [login, { isLoading }] = useLoginMutation();
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const userData = await login({ email, password }).unwrap();
//       dispatch(setCredentials(userData));
//       console.log("Stored user:", userData);
//       navigate("/admin/dashboard"); // redirect to dashboard
//     } catch (err) {
//       console.error("Login failed:", err);
//       alert("Invalid credentials");
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-50">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md"
//       >
//         <h2 className="text-2xl font-bold mb-4 text-center">Admin Login</h2>
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className="w-full p-2 mb-3 border rounded"
//           required
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="w-full p-2 mb-3 border rounded"
//           required
//         />
//         <button
//           type="submit"
//           className="w-full bg-blue-600 text-white py-2 rounded disabled:opacity-50"
//           disabled={isLoading}
//         >
//           {isLoading ? "Logging in..." : "Login"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default LoginPage;


import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useLoginMutation } from "../redux/authApi";
import { setCredentials } from "../redux/authSlice";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = await login({ email, password }).unwrap();

      // ✅ Save to Redux
      dispatch(setCredentials(userData));

      // ✅ Persist in localStorage so ProtectedRoute doesn’t lose it
      localStorage.setItem("userInfo", JSON.stringify(userData));

      navigate("/admin/scholarships");
    } catch (err) {
      console.error("Login failed:", err);
      alert("Invalid credentials");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Admin Login</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-3 border rounded"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-3 border rounded"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded disabled:opacity-50"
          disabled={isLoading}
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
