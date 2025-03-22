import React from 'react'
import { useNavigate } from 'react-router-dom'
import Cookie from "js-cookie"
import { useState, useEffect, } from 'react'
import { toast } from 'react-toastify'
import Cookies from 'js-cookie'
export const Login = ({settoken, token}) => {
  const [email, setemail] = useState("")
  const [password, setpassword] = useState('')
  const navigate = useNavigate()
  
  const backendUrl = import.meta.env.VITE_BACKEND_URL
  const submitHandler = async(e) => {
    try {
      e.preventDefault();
      const response = await fetch(`${backendUrl}/api/adminLogin`, {
        method: "POST",
        headers:{
          "Content-Type": "application/json"
        },
        body: JSON.stringify({email, password}),
        credentials: "include"
        })
        if (response.ok) {
          const res = await response.json();
          
          
          settoken(res.token)

          toast.success("Login successfull")
        }
        else{
          toast.error("Invalid credintials")
        }
        
      } catch (error) {
        console.log("error", error);
        
      }
    }
  return (
    <div className='w-full'>
      
    <>
    <div className='w-full h-screen  flex justify-center items-center flex-col gap-y-4' >
      <h1 className='text-2xl font-bold text-gray-500 '>Admin panel</h1>
      <form onSubmit={submitHandler} className='w-120 h-48 bg-[#eee] shadow-2xl p-6 flex flex-col gap-y-4'>
        <input type="email" onChange={(e)=>{setemail(e.target.value)}}  value={email} className='border border-black rounded-[4xp] placeholder:text-[15px] placeholder:font-semibold w-full h-10 px-8'  placeholder='abc@gmail.com' />
        <input type="password" onChange={(e) =>{setpassword(e.target.value)}} value={password}   className='border border-black rounded-[4xp] placeholder:text-[15px] placeholder:font-semibold w-full h-10 px-8' placeholder='Password' />
        <button type='submit'  className='w-full bg-black text-xl font-semibold text-white shadow-xl p-1 rounded-2xl'>LOGIN</button>
      </form>
    </div>
    </>
    </div>
  )
  
 
}

