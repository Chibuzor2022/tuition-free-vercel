import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import ScholarshipListPage from "./pages/ScholarshipListPage"; 
import ScholarshipDetailsPage from "./pages/ScholarshipDetailsPage";
import ScholarshipEditPage from "./pages/admin/ScholarshipEditPage";
import AdminScholarshipListPage from "./pages/admin/AdminScholarshipListPage";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./components/ProtectedRoute"; // for admin protection
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import AboutPage from "./pages/AboutPage";
import ContactForm from "./components/ContactForm";

function App() {
  return (
    <Router>
      <ToastContainer position="top-center" autoClose={3000} />
      <div className="min-h-screen flex flex-col justify-between">

      <main className="flex-grow">
      <Routes>
        {/* Wrap all pages with Layout */}
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/scholarships" element={<ScholarshipListPage />} />
          <Route path="/scholarship/:id" element={<ScholarshipDetailsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactForm/>} />
          <Route path="/scholarships/:id" element={<ScholarshipDetailsPage />} />
          <Route path="/search/:keyword" element={<HomePage/> } />

          {/* Protected Admin Routes */}
          <Route path="/admin/scholarships" element={<ProtectedRoute><AdminScholarshipListPage /></ProtectedRoute>} />
          <Route path="/admin/scholarship/:id/edit" element={<ProtectedRoute><ScholarshipEditPage /></ProtectedRoute>} />

          
        </Route>
      </Routes>
      </main>
      </div>
    </Router>
  );
}

export default App;
