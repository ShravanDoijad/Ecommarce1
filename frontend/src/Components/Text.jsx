import React from 'react'

const Text = ({text1, text2}) => {
  return (
    <div className='w-full flex justify-center items-center gap-4' >
        <p className=' text-3xl font-medium font-sans' >{text1} <span>{text2}</span></p>
        <p className="bg-gray-500 text-sm w-20 h-0.5 font-normal" ></p>
    </div>
  )
}

export default Text