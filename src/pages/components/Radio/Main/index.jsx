import Image from 'next/image'
import React from 'react'

function index({ title, img }) {
  return (
    <div className="flex items-center bg-red-400 rounded-[10px]">
      <img src={img} alt="radio" className="object-cover w-[100px] h-[100px] rounded-l-[10px]" />
      <p className="ml-2">{title}</p>
    </div>
  );
}


export default index