import Image from 'next/image'
import React from 'react'

function index({ title, img }) {
  return (
    <div className="flex text-white items-center rounded-[10px] relative">
      <div className="absolute w-full h-full bg-white bg-opacity-20 backdrop-blur-lg rounded drop-shadow-lg left-0 top-0 z-10 rounded-l-[10px]"></div>
      <img src={img} alt="radio" className="object-cover w-[100px] h-[100px] rounded-l-[10px] z-20" />
      <p className="ml-2 z-20">{title}</p>
    </div>
  );
}


export default index