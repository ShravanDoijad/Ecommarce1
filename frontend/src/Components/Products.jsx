import React, { useContext, useRef } from 'react'
import { ShopContext } from '../Contexts/ShopContext'
import { Link } from 'react-router-dom';
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

let Products = ({ id, image, name, price }) => {

    const { currency } = useContext(ShopContext);
    const linkRef = useRef();

    const handleMouseEnter = () => {
        gsap.to(linkRef.current, {
            scale: 1.1,
            duration: 0.3,
            
        });
    };

    const handleMouseLeave = () => {
        gsap.to(linkRef.current, {
            scale: 1,
            duration: 0.3
        });
    };
    return (
        <Link ref={linkRef} onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave} className='text-gray-700 cursor-pointer flex flex-col gap-1' to={`/product/${id}`} >
            <div className=' '>
                <img width={300} height={'auto'} src={image[0]} alt="" />
            </div>
            <p className=' font-medium text-md font-stretch-50% ' >{name}</p>
            <p className='font-semibold text-[15px] text-gray-700 flex  ' >{currency}  {price}</p>
        </Link>
    )
}

export default Products