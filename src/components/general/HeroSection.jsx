import React from 'react'
import dotsimage from "@/assets/general/dots.png"
import iphoneimage from "@/assets/general/iphone.png"
import saveImg from "@/assets/general/save-widget.png"
import bgImg from "@/assets/general/heroimage.png"
import { Link } from 'react-router-dom'

const HeroSection = () => {
  return (
    <div
      className="w-full  pt-20 bg-no-repeat overflow-hidden relative bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImg})` }}
    >
      <div className="w-11/12 mx-auto flex items-start flex-col lg:flex-row gap-10">
        <div className="w-full lg:w-1/2 text-white">
          <div className="w-full flex items-start flex-col gap-5">
            <h1 className='text-[50px] font-bold tracking-normal w-3/4'>
              Move your money in easy secured steps
            </h1>
            <p className='text-base lg:text-lg text-zinc-200'>
              Feel safe when you bank online on our mobile. As long as you manage your account properly, our guarantee protects you and your money from fraud.
            </p>
            <div className="flex items-center w-full gap-5">
              <Link to={`/login`} className='text-white bg-col hover:scale-105 transition-all duration-500 ease-in-out text-sm px-5 py-2.5 rounded-md'>
                Create Account
              </Link>
              <Link to={`/signup`} className='text-col bg-sec text-sm border hover:scale-105 transition-all duration-500 ease-in-out border-col px-5 py-2.5 rounded-md'>
                Send Money Now
              </Link>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-1/2">
          <div className="w-full relative">
            <img src={iphoneimage} alt="iphone img" className='relative z-10' />
            <img src={dotsimage} alt="dots img" className='z-0 absolute -top-5 right-10' />
            <img src={saveImg} alt="widget img" className='z-20 absolute lg:-left-40 lg:bottom-16 bottom-10' />
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroSection
