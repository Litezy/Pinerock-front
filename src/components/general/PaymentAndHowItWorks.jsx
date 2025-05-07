import React from 'react'
import payimg from "@/assets/general/pay.png"
import { IoIosCheckmarkCircle } from "react-icons/io";
import { Link } from 'react-router-dom';
import work1Image from "@/assets/general/work1.png"
import work2Image from "@/assets/general/work2.png"
import work3Image from "@/assets/general/work3.png"

const PaymentAndHowItWorks = () => {

    const stats = [
        {
            title: 'Seamless experience',
            desc: 'Payments complete in one click, no redirects, no friction.'
        },
        {
            title: 'No chargebacks',
            desc: 'Every transaction is final; sales stay sold, revenue stays yours.'
        },
        {
            title: 'Low transaction fee',
            desc: 'Pay just a tiny flat rate per payment, keep more profit every time.'
        },
        {
            title: 'Instant payments',
            desc: 'Money settles to your wallet within seconds, 24/7, even on holidays.'
        },
    ]

    const works = [
        {
            title:'Open an Account',
            step: 'Step 1',
            desc:"Open an account with us and gain access to global money transfers",
            img: work1Image
        },
        {
            title:'Money Transfer',
            step: 'Step 2',
            desc:"Reliable, safe and secure ways to send and recieve money globally",
            img: work2Image
        },
        {
            title:'Saving Goals',
            step: 'Step 3',
            desc:"Reduce exessive spendings and shortage of finance by increasing your savings effortlessly",
            img: work3Image
        },
    ]
    return (
        <div className='w-full flex items-start flex-col  gap-10 lg:gap-20 py-10 '>
            <div className="w-11/12 mx-auto flex items-start flex-col gap-10 lg:gap-20 lg:flex-row">
                <div className="w-full lg:w-1/2 ">
                    <img src={payimg} alt="payment img" className='w-full h-full' />
                </div>

                <div className="w-full lg:w-1/2 ">
                    <div className="w-full flex items-start flex-col gap-6">
                        <h1 className='text-[30px] font-bold lg:w-8/12'>Effortless Payments, Zero Hassles</h1>
                        <p>Our advanced technology and secure systems provide a safe and reliable way to transfer funds, allowing you to benefit from reduced processing times and improved efficiency.</p>
                        <div className="flex items-start flex-col gap-5">
                            {stats.map((item, index) => (
                                <div key={index} className="flex items-start gap-2">
                                    <IoIosCheckmarkCircle className='text-col text-2xl' />
                                    <div className="flex items-start flex-col ">
                                        <h1 className='text-lg font-bold'>{item.title}</h1>
                                        <p className=''>{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <Link
                            to={`/signup`}
                            className=" transition-all w-full">
                            <div className="w-fit px-10 py-3 text-center bg-col text-white capitalize rounded-md">
                                Create Account
                            </div>

                        </Link>
                    </div>
                </div>
            </div>
            <div className="py-10 lg:py-20 w-full bg-[#f8fafc] ">
                <div className="w-11/12 mx-auto flex items-start gap-3 flex-col">
                <h1 className='text-[30px] font-bold'>How it works?</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {works.map((item, index) => (
                        <div key={index} className="flex items-start flex-col gap-2  shadow-sm rounded-lg p-2">
                            <img src={item.img} alt="work img" className='w-full  object-cover rounded-lg' />
                            <div className="w-fit px-2 py-1.5 text-sm text-center bg-[#ebf1ff] rounded-md">
                                {item.step}
                            </div>
                            <div className="flex items-start flex-col">
                                <h1 className='text-lg font-bold'>{item.title}</h1>
                                <p className='text-sm'>{item.desc}</p>
                            </div>
                            
                        </div>
                    ))}
                </div>
                </div>
            </div>
        </div>
    )
}

export default PaymentAndHowItWorks