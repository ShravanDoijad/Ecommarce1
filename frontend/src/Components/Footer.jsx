import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10 px-6">
      <div className="container mx-auto flex flex-wrap justify-between items-center text-center md:text-left">
        

        <div className="w-full md:w-1/3 mb-6 md:mb-0">
          <h2 className="text-2xl font-bold">FOR<span className="text-green-500">EVER</span></h2>
          <p className="text-sm text-gray-400 mt-2">Your trusted partner for quality products.</p>
        </div>

        <div className="w-full md:w-1/3 mb-6 md:mb-0">
          <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-2 text-gray-400">
            <li><a href="/" className="hover:text-green-400">Home</a></li>
            <li><a href="/about" className="hover:text-green-400">About Us</a></li>
            <li><a href="#" className="hover:text-green-400">Policies</a></li>
            <li><a href="/contact" className="hover:text-green-400">Contact</a></li>
          </ul>
        </div>

      
        <div className="w-full md:w-1/3">
          <h3 className="text-lg font-semibold mb-2">Follow Us</h3>
          <div className="flex justify-center md:justify-start space-x-4 text-gray-400">
            <a href="#" className="hover:text-green-400"><FaFacebook size={20} /></a>
            <a href="#" className="hover:text-green-400"><FaInstagram size={20} /></a>
            <a href="#" className="hover:text-green-400"><FaTwitter size={20} /></a>
            <a href="#" className="hover:text-green-400"><FaLinkedin size={20} /></a>
          </div>
          <p className="mt-3 text-sm text-gray-400">Email: support@brandname.com</p>
          <p className="text-sm text-gray-400">Phone: +91 123 456 7890</p>
        </div>
      </div>

      
      <div className="text-center text-gray-500 text-sm mt-6 border-t border-gray-700 pt-4">
        © {new Date().getFullYear()} BrandName. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
