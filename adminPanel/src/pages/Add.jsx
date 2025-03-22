import React from 'react'
import { assets } from '../admin_assets/assets'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { data } from 'react-router-dom'

export const Add = () => {
  const [image1, setimage1] = useState(false)
  const [image2, setimage2] = useState(false)
  const [image3, setimage3] = useState(false)
  const [image4, setimage4] = useState(false)

  const [name, setname] = useState("")
  const [description, setdescription] = useState("")
  const [category, setcategory] = useState("Men")
  const [subCategory, setsubCategory] = useState("Topwear")
  const [prices, setprices] = useState("")
  const [sizes, setsizes] = useState([])
  const [bestSeller, setbestseller] = useState()
  const backendUrl = import.meta.env.VITE_BACKEND_URL
  
  const handleSubmit = async (e) => {
    
    
    e.preventDefault();
    const formData = new FormData()
      formData.append("name", name)
      formData.append("description", description)
      formData.append("category", category)
      formData.append("subCategory", subCategory)
      formData.append("prices", prices)
      formData.append("sizes", JSON.stringify(sizes))
      formData.append("bestSeller", bestSeller?"true":"false")

      formData.append("image1", image1)
      formData.append("image2", image2)
      formData.append("image3", image3)
      formData.append("image4", image4)
    try {
   
    const response = await fetch(`${backendUrl}/product/add`,{
      method: "POST",
      
      body: formData,
      credentials: "include",
    })
       if (response.ok) {
        const data = await response.json();
        
        console.log("data",data);
        
        toast.success(data.msg);
        setname("")
        setdescription("")
        setprices("")


        setimage1(false)
        setimage2(false)
        setimage3(false)
        setimage4(false)
        

       }
       else{
        toast.error(data.msg);
        
       }
  } catch (error) {
      console.log("error", error);
      
  }
    

  }
  

  return (
    <div className='container w-full h-full p-8'>
      <form className='w-full h-full  flex flex-col gap-y-6' onSubmit={handleSubmit}>
        <label htmlFor="">Upload image</label>
      <div className='flex gap-4' >
       <label htmlFor="image1"  >
        
        <img className='w-20 h-24' src={!image1?assets.upload_area: URL.createObjectURL(image1)} alt="" />
       
        <input type="file" onChange={(e)=>setimage1(e.target.files[0])} id="image1" hidden />
       </label>
       <label htmlFor="image2"  >
        <img className='w-20 h-24' src={!image2?assets.upload_area:URL.createObjectURL(image2)} alt="" />
        <input type="file"  onChange={(e)=>setimage2(e.target.files[0])} id="image2" hidden />
       </label>
       <label htmlFor="image3"  >
        <img className='w-20 h-24' src={!image3?assets.upload_area:URL.createObjectURL(image3)} alt="" />
        <input type="file"  onChange={(e)=>setimage3(e.target.files[0])}  hidden />
       </label>
       <label htmlFor="image4" id="image4" >
        <img className='w-20 h-24' src={!image4?assets.upload_area:URL.createObjectURL(image4)} alt="" />
        <input type="file"  onChange={(e)=>setimage4(e.target.files[0])}  hidden />
       </label>
      </div>
        <label htmlFor="">Product name</label>
        <input type='text'  onChange={(e)=>setname(e.target.value)} value={name} className='w-1/2 px-6 py-5 rounded-sm h-10 border' placeholder='Enter product name' />

          <h1>Product description</h1>
        <label htmlFor="description">
          
          <textarea name="description" onChange={(e)=>{setdescription(e.target.value)}} value={description} id="description" className='w-1/2 h-24 rounded-sm border p-4' placeholder='Add a short description of the product'></textarea>
        </label>
        <div className=' flex gap-6 items-center'>
          <div className='flex flex-col gap-y-4'>
            <h1>Product category</h1>
            <select name="" id="" onChange={(e)=>{setcategory(e.target.value)}}  className='w-34 h-10  p-2 border rounded-sm'>
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Kids">Kids</option>
            </select>
          </div>
          <div className='flex flex-col gap-y-4'>
            <h1>Sub category</h1>
            <select name="" onChange={(e)=>{setsubCategory(e.target.value)}}  id="" className='w-34 h-10  p-2 border rounded-sm'>
              <option value="Topwear">Topwear</option>
              <option value="Bottomwear">Bottomwear</option>
              <option value="Winterwear">Winterwear</option>
            </select>
          </div>
          <div className='flex flex-col gap-y-4'>
            <h1>Price</h1>
            <input type="number" onChange={(e)=>{setprices(e.target.value)}} value={prices} placeholder="25" className='w-34 h-10  p-2 border rounded-sm'/>
          </div>
        </div>

        <h1>Product Sizes</h1>
        <div className='flex gap-3'>
          <div onClick={()=>{setsizes((prev)=>prev.includes("S")?prev.filter((item)=>item!=="S"):[...prev,"S"]) }} className={`size1 cursor-pointer ${sizes.includes("S")?"bg-rose-300":"" } w-10 h-10 border border-gray-400 bg-gray-300 rounded-sm flex justify-center items-center text-center`}>S</div>
          <div onClick={()=>{setsizes((prev)=>prev.includes("M")?prev.filter((item)=>item!=="M"):[...prev,"M"]) }} className={`size2 cursor-pointer ${sizes.includes("M")?"bg-rose-300":"" } w-10 h-10 border border-gray-400 bg-gray-300 rounded-sm flex justify-center items-center text-center`}>M</div>
          <div onClick={()=>{setsizes((prev)=>prev.includes("L")?prev.filter((item)=>item!=="L"):[...prev,"L"]) }} className={`size3 cursor-pointer ${sizes.includes("L")?"bg-rose-300":"" } w-10 h-10 border border-gray-400 bg-gray-300 rounded-sm flex justify-center items-center text-center`}>L</div>
          <div onClick={()=>{setsizes((prev)=>prev.includes("XL")?prev.filter((item)=>item!=="XL"):[...prev,"XL"]) }} className={`size4 cursor-pointer ${sizes.includes("XL")?"bg-rose-300":"" } w-10 h-10 border border-gray-400 bg-gray-300 rounded-sm flex justify-center items-center text-center`}>XL</div>
          <div onClick={()=>{setsizes((prev)=>prev.includes("XXL")?prev.filter((item)=>item!=="XXL"):[...prev,"XXL"]) }} className={`size5 cursor-pointer ${sizes.includes("XXL")?"bg-rose-300":"" } w-10 h-10 border border-gray-400 bg-gray-300 rounded-sm flex justify-center items-center text-center`}>XXL</div>

        </div>

        <div className='flex gap-1.5'>
          <input type="checkbox" checked={bestSeller} onChange={(e)=>{setbestseller(e.target.checked), console.log("bestSeller",e.target.checked)}
          } />
          <h2 className=' text-gray-400'>Add to bestSeller</h2>
        </div>
        <button type='submit' className='bg-black text-sm cursor-pointer text-white font-semibold  w-32 h-12 text-center '>ADD</button>
        </form>
    </div>
  )
}
