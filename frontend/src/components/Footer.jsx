import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube, FaTiktok, FaWhatsapp } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-indigo-700 text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Brand */}
        <div>
          <h2 className="text-xl font-bold text-yellow-300">Tuition-Free World</h2>
          <p className="mt-3 text-gray-400">
          Your trusted source for accessing global educational opportunities.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-yellow-300">Quick Links</h3>
          <ul className="mt-3 space-y-2">
            <li><Link to="/" className="hover:text-yellow-300">Home</Link></li>
            <li><Link to="/about" className="hover:text-yellow-300">About</Link></li>
            <li><Link to="/contact" className="hover:text-yellow-300">Contact</Link></li>
          </ul>
        </div>

        {/* Social Links */}
        <div>
          <h3 className="text-lg font-semibold text-yellow-300">Connect With Us</h3>
          <div className="flex space-x-3 mt-2">
           <a href="https://www.youtube.com/@tuitionfreeworld" target="_blank" rel="noopener noreferrer" className="">
           <FaYoutube  className="inline-block mr-1" /> </a>

           <a href="https://www.tiktok.com/@tuitionfreeworld4" target="_blank" rel="noopener noreferrer" className="ml-2">
           <FaTiktok className="inline-block mr-1" /> </a>

             <a href="https://web.facebook.com/profile.php?id=61575208204684" target="_blank" rel="noopener noreferrer" className="ml-2">
           <FaFacebookF  className="inline-block mr-1" /></a>
            
             <a href="https://x.com/tuitionfreewld" target="_blank" rel="noopener noreferrer" className="ml-2">
           <FaTwitter  className="inline-block mr-1" /></a>
             <a href="https://www.instagram.com/tuitionfreeworld/" target="_blank" rel="noopener noreferrer" className="ml-2">
           <FaInstagram  className="inline-block mr-1" /></a>           
            <a href="https://wa.me/2348050440372" target="_blank" rel="noopener noreferrer" className="ml-2">
           <FaWhatsapp  className="inline-block mr-1" /></a>
             </div>
        </div>
      </div>

      <div className="border-t border-gray-700 text-center py-4">
        <p className="text-gray-400 text-sm">© {new Date().getFullYear()} Tuition-Free World Limited. All rights reserved.</p>
      </div>
    </footer>
    
  )}
export default Footer;
