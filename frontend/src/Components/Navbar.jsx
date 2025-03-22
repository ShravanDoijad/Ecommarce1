import React, { useRef } from 'react'
import { assets } from '../assets/assets'
import { useState, useContext } from 'react'

import { NavLink,useNavigate ,Link } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import { ShopContext } from '../Contexts/ShopContext'
import Cookies from "js-cookie"
import gsap from 'gsap'
import {toast} from "react-toastify"
const Navbar = () => {
  const navigate = useNavigate()
  const [visible, setvisible] = useState(false)
  const navRef = useRef();
  const {
    setshowSearch, cartItemCount, setcartItem} = useContext(ShopContext)
  const logoutHandler = async () => {
    Cookies.remove("token")
    setcartItem("")
    navigate("/login");
    toast.error("Please login")
    
    
  }
  
  useGSAP(()=>{
    gsap.from(navRef.current, {
      y:20,
      opacity:0,
      duration:1,
      delay:0.1,
    })
  },[])

 
  

  return (
    <div ref={navRef} className='nav flex justify-between items-center sm:px-10'>
      <Link to={"/"} ><img className='w-28 h-auto cover' src={assets.logo} alt="" /></Link>
      <ul className='hidden sm:flex gap-6 items-center'>
        <NavLink to={'/'} className='flex flex-col  justify-center items-center gap-1' >
          <p>HOME</p>
          <hr className='w-2/4 mx-auto border-none h-[1.5px] bg-gray-700 hidden' />
        </NavLink >
        <NavLink to={'/collection'} className='flex flex-col  justify-center items-center gap-1' >
          <p>COLLECTION</p>
          <hr className='w-2/4 mx-auto border-none h-[1.5px] bg-gray-700 hidden' />
        </NavLink >
        <NavLink to={'/about'} className='flex flex-col  justify-center items-center gap-1' >
          <p>ABOUT</p>
          <hr className='w-2/4 mx-auto border-none h-[1.5px] bg-gray-700 hidden' />
        </NavLink >
        <NavLink to={'/contact'} className='flex flex-col  justify-center items-center gap-1' >
          <p>CONTACT</p>
          <hr className='w-2/4 mx-auto border-none h-[1.5px] bg-gray-700 hidden' />
        </NavLink >

      </ul>
      <div className='flex gap-6 items-center'>
        <Link to={"/collection"}><img className='w-5 cursor-pointer' src={assets.search_icon} onClick={() => {
          setshowSearch(true)
        }
        } alt="search" /></Link>
        <div className="group relative  ">{
          
          <Link to={Cookies.get("token")?"/":"/login"}><img className='w-5 cursor-pointer' src={assets.profile_icon} alt="" /></Link>}
        {Cookies.get("token")?
          <div className=' hidden group-hover:block pt-2'>
            <div className='absolute top-8 right-0 opacity-80 bg-white shadow-lg rounded-lg flex flex-col gap-2 p-6 pt-6  z-40 transition-all duration-300 '>
              <p className='cursor-pointer    hover:text-black hover:text-lg' >Profile</p>
              <p className='cursor-pointer   hover:text-black hover:text-lg' >Orders</p>
              <p onClick={()=>logoutHandler()} className='cursor-pointer   hover:text-black hover:text-lg' >Logout</p>

            </div>
          </div>:"" }
        </div>
        <Link to={'/cart'} className='relative' >
          <img className='w-5 cursor-pointer' src={assets.cart_icon} alt="" />
          <p className='absolute rounded-full w-4 h-4 bg-black text-white text-center aspect-square text-[10px] right-[-8px] bottom-[-8px]'> {cartItemCount()}</p>

        </Link>
        <img src={assets.menu_icon} onClick={() => {
          visible ? setvisible(false) : setvisible(true)
        }
        } alt="" className="menu sm:hidden w-5 z-10" />
      </div>
      {
        visible?
      <div className={'flex flex-col gap-8 items-center absolute top-0 right-0 w-full h-full p-8 pt-32 bg-white transition-all duration-300 '}>
         <NavLink to={'/'} onClick={()=>setvisible(false)} className='flex flex-col  justify-center items-center gap-1' >
          <p>HOME</p>
        </NavLink >
          <hr className='w-full  border-none h-[1.5px] bg-gray-700 ' />
        <NavLink to={'/collection'} onClick={()=>setvisible(false)} className='flex flex-col  justify-center items-center gap-1' >
          <p>COLLECTION</p>
        </NavLink >
          <hr className='w-full mx-auto border-none h-[1.5px] bg-gray-700 ' />
        <NavLink to={'/about'} onClick={()=>setvisible(false)} className='flex flex-col  justify-center items-center gap-1' >
          <p>ABOUT</p>
        </NavLink >
          <hr className='w-full mx-auto border-none h-[1.5px] bg-gray-700 ' />
        <NavLink to={'/contact'} onClick={()=>setvisible(false)} className='flex flex-col  justify-center items-center gap-1' >
          <p>CONTACT</p>
        </NavLink >
          <hr className='w-full mx-auto border-none h-[1.5px] bg-gray-700 ' />

      </div>:null
      }
    
    </div>

  )
}

export default Navbar