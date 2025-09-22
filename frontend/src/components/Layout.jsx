import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar always on top */}
      <Navbar />

      {/* Main content */}
      {/* <main className="flex-grow  mx-auto px-4 sm:px-6 lg:px-8 py-6"> */}
        <main>
        <Outlet />
      </main>

      {/* Footer always at bottom */}
      <Footer />
    </div>
  );
};

export default Layout;
