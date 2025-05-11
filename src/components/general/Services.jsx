import { SiteName } from '@/utils/functions'
import React, { useRef } from 'react'
import { services } from '@/utils/Pageutils'
import FAQ from './FAQ'
import servicesImg from '@/assets/general/services.png'
import { motion, useScroll, useTransform } from 'framer-motion'

const Services = () => {

    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"] // Adjusting the scroll trigger points
    });

    // Scaling the component and setting opacity based on scroll position
    const scale = useTransform(scrollYProgress, [0, 1], [.9, 1.01]);
    const opacity = useTransform(scrollYProgress, [0, 1], [1, 1]);
    return (
        <>

            <div className='mt-16 lg:mt-24 mb-10 '>
                <div
                    ref={ref}
                    className="lg:w-10/12 w-11/12 mx-auto mb-20">
                    <div className="text-center font-bold text-3xl lg:text-4xl text-sec">Our Services</div>
                    <div className="lg:text-lg text-base  text-center text-slate-600">
                        At {SiteName}, we are dedicated to providing you with a banking experience that’s not just secure and reliable but also tailored to meet your financial goals. Our innovative services are designed to simplify your life, empower your savings, and enhance your financial freedom. Explore the array of services we offer to help you manage, grow, and protect your money with ease and confidence.
                    </div>
                </div>
                <div className="w-full">
                    <img src={servicesImg} alt="image" />
                </div>
                <div
                    ref={ref}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 -mt-40 md:-mt-32 gap-10 lg:gap-10  relative lg:mt-16 w-11/12 mx-auto  mb-10 ">
                    {services.map((item, index) => {
                        const isEven = index % 2 === 0
                        return (
                            <div
                                className="relative  w-full bg-white  rounded-lg overflow-hidden group cursor-pointer p-3 h-[20rem] " key={index}>
                                <div className={`absolute inset-0 bg-col transition-transform transform scale-y-0 ${isEven ? 'origin-top' : 'origin-bottom'} group-hover:scale-y-100 duration-500`}></div>
                                <div className="relative z-10 text-xl w-fit mx-auto bg-[#fdf8ef] hover:bg-white p-3 rounded-lg text-col group-hover:text-col group-hover:bg-white">
                                    {<item.icon />}
                                </div>
                                <div className="relative group-hover:text-white z-10 font-bold text-center text-2xl mb-5 mt-3 ">
                                    {item.title}
                                </div>
                                <div className="relative z-10 text-center group-hover:text-white">{item.desc}</div>


                                <div className="w-full absolute bottom-0 h-1.5 bg-col rounded-bl-full rounded-br-full"></div>

                            </div>
                        )
                    })}
                </div>


            </div >
        </>

    )
}

export default Services