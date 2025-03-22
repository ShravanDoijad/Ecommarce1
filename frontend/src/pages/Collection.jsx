import React, { useEffect } from 'react'
import {assets} from '../assets/assets'
import { useState } from 'react'
import {ShopContext} from "../Contexts/ShopContext"
import { useContext } from 'react'
import Products from '../Components/Products'
import { SearchBar } from '../Components/SearchBar'
const Collection = () => {
  const [showFilter, setshowFilter] = useState(false)
  const {products} = useContext(ShopContext)
  const [Collection, setCollection] = useState([])

  const [category, setcategory] = useState([])
  const [sortType, setsortType] = useState('')
  const [subCategory, setsubCategory] = useState([])

  const toggleCategory = (e) => {
    
    
      setcategory((prev) => 
        
        
        prev.includes(e.target.value)?
        prev.filter(item=> item !== e.target.value)
        : [...prev, e.target.value]
        
      )
    }

  const toggleSubCategory = (e) => {
    
      setsubCategory((prev) => 
        prev.includes(e.target.value)?
        prev.filter(item=> item !== e.target.value)
        :[...prev, e.target.value]
    )}
  
    
      const filterData =() => {

      if (category.length === 0 && subCategory.length === 0) {
        setCollection(products);
      } else {
        setCollection(
          products.filter((product) => 
            (category.length === 0 || category.includes(product.category)) &&
            (subCategory.length === 0 || subCategory.includes(product.subCategory))
          )
        );
      }
    }

    useEffect(() => {
      filterData()
    }, [category, subCategory, products]);


    const sortProducts = () => {
      if(sortType){
      const sortproduct = [...Collection];
      if(sortType == "high to low")
        sortproduct.sort((a,b) => 
          (b.price - a.price)
        
        )
      else if(sortType == "low to high")
        sortproduct.sort((a,b) => 
          (a.price - b.price)
        
        )
      else{
        filterData()
        return;
      }    
      setCollection(sortproduct)
    }
  }

    useEffect(()=>{
      sortProducts()
    }, [sortType])
  
  return (
    <>
      <SearchBar setCollection={setCollection}/>

    <div className="w-full flex mt-8 "   >

      <div className='w-1/6 m-8 ml-10 cursor-pointer mt-0 ' onClick={()=>setshowFilter(!showFilter)} >
        <div className='flex  items-center gap-2'>
        <h1>FILTERS</h1>
        <img src={assets.dropdown_icon} className={`sm:hidden w-3 ${showFilter?'rotate-90 ':""}`} alt="" />
        </div>
        <div className={`filters w-full gap-y-2 m-4 mx-10 flex flex-col justify-center ${showFilter ? " " : 'hidden sm:flex'} items-start`}>
          <div className='bg-[#eee] p-4 px-6 gap-y-2 flex flex-col  border w-48' >
            <h1>CATEGORIES</h1>
            <p className='flex gap-2 items-center w-full'>
              <input type="checkbox" onChange={toggleCategory} value={'Men'} />
              Men
            </p>
            <p className='flex gap-2 items-center w-full'>
              <input type="checkbox" onChange={toggleCategory} value={'Women'} />
              Women
            </p>
            <p className='flex gap-2 items-center w-full'>
              <input type="checkbox" onChange={toggleCategory} value={'Kids'} />
              kids
            </p>
          </div>
          <div className='bg-[#eee] p-4 px-6 gap-y-2 flex flex-col  border w-48' >
            <h1>SUBCATEGORIES</h1>
            <p className='flex gap-2 items-center w-full'>
              <input type="checkbox" onChange={toggleSubCategory} value={'Topwear'} />
              Topwear
            </p>
            <p className='flex gap-2 items-center w-full'>
              <input type="checkbox" onChange={toggleSubCategory} value={'Bottomwear'} />
              Bottomwear
            </p>
            <p className='flex gap-2 items-center w-full'>
              <input type="checkbox" onChange={toggleSubCategory} value={'Winterwear'} />
              Winterwear
            </p>
          </div>
        </div>



      </div>
      <div className="right w-full ">
        <div className='flex justify-between items-center' >
          <h1 className='font-bold text-3xl font-mono' >ALL COLLECTIONS</h1>
          <select onChange={(e)=>setsortType(e.target.value)} className=' p-2 border rounded-sm border-gray-400' name="sortType" id="sortType"> 
            <option value="relavent">Relavent</option>
            <option value="high to low">high to low</option>
            <option value="low to high">low to high</option>
          </select>
        </div>
        <div className='grid grid-cols-4 m-6 gap-y-4' >
          {
            Collection.map((item, idx)=>(
              <div className='w-58 ' key={idx} >
                <Products id={item._id} image={item.image} price={item.prices} name={item.name} />
              </div>
            ))
          }

          {/* <div className="reviews">
            <img src={assets.star_icon} alt="" />
          </div> */}

        </div>

      </div>
    </div>
    </>
  )
}


export default Collection