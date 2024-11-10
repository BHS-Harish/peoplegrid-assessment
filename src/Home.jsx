import React from 'react'
import Header from './Header';
import { MdOutlineRateReview } from "react-icons/md";
import Phone from './assets/phone.png'
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate=useNavigate()
  const specs = [
    {
      title: "Processor Core",
      value: "Hexa Core"
    },
    {
      title: "Operating System",
      value: "IOS 18"
    },
    {
      title: "GPU",
      value: "New 6 Core"
    }
    , {
      title: "Digital Zoom",
      value: "25X"
    }
  ]

  return (
    <div className='w-full h-auto min-h-[100vh] flex flex-col md:flex-row text-slate-300 bg-gray-950'>
      <div className='w-full md:w-3/4 min-h-[100vh] h-full md:border-r border-[#ccc]'>
        <Header />
        <div className='w-full min-h-[90vh] flex flex-col sm:flex-row sm:justify-between sm:items-center px-8 md:px-12 lg:px-24'>
          <div>
            <h1 className='noto-sans text-5xl text-[#22c55e] my-4 font-bold'>Apple</h1>
            <h1 className='noto-sans font-light text-xl py-2'>iPhone 16 Pro | Natural Titanium</h1>
            <h1 className='noto-sans text-xl font-bold text-[#86efac] mt-8 md:mt-24'>INR<span className='mx-2 text-5xl font-black text-white'>1,19,900</span></h1>
            <button className='my-8 bg-[#4ade80] p-4 rounded-xl text-sm noto-sans text-[#000] font-semibold duration-500 hover:bg-lime-600'>PLACE YOUR ORDER</button>
          </div>
          <img className='h-fit px-8 mt-16 sm:mt-0 w-[280px] md:w-[300px] lg:w-[350px] self-end sm:self-auto' src={Phone} />
        </div>
      </div>
      <div className='w-full md:w-1/4 px-8 py-16 noto-sans font-bold text-white'>
        <h1 className='text-2xl'>Specification</h1>
        <div className='w-full flex flex-col gap-4 my-4'>
          {
            specs.map((spec, index) => {
              return (
                <div className='w-full rounded-2xl p-5 bg-green-950/75' key={index}>
                  <p className='text-sm noto-sans font-normal'>{spec.title}</p>
                  <h1 className='mt-1 text-2xl'>{spec.value}</h1>
                </div>
              )
            })
          }
        </div>
        <div className='w-full flex flex-col gap-4 mt-8'>
          <button className='w-full flex justify-center font-semibold noto-sans duration-500 items-center gap-1 bg-green-500 hover:bg-lime-600 text-[#000] px-4 py-3 text-sm rounded-xl' onClick={()=>{
            navigate('/review')
          }}>
            <MdOutlineRateReview />
            WRITE YOUR REVIEW</button>
          <button className='w-full flex justify-center font-semibold noto-sans duration-500 items-center gap-1 hover:bg-white/[.1] text-[#FFF] px-4 py-3 text-sm rounded-xl' onClick={()=>{
            navigate('/dashboard')
          }}>
            <MdOutlineRateReview />
            VIEW REVIEWS</button>

        </div>
      </div>
    </div>
  )
}

export default Home;
