import React from 'react'
import Text from './Text'
import { useContext  } from 'react'
import { useNavigate } from 'react-router-dom'
import { ShopContext } from '../Contexts/ShopContext'
export const CartTotal = () => {
    const {totalAmt,currency,  deleivery_fee} = useContext(ShopContext)
    const navigate = useNavigate()
  return (
    <div className=' mb-10'>
        <div className='flex px-8 flex-col  justify-between  items-center mx-10 my-5 mb-0 p-3 w-120 bottom-10 right-10 border border-gray-400' >
          <Text text1={"CART"} text2={"TOTAL"} />
          <div className='flex justify-between w-full text-[20px] text-gray-600 markazi bg-amber-300 '><p>subtotal </p><p>{currency}{totalAmt()}</p></div>
          <br />
          <div className='flex justify-between w-full text-[20px] text-gray-600 markazi'><p>deleiveryfee</p><p>{currency}{deleivery_fee}</p></div>
          <br />
          <hr className=' text-gray-500 w-full ' />
          
          <div className='flex justify-between w-full text-[20px] text-black markazi'><p>Total</p><p>{currency}{totalAmt()==0?0:totalAmt()+deleivery_fee }</p></div>
            <br />

           
        </div>
    </div>
  )
}
