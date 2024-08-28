import React from 'react'
import { Link } from 'react-router-dom'
import { GoNorthStar } from "react-icons/go";
import heroimg from 'assets/bank1.jpg'

const HeroSection = () => {
    return (
        <div className=' w-full'>
            <div className="w-full flex flex-col gap-10 lg:flex-row items-center justify-between">
                <div className="flex items-start flex-col gap-4 lg:w-1/2 w-full">
                    <div className=" w-fit capitalize space-x-2 font-bold text-3xl lg:text-6xl ">Digital banking made for digital users</div>
                    <div className="text-[1rem] w-11/12">SageStone credit union is an all-in one mobile banking app chock full of all the tools, tips, and tricks you need to take contol of your financies.  </div>
                    <Link className='poppins font-semibold w-fit px-4 py-3 rounded-md bg-primary text-white' to={`/signup`}>Send money now</Link>
                </div>
                <div className="lg:w-1/2 w-full">
                  <img src={heroimg} className='w-fit h-fit rounded-md object-cover' alt="" />
                </div>
            </div>
        </div>
    )
}

export default HeroSection