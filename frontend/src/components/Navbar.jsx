import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";
import SearchBar from "./SearchBar";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50 py-4">
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
            <SearchBar/>
            <Link to="/" className=" ms-5 text-[20px] text-black">Home</Link>
            <Link to="/scholarships" className="text-[20px] text-black">Scholarships</Link>
            <Link to="/about" className=" text-[20px] text-black whitespace-nowrap ">About Us</Link>
            <Link to="/contact" className=" text-[20px] text-black">Contact</Link>
            <div>

            
              {userInfo ? (
                         
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-md bg-gray-200 text-gray-800 hover:bg-gray-300"
                >
                  Logout
                </button>
           
            ):('') }
        </div>

            {/* {userInfo ? (
                           <>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-md bg-gray-200 text-gray-800 hover:bg-gray-300"
                >
                  Logout
                </button>
              </>
            ) 
            : (
              <Link
                to="/login"
                className="px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700"
              >
                Login
              </Link>
            )
            } */}
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

            {userInfo ? (
              <>
                <Link
                  to="/admin/dashboard"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 text-center"
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="px-4 py-2 rounded-md bg-gray-200 text-gray-800 hover:bg-gray-300"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 text-center"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
