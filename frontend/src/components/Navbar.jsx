import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50 py-1">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16" >
          
           <Link to="/" className="flex items-center">
    <img
      src="/59b58108-27a9-4285-99f3-7c650306f1b9.png"
      alt="Logo"
      className="h-20 w-auto"
    />
  </Link>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center  space-x-6">
          
            <Link to="/" className=" ms-5 text-[20px] text-black">Home</Link>
            <Link to="/scholarships" className="text-[20px] text-black">Scholarships</Link>
            <Link to="/about" className=" text-[20px] text-black whitespace-nowrap ">About Us</Link>
            <Link to="/contact" className=" text-[20px] text-black">Contact</Link>
    
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 focus:outline-none"
            >
              {isOpen ? "✖" : "☰"}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="flex flex-col space-y-2 p-4">
            <Link to="/" onClick={() => setIsOpen(false)} className="text-gray-700 hover:text-indigo-600">Home</Link>
            <Link to="/scholarships" onClick={() => setIsOpen(false)} className="text-gray-700 hover:text-indigo-600">Scholarships</Link>
            <Link to="/about" onClick={() => setIsOpen(false)} className="text-gray-700 hover:text-indigo-600">About</Link>
            <Link to="/contact" onClick={() => setIsOpen(false)} className="text-gray-700 hover:text-indigo-600">Contact</Link>

            
          </div>
        </div>
      )}
   
      
    </nav>
  );
};

export default Navbar;
