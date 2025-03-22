import React from 'react'
import { useContext, useState,useEffect } from 'react'
import { ShopContext } from '../Contexts/ShopContext'
import Products from './Products'
export const RelatedProducts = ({foundProduct}) => {
    const [relProducts, setrelProducts] = useState([])
    const {products}=  useContext(ShopContext);
    
    
    
    const relatedProducts = products.filter((item)=>foundProduct.category===item.category && foundProduct.subCategory===item.subCategory  );

    
    
    useEffect(()=>{
        
        setrelProducts(relatedProducts.slice(0,5))
        
        
    },[products]);


    
    
    
  return (
    <>
    <h1 className='text-3xl font-medium text-center mt-8 markazi '>RELATED PRODUCTS</h1>
    <div className='flex gap-4 h-124 justify-between px-20 py-10 w-full  '>
        
        {
         relProducts.map((item, idx)=>
              <Products   key={idx} id={item._id} image={item.image} price={item.prices} name={item.name} />
         )
         }

    </div>
    </>
  )
}
