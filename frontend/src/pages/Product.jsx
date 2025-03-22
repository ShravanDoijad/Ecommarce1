import React from 'react'

import { useParams } from 'react-router-dom'

import { useContext, useState, useEffect } from 'react';
import { ShopContext } from '../Contexts/ShopContext';
import { assets } from '../assets/assets';
import { RelatedProducts } from '../Components/RelatedProducts';
const Product = () => {
  const { productId } = useParams();
  
  const { products, addCart} = useContext(ShopContext);
  const [productData, setproductData] = useState()
  const [images, setimages] = useState([])
  const [size, setsize] = useState([])
  

  const foundProduct = products.find((item) =>
    item._id === productId
  )

  


  useEffect(() => {

    if (foundProduct) {
      setproductData(foundProduct);
      setimages(foundProduct.image || [])
      
      

    }
  }, [productId, products])


  
  
  
  

  


  return (
    <div>
      <div className='flex gap-2 w-full h-[80vh]  my-10 px-10 '  >
        <div className="w-28 h-full  object-contain flex flex-col justify-between">
          {
            images.map((item, idx) =>

              <div key={idx} className="" >
                <img className=' object-cover object-center ' src={item} alt="" />

              </div>
            )
          }
        </div>

        <div className='w-2/5 h-full'>
          {
            <img className='w-full h-full object-contain' src={images[0]} alt="" />
          }

        </div>
        <div className='flex flex-col gap-2'>

          {productData ?
            <div className=' flex gap-6 flex-col'><h1 className='text-2xl font-bold markazi '> {productData.name}</h1>
              <div className="reviews flex w-4 items-center  gap-1  ">
                <img className=' object-cover' src={assets.star_icon} alt="" />
                <img className=' object-cover' src={assets.star_icon} alt="" />
                <img className=' object-cover' src={assets.star_icon} alt="" />
                <img className=' object-cover' src={assets.star_icon} alt="" />
                <img className=' object-cover' src={assets.star_dull_icon} alt="" />
                <p>(122)</p>
              </div>
              <h1 className=' text-3xl font-extrabold '>$ {productData.prices}</h1>
              <div className=' text-gray-400 text-md ' >{productData.description}</div>
              <div className='flex flex-col gap-2 '>
                <h1>Select size</h1>
                <div className='flex gap-3'>
                  {productData.sizes.map((item, idx) =>
                    <button key={idx} onClick={()=>setsize(item)
                    } className=' cursor-pointer w-10 h-10 border hover:border-green-500 border-gray-300 shadow-2xl '>{item}</button>

                  )}
                </div>


              </div>
              <button onClick={()=>addCart(productData._id, size)} className='w-40 h-12 bg-black text-white  font-mono' >ADD TO CART</button>
              <hr />
            </div>
            :
            <h1>loading...</h1>
          }

        </div>
      </div>
      <div>
        <table className=''>
          <thead>
          <tr className="flex border-b  justify-start ">
            <th className='border p-2'>Description</th>
            <th className='border p-2'>Reviews (122)</th>
          </tr>
          </thead>
          <tbody>
          <tr className='border'>
            <td>An e-commerce website is an online platform that facilitates the buying and selling of products or services over the internet. It serves as a virtual marketplace where businesses and individuals can showcase their products, interact with customers, and conduct transactions without the need for a physical presence. E-commerce websites have gained immense popularity due to their convenience, accessibility, and the global reach they offer.

              E-commerce websites typically display products or services along with detailed descriptions, images, prices, and any available variations (e.g., sizes, colors). Each product usually has its own dedicated page with relevant information.</td>
          </tr>
          </tbody>
        </table>
      </div>
          <RelatedProducts foundProduct={foundProduct} />

    </div>
  )
}

export default Product