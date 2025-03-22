import React from 'react'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { ShopContext } from '../Contexts/ShopContext'
import { useSearchParams } from 'react-router-dom'
import Cookies from "js-cookie"
import {jwtDecode} from "jwt-decode"
const Verify = () => {
    const setcartItem = useContext(ShopContext)
    const navigate = useNavigate()
    const token = Cookies.get("token")
    const decoded = jwtDecode(token)
    const userId = decoded._id
    
   const [searchParams ]= useSearchParams() 
    const success = searchParams.get("success")
    const orderId = searchParams.get("orderId")
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const verifyPayment = async() => {
     try {
        if (!token) {
            return null;
        }
        const response =  await fetch(`${backendUrl}/orders/verify`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body:JSON.stringify({success,orderId,userId})

        })
        if (response.ok) {
            setcartItem({})
            toast.success("payment successfull")
            navigate("/orders")
            
        }
        else{
            toast.error("try again")
            navigate("/cart")
        }
     } catch (error) {
        toast.error(error)
        
     } 
    }
    
    useEffect(()=>{
        verifyPayment()
    }, [token])

  return (
    <div>Verify</div>
  )
}

export default Verify