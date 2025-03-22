import React, { useEffect } from 'react'
import { useState } from 'react'
import { assets } from '../admin_assets/assets'
import { data } from 'react-router-dom'
import { toast } from 'react-toastify'
export const ListItems = () => {
  const [products, setproducts] = useState([])
  const backendUrl = import.meta.env.VITE_BACKEND_URL
  const removeProduct= async(id) => {
    try {
      const removeRes = await fetch(`${backendUrl}/product/remove`, {
        method:"POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({id}),
        credentials: "include"
      })

      if (removeRes.ok) {
        let data = await removeRes.json();
        toast("Product deleted")
        
      }
      else{
        console.log("error");
        
      }
    } catch (error) {
      console.log('error', error);
      
    }
  }
  


  const listproduct= async() => {
    try {
      const res = await fetch(`${backendUrl}/product/list`, {
        method : "GET" ,
        // headers:{
        //   "Content-Type": "application/json",
        // }, 
        credentials: "include"
      })
      if (res.ok) {
        const data =await res.json()
        setproducts(data.product)
      }
      else{
        console.log("no data");
        
      }
    } catch (error) {
      console.log('error',error);
      
    }
  }
  useEffect(()=>{
    listproduct()
    
  },[products])
  
  

  return (
    <div>
      
        <table className='w-full'>
          <thead className='w-full bg-[#eee]'>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className='w-full'>
      {products.map((item, idx)=>
           
      
            <tr key={idx} className='w-full'>
              <td className='w-20 h-30 px-4 py-2 border border-gray-400'><img src={item.image[0]} alt="" /></td>
              <td className=' text-center px-4 py-2 border border-gray-400'>{item.name}</td>
              <td className=' text-center px-4 py-2 border border-gray-400'>{item.category}</td>
              <td className=' text-center px-4 py-2 border border-gray-400'>{item.prices}</td>
              <td onClick={()=>removeProduct(item._id)
              } className=' text-center cursor-pointer px-4 py-2 border border-gray-400'>Delete</td>
            </tr>
        )
          }
          </tbody>
        </table>
      
        
    </div>
  )
}
