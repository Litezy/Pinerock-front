import React, { useState } from 'react';
import { IoChevronDownOutline, IoChevronUpOutline } from 'react-icons/io5';



const FAQ = () => {
    const [active, setActive] = useState(null);

    const faqs = [
        {
            que: `What are the transaction fees on the platform?`,
            ans: `Pinerock is a secure, user-friendly online payment app that allows users to send and receive money, pay bills, and manage transactions effortlessly.`,
        },
        {
            que: ` How do I sign up for Pinerock?`,
            ans: `Pinerock is a secure, user-friendly online payment app that allows users to send and receive money, pay bills, and manage transactions effortlessly.`,
        },
        {
            que: `Is Pinerock safe to use?`,
            ans: `Pinerock is a secure, user-friendly online payment app that allows users to send and receive money, pay bills, and manage transactions effortlessly.`,
        },

        {
            que: `What payment methods does Pinerock support?`,
            ans: `Pinerock is a secure, user-friendly online payment app that allows users to send and receive money, pay bills, and manage transactions effortlessly.`,
        },
        {
            que: `Can I pay bills using Pinerock?`,
            ans: `Pinerock is a secure, user-friendly online payment app that allows users to send and receive money, pay bills, and manage transactions effortlessly.`,
        },
      
        {
            que: `Can I use Pinerock internationally?`,
            ans: `Pinerock is a secure, user-friendly online payment app that allows users to send and receive money, pay bills, and manage transactions effortlessly.`,
        },
    ];

    const selectFaq = (i) => {
        setActive(active === i ? null : i);
    };

    return (
        <div className="w-full  pt-32 lg:pt-60 text-white">
            <div className="w-11/12 mx-auto text-dark-200">
                <div className="w-full flex items-start justify-between flex-col lg:flex-row gap-10">
                    <div className="w-full lg:w-1/2 flex items-start flex-col gap-3">
                        <div className="text-[30px] md:text-[35px] leading-[1.2] font-bold w-3/4">
                            Why choose us
                        </div>
                        <p className="text-base font-semibold n ">
                            At Pinerock Credit Union, our foremost goal is to empower our members to achieve financial growth. We provide tailored financial solutions and expert guidance, helping you build wealth and secure your financial future.
                        </p>
                        <button className='bg-col px-5 w-fit py-2.5 rounded-md text-white'>Create Account</button>
                    </div>

                    <div className="w-full lg:w-1/2">
                        {faqs.map((item, i) => (
                            <div
                                key={i}
                                className="flex items-start flex-col gap-3 w-full  text-sec py-4"
                            >
                                <div className="flex  text-sec bg-white w-full px-3 cursor-pointer lg:py-4  py-2.5 rounded-md 
                                " onClick={() => selectFaq(i)}
                                >
                                    <div className="w-full flex-col gap-2">
                                        {/* Question Section */}
                                        <div
                                            className="text-[18px] font-semibold cursor-pointer flex items-center justify-between"
                                            onClick={() => selectFaq(i)}
                                        >
                                            {item.que}
                                        </div>

                                        {/* Answer Section (Animated) */}
                                        <div
                                            className={`overflow-hidden transition-all duration-500 ease-in-out ${active === i ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 h-0"
                                                }`}
                                        >
                                            {active === i && (
                                                <p className="text-[16px] font-normal transition-opacity delay-200">
                                                    {item.ans}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="w-[5%] cursor-pointer " >
                                        <div className={`transition-transform duration-300 ${active === i ? "rotate-180" : ""}`}>
                                            {active === i ? (
                                                <IoChevronUpOutline className="text-xl " />
                                            ) : (
                                                <IoChevronDownOutline className="text-xl " />
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FAQ;