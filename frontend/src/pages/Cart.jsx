import React from 'react'
import { useEffect, useState, useContext } from 'react'
import { ShopContext } from '../Contexts/ShopContext'
import { assets } from '../assets/assets';
import { CartTotal } from '../Components/CartTotal';
import { useNavigate } from 'react-router-dom';
import Orders from './Orders';

const Cart = () => {
  let { cartItem, products, currency, updateData } = useContext(ShopContext);
  const [cartData, setcartData] = useState([])

  const navigate = useNavigate()

  useEffect(() => {
    let tempData=[];

    
    for (const items in cartItem) {
      for (const item in cartItem[items]) {
        if (cartItem[items][item]) {
          
          
          tempData.push({
            _id: items,
            size: item,
            quantity: cartItem[items][item],

          });
        }

      }

    }
    setcartData(tempData)
  }, [cartItem])

  
  return (
    <div className='w-full  mx-10  my-10 '>
      <h1 className='font-bold markazi text-3xl ' >YOUR CART</h1>
      <hr className='text-gray-300' />
      <div className='flex flex-col p-6 gap-y-5'>
        {
        cartData.map((item, idx) => {
          const cartProduct= products.find((product) => product._id === item._id
        )
        
            return(
              <>
              <div key={idx} className=' flex justify-between items-center' >
                <div className='flex gap-10 items-center'>
                  <img className='w-30 h-30 object-cover' src={cartProduct.image[0]} alt="" />
                  <div className=' flex flex-col gap-y-3'>
                    <h1 className='text-xl  font-medium'>{cartProduct.name}</h1>
                    <div className='flex gap-6 items-center'>
                      <h1 className='text-xl font-medium'>{currency} {cartProduct.prices*item.quantity}</h1>
                      <button className='w-10 h-10 border border-gray-400'>{item.size}</button>
                    </div>
                    
                  </div>
                </div>
                <div>
                  <input type="number" placeholder={item.quantity}  onChange={(e)=>e.target.value===" " || e.target.value === 0?null:updateData(item._id, item.size, Number( e.target.value)) } className='border w-10  p-1' />
                </div>
                <div>
                  <img  className='w-5 cursor-pointer' onClick={() =>updateData(item._id, item.size, 0) } src={assets.bin_icon} alt="" />
                </div>
              </div>
                <hr className=' text-gray-400' />
              </>
              
            )
            
          
})
      }
      </div >
      <div className=' flex flex-col gap-y-3 items-end '>
        <CartTotal cartData={cartData}/>
        <button onClick={() => {
              navigate('/placeorder')
            }
            } className='bg-black text-white text-xl font-bold markazi w-36 h-10 mr-10 '>Checkout</button>
      </div>
    </div>
  )
}

export default Cart