import React from 'react'
import { assets } from '../assets/assets'
const Hero = () => {
  return (
    <div className=' w-full h-[70vh] border-2 border-black flex flex-col sm:flex-row gap-4 items-center mt-12'>
      <div className='text-center w-full  h-full sm:w-1/2 relative '  >
        <div className=' flex flex-col items-start absolute top-1/2  left-1/2 transform translate-x-[-50%] translate-y-[-50%] bg w-3/4'>
          <div className='flex items-center gap-2 '>
            <p className='w-16 h-[2px] bg-gray-700'></p>
            <p className='font-medium  text-gray-600' >OUR BESTSELLERS</p>
          </div>
          <div className='font-medium text-3xl lg:text-5xl prata-regular leading-relaxed ' >Latest Arraivals</div>
          <div className='flex items-center justify-center gap-2'>
            <p className='font-medium  text-gray-600' >SHOP INN</p>
            <p className='w-16 h-[1.5px] bg-gray-700'></p>
          </div>
        </div>
      </div>
      <div className='w-full sm:w-1/2 h-full bg-amber-200 ' >
        <img src={assets.hero_img} className=' object-cover  h-full object-right w-full -z-0  ' alt="" />
      </div>
    </div>
  )
}

export default Hero