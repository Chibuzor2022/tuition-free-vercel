import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { userInfo } = useSelector((state) => state.auth);

  console.log("Redux user:", userInfo);

  if (!userInfo) {
    return <Navigate to="/login" replace />;
  }

  // ✅ Works for both <ProtectedRoute><Page /></ProtectedRoute>
  // and <Route element={<ProtectedRoute />} />
  return children ? children : <Outlet />;
};

export default ProtectedRoute;
