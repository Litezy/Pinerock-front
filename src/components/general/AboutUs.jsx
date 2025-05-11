import React, { useRef } from 'react'
import aboutusimg from '../../assets/general/aboutus.png'
import { SiteName } from '@/utils/functions';
import { motion, useScroll, useTransform } from 'framer-motion'


const AboutUs = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"] // Adjusting the scroll trigger points
  });

  // Scaling the component and setting opacity based on scroll position
  const scale = useTransform(scrollYProgress, [0, 1], [.85, 1.01]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 1]);
  const abouts = [
    {
      title: 'Low Transaction Fees',
      desc: 'We believe that your money should work for you, not the other way around. Enjoy some of the lowest transaction fees in the industry, ensuring more of your hard-earned money stays with you.'
    },
    {
      title: 'Seamless International Transfers',
      desc: 'Moving money across borders has never been easier. Our platform allows you to effortlessly send and receive funds globally, with transparent exchange rates and no hidden charges.'
    },
    {
      title: 'Personalized Savings Goals',
      desc: "Achieve your financial dreams with our customizable savings goals. Whether you're saving for a vacation, a new home, or an emergency fund, we help you stay on track with tailored plans and progress tracking."
    },
    {
      title: 'User-Friendly Interface',
      desc: "Managing your finances should be simple and intuitive. Our app is designed with you in mind, offering a seamless and user-friendly experience across all devices."
    },
    {
      title: '24/7 Customer Support',
      desc: "Whether you have a question or need assistance, our dedicated customer support team is available around the clock to help you navigate any challenges."
    },
  ]
  return (
    <div className='w-full'>
      <div className="flex w-11/12 mx-auto mt-10 lg:mt-20 flex-col lg:flex-row items-start justify-between">
        <div className="lg:text-4xl text-3xl font-bold mb-3 mt-10">About Us</div>
        <div className="lg:w-1/2 w-full text-start">At Pinerock Credit Union, we believe that banking should be more than just a transaction; it should be a partnership. Founded on the principles of trust, transparency, and innovation, we are committed to revolutionizing the way you manage your finances. Our mission is to empower individuals and businesses by providing them with the tools and resources they need to achieve financial success.</div>
      </div>
      <div className='w-full my-10 mx-auto'>
        <motion.div
          className=" w-full relative ">
          <div className="w-full lg:w-1/2 text-white bg-col lg:h-[125dvh] h-[80dvh]">
            <div className="text-lg w-10/12 py-4 font-normal ml-auto">With a customer-first approach, we offer personalized banking solutions that cater to your unique needs. Whether you're saving for a dream, investing in your future, or simply managing your day-to-day expenses, we are here to support you every step of the way.</div>
          </div>
          <img src={aboutusimg} className='absolute top-1/2 lg:top-[13rem] left-1/2 -translate-x-1/2' alt="about us image" />
        </motion.div>

        <motion.div
          style={{ scale, opacity }}
          className="mt-20 w-full flex flex-col lg:flex-row items-center gap-10 relative">
          <div className="w-11/12 lg:w-1/2">
            <div className="text-xl font-semibold lg:w-11/12">Our team of financial experts is dedicated to delivering exceptional service and cutting-edge technology to ensure your experience with us is seamless, secure, and rewarding. At Pinerock Credit Union, we don’t just manage money – we help you make the most of it. Join us on a journey to redefine banking, where your financial goals are our priority.</div>

          </div>
          <div className="w-11/12 lg:w-1/2 right-0 z-20 -top-40 lg:absolute h-[20rem] bg-[#f6f8fa] flex items-center justify-center ">
            <div className="  shadow-lg h-full  text-lg font-semibold tracking-wide px-5 flex  justify-center flex-col ">
              <div className="w-40 h-2 bg-col mb-2"></div>
              <div className="">At {SiteName}, we understand that your financial journey is unique, and we're here to support you every step of the way. Here’s why we stand out:</div>
              <div className="w-40 h-2 bg-col mb-2 ml-auto"></div>
            </div>
          </div>
        </motion.div>

        <motion.div
          // style={{ scale, opacity }}
          className="mt-10 lg:mt-20 w-11/12 mx-auto mb-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 relative gap-10">
          {abouts.map((item, i) => (
            <div className="w-full relative flex items-start gap-3 group rounded-sm bg-[#fdf8ef] " key={i}>
              {/* <div className="absolute z-0 inset-0 bg-orange-500 rounded-md transition-transform transform scale-y-0 group-hover:scale-y-100 origin-bottom duration-500"></div> */}
              <div className="w-1.5 h-full bg-col rounded-tl-full rounded-bl-full"></div>
              <div className="w-full py-3">
                <div className="text-lg text-start z-20 font-bold mb-3 relative">{item.title}</div>
                <div className=" z-20 relative">{item.desc}</div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

export default AboutUs