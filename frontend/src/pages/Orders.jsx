import React, { useEffect } from 'react'
import Text from '../Components/Text'
import { useContext, useState } from 'react'
import Cookies from 'js-cookie'
import { ShopContext } from '../Contexts/ShopContext'
const Orders = ({cartProduct}) => {
  const {cartItem, products, currency} = useContext(ShopContext);
  const [cartData, setcartData] = useState([])

  useEffect(()=>{
    let tempData =[];
    for (const items in cartItem) {
      for (const item in cartItem[items]) {
        if(cartItem[items][item]){

          tempData.push({
            _id:items,
            size :item,
            quantity : cartItem[items][item]
            
          })
        }
      
      }
    }
    setcartData(tempData)
  },[cartItem])
  const token =  Cookies.get('token')
  const backendUrl = import.meta.env.VITE_BACKEND_URL
  const orderData = async () => {
    try {
      
      if (!token) {
        console.log("no token");
        return  null
        
      }
      
      const response  = await fetch(`${backendUrl}/orders/userOrders`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'

        
      })
        if (response.ok) {
          const data = await response.json()
          const order = []
          data.orders.forEach((item)=>{
           item.items.forEach((product)=>{
            product.payment = item.payment,
            product.status = item.status,
            product.paymentMethod = item.paymentMethod,
            product.date = item.date
            order.push(product)
            
           })
           
          })
          
          
          setcartData(order)
          
          
        }
        else{
          console.log("no data", response)
        }

    
    } catch (error) {
      console.log("error", error);

      
    }
  }
  useEffect(() => {
    orderData()
        
    
}, [token, cartData]);


  return (
    <div className=' w-full min-h-[80vh] mb-20 p-6 py-8'>
      <div className=' mb-2 flex items-start justify-start'>
      <Text text1={"MY"} text2={"ORDERS"} />
      </div>
      <hr className='text-gray-400 w-full' />

      <div>
        {
          cartData.map((item, idx)=>{
            
            

            return (
              <div className='flex flex-col gap-y-4' key={idx}>
                <div className='flex justify-between items-center gap-4'>
                  <div className='flex gap-4' >
                  <img className=' w-30' src={item.image? item.image[0]:null} alt="" />
                  <div className='flex flex-col gap-y-3'>
                      <h1 className='text-xl text-gray-500 markazi font-bold'>{item.name}</h1>
                      <div className=' flex gap-3'>
                        <h1>{currency}{item.prices}</h1>
                        <h1>Quantity: {item.quantity}</h1>
                        <h1>{item.size}</h1>
                      </div>
                      <h1>Date: <span className='text-gray-500'>{new Date(item.date).toDateString()}</span></h1>
                      <h1>Payment: <span className='text-gray-400'>{item.paymentMethod}</span></h1>
                  </div>
                  </div>
                  <div>
                    <h1 className=' flex  gap-2 items-center' ><span className='w-3 h-3 bg-green-400 rounded-full ' ></span><span className='text-xl markazi font-semibold '>{item.status}</span></h1>
                  </div>
                  <button onClick={orderData} className='text-black markazi w-32 h-10 border border-gray-300 '>Track order</button>
                </div>
                <hr className='text-gray-500 w-full' />
              </div>
            )
          })
        }

        

      </div>

    </div>
  )
}

export default Orders