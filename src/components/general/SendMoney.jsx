import React from 'react'
import { TfiWorld } from "react-icons/tfi";
import { IoChevronForwardSharp } from "react-icons/io5";
import { FaGift } from "react-icons/fa";
import { GoArrowUpRight } from "react-icons/go";
import flag from 'assets/flag.jpg'
import cards from 'assets/card.jpg'
import { ChevronRight } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const SendMoney = () => {
    return (
        <div className='w-full grid grid-cols-1 md:grid-ols-2 lg:grid-cols-3 gap-10'>
            <div className="w-full border flex items-start flex-col h-72 p-3 rounded-lg bg-[#e9eeed] shadow-md gap-5">
                <div className=" w-full flex items-start gap-4">
                    <div className="w-fit px-5 py-5 rounded-full bg-sec">
                        <TfiWorld className="text-2xl text-black" />
                    </div>
                </div>
                <div className="font-extrabold text-2xl w-10/12 text-black">Send money here to anywhere</div>
                <div className="rounded-full w-10/12 flex items-center justify-between  py-3 px-5 bg-white">
                    <div className="flex items-center gap-5">
                        <img src={flag} className={`w-10 h-10 rounded-full object-cover`} alt="usd image" />
                        <div className=" font-bold text-base">USD</div>
                    </div>
                    <GoArrowUpRight className='text-3xl' />
                </div>
            </div>
            <div className="w-full border flex items-start flex-col h-72 relative  rounded-lg bg-[#f6f4ed] shadow-md gap-3 p-3">
                <div className=" w-full flex items-start gap-2">
                    <div className="w-fit px-5 py-5 rounded-full bg-sec">
                        <FaGift className="text-2xl text-black" />
                    </div>
                </div>
                <div className="font-extrabold text-2xl w-10/12 text-black">Mastercards and VISA cards</div>
                <img src={cards} className='  w-full h-[7rem] rounded-md object-cover' alt="mastercards" />
            </div>
            <div className="w-full h-72 rounded-lg bg-primary shadow-md">
                <div className="w-full text-white p-3 h-full">
                    <div className="h-1/3"></div>
                    <div className="lg:h-2/3 flex items-start flex-col justify-between w-full">
                        <div className="text-2xl font-extrabold w-3/4 mb-3 lg:mb-0">Explore our other product features</div>
                        <Link to={`/login`} className="flex items-center gap-4 bg-sec px-4 py-4 rounded-md text-black">
                            <div className="font-semibold">view more</div>
                            <ChevronRight />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SendMoney
