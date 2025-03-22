import React from 'react'
import Text from '../Components/Text'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { toast } from 'react-toastify'
const Login = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL
  console.log("backendUrl", backendUrl);
  
  const navigate = useNavigate()

  const [loginState, setloginState] = useState("sign up")
  const [name, setname] = useState('')
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${backendUrl}/api/login`,{
        method:"POST",
        headers:{
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password}),
        credentials: "include"
      })
      if( response.ok) {
        const data = await response.json();
        toast(data.msg)
        navigate("/")
      }
      else{
        console.log("response false", response);
        
      }
    } catch (error) {
      console.log("login again", error);
      
    }
  }
  
  const regSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${backendUrl}/api/register`,{
        method:"POST",
        headers:{
          "Content-Type": "application/json",
        },
        body: JSON.stringify({name ,email, password}),
        credentials: "include"
      })
      if( response.ok) {
        const data = await response.json();
        toast.success("successfull")
        navigate("/")
        
      }
      else{
        console.log("response false", response);
        
      }
    } catch (error) {
      console.log("login again", error);
      
    }
  }
  

  return (
    <div className='w-full min-h-[80vh]  flex justify-center items-center ' >
      <div className=' flex  flex-col w-1/3 h-fit items-center  gap-y-8' >
      {loginState=="sign up"?
        
        <Text text1={"Register"}/>:
        <Text text1={"Login"}/>
      }
        <form onSubmit={loginState=="sign up"?regSubmitHandler:submitHandler} className='w-full flex flex-col gap-y-4' >
          <input  type="text" placeholder='Name' onChange={(e)=>setname(e.target.value)} className={` markazi placeholder: markazi border ${loginState === "sign up" ? '' : 'hidden'} border-black`}/>
          <input type="email" placeholder='Email' onChange={(e)=>setemail(e.target.value)} className=' markazi placeholder: markazi border border-black  ' />
          <input type="password" placeholder='Password' onChange={(e)=>setpassword(e.target.value)} className=' markazi placeholder: markazi border border-black  ' />
        <div className='flex justify-between  w-full'>
          <p className="markazi text-[18px]">Forget your password?</p>
          {
            loginState=="sign up"?
          <p onClick={()=>(setloginState("sign in"))} className="markazi cursor-pointer text-[18px]">Login here</p>:
          <p onClick={()=>(setloginState("sign up"))} className="markazi cursor-pointer text-[18px]">Create account</p>
        }
        </div>
        {
          loginState=="sign up"?
          <button type='submit' className=" mx-auto w-36 h-10 bg-black text-white font-medium text-xl" >Sign up</button>:
          <button type='submit' className=" mx-auto w-36 h-10 bg-black text-white font-medium text-xl" >Sign in</button>
        }
        </form>
        
      </div>


    </div>
  )
}

export default Login