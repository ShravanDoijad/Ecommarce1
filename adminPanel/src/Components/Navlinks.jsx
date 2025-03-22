import React from 'react'
import { assets } from '../admin_assets/assets'
import { useNavigate } from 'react-router-dom'
export const Navlinks = () => {
    const navigate = useNavigate()
  return (
    <div className='w-1/5 min-h-[80vh] flex flex-col gap-y-6 justify-start pt-4 items-center border-r border-gray-400'>
        <div onClick={()=>navigate("/add")}   className="btn flex items-center active:bg-amber-500 gap-2 w-48 cursor-pointer h-16 border border-gray-400 p-3 ">
            <img className='w-5 object-cover' src={assets.add_icon} alt="" />
            <h1 className='text-xl font-semibold text-black '>Add items</h1>
        </div>
        <div onClick={()=>navigate("/list")}  className="btn flex items-center active:bg-amber-500 gap-2 w-48 cursor-pointer h-16 border border-gray-400 p-3 ">
            <img className='w-5 object-cover' src={assets.parcel_icon} alt="" />
            <h1 className='text-xl font-semibold text-black '>List items</h1>
        </div>
        <div onClick={()=>navigate("/orders")}  className="btn flex items-center active:bg-amber-500 gap-2 w-48 cursor-pointer h-16 border border-gray-400 p-3 ">
            <img className='w-5 object-cover' src={assets.order_icon} alt="" />
            <h1 className='text-xl font-semibold text-black '>Order</h1>
        </div>
    </div>
  )
}
