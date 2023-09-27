import Image from 'next/image'
import React from 'react'

function index({ title, img }) {
  return (
    <div className="flex items-center rounded-[10px] relative">
      <div className="absolute w-full h-full blur-[2px] bg-white left-0 top-0 z-10"></div>
      <img src={img} alt="radio" className="object-cover w-[100px] h-[100px] rounded-l-[10px] z-20" />
      <p className="ml-2 z-20">{title}</p>
    </div>
  );
}


export default index