import React, {useState, useEffect} from 'react'
import { useContext, useRef } from 'react'
import { ShopContext } from '../Contexts/ShopContext'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import Products from './Products'
import Text from './Text'

const BestSeller = () => {
    const {products}= useContext(ShopContext);
    const [BestSeller, setBestSeller] = useState([])
    const bestSellerRef = useRef();
    useEffect(()=>{

    const filteredPoducts = products.filter((elem)=>(elem.bestSeller))
    setBestSeller(filteredPoducts);
  },[products]);

  useGSAP(() => {
    gsap.to(bestSellerRef.current, {
      x: "-50%", 
      duration: 1,
      ease: "power2.out",
      
      scrollTrigger: {
        trigger: bestSellerRef.current,
        start: "100px center",
        end: "bottom center",
        scrub: 3,
        
        markers: true, 
        ease: "circ.out",
        
    },
   
    });
  }, [BestSeller]);

  


  return (
    <div>
        <div className='mt-8 h-40 flex flex-col justify-center items-center'>
        <Text text1={"BEST"} text2={"SELLER"} />
        <p className="text-gray-600 text-center max-w-lg">
          Discover our latest collection. Scroll down to explore more.
        </p>
        </div>
        <div className="relative  w-full overflow-x-auto overflow-y-clip  whitespace-nowrap p-10"
        style={{ scrollbarWidth: "none" }}  >
          <div ref={bestSellerRef}   className=' flex gap-x-24 w-fit'>
          {
            BestSeller.map((item, index )=>(
              <div key={index} className=" w-[300px] h-[400px]">
              <Products
                id={item._id}
                image={item.image}
                name={item.name}
                price={item.prices}
              />
            </div>))
          }
          </div>
          
        </div>
    </div>
  )
}

export default BestSeller