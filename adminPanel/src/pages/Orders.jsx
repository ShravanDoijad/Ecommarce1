import React from 'react'
import { useEffect, useState } from 'react'
import { assets } from '../../../frontend/src/assets/assets'
export const Orders = () => {
  const [allOrders, setAllOrders] = useState([])
  const backendUrl = import.meta.env.VITE_BACKEND_URL
  const loadOrders = async () => {
    try {
      const response = await fetch(`${backendUrl}/orders/allOrders`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      })
      if (response.ok) {
        const data = await response.json()
        console.log( data)
        let adminOrders = [];
        data.orders.forEach((order)=>
          
          adminOrders.push(order)
        )
        setAllOrders(adminOrders)
      }
      else{
        console.log('no data', response);
        
      }
    } catch (error) {
      console.log('error', error);
      
    }
  }
  useEffect(() => {
    loadOrders()
    console.log("allOrders", allOrders);
    
  }, [])
  return (
    <div className='flex flex-col items-center justify-center m-6 gap-y-4'>
      {
        allOrders.map((order,idx)=>{
       
          return(
            <div className='w-full h-40 flex items-center justify-between border border-gray-300 rounded-2xl p-6' key={idx}>

              <div className='w-1/7 h-full'>
                <img src={assets.menu_icon} alt="" />
              </div>
              <div className=' h-full flex flex-col items-start justify-center gap-y-2'>
              {
              order.items.map((item, index)=>{
                return(
              <div key={index} className=''>
                <h1 className='text-blue-400 flex flex-nowrap '>{item.name}   X {item.quantity}{item.size}</h1>
                
                </div>
              )})}
              
              <div>
              <h1 className=' my-2 font-semibold'>{order.address.firstName}  {order.address.lastName}</h1>
              <h1>{order.address.street}</h1>
              <h1>{order.address.city}, {order.address.country}, {order.address.zipcode}</h1>
              </div>
              </div>
              <div>
                <h1>item: {order.items.length}</h1>
                <h1>method: {order.paymentMethod}</h1>
                <h1>payment: {order.payment? "ready to deliver": "pending"}</h1>
                <h1>Date: {new Date(order.date).toLocaleDateString()}</h1>
              </div>
              <div>
                <h1>Total: $ {order.amount}</h1>
                
              </div>
              <div>
                <select name="" id="" className='border border-gray-300 rounded-2xl p-2 flex items-center justify-center px-6'>
                  <option value="pending">pending</option>
                  <option value="ready">ready</option>
                  <option value="delivered">delivered</option>
                </select>
              </div>
            </div>
            
          )
        
      })
      }

    </div>
  )
}
