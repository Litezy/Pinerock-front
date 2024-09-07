import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import { GoNorthStar } from "react-icons/go";
import heroimg from 'assets/bank1.jpg'
import { motion, useScroll, useTransform } from 'framer-motion'


const HeroSection = () => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["0 1", "1.33 1"]
    });

    // Scaling the component and setting opacity based on scroll position
    const scale = useTransform(scrollYProgress, [0, 1], [.9, 1.01]);
    const opacity = useTransform(scrollYProgress, [0, 1], [1, 1]);
    return (
        <motion.div
            className='w-full'
            ref={ref}
            style={{
                scale,
                opacity,
            }}
        >

            <div className="w-full flex flex-col gap-10 lg:flex-row items-center justify-between">
                <div className="flex items-start flex-col gap-4 lg:w-1/2 w-full">
                    <div className=" w-fit capitalize space-x-2 font-bold text-3xl lg:text-6xl ">Digital banking made for digital users</div>
                    <div className="text-[1rem] w-11/12">Pinerock credit union is an all-in one mobile banking app chock full of all the tools, tips, and tricks you need to take contol of your financies.  </div>
                    <Link className='poppins font-semibold w-fit px-4 py-3 rounded-md bg-orange-500 text-white' to={`/signup`}>Send money now</Link>
                </div>
                <div className="lg:w-1/2 w-full relative">
                    <div className="absolute -top-5 -right-5 w-16 h-16 md:w-24 md:h-24 bg-white rounded-full after:absolute after:top-0 after:left-0 conte"></div>
              
                    <img src={heroimg} className="w-fit h-fit rounded-md object-cover" alt="" />
                    <div className="absolute -bottom-5 -left-5 w-16 h-16 md:w-24 md:h-24 bg-white rounded-full"></div>
                </div>

            </div>
        </motion.div>
    )
}

export default HeroSection