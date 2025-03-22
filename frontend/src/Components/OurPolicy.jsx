import React from 'react';
import { assets } from '../assets/assets';
const OurPolicy = () => {
  const policies = [
    { id: 1, img:assets.exchange_icon, title: 'Customer Satisfaction' },
    { id: 2, img:assets.quality_icon, title: 'Secure Transactions' },
    { id: 3, img:assets.support_img, title: 'Fast Delivery' },
  ];

  return (
    <div className="w-full flex flex-col items-center p-6 mt-10">
    
    
      
    
      <h1 className='font-bold text-3xl ' >OUR <span className='text-green-600'>POLICIES</span></h1>

      
      <div className="flex flex-wrap justify-center gap-8 mt-6">
        {policies.map(policy => (
          <div key={policy.id} className="flex flex-col items-center gap-y-2.5">
            <img src={policy.img} alt={policy.title}  className=' w-24 h-auto object-cover' />
            <h2 className="text-lg font-semibold mt-3">{policy.title}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurPolicy;
