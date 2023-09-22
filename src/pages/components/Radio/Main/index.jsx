import Image from 'next/image'
import React from 'react'

function index({ title }) {

    
  return (
    <div className='flex items-center'>
        <img src='/cool.jpg' alt='radio' className='object-cover w-[50px] h-[50px]' />
        <p className='ml-2'>{title}</p>
    </div>
  )
}

export default index