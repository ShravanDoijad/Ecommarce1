import React from 'react';

const Contact = () => {
  return (
    <div className="w-full min-h-screen flex flex-col items-center p-6">
      <h1 className="text-4xl font-bold markazi text-gray-800 mb-6">Contact Us</h1>
      <p className="text-lg text-gray-600 mb-4 text-center">We’d love to hear from you! Reach out with any questions or feedback.</p>

      <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-6">
        <form className="flex flex-col gap-4">
          <input 
            type="text" 
            placeholder="Your Name" 
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400" 
            required 
          />
          <input 
            type="email" 
            placeholder="Your Email" 
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400" 
            required 
          />
          <textarea 
            placeholder="Your Message" 
            className="w-full p-3 border border-gray-300 rounded-md h-32 focus:outline-none focus:ring-2 focus:ring-gray-400" 
            required
          ></textarea>
          <button 
            type="submit" 
            className="w-full bg-gray-800 text-white py-3 rounded-md text-lg hover:bg-gray-900 transition duration-200">
            Send Message
          </button>
        </form>
      </div>

      <div className="mt-8 text-center">
        <h2 className="text-2xl font-semibold text-gray-700">Our Contact Details</h2>
        <p className="text-gray-600">📍 123 Fashion Street, Mumbai, India</p>
        <p className="text-gray-600">📧 support@yourwebsite.com</p>
        <p className="text-gray-600">📞 +91 98765 43210</p>
      </div>
    </div>
  );
};

export default Contact;
