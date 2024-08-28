import React, { useState } from 'react'
import { IoChevronUpSharp, IoChevronDownSharp } from "react-icons/io5";
import save from 'assets/save.jpg'
const FAQ = ({styles,ans,iconcol=true}) => {

    const FAQS = [
        {
            ques: 'What are the transaction fees on the platform?',
            ans: "We offer some of the lowest transaction fees in the industry. Our goal is to help you save more by charging minimal fees on every transaction you make. Whether you're transferring funds locally or internationally, you can rest assured that our fees are competitive and transparent."
        },
        {
            ques: 'How do I set up and manage my savings goals?',
            ans: "Setting up your savings goals is simple. Just log into your account, navigate to the 'Savings' section, and follow the prompts to create your goal. You can name your goal, set a target amount, and even choose a timeline. We'll help you track your progress and stay on course to achieve your financial objectives."
        },
        {
            ques: 'Is my money safe on your platform?',
            ans: "Absolutely. We prioritize your security and have implemented advanced encryption technologies to protect your funds and personal information. Additionally, our platform is fully compliant with international banking regulations, ensuring that your money is safe and secure at all times."
        },

        {
            ques: 'How do I track my savings progress?',
            ans: "You can easily track your savings progress in the 'Savings' section of your account. Here, you’ll see a visual representation of how close you are to reaching your goal, along with details of your contributions and any interest earned."
        },
        {
            ques: 'Are there any rewards for saving regularly?',
            ans: "Yes! We believe in rewarding our users for their dedication. By saving regularly, you may become eligible for various rewards, such as cashback offers, bonus interest rates, or even entry into special promotions. Keep an eye on your account notifications for details."
        },
        {
            ques: 'How can I get the best out of my account?',
            ans: "To maximize your experience, we recommend exploring all the features our platform offers. From setting up multiple savings goals to taking advantage of our low transaction fees for international transfers, there’s a lot to gain. Additionally, staying informed through our newsletters will help you make the most of your account."
        },
    ];

    const [active, setActive] = useState(null);

    const selectAns = (i) => {
        setActive(active === i ? null : i);
    };
    return (
        <div>

            <div className={`py-10 px-4 w-full ${styles}  text-white mb-10 rounded-md`}>
                <div className="w-full flex items-center gap-5 flex-col ">
                    <div className="text-2xl text-center lg:text-4xl font-bold capitalize">Save when you send worldwide</div>
                    <div className="text-base text-center lg:w-3/5">At Sagestone Credit Union, our foremost goal is to empower our members to achieve financial growth. We provide tailored financial solutions and expert guidance, helping you build wealth and secure your financial future.</div>

                    <div className="w-full  lg:w-10/12 mx-auto">
                        {FAQS.map((item, i) => {
                            const isActive = active === i;
                            const Icon = isActive ? IoChevronUpSharp : IoChevronDownSharp;
                            return (
                                <div onClick={() => selectAns(i)} className={`nunito cursor-pointer overflow-hidden ${active === i ? 'max-h-[500px] py-2 transition-all duration-500 ease-in-out' : 'max-h-32 transition-all duration-500 ease-in-out py-2 '}  w-full px-2 mb-3 rounded-xl gap-5 lg:py-5`} key={i}>
                                    <div className="flex items-center w-full justify-between">
                                        <div className="font-extrabold text-lg lg:text-2xl">{item.ques}</div>
                                        <div className="">
                                            <Icon className={` ${active === i ? 'text-sec' : iconcol ? 'text-white':'text-[#4e7259]'} lg:text-2xl text-lg font-bold cursor-pointer`} />
                                        </div>
                                    </div>
                                    {active === i && <div className={`p1-2 text-base mt-2 ${ans}`}>{item.ans}</div>}
                                    {active === i && <hr className={`w-full border-sec my-2 transition-all delay-200 `} />}
                                </div>

                            );
                        })}
                    </div>

                </div>
            </div>
        </div>
    )
}

export default FAQ

// {FAQS.map((item, i) => {

//     return (
//         <div onClick={() => selectAns(i)} className={`nunito cursor-pointer ${active === i ? 'h-fit py-2 bg-green  transition-all duration-300' : 'transition-all duration-300 h-fit py-2 bg-gray'} w-full lg:px-5 px-2 mb-3 rounded-xl gap-5  lg:py-5`} key={i}>
//             <div className="flex items-center w-full justify-between">
//                 <div className="font-bold text-lg lg:text-xl">{item.ques}</div>
//                 <div className="">
//                      <FaPlus className={` ${active === i &&'rotate-45 transition-all delay-100 '} lg:text-2xl text-lg font-bold cursor-pointer`} />
//                 </div>
//             </div>
//             {active === i && <div className="p1-2 mt-2">{item.ans}</div>}
//         </div>
//     );
// })}