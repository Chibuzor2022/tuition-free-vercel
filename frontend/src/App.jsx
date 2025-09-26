import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import ScholarshipListPage from "./pages/ScholarshipListPage"; 
import ScholarshipDetailsPage from "./pages/ScholarshipDetailsPage";
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
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactForm/>} />
          <Route path="/search/:keyword" element={<HomePage/> } />
        <Route path="/scholarships/:slug" element={<ScholarshipDetailsPage />} />

                  
        </Route>
      </Routes>
      </main>
      </div>
    </Router>
  );
}

export default App;
