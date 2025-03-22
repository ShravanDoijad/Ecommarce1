import React, { useEffect } from 'react'
import { assets } from '../assets/assets'
import { useContext, useState } from 'react'
import { ShopContext } from '../Contexts/ShopContext'
export const SearchBar = ({setCollection}) => {
    const {searchBar,
        setsearchBar,
        showSearch,
        setshowSearch,
        products
    } =useContext(ShopContext)
    const applyFilter=() => {
        
        setCollection(products.filter(item=> item.name.toLowerCase().includes(searchBar.toLowerCase())))
    }
    
    useEffect(()=>{
        applyFilter()
    }, [searchBar, showSearch])


   return showSearch? (
    <div className='w-full flex items-center justify-center my-8 ' >
        <div className='flex items-center gap-3 justify-center' >
            
                <input type="text" onChange={(e) => {
                  setsearchBar(e.target.value)
                }
                } className='px-8 py-2 rounded-2xl shadow-2xl placeholder:text-[18px] w-160 border border-gray-400' placeholder='search' />
            
            <img className='w-3 object-cover cursor-pointer' src={assets.cross_icon} alt="" onClick={() => {
              setshowSearch(false)
            }
            } />
        </div>

    </div>
  ):null
}
