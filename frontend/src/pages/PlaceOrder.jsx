import React, { useState } from 'react'
import Text from '../Components/Text'

import { CartTotal } from '../Components/CartTotal'
import { Meta, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import { useContext } from 'react'
import { ShopContext } from '../Contexts/ShopContext'
import Cookies from "js-cookie"
import { jwtDecode } from 'jwt-decode'
import { toast } from 'react-toastify'
const backendUrl = import.meta.env.VITE_BACKEND_URL
const PlaceOrder = () => {
  const navigate = useNavigate()
  const [method, setMethod] = useState('COD')
  const token = Cookies.get("token")
  const decoded = jwtDecode(token)
  const userId = decoded._id
  const { cartItem, setcartItem, deleivery_fee, products, totalAmt } = useContext(ShopContext)
  const [loading, setloading] = useState(false)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: ''
  })
  
  

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const initPay= (order) => {
    const options ={
      key : import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: 'Ecommerce',
      description: 'Payment',
      order_id: order.id,
      handler: async (response)=>{
        try {
          
          const razorpay_order_id = response.razorpay_order_id
        const res = await fetch(`${backendUrl}/orders/verifyRazorpay`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
        
          body: JSON.stringify({razorpay_order_id, order, userId}),
          credentials: "include"
        })
        if(res.ok){
          setcartItem({})
          navigate("/orders")
          toast.success("Payment successfull")
        }
        else{
          console.log('invalid res', res)
          toast.error("Payment failed")
          navigate("/cart")
        }
      } catch (error) {
          console.log('can not verify payment', error);
          toast.error("Payment failed")
          
      }
      },
      
      
    }
    const rzp = new window.Razorpay(options )
        rzp.open()
  }
  
  
  const submitHandler = async(e) => {
    try {
     
   
    e.preventDefault()

    const orderItems = [];

    for (const items in cartItem) {
      for (const item in cartItem[items]) {
        const productData = products.find((product) => product._id === items)
        if (cartItem[items][item]) {
          productData.size = item,
          productData.quantity = cartItem[items][item]
          orderItems.push(productData)
        }}}
        const orderData = {
          items: orderItems,
          address: formData,
          amount: totalAmt() + deleivery_fee,
        }

        switch (method) {
          case "cod":
            const res = await fetch(`${backendUrl}/orders/getOrder`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(orderData),
              credentials: 'include'
            })
            if (res.ok) {
              const data = await res.json()
              setcartItem({})
              navigate("/orders")
            }
            else{
              console.log('invalid res', res)
            }
            break;
        case "stripe":
          const stripeRes = await fetch(`${backendUrl}/orders/stripePayment`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderData),
            credentials: 'include'
          })
          setloading(true)
          if (stripeRes.ok) {
            const data = await stripeRes.json()
            setTimeout(() => {
              setloading(false)
              window.location.replace(data.session_url)
              
            }, 2000);
          }
          else{
            console.log('invalid res', stripeRes)
          }
          break;
        case "razorpay":
            const razorpayRes = await fetch(`${backendUrl}/orders/razorpay`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(orderData),
              credentials: 'include'
        })
        setloading(false)
        if (razorpayRes.ok) {
          const data = await razorpayRes.json()
          
          await initPay(data.order)
          

        }
        else{
          console.log('invalid res', razorpayRes)
        }
        break;
          default:
            break;
        }  

   
  } catch (error) {
      console.log('can not place order', error);
      
  }
    
  }
  

  return (
    <div className='h-screen pt-16 w-full'>
      {loading?
      
      <div className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center'>
        <div className='bg-white p-10 rounded-lg'>
          <h1 className='text-2xl font-bold'>Processing...</h1>
          </div>
          </div>
          :
      <div className='flex w-full h-full justify-between items-center'>
        <div className='w-1/2 h-full p-10'>
          <Text text1={"DELIVERY"} text2={"INFORMATION"} />
          <form onSubmit={submitHandler} className='flex flex-col gap-y-5 my-6 justify-center items-center w-3/4'>
            <div className='full flex gap-2'>
              <input type="text" name="firstName" placeholder='First name' value={formData.firstName} onChange={handleChange} />
              <input type="text" name="lastName" placeholder='Last name' value={formData.lastName} onChange={handleChange} />
            </div>
            <input type="email" name="email" placeholder='Email address' value={formData.email} onChange={handleChange} />
            <input type="text" name="street" placeholder='Street' value={formData.street} onChange={handleChange} />
            <div className='w-full grid grid-cols-2 grid-rows-2 gap-6'>
              <input type="text" name="city" placeholder='City' value={formData.city} onChange={handleChange} />
              <input type="text" name="state" placeholder='State' value={formData.state} onChange={handleChange} />
              <input type="text" name="zipcode" placeholder='Zipcode' value={formData.zipcode} onChange={handleChange} />
              <input type="text" name="country" placeholder='Country' value={formData.country} onChange={handleChange} />
            </div>
            <input type="number" name="phone" placeholder='Phone' value={formData.phone} onChange={handleChange} />
            <button type="submit" className='bg-black text-white text-xl font-bold markazi w-36 h-10'>Place Order</button>
          </form>
        </div>
        <div className='w-1/2 flex flex-col gap-y-10 justify-center mb-40 h-full'>
          <div className='w-96 mb-0'>
            <CartTotal />
          </div>
          <div className='flex flex-col gap-4 mr-30'>
            <Text text1={"PAYMENT"} text2={'METHOD'} />
            <div className='flex justify-center items-center gap-4'>
              <button onClick={() => setMethod("stripe")} className={`w-fit px-5 h-10 border flex items-center ${method === "stripe" ? 'bg-yellow-500' : ''} justify-center border-blue-600`}>
                <img src={assets.stripe_logo} className='w-10' alt="" />
              </button>
              <button onClick={() => setMethod("razorpay")} className={`w-fit px-5 h-10 border flex items-center ${method === "razorpay" ? 'bg-yellow-500' : ''} justify-center border-blue-600`}>
                <img src={assets.razorpay_logo} className='h-5 object-cover' alt="" />
              </button>
              <button onClick={() => setMethod("cod")} className={`font-bold markazi text-xl ${method === "cod" ? 'bg-yellow-500' : ''} w-fit px-5 h-10 border flex items-center justify-center border-blue-600`}>
                Cash on delivery
              </button>
            </div>
          </div>
          
        </div>
      </div>}
    </div>
  )
}

export default PlaceOrder
