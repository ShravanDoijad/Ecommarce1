import React from 'react';

const About = () => {
  return (
    <div className='w-full min-h-screen p-8 flex flex-col items-center bg-gray-50'>
      <h1 className='text-4xl font-bold text-gray-800 mb-6'>About Us</h1>
      <p className='text-lg text-gray-600 max-w-3xl text-center'>
        Welcome to <span className='font-bold'>YourBrand</span>, where fashion meets comfort! We are passionate about bringing you 
        trendy, high-quality clothing that makes you feel confident and stylish.
      </p>
      
      <div className='mt-10 max-w-4xl'>
        <h2 className='text-2xl font-semibold text-gray-700 mb-3'>Our Story</h2>
        <p className='text-md text-gray-600'>
          Founded in [Year], YourBrand started as a small idea with a big vision – to redefine fashion by making it more
          accessible and sustainable. Our journey began with a love for design and a commitment to quality, and today, we 
          proudly offer a collection that blends style, comfort, and affordability.
        </p>
      </div>

      <div className='mt-10 max-w-4xl'>
        <h2 className='text-2xl font-semibold text-gray-700 mb-3'>What We Offer</h2>
        <ul className='list-disc list-inside text-md text-gray-600'>
          <li>Trendy and high-quality apparel for men, women, and kids.</li>
          <li>Eco-friendly and sustainable fashion choices.</li>
          <li>Affordable prices without compromising on style.</li>
          <li>Worldwide shipping and seamless shopping experience.</li>
        </ul>
      </div>

      <div className='mt-10 max-w-4xl'>
        <h2 className='text-2xl font-semibold text-gray-700 mb-3'>Our Mission</h2>
        <p className='text-md text-gray-600'>
          At YourBrand, we believe fashion should be inclusive, sustainable, and inspiring. Our mission is to create 
          stylish, high-quality clothing that empowers individuals to express themselves confidently while caring for 
          the planet.
        </p>
      </div>

      <div className='mt-10 max-w-4xl text-center'>
        <h2 className='text-2xl font-semibold text-gray-700 mb-3'>Join Our Fashion Movement</h2>
        <p className='text-md text-gray-600'>
          Follow us on social media and be part of our growing community. Stay updated on the latest trends, exclusive 
          offers, and new collections!
        </p>
      </div>
    </div>
  );
};

export default About;
