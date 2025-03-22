import React from 'react'
import { assets } from '../admin_assets/assets'
import { useNavigate } from 'react-router-dom'


export const Navbar = ({token, settoken}) => {
  const navigate = useNavigate()

  
  const  logouthandle = () => {
  
    settoken("")
    localStorage.removeItem("token")
  }
  
  return (
    <div className='w-full flex justify-between py-8 items-center '>
        <div className="logo">
          <img className='w-40 object-cover' src={assets.logo} alt="" />
         
        </div>
        <div className="logOut">
            <button onClick={()=>logouthandle()}  className='w-32 h-10 bg-black text-white font-bold cursor-cell'>LOGOUT</button>
        </div>
    </div>
  )
}
