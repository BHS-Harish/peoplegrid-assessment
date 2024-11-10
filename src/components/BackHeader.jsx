import React from "react";
import Phone from '../assets/phone.png'
import { IoReturnDownBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

function BackHeader({ title }) {
    const navigate=useNavigate()
    return (
        <header className='p-4 md:p-8 flex justify-between border-b border-b-green-800'>
            <div className='flex items-end gap-4'>
                <img className='w-[50px]' src={Phone} alt='iphone' />
                <div>
                    <p className='text-white noto-sans font-light text-sm'>{title}</p>
                    <p className='text-white noto-sans font-medium text-lg'>Iphone 16 pro</p>
                </div>
            </div>
            <div className='text-white flex items-center gap-2 noto-sans font-medium hover:gap-4 duration-500 cursor-pointer select-none' onClick={() => {
                navigate('/')
            }}>
                <IoReturnDownBackOutline className='text-lg' />
                <span>Back</span>
            </div>
        </header>
    )
}

export default BackHeader;